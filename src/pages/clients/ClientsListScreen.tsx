import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ImUserPlus } from 'react-icons/im';
import { routes } from '../../constants/routes';
import { ClientI } from '../../entitites/clients/clients.entity';
import { UsersRolesE } from '../../entitites/users/userRoles.entity';
import useAuthStore from '../../store/auth.store';
import { useClientsStore } from '../../store/clients/clients.store';
import {
  deleteClientQuery,
  searchClientsByQuery,
} from '../../shared/hooks/clients/useClientsQuery';
import Loader from '../../shared/components/loader/Loader';
import PaginateComponent from '../../shared/components/usePaginateComponent';
import usePaginate from '../../shared/hooks/usePaginate';
import ButtonFloating from '../../shared/components/ButtonFloating';
import ContainerModal from '../../shared/components/Modals/ContainerModal';
import AlertModal from '../../shared/components/Modals/AlertModal';
import ItemClientList from './components/ItemClientList';

const ClientsListScreen = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();
  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null);

  const {
    data: clientsList,
    isLoading: clientsListIsLoading,
    isFetching: clientsListIsFetching,
  } = searchClientsByQuery(
    {
      id_company: isAuth?.id_company!,
      offset: statePaginate.offset,
      query: searchQuery,
    },
    SetNumPages
  );
  const { mutate: deleteClientMutate, isLoading: deleteClientIsLoading } =
    deleteClientQuery();

  const { setClientSelectToEdit } = useClientsStore();

  const toggleAlertModal = () => setIsOpenAlertModal(!isOpenAlertModal);

  const leadingActions = (client: ClientI): ReactNode => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setClientSelectToEdit(client);
          navigate(routes.clientsCreateScreen);
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
          setClientIdToDelete(id);
          toggleAlertModal();
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
    <>
      <ContainerModal isOpen={isOpenAlertModal} closeModal={toggleAlertModal}>
        <AlertModal
          handleAccept={() => {
            deleteClientMutate(clientIdToDelete!, {
              onSuccess: (clientsData) => {
                setClientIdToDelete(null);
                toast.success(clientsData.message);
                toggleAlertModal();
              },
              onError: () => {
                setClientIdToDelete(null);
                toggleAlertModal();
                toast.error('Error al intentar eliminar cliente');
              },
            });
          }}
          handleClose={toggleAlertModal}
          isLoading={deleteClientIsLoading}
        />
      </ContainerModal>
      <div className='container-page space-y-5'>
        <h1>Clientes</h1>

        <div className='w-full max-w-2xl h-10 bg-bgHighlight rounded-lg'>
          <input
            type='text'
            placeholder='Buscar clientes'
            onChange={({ target: { value } }) => setSearchQuery(value)}
            className='h-full border border-indigo-600 '
          />
        </div>

        {
          <Loader
            isOpen={
              clientsListIsLoading ||
              clientsListIsFetching ||
              deleteClientIsLoading
            }
          />
        }

        {clientsList?.rows.length! > 0 && (
          <>
            <section className='w-full max-w-2xl overflow-y-hidden'>
              <SwipeableList threshold={0.3} fullSwipe={true} className='z-0'>
                {clientsList?.rows?.map((client) => (
                  <SwipeableListItem
                    key={client.id}
                    leadingActions={leadingActions(client)}
                    trailingActions={trailingActions(Number(client.id))}
                    className='space-y-4 z-0'
                    blockSwipe={isAuth?.roles !== UsersRolesE.SUPER_ADMIN}
                  >
                    <ItemClientList client={client} />
                  </SwipeableListItem>
                ))}
              </SwipeableList>
            </section>
            <PaginateComponent
              pageCount={statePaginate.pageCount}
              actualPage={statePaginate.actualPage}
              handleChangePage={handleNextAndPreviewsPage}
            />
          </>
        )}
      </div>
      <ButtonFloating
        icon={<ImUserPlus className='w-6 h-6' color='#fff' />}
        handleClick={() => navigate(routes.clientsCreateScreen)}
        classes='z-0'
      />
    </>
  );
};

export default ClientsListScreen;
