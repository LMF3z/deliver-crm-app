import axios from 'axios';
import headers from '../config.api';
import { initialGet } from '../../vite-env';
import {
  CreateShippingDtoI,
  ShippingI,
} from '../../entitites/shipping/shipping.entity';

export const createNewShipping = async (
  newShipping: CreateShippingDtoI
): Promise<{ message: string; data: ShippingI }> => {
  const { data } = await axios.post(`/shipping`, newShipping, {
    headers: headers()!,
  });
  return data;
};

export const getAllShipping = async ({
  id_company,
  offset,
}: initialGet): Promise<{ rows: ShippingI[]; count: number }> => {
  const { data } = await axios.get(
    `/shipping?id_company=${id_company}&offset=${offset}`,
    {
      headers: headers()!,
    }
  );
  return data;
};

export const getShippingById = async (
  id_shipping: number
): Promise<ShippingI> => {
  const { data } = await axios.get(`/shipping/${id_shipping}`, {
    headers: headers()!,
  });
  return data;
};

export const updateStatusShippingById = async (
  shippingToUpdate: Pick<ShippingI, 'status' | 'id'>
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.patch(
    `/shipping/update-status/${shippingToUpdate.id}`,
    shippingToUpdate,
    {
      headers: headers()!,
    }
  );
  return data;
};
