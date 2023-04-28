import { SubsidiaryI } from '../subsidiaries/subsidiaries.entity';
import { ProductsShippingI } from './shipping-products';

export interface ShippingI {
  id?: number;
  id_company: number;
  id_subsidiary: number;
  date_ship: Date;
  status: ShippingStatusT;
  cancelled: boolean;
  subsidiary?: SubsidiaryI;
  products_shipping?: ProductsShippingI[];
  createdAt?: Date;
}

export interface CreateShippingDtoI {
  id_company: number;
  id_subsidiary: number;
  products_shipping?: ProductsShippingI[];
}

export type ShippingStatusT = 'pending' | 'accepted' | 'rejected';

export enum ShippingStatusE {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}
