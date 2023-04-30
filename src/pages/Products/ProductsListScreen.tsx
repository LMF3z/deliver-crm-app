import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import useAuthStore from '../../store/auth.store';
import { ProductI } from '../../entitites/products/products.entity';
import { routes } from '../../constants/routes';
import {
  deleteProductQuery,
  getProductsListQuery,
} from '../../shared/hooks/products/useproductsQuery';
import Loader from '../../shared/components/loader/Loader';
import ButtonFloating from '../../shared/components/ButtonFloating';
import usePaginate from '../../shared/hooks/usePaginate';
import PaginateComponent from '../../shared/components/usePaginateComponent';
import ItemProductsList from './components/ItemProductsList';
import { toast } from 'react-hot-toast';
import { UsersRolesE } from '../../entitites/users/userRoles.entity';
import ContainerModal from '../../shared/components/Modals/ContainerModal';
import AlertModal from '../../shared/components/Modals/AlertModal';
import { useProductsStore } from '../../store/products/products.store';

const ProductsListScreen = () => {
  const navigate = useNavigate();

  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const { isAuth } = useAuthStore();
  const { setProductSelectToEdit } = useProductsStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );

  const { data: productsListResponseData, isLoading: productsListIsLoading } =
    getProductsListQuery(
      {
        id_company: isAuth?.id_company ?? isAuth?.id!,
        offset: statePaginate.offset,
        query: searchQuery,
      },
      SetNumPages
    );
  const { mutate: deleteProductMutate, isLoading: deleteProductIsLoading } =
    deleteProductQuery();

  const leadingActions = (product: ProductI): ReactNode => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setProductSelectToEdit(product);
          navigate(routes.productsCreateScreen);
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
          setProductIdToDelete(id);
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

  const toggleAlertModal = () => setIsOpenAlertModal(!isOpenAlertModal);

  return (
    <>
      <ContainerModal isOpen={isOpenAlertModal} closeModal={toggleAlertModal}>
        <AlertModal
          handleAccept={() => {
            deleteProductMutate(productIdToDelete!, {
              onSuccess: (productsData) => {
                setProductIdToDelete(null);
                toast.success(productsData.message);
                toggleAlertModal();
              },
              onError: () => {
                setProductIdToDelete(null);
                toggleAlertModal();
                toast.error('Error al intentar eliminar producto');
              },
            });
          }}
          handleClose={toggleAlertModal}
          isLoading={deleteProductIsLoading}
        />
      </ContainerModal>

      <div className='container-page space-y-5'>
        <h1>Productos</h1>

        <div className='w-full max-w-2xl h-10 bg-bgHighlight rounded-lg'>
          <input
            type='text'
            placeholder='Buscar productos'
            onChange={({ target: { value } }) => setSearchQuery(value)}
            className='h-full border border-indigo-600 '
          />
        </div>

        {<Loader isOpen={productsListIsLoading} />}

        {productsListResponseData?.rows.length! > 0 && (
          <>
            <article className='w-full max-w-2xl'>
              <section className='w-full overflow-y-hidden'>
                <SwipeableList threshold={0.3} fullSwipe={true} className='z-0'>
                  {productsListResponseData?.rows?.map((product) => (
                    <SwipeableListItem
                      key={product.id}
                      leadingActions={leadingActions(product)}
                      trailingActions={trailingActions(Number(product.id))}
                      className='space-y-4 z-0'
                      blockSwipe={isAuth?.roles !== UsersRolesE.SUPER_ADMIN}
                    >
                      <ItemProductsList product={product} />
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
        handleClick={() => navigate(routes.productsCreateScreen)}
        classes='z-0'
      />
    </>
  );
};

export default ProductsListScreen;
