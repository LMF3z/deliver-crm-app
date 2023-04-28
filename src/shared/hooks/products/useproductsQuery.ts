import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initialGetQuery } from '../../../vite-env';
import { queryKeys } from '../../../constants/queryKeys.constants';
import { ProductI } from '../../../entitites/products/products.entity';
import {
  deleteProductById,
  getProductById,
  registerNewProduct,
  searchProductByQuery,
  updateProducts,
} from '../../../API/products/products.api';

export const getProductsListQuery = (
  initialGetData: initialGetQuery,
  handleSuccess?: (c: number) => void
) =>
  useQuery({
    queryKey: [queryKeys.getProductsList, initialGetData],
    queryFn: () => searchProductByQuery(initialGetData),
    keepPreviousData: true,
    onSuccess: (successData) => {
      if (handleSuccess) {
        handleSuccess(successData.count);
      }
    },
  });

export const getProductDetailsQuery = (id_product: number) =>
  useQuery({
    queryKey: [queryKeys.getProductDetails],
    queryFn: () => getProductById(id_product),
  });

export const searchProductsByQueryQuery = () =>
  useMutation(
    (getData: { id_company: number; offset: number; query: string }) =>
      searchProductByQuery(getData)
  );

export const createNewProductQuery = () =>
  useMutation((product: ProductI) => registerNewProduct(product));

export const updateProductQuery = () =>
  useMutation((product: ProductI) => updateProducts(product));

export const deleteProductQuery = () => {
  const client = useQueryClient();

  return useMutation((id_product: number) => deleteProductById(id_product), {
    onSuccess: () => {
      client.invalidateQueries(queryKeys.getProductsList);
    },
  });
};
