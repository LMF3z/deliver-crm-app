import { ProductI } from '../products/products.entity';

export interface ProductionI {
  id?: number;
  id_company: number;
  id_product: number;
  amount: number;
  description: string;
  date_created: Date;
  createdAt: Date;

  product: ProductI;
}
