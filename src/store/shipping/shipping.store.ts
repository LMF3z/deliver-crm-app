import { create } from 'zustand';
import { ProductsShippingI } from '../../entitites/shipping/shipping-products';
import { toast } from 'react-hot-toast';
import {
  getItemStorage,
  setItemStorage,
  removeItemStorage,
} from '../../helpers/handleStorage.helpers';

interface ShippingStoreI {
  id_subsidiary: number | null;
  setIdSubsidiary: (id: number) => void;

  // products
  products: ProductsShippingI[];
  addProductToShipping: (newProduct: ProductsShippingI) => void;
  deleteProductShipping: (id: number) => void;

  editPriceProductShipping: (id_product: number, newPrice: number) => void;
  editStockProductShipping: (id_product: number, newStock: number) => void;

  resetNewShippingState: () => void;
}

const nameItemStorage = 'delivar-cart';

export const useShippingStore = create<ShippingStoreI>((set) => ({
  id_subsidiary: null,
  products: (getItemStorage(nameItemStorage) as ProductsShippingI[]) ?? [],

  // setters
  setIdSubsidiary: (id_sub) =>
    set((state) => ({ ...state, id_subsidiary: id_sub })),

  addProductToShipping: (newProduct) =>
    set((state) => {
      const exits = state.products.find(
        (p) => p.id_product === newProduct.id_product
      );

      if (exits) {
        const deleted = state.products.filter(
          (p) => p.id_product !== newProduct.id_product
        );
        setItemStorage(nameItemStorage, deleted);
        toast.success('Eliminado exitosamente.');
        return { ...state, products: deleted };
      }

      const added = [...state.products, newProduct];

      setItemStorage(nameItemStorage, added);
      toast.success('Agregado exitosamente.');
      return { ...state, products: added };
    }),

  deleteProductShipping: (id_product) =>
    set((state) => {
      const deleted = state.products.filter((p) => p.id_product !== id_product);
      setItemStorage(nameItemStorage, deleted);
      toast.success('Eliminado exitosamente.');
      return { ...state, products: deleted };
    }),

  editPriceProductShipping: (id_product, newPrice) =>
    set((state) => {
      const priceModified = state.products.map((p) => {
        if (p.id_product === id_product) {
          p.price = newPrice;

          return p;
        }

        return p;
      });

      setItemStorage(nameItemStorage, priceModified);
      return { ...state, products: priceModified };
    }),

  editStockProductShipping: (id_product, newStock) =>
    set((state) => {
      const priceModified = state.products.map((p) => {
        if (p.id_product === id_product) {
          p.stock = newStock;

          return p;
        }

        return p;
      });

      setItemStorage(nameItemStorage, priceModified);
      return { ...state, products: priceModified };
    }),

  resetNewShippingState: () =>
    set((state) => {
      removeItemStorage(nameItemStorage);
      return {
        ...state,
        id_subsidiary: null,
        products: [],
      };
    }),
}));
