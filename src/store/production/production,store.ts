import { create } from 'zustand';
import { ProductionI } from '../../entitites/production/production.entity';

interface ProductionStoreI {
  productionSelectToEdit: ProductionI | null;
  setProductionSelectToEdit: (product: ProductionI) => void;
  isEditMode: boolean;
  setResetProductionSelectToEdit: () => void;
}

export const useProductionStore = create<ProductionStoreI>((set) => ({
  productionSelectToEdit: null,
  isEditMode: false,
  setProductionSelectToEdit: (product: ProductionI) =>
    set((state) => ({
      ...state,
      productionSelectToEdit: product,
      isEditMode: true,
    })),
  setResetProductionSelectToEdit: () =>
    set((state) => ({
      ...state,
      productionSelectToEdit: null,
      isEditMode: false,
    })),
}));
