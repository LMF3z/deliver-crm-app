import { create } from 'zustand';
import { SubsidiaryI } from '../../entitites/subsidiaries/subsidiaries.entity';

interface subsidiariesStorageI {
  subsIsEditMode: boolean;
  subsidiarySelectedToEdit?: SubsidiaryI | null;
  toggleSubsIsEditMode: () => void;
  setSubsidiaryToEdit: (subsidiary: SubsidiaryI) => void;
  resetIsEditMode: () => void;
}

export const useSubsidiariesStorage = create<subsidiariesStorageI>((set) => ({
  subsIsEditMode: false,
  subsidiarySelectedToEdit: null,
  setSubsidiaryToEdit: (subsidiary: SubsidiaryI) =>
    set((state) => ({
      ...state,
      subsIsEditMode: true,
      subsidiarySelectedToEdit: subsidiary,
    })),
  toggleSubsIsEditMode: () =>
    set((state) => ({ ...state, subsIsEditMode: !state.subsIsEditMode })),
  resetIsEditMode: () =>
    set((state) => ({
      ...state,
      subsIsEditMode: false,
      subsidiarySelectedToEdit: null,
    })),
}));
