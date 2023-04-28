import {
  LoginCompanyResponseI,
  LoginUserResponseI,
} from '../entitites/auth/auth.entity';
import { getItemStorage } from '../helpers/handleStorage.helpers';

const headers = (contentType: string = 'application/json') => {
  const { token } =
    (getItemStorage() as LoginCompanyResponseI | LoginUserResponseI) ?? null;

  if (token) {
    return {
      'Content-Type': contentType,
      authorization: 'Bearer ' + token,
    };
  }

  return null;
};

export default headers;
