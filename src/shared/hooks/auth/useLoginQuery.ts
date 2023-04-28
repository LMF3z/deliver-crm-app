import { useMutation } from 'react-query';
import { LoginDataI } from '../../../vite-env';
import { loginApi } from '../../../API/auth/auth.api';

export const useLoginQuery = () =>
  useMutation((loginData: LoginDataI) => loginApi(loginData));
