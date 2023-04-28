import * as yup from 'yup';

export const registerSubsidiariesSchema = yup.object({
  //   id_company: yup
  //     .number()
  //     .integer()
  //     .typeError('Identificador de la compañia es requerido.'),
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9 ]+$/, 'Ingrese un nombre valido.')
    .required('Ingrese un nombre valido.')
    .typeError('Ingrese un nombre valido.'),
  subsidiary_address: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9.-_/# ]+$/, 'Ingrese una dirección valida..')
    .required('Ingrese una dirección valida..')
    .typeError('Ingrese una dirección valida..'),
});

export type registerSubsidiariesType = yup.InferType<
  typeof registerSubsidiariesSchema
>;
