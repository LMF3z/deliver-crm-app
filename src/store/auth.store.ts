import { create } from 'zustand';
import {
  LoginCompanyResponseI,
  LoginUserResponseI,
} from '../entitites/auth/auth.entity';
import {
  getItemStorage,
  setItemStorage,
  removeItemStorage,
} from '../helpers/handleStorage.helpers';

interface AuthStoreI {
  isAuth: LoginCompanyResponseI | LoginUserResponseI | null;
  setAuthData: (dataLogin: LoginCompanyResponseI | LoginUserResponseI) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthStoreI>((set) => ({
  isAuth:
    (getItemStorage() as LoginCompanyResponseI | LoginUserResponseI) ?? null,
  setAuthData: (data) =>
    set((state) => {
      setItemStorage('user_deliver_v1', data);
      return { ...state, isAuth: data };
    }),
  setLogout: () =>
    set((state) => {
      removeItemStorage('user_deliver_v1');
      return { ...state, isAuth: null };
    }),
}));

export default useAuthStore;
