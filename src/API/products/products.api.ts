import axios from 'axios';
import headers from '../config.api';
import { ProductI } from '../../entitites/products/products.entity';
import { initialGet } from '../../vite-env';

export const getProductsList = async ({
  id_company,
  offset,
}: initialGet): Promise<{ rows: ProductI[]; count: number }> => {
  const { data } = await axios.get(
    `/products?id_company=${id_company}&offset=${offset}`,
    { headers: headers()! }
  );
  return data;
};

export const registerNewProduct = async (
  newProduct: ProductI
): Promise<{ message: string; data: ProductI }> => {
  const { data } = await axios.post('/products', newProduct, {
    headers: headers()!,
  });

  return data;
};

export const getProductById = async (id_product: number): Promise<ProductI> => {
  const { data } = await axios.get(`/products/${id_product}`, {
    headers: headers()!,
  });

  return data;
};

export const searchProductByQuery = async ({
  id_company,
  offset = 0,
  query = '',
}: {
  id_company: number;
  offset: number;
  query: string;
}): Promise<{ rows: ProductI[]; count: number }> => {
  const { data } = await axios.post(
    `/products/search?id_company=${id_company}&offset=${offset}&query=${query}`,
    {},
    {
      headers: headers()!,
    }
  );

  return data;
};

export const filterProducts = async ({
  id_company,
  offset = 0,
  query = '',
}: {
  id_company: number;
  offset: number;
  query: string;
}): Promise<{ rows: ProductI[]; count: number }> => {
  const { data } = await axios.post(
    `/products/search?id_company=${id_company}&offset=${offset}&query=${query}`,
    {},
    {
      headers: headers()!,
    }
  );

  return data;
};

export const updateProducts = async (
  product: ProductI
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.patch(`/products/${product.id}`, product, {
    headers: headers()!,
  });

  return data;
};

export const deleteProductById = async (
  id_product: number
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.delete(`/products/${id_product}`, {
    headers: headers()!,
  });

  return data;
};
