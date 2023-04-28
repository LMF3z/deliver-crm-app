import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { getProductionDetailsQuery } from '../../shared/hooks/production/useProductionsQuery';
import { showDateWithTimezone } from '../../helpers/handleTime.helpers';
import Loader from '../../shared/components/loader/Loader';
import Button from '../../shared/components/ContainerButton';

const ProductionDetailScreen = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = getProductionDetailsQuery(Number(id));

  return (
    <div className='container-page space-y-10'>
      <h1 className='capitalize'>Detalles del registro {data?.id}</h1>

      {<Loader isOpen={isLoading} />}

      {data && (
        <section className='w-full grid gap-2 p-5 bg-bgHighlight rounded-lg text-lg text-gray-500 font-bold'>
          <label className='capitalize'>{data?.product.name}</label>
          <label className='font-bold text-xl'>
            Precio: ${data?.product.price.toFixed(2)}
          </label>
          <label className=''>Modelo: {data?.product.model}</label>
          <label className='mb-5'>Marca: {data?.product.brand}</label>

          <label>Cantidad: {data?.amount}</label>
          <label>Fecha: {showDateWithTimezone(data?.createdAt!)}</label>
          <label>{data?.description}</label>

          <Button
            positionContentContainer='col-span-1 p-2 flex justify-end'
            classes='w-[50%]'
            handleClick={() =>
              navigate(`${routes.productsViewScreen}/${data?.product.id}`)
            }
          >
            Ver producto
          </Button>
        </section>
      )}
    </div>
  );
};

export default ProductionDetailScreen;
