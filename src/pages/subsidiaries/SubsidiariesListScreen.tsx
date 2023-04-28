import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSubsidiariesStorage } from '../../store/subsidiaries/subsidiaries.store';
import useAuthStore from '../../store/auth.store';
import { SubsidiaryI } from '../../entitites/subsidiaries/subsidiaries.entity';
import {
  useDeleteSubsidiaryQuery,
  useGetSubsidiariesQuery,
} from '../../shared/hooks/subsidiaries/useSubsidiariesQuery';
import PaginateComponent from '../../shared/components/usePaginateComponent';
import usePaginate from '../../shared/hooks/usePaginate';
import Loader from '../../shared/components/loader/Loader';
import ItemListSubsidiary from './components/ItemListSubsidiary';
import { routes } from '../../constants/routes';

const SubsidiariesListScreen = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();
  const { setSubsidiaryToEdit } = useSubsidiariesStorage();

  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const {
    data: subsidiariesList,
    isLoading: subsidiariesIsLoading,
    isFetching: subsidiariesIsFetching,
  } = useGetSubsidiariesQuery(
    {
      id_company: isAuth?.id_company!,
      offset: statePaginate.offset,
    },
    SetNumPages
  );

  const { mutate, isLoading: subsidiaryDeletedIsLoading } =
    useDeleteSubsidiaryQuery();

  const leadingActions = (subsidiary: SubsidiaryI): ReactNode => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setSubsidiaryToEdit(subsidiary);
          navigate(routes.subsidiariesCreateScreen);
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
          mutate(id, {
            onSuccess: (result) => {
              toast.success(result.message);
            },
            onError: (error) => {
              toast.error('Ocurrio un error al tratar de eliminar la sucursal');
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
    <div className='container-page space-y-20'>
      <h1>Sucursales</h1>

      {
        <Loader
          isOpen={
            subsidiariesIsLoading ||
            subsidiariesIsFetching ||
            subsidiaryDeletedIsLoading
          }
        />
      }

      {subsidiariesList?.rows?.length! > 0 && (
        <article className='w-full max-w-2xl'>
          <section className='w-full min-h-[50vh] max-h-[70vh] md:max-h-[70vh] lg:max-h-[60vh] overflow-y-auto'>
            <SwipeableList threshold={0.3} fullSwipe={true}>
              {subsidiariesList?.rows?.map((subsidiary) => (
                <SwipeableListItem
                  key={subsidiary.id}
                  leadingActions={leadingActions(subsidiary)}
                  trailingActions={trailingActions(Number(subsidiary.id))}
                  className='space-y-3'
                  // blockSwipe={isAuth?.role === usersRoles.CASHIER}
                  // onClick={() => {}}
                >
                  <ItemListSubsidiary subsidiary={subsidiary} />
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </section>
          <PaginateComponent
            pageCount={statePaginate.pageCount}
            actualPage={statePaginate.actualPage}
            handleChangePage={handleNextAndPreviewsPage}
          />
        </article>
      )}
    </div>
  );
};

export default SubsidiariesListScreen;
