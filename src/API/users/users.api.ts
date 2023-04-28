import axios from 'axios';
import headers from '../config.api';
import { UserI } from '../../entitites/users/users.entity';
import { initialGet } from '../../vite-env';

export const registerNewUser = async (
  user: UserI
): Promise<{ message: string; data: UserI }> => {
  const { data } = await axios.post('/users', user, {
    headers: headers()!,
  });
  return data;
};

export const getUsersList = async ({
  id_company,
  offset = 0,
}: initialGet): Promise<{
  rows: UserI[];
  count: number;
}> => {
  const { data } = await axios.get(
    `/users?id_company=${id_company}&offset=${offset}`,
    {
      headers: headers()!,
    }
  );
  return data;
};

export const updateUser = async (
  user: UserI
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.patch(`/users/${user.id}`, user, {
    headers: headers()!,
  });
  return data;
};

export const deleteUser = async (
  id_user: number
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.delete(`/users/${id_user}`, {
    headers: headers()!,
  });
  return data;
};
