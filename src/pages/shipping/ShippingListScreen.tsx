import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { FaTrashAlt } from 'react-icons/fa';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import {
  ShippingI,
  ShippingStatusE,
  ShippingStatusT,
} from '../../entitites/shipping/shipping.entity';
import Loader from '../../shared/components/loader/Loader';
import {
  getShippingListQuery,
  updateShippingStatusQuery,
} from '../../shared/hooks/shipping/useShippingQuery';
import useAuthStore from '../../store/auth.store';
import ItemShippingList from './components/ItemShippingList';
import usePaginate from '../../shared/hooks/usePaginate';
import PaginateComponent from '../../shared/components/usePaginateComponent';
import { routes } from '../../constants/routes';
import { toast } from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';
import { UsersRolesE } from '../../entitites/users/userRoles.entity';

const ShippingListScreen = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();

  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const {
    data: shippingList,
    isLoading: shippingListIsLoading,
    refetch: shippingListRefetch,
  } = getShippingListQuery(
    {
      id_company: isAuth?.id_company!,
      offset: statePaginate.offset,
    },
    SetNumPages
  );
  const {
    mutate: updateShippingStatusMutate,
    isLoading: updateShippingStatusIsLoading,
  } = updateShippingStatusQuery();

  const handleUpdateShippingStatus = (
    id_shipping: number,
    status: ShippingStatusT
  ) => {
    updateShippingStatusMutate(
      {
        id: id_shipping,
        status,
      },
      {
        onSuccess: (success) => {
          toast.success(success.message);
          shippingListRefetch();
        },
        onError: (error: unknown) => {
          const {
            response: {
              data: { message },
            },
          } = error as requestErrorI;
          toast.error(message);
        },
      }
    );
  };

  const leadingActions = (
    shipping: ShippingI,
    status: ShippingStatusT
  ): ReactNode => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          handleUpdateShippingStatus(shipping.id!, status);
        }}
      >
        <div></div>
        <div className='flex justify-start items-center'>
          <BsBookmarkCheckFill />
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: number, status: ShippingStatusT): ReactNode => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          handleUpdateShippingStatus(id, status);
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
      <h1>Envíos</h1>

      {
        <Loader
          isOpen={shippingListIsLoading || updateShippingStatusIsLoading}
        />
      }

      {shippingList?.rows?.length! > 0 && (
        <>
          <section className='w-full max-w-2xl overflow-y-hidden'>
            <SwipeableList threshold={0.3} fullSwipe={true} className='z-0'>
              {shippingList?.rows.map((shiping) => (
                <SwipeableListItem
                  key={shiping.id}
                  leadingActions={leadingActions(
                    shiping,
                    ShippingStatusE.accepted
                  )}
                  trailingActions={trailingActions(
                    Number(shiping.id),
                    ShippingStatusE.rejected
                  )}
                  className='space-y-4 z-0'
                  blockSwipe={
                    isAuth?.roles !== UsersRolesE.SUPER_ADMIN ||
                    shiping.status === ShippingStatusE.accepted ||
                    shiping.status === ShippingStatusE.rejected
                  }
                  onClick={() =>
                    navigate(`${routes.shippingViewScreen}/${shiping.id}`)
                  }
                >
                  <ItemShippingList key={shiping.id} shiping={shiping} />
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
  );
};

export default ShippingListScreen;
