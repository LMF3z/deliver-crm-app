import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryKeys } from '../../../constants/queryKeys.constants';
import {
  createNewShipping,
  getAllShipping,
  getShippingById,
  updateStatusShippingById,
} from '../../../API/shipping/shipping.api';
import {
  CreateShippingDtoI,
  ShippingI,
} from '../../../entitites/shipping/shipping.entity';
import { initialGet } from '../../../vite-env';

export const createNewShippingQuery = () =>
  useMutation((newShipping: CreateShippingDtoI) =>
    createNewShipping(newShipping)
  );

export const getShippingListQuery = (
  initialGetData: initialGet,
  handleSuccess?: (c: number) => void
) =>
  useQuery({
    queryKey: [queryKeys.getShippingList, initialGetData],
    queryFn: () => getAllShipping(initialGetData),
    keepPreviousData: true,
    onSuccess: (successData) => {
      if (handleSuccess) {
        handleSuccess(successData.count);
      }
    },
  });

export const getShippingDetailsQuery = (id_shipping: number) =>
  useQuery({
    queryKey: [queryKeys.getShippingDetails],
    queryFn: () => getShippingById(id_shipping),
  });

export const updateShippingStatusQuery = () => {
  const client = useQueryClient();

  return useMutation(
    (shippingStatus: Pick<ShippingI, 'id' | 'status'>) =>
      updateStatusShippingById(shippingStatus),
    {
      onSuccess: () => {
        client.invalidateQueries([
          queryKeys.getShippingList,
          queryKeys.getShippingDetails,
        ]);
      },
    }
  );
};

// export const deleteProductQuery = () => {
//   const client = useQueryClient();

//   return useMutation((id_product: number) => deleteProductById(id_product), {
//     onSuccess: () => {
//       client.invalidateQueries(queryKeys.getProductsList);
//     },
//   });
// };
