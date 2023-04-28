import { useMutation, useQuery, useQueryClient } from 'react-query';
import { initialGet } from '../../../vite-env';
import { queryKeys } from '../../../constants/queryKeys.constants';
import {
  deleteUser,
  getUsersList,
  registerNewUser,
  updateUser,
} from '../../../API/users/users.api';
import { UserI } from '../../../entitites/users/users.entity';

export const useGetUserListQuery = (
  getUserData: initialGet,
  handleSuccess?: (c: number) => void
) =>
  useQuery({
    queryKey: [queryKeys.getUsersList, getUserData],
    queryFn: () => getUsersList(getUserData),
    onSuccess: (successData) => {
      if (handleSuccess) handleSuccess(successData.count);
    },
  });

export const createNewUserQuery = () =>
  useMutation((user: UserI) => registerNewUser(user));

export const updateUserQuery = () =>
  useMutation((user: UserI) => updateUser(user));

export const useDeleteUserQuery = () => {
  const queryClient = useQueryClient();

  return useMutation((id_user: number) => deleteUser(id_user), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getUsersList);
    },
  });
};
