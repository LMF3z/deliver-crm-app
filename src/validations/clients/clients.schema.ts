import * as yup from 'yup';

export const clientRegisterSchema = yup.object({
  id_company: yup
    .number()
    .integer()
    .positive()
    .typeError('Identificador de la empresa es requerido.'),

  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingrese un nombre valido.')
    .required('Ingrese un nombre valido.')
    .typeError('Ingrese un nombre valido.'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Ingrese un nombre valido.')
    .required('Ingrese un nombre valido.')
    .typeError('Ingrese un nombre valido.'),
  //   email: yup
  //     .string()
  //     .email('Ingrese un correo valido.')
  //     .required('Ingrese un correo valido.')
  //     .typeError('Ingrese un correo valido.'),
  type_identification: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingrese un tipo de documento valido.')
    .required('Ingrese un tipo de documento valido.')
    .typeError('Ingrese un tipo de documento valido.')
    .oneOf(['v', 'j', 'e', 'p', 'g'], 'Ingrese un tipo de documento valido.'),
  document: yup
    .string()
    .matches(/^[0-9]+$/, 'Ingrese un documento valido.')
    .required('Ingrese un documento valido.')
    .typeError('Ingrese un documento valido.'),
  phone: yup
    .string()
    .matches(/^[+0-9]+$/, 'Ingrese un número valido.')
    .required('Ingrese un número valido.')
    .typeError('Ingrese un número valido.'),
});

export type ClientRegisterType = yup.InferType<typeof clientRegisterSchema>;
