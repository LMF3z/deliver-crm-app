import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAuthStore from '../../store/auth.store';
import { UserI } from '../../entitites/users/users.entity';
import { routes } from '../../constants/routes';
import {
  useDeleteUserQuery,
  useGetUserListQuery,
} from '../../shared/hooks/users/useUsersQuery';
import Loader from '../../shared/components/loader/Loader';
import usePaginate from '../../shared/hooks/usePaginate';
import PaginateComponent from '../../shared/components/usePaginateComponent';
import { useUsersStore } from '../../store/users/users.store';
import ItemListUsers from './components/ItemListUsers';

const UsersScreen = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();
  const { setUserDataToEdit } = useUsersStore();

  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const { data: usersList, isLoading: usersIsLoading } = useGetUserListQuery(
    {
      id_company: isAuth?.id_company ?? isAuth?.id!,
      offset: statePaginate.offset,
    },
    SetNumPages
  );
  const { mutate: userDeleteMutation, isLoading: userIsLoading } =
    useDeleteUserQuery();

  const leadingActions = (user: UserI): ReactNode => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setUserDataToEdit(user);
          navigate(routes.usersCreateScreen);
        }}
      >
        <div></div>
        <div className='flex justify-start items-center'>
          <FaEdit />
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: number): ReactNode => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          userDeleteMutation(id, {
            onSuccess: (successData) => {
              toast.success(successData.message);
            },
            onError: (error) => {
              toast.error('Ocurrio un error al tratar de eliminar el usuario.');
            },
          });
        }}
      >
        <div className='flex justify-start items-center'>
          <FaTrashAlt />
        </div>
        <div></div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className='container-page space-y-10'>
      <h1>Usuarios</h1>

      {<Loader isOpen={usersIsLoading || userIsLoading} />}

      {usersList?.rows?.length! > 0 && (
        <div className='w-full max-w-2xl'>
          <section className='w-full min-h-[50vh] max-h-[70vh] md:max-h-[70vh] lg:max-h-[60vh] overflow-y-auto'>
            <SwipeableList threshold={0.3} fullSwipe={true}>
              {usersList?.rows?.map((user) => (
                <SwipeableListItem
                  key={user.id}
                  leadingActions={leadingActions(user)}
                  trailingActions={trailingActions(Number(user.id))}
                  className='space-y-3'
                  // blockSwipe={isAuth?.role === usersRoles.CASHIER}
                  // onClick={() => {}}
                >
                  <ItemListUsers user={user} />
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </section>
          <PaginateComponent
            pageCount={statePaginate.pageCount}
            actualPage={statePaginate.actualPage}
            handleChangePage={handleNextAndPreviewsPage}
          />
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
