import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useAuthStore from '../../store/auth.store';
import { useProductsStore } from '../../store/products/products.store';
import { ProductI } from '../../entitites/products/products.entity';
import { ProductTypesE } from '../../entitites/products/products.entity';
import { registerNewProductSchema } from '../../validations/products/products.schema';
import {
  createNewProductQuery,
  updateProductQuery,
} from '../../shared/hooks/products/useproductsQuery';
import ContainerModal from '../../shared/components/Modals/ContainerModal';
import SelectMultiImagesModal from '../../shared/components/Modals/SelectMultiImagesModal';
import Button from '../../shared/components/ContainerButton';
import ContainerInput from '../../shared/components/ContainerInput';
import Loader from '../../shared/components/loader/Loader';
import { toast } from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';

const CreateProductScreen = () => {
  const { isAuth } = useAuthStore();
  const {
    arrayImages,
    setArrayImages,
    isEditMode,
    productSelectToEdit,
    setResetProductSelectToEdit,
  } = useProductsStore();

  const { mutate, isLoading } = createNewProductQuery();
  const { mutate: mutateUpdateProduct, isLoading: updateProductIsLoading } =
    updateProductQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductI>({
    defaultValues: {
      id_company: isAuth?.id_company,
      type: ProductTypesE.shoes,
      stock: 0,
    },
    resolver: yupResolver(registerNewProductSchema),
  });

  const [selectImagesModal, setModalSelectImageModal] =
    useState<boolean>(false);

  const toggleSelectImagesModal = () =>
    setModalSelectImageModal(!selectImagesModal);

  useEffect(() => {
    if (isEditMode) {
      Object.entries(productSelectToEdit!).forEach((product) => {
        const productKey = product[0] as keyof ProductI;

        if (productKey === 'images') {
          setArrayImages(product[1]);
        }

        if (!['createdAt', 'updatedAt', 'deleteAt'].includes(product[0])) {
          setValue(productKey, product[1]);
        }
      });
    }
  }, [isEditMode]);

  const onSubmit = handleSubmit((data) => {
    if (!arrayImages) {
      setError('images', {
        type: 'custom',
        message: 'Debe escoger, al menos, 4 imágenes.',
      });

      return;
    }

    data.images = arrayImages;

    if (isEditMode) {
      handleSubmitEditProduct(data);
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

  const handleSubmitEditProduct = (data: ProductI) => {
    mutateUpdateProduct(data, {
      onSuccess: (success) => {
        toast.success(success.message);
        setResetProductSelectToEdit();
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
  };

  return (
    <>
      <ContainerModal
        title='Seleccione imágenes'
        isOpen={selectImagesModal}
        closeModal={toggleSelectImagesModal}
      >
        <SelectMultiImagesModal handleClose={toggleSelectImagesModal} />
      </ContainerModal>
      <div className='container-page space-y-10'>
        <h1>{isEditMode ? 'Actualizar' : 'Registrar'} Producto</h1>

        <section className='section_form'>
          <Button
            positionContentContainer='w-full flex justify-end'
            handleClick={toggleSelectImagesModal}
            classes='w-36'
          >
            {isEditMode ? 'Editar' : 'Agregar'} imagenes
          </Button>
          <form
            onSubmit={onSubmit}
            className='w-full flex flex-col items-center space-y-5'
            autoComplete='off'
          >
            <ContainerInput
              label='Nombre'
              error={errors?.name && errors?.name?.message}
            >
              <input type='text' {...register('name')} />
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

            <ContainerInput
              label='Modelo'
              error={errors?.model && errors?.model?.message}
            >
              <input type='text' {...register('model')} />
            </ContainerInput>

            <ContainerInput
              label='Talla'
              error={errors?.size && errors?.size?.message}
            >
              <input type='number' step={1} min={1} {...register('size')} />
            </ContainerInput>

            <ContainerInput
              label='Color'
              error={errors?.color && errors?.color?.message}
            >
              <input type='text' {...register('color')} />
            </ContainerInput>

            <ContainerInput
              label='Marca'
              error={errors?.brand && errors?.brand?.message}
            >
              <input type='text' {...register('brand')} />
            </ContainerInput>

            <ContainerInput
              label='Tipo'
              error={errors?.type && errors?.type?.message}
            >
              <input type='text' disabled {...register('type')} />
            </ContainerInput>

            <ContainerInput
              label='Cantidad'
              error={errors?.stock && errors?.stock?.message}
            >
              <input
                type='number'
                step={1}
                min={0}
                disabled
                {...register('stock')}
              />
            </ContainerInput>

            <ContainerInput
              label='Precio'
              error={errors?.price && errors?.price?.message}
            >
              <input type='number' step={0.01} min={1} {...register('price')} />
            </ContainerInput>

            {errors?.images && (
              <p className='text-red-600'>{errors.images.message}</p>
            )}

            <Button
              type='submit'
              isDisable={isLoading || updateProductIsLoading}
            >
              Registrar
            </Button>
            <Loader isOpen={isLoading || updateProductIsLoading} />
          </form>
        </section>
      </div>
    </>
  );
};

export default CreateProductScreen;
