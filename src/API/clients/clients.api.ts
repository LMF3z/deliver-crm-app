import axios from 'axios';
import headers from '../config.api';
import { initialGetQuery } from '../../vite-env';
import { ClientI } from '../../entitites/clients/clients.entity';

export const searchClientsByQueryApi = async ({
  id_company,
  offset,
  query,
}: initialGetQuery): Promise<{ rows: ClientI[]; count: number }> => {
  const { data } = await axios.get(
    `/clients/search?id_company=${id_company}&offset=${offset}&query=${query}`,
    { headers: headers()! }
  );
  return data;
};

export const createNewClient = async (
  newClient: ClientI
): Promise<{ message: string; data: ClientI }> => {
  const { data } = await axios.post(`/clients`, newClient, {
    headers: headers()!,
  });
  return data;
};

export const updateClient = async (
  client: ClientI
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.patch(`/clients/${client.id}`, client, {
    headers: headers()!,
  });
  return data;
};

export const deleteClient = async (
  id_client: number
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.delete(`/clients/${id_client}`, {
    headers: headers()!,
  });
  return data;
};
