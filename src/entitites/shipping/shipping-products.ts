import { ProductI } from '../products/products.entity';

export interface ProductsShippingI {
  id?: number;
  id_shipping?: number;
  id_product: number;
  price: number;
  stock: number;
  product?: ProductI;
}
