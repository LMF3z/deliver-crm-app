export interface SubsidiaryI {
  id?: number;
  id_company: number;
  name: string;
  subsidiary_address: string;
}

export interface createSubsidiaryDtoI {
  id_company: number;
  name: string;
  subsidiary_address: string;
}
