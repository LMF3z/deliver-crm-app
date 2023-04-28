import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductionI } from '../../entitites/production/production.entity';
import useAuthStore from '../../store/auth.store';
import { registerNewProductionSchema } from '../../validations/production/production.schema';
import ContainerInput from '../../shared/components/ContainerInput';
import Button from '../../shared/components/ContainerButton';
import Loader from '../../shared/components/loader/Loader';
import { createNewProductionRegisterQuery } from '../../shared/hooks/production/useProductionsQuery';
import { toast } from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';

const ProductionCreateScreen = () => {
  let { id } = useParams();

  const { isAuth } = useAuthStore();

  const { mutate, isLoading } = createNewProductionRegisterQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductionI>({
    defaultValues: {
      id_company: isAuth?.id_company,
      id_product: Number(id),
    },
    resolver: yupResolver(registerNewProductionSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (success) => {
        toast.success(success.message);
        reset();
      },
      onError: (error: unknown) => {
        const {
          response: {
            data: { message },
          },
        } = error as requestErrorI;
        toast.error(message);
      },
    });
  });

  return (
    <div className='container-page space-y-10'>
      <h1>Registrar producción</h1>

      <section className='section_form'>
        <form
          onSubmit={onSubmit}
          className='w-full flex flex-col items-center space-y-5'
          autoComplete='off'
        >
          <ContainerInput
            label='Cantidad'
            error={errors?.amount && errors?.amount?.message}
          >
            <input type='number' min={1} step={1} {...register('amount')} />
          </ContainerInput>

          <ContainerInput
            label='Descripción'
            error={errors?.description && errors?.description?.message}
          >
            <textarea
              cols={30}
              rows={10}
              maxLength={255}
              className='resize-none'
              {...register('description')}
            ></textarea>
          </ContainerInput>

          <Button type='submit' isDisable={isLoading}>
            Registrar
          </Button>
          <Loader isOpen={isLoading} />
        </form>
      </section>
    </div>
  );
};

export default ProductionCreateScreen;
