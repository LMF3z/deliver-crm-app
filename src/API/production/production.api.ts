import axios from 'axios';
import headers from '../config.api';
import { initialGet } from '../../vite-env';
import { ProductionI } from '../../entitites/production/production.entity';

export const createNewProductionRegister = async (
  newProduction: ProductionI
): Promise<{ message: string; data: ProductionI[] }> => {
  const { data } = await axios.post(`/production`, newProduction, {
    headers: headers()!,
  });
  return data;
};

export const getProductionList = async ({
  id_company,
  offset,
}: initialGet): Promise<{ rows: ProductionI[]; count: number }> => {
  const { data } = await axios.get(
    `/production?id_company=${id_company}&offset=${offset}`,
    { headers: headers()! }
  );
  return data;
};

export const getProductionDetail = async (
  id_production: number
): Promise<ProductionI> => {
  const { data } = await axios.get(`/production/${id_production}`, {
    headers: headers()!,
  });
  return data;
};

export const deleteProduction = async (
  id_production: number
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.delete(`/production/${id_production}`, {
    headers: headers()!,
  });
  return data;
};
