import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';
import useAuthStore from '../../store/auth.store';
import { routes } from '../../constants/routes';
import ContainerInput from '../../shared/components/ContainerInput';
import { useLoginQuery } from '../../shared/hooks/auth/useLoginQuery';
import Button from '../../shared/components/ContainerButton';
import Loader from '../../shared/components/loader/Loader';
import { LoginSchema, LoginType } from '../../validations/auth/login.schema';

const LoginScreen = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(LoginSchema),
  });

  const { mutate, isLoading } = useLoginQuery();
  const { setAuthData } = useAuthStore();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (data) => {
        reset();
        toast.success(data.message);
        setAuthData(data.data);
        navigate(routes.mainApp);
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
    <div className='container-page space-y-20'>
      <h1>Binvenido a Deliver CRM</h1>

      <section className='w-[90%] min-h-[30vh]'>
        <form
          onSubmit={onSubmit}
          className='w-full flex flex-col items-center space-y-5'
          autoComplete='off'
        >
          <ContainerInput
            label='Correo'
            error={errors?.email && errors?.email?.message}
          >
            <input type='email' {...register('email')} />
          </ContainerInput>
          <ContainerInput
            label='Contraseña'
            error={errors?.password && errors?.password?.message}
          >
            <input type='password' {...register('password')} />
          </ContainerInput>
          <Button type='submit' isDisable={isLoading}>
            Entrar
          </Button>
          <Loader isOpen={isLoading} />
        </form>
      </section>
    </div>
  );
};

export default LoginScreen;
