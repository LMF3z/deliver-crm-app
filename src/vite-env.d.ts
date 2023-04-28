/// <reference types="vite/client" />

export interface LoginDataI {
  email: string;
  password: string;
}

export interface initialGet {
  id_company: number;
  offset: number;
}

export interface initialGetQuery extends initialGet {
  query: string;
}

export interface requestErrorI {
  response: { data: { message: string } };
}
