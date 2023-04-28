import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initialGet } from '../../../vite-env';
import {
  deleteSubsidiary,
  getAllSubsidiaries,
  registerNewSubsidiary,
  updateSubsidiary,
} from '../../../API/subsidiaries/subsidiaries.api';
import {
  createSubsidiaryDtoI,
  SubsidiaryI,
} from '../../../entitites/subsidiaries/subsidiaries.entity';
import { queryKeys } from '../../../constants/queryKeys.constants';

export const useGetSubsidiariesQuery = (
  initialGetData: initialGet,
  handleSuccess?: (c: number) => void
) =>
  useQuery({
    queryKey: [queryKeys.getSubsidiaries, initialGetData],
    queryFn: () => getAllSubsidiaries(initialGetData),
    onSuccess: (successData) => {
      if (handleSuccess) {
        handleSuccess(successData.count);
      }
    },
  });

export const useCreateNewSubsidiaryQuery = () =>
  useMutation((newSubsidiary: createSubsidiaryDtoI) =>
    registerNewSubsidiary(newSubsidiary)
  );

export const useUpdateSubsidiaryQuery = () =>
  useMutation((subsidiaryData: SubsidiaryI) =>
    updateSubsidiary(subsidiaryData)
  );

export const useDeleteSubsidiaryQuery = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id_subsidiary: number) => deleteSubsidiary(id_subsidiary),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getSubsidiaries);
      },
    }
  );
};
