import axios from 'axios';
import { LoginDataI } from '../../vite-env';

export const loginApi = async (loginData: LoginDataI) => {
  const { data } = await axios.post('/auth/login', loginData);
  return data;
};
