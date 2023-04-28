import { Company } from './company.entity';
import { UserI } from '../users/users.entity';

export interface Auth {
  email: string;
  password: string;
}

export interface LoginCompanyResponseI extends Company {
  id_company: number;
  token: string;
}

export interface LoginUserResponseI extends UserI {
  id_company: number;
  token: string;
}
