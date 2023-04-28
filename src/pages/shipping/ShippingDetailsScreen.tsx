import { BsFillEyeFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getShippingDetailsQuery,
  updateShippingStatusQuery,
} from '../../shared/hooks/shipping/useShippingQuery';
import Loader from '../../shared/components/loader/Loader';
import { showDateWithTimezone } from '../../helpers/handleTime.helpers';
import { getImageFromArrayString } from '../../helpers/commonFunctions.helpers';
import { COLORS } from '../../constants/colors';
import { statusToSpanish } from '../../constants/constantsToSpabish.constants';
import { routes } from '../../constants/routes';
import Button from '../../shared/components/ContainerButton';
import {
  ShippingStatusE,
  ShippingStatusT,
} from '../../entitites/shipping/shipping.entity';
import { toast } from 'react-hot-toast';
import { requestErrorI } from '../../vite-env';

const ShippingDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: shippingData,
    isLoading,
    refetch: getShippingRefetch,
  } = getShippingDetailsQuery(Number(id));
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
          getShippingRefetch();
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

  return (
    <div className='container-page space-y-5'>
      <h1>Envío N° {shippingData?.id}</h1>

      {<Loader isOpen={isLoading || updateShippingStatusIsLoading} />}

      {shippingData && (
        <>
          <article className='w-full flex flex-col gap-3 bg-bgHighlight p-5 rounded-lg'>
            <label>Enviado a: {shippingData?.subsidiary?.name}</label>
            <label>
              Estado:{' '}
              <span
                className={`px-2 py-1 capitalize rounded-lg`}
                style={{
                  backgroundColor: COLORS[shippingData?.status!],
                }}
              >
                {statusToSpanish[shippingData?.status]}
              </span>
            </label>
            <label>
              Fecha: {showDateWithTimezone(shippingData?.createdAt!)}
            </label>

            {shippingData.status === ShippingStatusE.pending && (
              <div className='w-full p-3 flex gap-5'>
                <Button
                  classes={`bg-[#82CD47] text-black`}
                  handleClick={() =>
                    handleUpdateShippingStatus(
                      shippingData.id!,
                      ShippingStatusE.accepted
                    )
                  }
                >
                  Acceptar
                </Button>
                <Button
                  classes={'bg-[#DC3535]'}
                  handleClick={() =>
                    handleUpdateShippingStatus(
                      shippingData.id!,
                      ShippingStatusE.rejected
                    )
                  }
                >
                  Cancelar
                </Button>
              </div>
            )}
          </article>
          <article className='w-full px-5 py-3 space-y-3 bg-bgHighlight'>
            <label>Productos: </label>
            {shippingData?.products_shipping?.map((prod) => (
              <div key={prod.id} className='flex items-center gap-10'>
                <img
                  src={getImageFromArrayString(prod.product?.images!)}
                  alt='product'
                  className='w-20 h-20 object-cover rounded-lg'
                />
                <div className='w-full flex flex-col relative'>
                  <BsFillEyeFill
                    className='cursor-pointer absolute top-1 right-0'
                    color={COLORS.iconsHightBlack}
                    onClick={() =>
                      navigate(
                        `${routes.productsViewScreen}/${prod?.product?.id}`
                      )
                    }
                  />
                  <label>{prod.product?.name}</label>
                  <label>Modelo: {prod.product?.model}</label>
                  <label>Precio: {prod.price}</label>
                  <label>Cantidad: {prod.stock}</label>
                </div>
              </div>
            ))}
          </article>
        </>
      )}
    </div>
  );
};

export default ShippingDetailsScreen;
