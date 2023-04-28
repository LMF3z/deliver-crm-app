import { create } from 'zustand';
import { UserI } from '../../entitites/users/users.entity';

interface userUserStoreI {
  isUserEditMode: boolean;
  setUserDataToEdit: (user: UserI) => void;
  userDataToEdit: UserI | null;
  resetUserDataToEdit: () => void;
}

export const useUsersStore = create<userUserStoreI>((set) => ({
  isUserEditMode: false,
  userDataToEdit: null,
  setUserDataToEdit: (user) =>
    set((state) => ({ ...state, isUserEditMode: true, userDataToEdit: user })),
  resetUserDataToEdit: () =>
    set((state) => ({ ...state, isUserEditMode: false, userDataToEdit: null })),
}));
