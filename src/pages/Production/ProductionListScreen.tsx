import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { toast } from 'react-hot-toast';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { routes } from '../../constants/routes';
import { ProductionI } from '../../entitites/production/production.entity';
import { UsersRolesE } from '../../entitites/users/userRoles.entity';
import useAuthStore from '../../store/auth.store';
import {
  deleteProductionQuery,
  getProductionListQuery,
} from '../../shared/hooks/production/useProductionsQuery';
import Loader from '../../shared/components/loader/Loader';
import ButtonFloating from '../../shared/components/ButtonFloating';
import PaginateComponent from '../../shared/components/usePaginateComponent';
import usePaginate from '../../shared/hooks/usePaginate';
import ContainerModal from '../../shared/components/Modals/ContainerModal';
import AlertModal from '../../shared/components/Modals/AlertModal';
import ItemProductionList from './components/ItemProductionList';

const ProductionListScreen = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();

  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const { data: productionData, isLoading: productionsListIsLoading } =
    getProductionListQuery(
      {
        id_company: isAuth?.id_company!,
        offset: statePaginate.offset,
      },
      SetNumPages
    );

  const {
    mutate: mutateDeleteProduction,
    isLoading: deleteProductionIsLoading,
  } = deleteProductionQuery();

  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const [productionIdToDelete, setProductionIdToDelete] = useState<
    number | null
  >(null);

  const toggleAlertModal = () => setIsOpenAlertModal(!isOpenAlertModal);

  const leadingActions = (production: ProductionI): ReactNode => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          //   setProductSelectToEdit(production);
          // navigate(routes.productionCreateScreen);
        }}
      >
        <div className='flex justify-start items-center'>
          {/* <FaEdit /> */}
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: number): ReactNode => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          setProductionIdToDelete(id);
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
            mutateDeleteProduction(productionIdToDelete!, {
              onSuccess: (productionData) => {
                setProductionIdToDelete(null);
                toast.success(productionData.message);
                toggleAlertModal();
              },
              onError: () => {
                setProductionIdToDelete(null);
                toggleAlertModal();
                toast.error('Error al intentar eliminar producto');
              },
            });
          }}
          handleClose={toggleAlertModal}
          isLoading={deleteProductionIsLoading}
        />
      </ContainerModal>
      <div className='container-page space-y-5'>
        <h1>Producción</h1>

        {<Loader isOpen={productionsListIsLoading} />}

        {productionData?.rows?.length! > 0 && (
          <>
            <article className='w-full max-w-2xl'>
              <section className='w-full overflow-y-hidden'>
                <SwipeableList threshold={0.3} fullSwipe={true} className='z-0'>
                  {productionData?.rows?.map((production) => (
                    <SwipeableListItem
                      key={production.id}
                      leadingActions={leadingActions(production)}
                      trailingActions={trailingActions(Number(production.id))}
                      className='space-y-4 z-0'
                      blockSwipe={isAuth?.roles !== UsersRolesE.SUPER_ADMIN}
                      onClick={() =>
                        navigate(
                          `${routes.productionViewScreen}/${production.id}`
                        )
                      }
                    >
                      <ItemProductionList production={production} />
                    </SwipeableListItem>
                  ))}
                </SwipeableList>
              </section>
            </article>
            <PaginateComponent
              pageCount={statePaginate.pageCount}
              actualPage={statePaginate.actualPage}
              handleChangePage={handleNextAndPreviewsPage}
            />
          </>
        )}
      </div>

      <ButtonFloating
        handleClick={() => navigate(routes.productionCreateScreen)}
        classes='z-0'
      />
    </>
  );
};

export default ProductionListScreen;
