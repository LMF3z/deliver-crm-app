import * as yup from 'yup';
import { UsersRolesE } from '../../entitites/users/userRoles.entity';

export const userRegisterSchema = yup.object({
  id_subsidiaries: yup
    .number()
    .integer()
    .typeError('Seleccione una sucursal.')
    .required(),

  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingrese un nombre valido.')
    .required('Ingrese un nombre valido.')
    .typeError('Ingrese un nombre valido.'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingrese un apellido valido.')
    .required('Ingrese un apellido valido.')
    .typeError('Ingrese un apellido valido.'),

  type_document: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'Ingrese un apellido valido.')
    .required('Ingrese un apellido valido.')
    .typeError('Ingrese un apellido valido.'),

  document: yup
    .number()
    .integer()
    .required('Ingrese un documento valido.')
    .typeError('Ingrese un documento valido.'),

  mobile_phone: yup
    .string()
    .matches(/^[+0-9]+$/, 'Ingrese un teléfono valida.')
    .required('Ingrese un teléfono valida.')
    .typeError('Ingrese un teléfono valida.'),

  email: yup
    .string()
    .email('Ingrese un correo valido.')
    .required('Ingrese un correo valido.')
    .typeError('Ingrese un correo valido.'),
  // password: yup
  //   .string()
  //   .matches(
  //     /^[a-zA-Zá-üÁ-Ü0-9!#%&*]+$/,
  //     'Ingrese una contraseña valida. Con minímo 8 caracteres'
  //   )
  //   .min(8, 'Debe contener, al menos. 8 caracteres.')
  //   .required('Ingrese una contraseña valida. Con minímo 8 caracteres')
  //   .typeError('Ingrese una contraseña valida. Con minímo 8 caracteres'),
  roles: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingrese un rol valido.')
    .required('Ingrese un rol valido.')
    .typeError('Ingrese un rol valido.')
    .oneOf([UsersRolesE.ADMIN, UsersRolesE.CASHIER], 'Ingrese un rol valido.'),
});

export type UserRegisterType = yup.InferType<typeof userRegisterSchema>;
