import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';
import { ClientI, typeDocumentE } from '../../entitites/clients/clients.entity';
import { clientRegisterSchema } from '../../validations/clients/clients.schema';
import useAuthStore from '../../store/auth.store';
import { useClientsStore } from '../../store/clients/clients.store';
import ContainerInput from '../../shared/components/ContainerInput';
import Button from '../../shared/components/ContainerButton';
import Loader from '../../shared/components/loader/Loader';
import {
  createNewClientQuery,
  updateClientQuery,
} from '../../shared/hooks/clients/useClientsQuery';

const ClientsCreateScreen = () => {
  const { isAuth } = useAuthStore();

  const { mutate: createNewClientMutate, isLoading: createClientIsLoading } =
    createNewClientQuery();
  const { mutate: updateClientMutate, isLoading: updateClientIsLoading } =
    updateClientQuery();

  const { isEditMode, clientSelectToEdit, setResetClientSelectToEdit } =
    useClientsStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ClientI>({
    defaultValues: {
      id_company: isAuth?.id_company,
    },
    resolver: yupResolver(clientRegisterSchema),
  });

  useEffect(() => {
    if (isEditMode) {
      Object.entries(clientSelectToEdit!).forEach((client) => {
        const clientKey = client[0] as keyof ClientI;
        setValue(clientKey, client[1]);
      });
    }
  }, [isEditMode]);

  const onSubmit = handleSubmit((data) => {
    if (isEditMode) {
      onHandleEditSubmit(data);
      return;
    }

    createNewClientMutate(data, {
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

  const onHandleEditSubmit = (client: ClientI) => {
    updateClientMutate(client, {
      onSuccess: (success) => {
        toast.success(success.message);
        setResetClientSelectToEdit();
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
    <div className='container-page space-y-5'>
      <h1>{isEditMode ? 'Editar' : 'Registrar'} cliente</h1>

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
          label='Apellido'
          error={errors?.last_name && errors?.last_name?.message}
        >
          <input type='text' {...register('last_name')} />
        </ContainerInput>

        <ContainerInput
          label='Tipo de documento'
          error={
            errors?.type_identification && errors?.type_identification?.message
          }
        >
          <select defaultValue={'none'} {...register('type_identification')}>
            <option value='none'>Seleccione</option>
            <option value={typeDocumentE.v}>{typeDocumentE.v}</option>
            <option value={typeDocumentE.e}>{typeDocumentE.e}</option>
            <option value={typeDocumentE.j}>{typeDocumentE.j}</option>
            <option value={typeDocumentE.g}>{typeDocumentE.g}</option>
            <option value={typeDocumentE.p}>{typeDocumentE.p}</option>
          </select>
        </ContainerInput>

        <ContainerInput
          label='Documento'
          error={errors?.document && errors?.document?.message}
        >
          <input type='number' min={1} step={1} {...register('document')} />
        </ContainerInput>

        <ContainerInput
          label='Teléfono'
          error={errors?.phone && errors?.phone?.message}
        >
          <input type='text' placeholder='+00' {...register('phone')} />
        </ContainerInput>

        <Button
          type='submit'
          isDisable={createClientIsLoading || updateClientIsLoading}
        >
          {isEditMode ? 'Editar' : 'Registrar'}
        </Button>
        <Loader isOpen={createClientIsLoading || updateClientIsLoading} />
      </form>
    </div>
  );
};

export default ClientsCreateScreen;
