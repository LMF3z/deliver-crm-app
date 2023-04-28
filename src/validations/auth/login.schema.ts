import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email('Ingrese un coreo valido.')
    .required('Ingrese un coreo valido.')
    .typeError('Ingrese un coreo valido.'),
  password: yup
    .string()
    .matches(
      /^[a-zA-Zá-üÁ-Ü0-9!#$%&*]+$/,
      'Ingrese una contraseña valida. Con minímo 8 caracteres'
    )
    .min(8, 'Debe contener, al menos. 8 caracteres.')
    .required('Ingrese una contraseña valida. Con minímo 8 caracteres')
    .typeError('Ingrese una contraseña valida. Con minímo 8 caracteres'),
});
export type LoginType = yup.InferType<typeof LoginSchema>;
