import { create } from 'zustand';
import { ClientI } from '../../entitites/clients/clients.entity';

interface ClientsStoreI {
  clientSelectToEdit: ClientI | null;
  setClientSelectToEdit: (client: ClientI) => void;
  isEditMode: boolean;
  setResetClientSelectToEdit: () => void;
}

export const useClientsStore = create<ClientsStoreI>((set) => ({
  clientSelectToEdit: null,
  isEditMode: false,
  setClientSelectToEdit: (client: ClientI) =>
    set((state) => ({
      ...state,
      clientSelectToEdit: client,
      isEditMode: true,
    })),
  setResetClientSelectToEdit: () =>
    set((state) => ({
      ...state,
      clientSelectToEdit: null,
      isEditMode: false,
    })),
}));
