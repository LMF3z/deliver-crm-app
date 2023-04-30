import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initialGetQuery } from '../../../vite-env';
import { queryKeys } from '../../../constants/queryKeys.constants';
import {
  createNewClient,
  deleteClient,
  searchClientsByQueryApi,
  updateClient,
} from '../../../API/clients/clients.api';
import { ClientI } from '../../../entitites/clients/clients.entity';

export const searchClientsByQuery = (
  initialGetData: initialGetQuery,
  handleSuccess?: (c: number) => void
) =>
  useQuery({
    queryKey: [queryKeys.searchClientsByQuery, initialGetData],
    queryFn: () => searchClientsByQueryApi(initialGetData),
    keepPreviousData: true,
    onSuccess: (successData) => {
      if (handleSuccess) {
        handleSuccess(successData.count);
      }
    },
  });

// export const getProductDetailsQuery = (id_product: number) =>
//   useQuery({
//     queryKey: [queryKeys.getProductDetails],
//     queryFn: () => getProductById(id_product),
//   });

export const createNewClientQuery = () =>
  useMutation((client: ClientI) => createNewClient(client));

export const updateClientQuery = () =>
  useMutation((client: ClientI) => updateClient(client));

export const deleteClientQuery = () => {
  const client = useQueryClient();

  return useMutation((id_client: number) => deleteClient(id_client), {
    onSuccess: () => {
      client.invalidateQueries(queryKeys.searchClientsByQuery);
    },
  });
};
