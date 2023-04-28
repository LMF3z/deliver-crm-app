import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initialGet, initialGetQuery } from '../../../vite-env';
import { queryKeys } from '../../../constants/queryKeys.constants';
import { ProductionI } from '../../../entitites/production/production.entity';
import {
  createNewProductionRegister,
  deleteProduction,
  getProductionDetail,
  getProductionList,
} from '../../../API/production/production.api';
// import {
//   deleteProductById,
//   getProductById,
//   registerNewProduct,
//   searchProductByQuery,
//   updateProducts,
// } from '../../../API/products/products.api';

export const getProductionListQuery = (
  initialGetData: initialGet,
  handleSuccess?: (c: number) => void
) =>
  useQuery({
    queryKey: [queryKeys.getProductionList, initialGetData],
    queryFn: () => getProductionList(initialGetData),
    keepPreviousData: true,
    onSuccess: (successData) => {
      if (handleSuccess) {
        handleSuccess(successData.count);
      }
    },
  });

export const getProductionDetailsQuery = (id_production: number) =>
  useQuery({
    queryKey: [queryKeys.getProductionDetails],
    queryFn: () => getProductionDetail(id_production),
  });

// export const searchProductsByQueryQuery = () =>
//   useMutation(
//     (getData: { id_company: number; offset: number; query: string }) =>
//       searchProductByQuery(getData)
//   );

export const createNewProductionRegisterQuery = () =>
  useMutation((product: ProductionI) => createNewProductionRegister(product));

// export const updateProductQuery = () =>
//   useMutation((product: ProductI) => updateProducts(product));

export const deleteProductionQuery = () => {
  const client = useQueryClient();

  return useMutation(
    (id_production: number) => deleteProduction(id_production),
    {
      onSuccess: () => {
        client.invalidateQueries(queryKeys.getProductionList);
      },
    }
  );
};
