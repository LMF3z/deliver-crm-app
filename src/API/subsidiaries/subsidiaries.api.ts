import axios from 'axios';
import headers from '../config.api';
import {
  SubsidiaryI,
  createSubsidiaryDtoI,
} from '../../entitites/subsidiaries/subsidiaries.entity';

export const registerNewSubsidiary = async (
  newSubsidiary: createSubsidiaryDtoI
) => {
  const { data } = await axios.post('/subsidiaries', newSubsidiary, {
    headers: headers()!,
  });
  return data;
};

export const getAllSubsidiaries = async ({
  id_company,
  offset,
}: {
  id_company: number;
  offset: number;
}): Promise<{ rows: SubsidiaryI[]; count: number }> => {
  const { data } = await axios.get(
    `/subsidiaries/all?id_company=${id_company}&offset=${offset}`,
    {
      headers: headers()!,
    }
  );
  return data;
};

export const updateSubsidiary = async (
  subsidiaryToEditData: SubsidiaryI
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.patch(
    `/subsidiaries/${subsidiaryToEditData.id}`,
    subsidiaryToEditData,
    {
      headers: headers()!,
    }
  );
  return data;
};

export const deleteSubsidiary = async (
  id_subsidiary: number
): Promise<{ message: string; affectedRows: number }> => {
  const { data } = await axios.delete(`/subsidiaries/${id_subsidiary}`, {
    headers: headers()!,
  });
  return data;
};
