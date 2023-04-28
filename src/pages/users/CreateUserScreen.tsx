import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate, useNavigate } from 'react-router-dom';
import { requestErrorI } from '../../vite-env';
import useAuthStore from '../../store/auth.store';
import {
  TypeCompanyDocumentE,
  UsersRolesE,
} from '../../entitites/users/userRoles.entity';
import { UserI } from '../../entitites/users/users.entity';
import ContainerInput from '../../shared/components/ContainerInput';
import Button from '../../shared/components/ContainerButton';
import Loader from '../../shared/components/loader/Loader';
import {
  createNewUserQuery,
  updateUserQuery,
} from '../../shared/hooks/users/useUsersQuery';
import { userRegisterSchema } from '../../validations/users/users.schema';
import { useUsersStore } from '../../store/users/users.store';
import { routes } from '../../constants/routes';
import { useGetSubsidiariesQuery } from '../../shared/hooks/subsidiaries/useSubsidiariesQuery';

const CreateUserScreen = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();

  const { isUserEditMode, userDataToEdit, resetUserDataToEdit } =
    useUsersStore();

  const { data: subsidiariesList, isLoading: subsidiariesIsLoading } =
    useGetSubsidiariesQuery({
      id_company: isAuth?.id_company ?? isAuth?.id!,
      offset: 0,
    });
  const { mutate, isLoading } = createNewUserQuery();
  const { mutate: updateUserMutate, isLoading: updateUserIsLoading } =
    updateUserQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UserI>({
    defaultValues: {
      id_company: isAuth?.id_company ?? isAuth?.id,
    },
    resolver: yupResolver(userRegisterSchema),
  });

  useEffect(() => {
    if (isUserEditMode) {
      setValue('id', userDataToEdit?.id);
      setValue('document', userDataToEdit?.document!);
      setValue('email', userDataToEdit?.email!);
      setValue('id_subsidiaries', userDataToEdit?.id_subsidiaries!);
      setValue('last_name', userDataToEdit?.last_name!);
      setValue('mobile_phone', userDataToEdit?.mobile_phone!);
      setValue('name', userDataToEdit?.name!);
      setValue('roles', userDataToEdit?.roles!);
      setValue('type_document', userDataToEdit?.type_document!);
    }
  }, [isUserEditMode]);

  const onSubmit = handleSubmit((data) => {
    if (isUserEditMode) {
      onSubmitEditUser(data);
      return;
    }

    if (!data.password || data.password.length < 8) {
      setError('password', {
        type: 'custom',
        message: 'Ingrese una contraseña valida.',
      });
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

  const onSubmitEditUser = (data: UserI) => {
    updateUserMutate(data, {
      onSuccess: (success) => {
        toast.success(success.message);
        resetUserDataToEdit();
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

  if (isUserEditMode && !userDataToEdit) {
    return <Navigate to={routes.usersScreen} replace={true} />;
  }

  return (
    <div className='container-page space-y-10'>
      <h1>{!isUserEditMode ? 'Crear' : 'Editar'} usuario</h1>
      <section className='section_form'>
        <form
          onSubmit={onSubmit}
          className='container_form space-y-5'
          autoComplete='off'
        >
          <ContainerInput
            label='Correo'
            error={errors?.email && errors?.email?.message}
          >
            <input type='email' {...register('email')} />
          </ContainerInput>

          <ContainerInput
            label='Password'
            error={errors?.password && errors?.password?.message}
          >
            <input type='password' {...register('password')} />
          </ContainerInput>

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
            label='Tipo documento'
            error={errors?.type_document && errors?.type_document?.message}
          >
            <select defaultValue={'none'} {...register('type_document')}>
              <option value='none'>Seleccionar</option>
              <option value={TypeCompanyDocumentE.v}>V</option>
              <option value={TypeCompanyDocumentE.j}>J</option>
              <option value={TypeCompanyDocumentE.e}>E</option>
            </select>
          </ContainerInput>

          <ContainerInput
            label='Documento'
            error={errors?.document && errors?.document?.message}
          >
            <input type='number' min={0} step={1} {...register('document')} />
          </ContainerInput>

          <ContainerInput
            label='Teléfono'
            error={errors?.mobile_phone && errors?.mobile_phone?.message}
          >
            <input type='text' {...register('mobile_phone')} />
          </ContainerInput>

          <ContainerInput
            label='Rol'
            error={errors?.roles && errors?.roles?.message}
          >
            <select defaultValue='none' {...register('roles')}>
              <option value='none'>Seleccione</option>
              <option value={UsersRolesE.ADMIN}>Admin</option>
              <option value={UsersRolesE.CASHIER}>Cajero</option>
            </select>
          </ContainerInput>

          <ContainerInput
            label='Sucursal'
            error={errors?.id_subsidiaries && errors?.id_subsidiaries?.message}
          >
            <select
              defaultValue={'none'}
              disabled={subsidiariesList?.rows?.length! < 0}
              {...register('id_subsidiaries')}
            >
              <option value='none'>Seleccione</option>
              {subsidiariesList?.rows?.length! > 0 &&
                subsidiariesList?.rows.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </ContainerInput>

          <Loader
            isOpen={isLoading || subsidiariesIsLoading || updateUserIsLoading}
          />
          <Button
            type='submit'
            isDisable={
              isLoading || subsidiariesIsLoading || updateUserIsLoading
            }
          >
            {!isUserEditMode ? 'Registrar' : 'Editar'}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default CreateUserScreen;
