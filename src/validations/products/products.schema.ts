import * as yup from 'yup';

export const registerNewProductSchema = yup.object({
  id_company: yup
    .number()
    .positive()
    .integer()
    .positive()
    .typeError('Identificador de la empresa es requerido.'),

  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9 ]+$/, 'Ingrese un nombre valido.')
    .required('Ingrese un nombre valido.')
    .typeError('Ingrese un nombre valido.'),

  description: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9;,:.-_ ]+$/, 'Ingrese una descripción valida.')
    .required('Ingrese una descripción valida.')
    .typeError('Ingrese una descripción valida.'),

  model: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü0-9;,:\- ]+$/, 'Ingrese un modelo valido.')
    .required('Ingrese un modelo valido.')
    .typeError('Ingrese un modelo valido.'),

  size: yup
    .number()
    .positive()
    .integer()
    .required('Ingrese una talla valida.')
    .typeError('Ingrese una talla valida.'),

  color: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingrese un color valido.')
    .required('Ingrese un color valido.')
    .typeError('Ingrese un color valido.'),

  brand: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingrese una marca valida.')
    .required('Ingrese una marca valida.')
    .typeError('Ingrese una marca valida.'),

  type: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Ingrese un tipo valido.')
    .required('Ingrese un tipo valido.')
    .typeError('Ingrese un tipo valido.'),

  stock: yup
    .number()
    .integer()
    .required('Ingrese una cantidad valida.')
    .typeError('Ingrese una cantidad valida.'),

  price: yup
    .number()
    .positive()
    .required('Ingrese un precio valido.')
    .typeError('Ingrese un precio valido.'),

  // images: yup
  //   .string()
  //   .matches(/^[a-zA-Zá-üÁ-Ü]+$/, 'Debe escoger, al menos, 4 imágenes.')
  //   .required('Debe escoger, al menos, 4 imágenes.')
  //   .typeError('Debe escoger, al menos, 4 imágenes.'),
});

export type registerNewProductType = yup.InferType<
  typeof registerNewProductSchema
>;
