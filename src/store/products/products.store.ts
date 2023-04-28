import { create } from 'zustand';
import { ProductI } from '../../entitites/products/products.entity';

interface ProductsStoreI {
  arrayImages: string | null;
  setArrayImages: (array: string) => void;
  productSelectToEdit: ProductI | null;
  setProductSelectToEdit: (product: ProductI) => void;
  isEditMode: boolean;
  setResetProductSelectToEdit: () => void;
}

export const useProductsStore = create<ProductsStoreI>((set) => ({
  arrayImages: null,
  setArrayImages: (arrayImgs: string) =>
    set((state) => ({ ...state, arrayImages: arrayImgs })),
  productSelectToEdit: null,
  isEditMode: false,
  setProductSelectToEdit: (product: ProductI) =>
    set((state) => ({
      ...state,
      productSelectToEdit: product,
      isEditMode: true,
    })),
  setResetProductSelectToEdit: () =>
    set((state) => ({
      ...state,
      productSelectToEdit: null,
      isEditMode: false,
    })),
}));
