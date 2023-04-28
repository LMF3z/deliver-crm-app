import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';
import useAuthStore from '../../store/auth.store';
import { useSubsidiariesStorage } from '../../store/subsidiaries/subsidiaries.store';
import { SubsidiaryI } from '../../entitites/subsidiaries/subsidiaries.entity';
import { registerSubsidiariesSchema } from '../../validations/subsidiaries/subsidiaries.schema';
import ContainerInput from '../../shared/components/ContainerInput';
import Loader from '../../shared/components/loader/Loader';
import Button from '../../shared/components/ContainerButton';
import {
  useCreateNewSubsidiaryQuery,
  useUpdateSubsidiaryQuery,
} from '../../shared/hooks/subsidiaries/useSubsidiariesQuery';
import { useNavigate } from 'react-router-dom';

const CreateSubsidiary = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();
  const { subsIsEditMode, subsidiarySelectedToEdit, resetIsEditMode } =
    useSubsidiariesStorage();

  const { mutate, isLoading } = useCreateNewSubsidiaryQuery();
  const {
    mutate: updateSubsidiaryMutate,
    isLoading: updateSubsidiaryIsLoading,
  } = useUpdateSubsidiaryQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SubsidiaryI>({
    defaultValues: {
      id_company: isAuth?.id_company ?? isAuth?.id,
    },
    resolver: yupResolver(registerSubsidiariesSchema),
  });

  useEffect(() => {
    if (subsIsEditMode) {
      setValue('id', subsidiarySelectedToEdit?.id);
      setValue('name', subsidiarySelectedToEdit?.name!);
      setValue(
        'subsidiary_address',
        subsidiarySelectedToEdit?.subsidiary_address!
      );
    }
  }, [subsIsEditMode]);

  const onSubmit = handleSubmit((data) => {
    if (subsIsEditMode) {
      onSubmitEditSub(data);
      return;
    }

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

  const onSubmitEditSub = (data: SubsidiaryI) => {
    updateSubsidiaryMutate(data, {
      onSuccess: (success) => {
        toast.success(success.message);
        resetIsEditMode();
        reset();
        navigate(-1);
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
  };

  return (
    <div className='container-page space-y-20'>
      <h1>{!subsIsEditMode ? 'Crear sucursal' : 'Editar sucursal'}</h1>

      <section className='section_form'>
        <form
          onSubmit={onSubmit}
          className='container_form space-y-5'
          autoComplete='off'
        >
          <ContainerInput
            label='Nombre'
            error={errors?.name && errors?.name?.message}
          >
            <input type='text' {...register('name')} />
          </ContainerInput>
          <ContainerInput
            label='Dirección'
            error={
              errors?.subsidiary_address && errors?.subsidiary_address?.message
            }
          >
            <input type='text' {...register('subsidiary_address')} />
          </ContainerInput>

          <Button
            type='submit'
            isDisable={isLoading || updateSubsidiaryIsLoading}
          >
            {!subsIsEditMode ? 'Registrar' : 'Editar'}
          </Button>
          <Loader isOpen={isLoading || updateSubsidiaryIsLoading} />
        </form>
      </section>
    </div>
  );
};

export default CreateSubsidiary;
