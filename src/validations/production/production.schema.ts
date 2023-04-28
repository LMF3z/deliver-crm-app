import * as yup from 'yup';

export const registerNewProductionSchema = yup.object({
  description: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9;,:.-_ ]+$/, 'Ingrese una descripción valida.')
    .required('Ingrese una descripción valida.')
    .typeError('Ingrese una descripción valida.'),

  amount: yup
    .number()
    .integer()
    .positive()
    .required('Ingrese una cantidad valida.')
    .typeError('Ingrese una cantidad valida.'),
});

export type registerNewProductionType = yup.InferType<
  typeof registerNewProductionSchema
>;
