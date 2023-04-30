export interface ClientI {
  id: number;
  id_company: number;
  name: string;
  last_name: string;
  type_identification: typeDocumentT;
  document: number | string;
  phone: string;
}

export type typeDocumentT = 'v' | 'j' | 'e' | 'p' | 'g';

export enum typeDocumentE {
  v = 'v',
  j = 'j',
  e = 'e',
  p = 'p',
  g = 'g',
}
