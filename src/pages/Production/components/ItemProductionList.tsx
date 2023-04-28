import { useEffect, useState } from 'react';
import { ProductionI } from '../../../entitites/production/production.entity';
import { showDateWithTimezone } from '../../../helpers/handleTime.helpers';

interface Props {
  production: ProductionI;
}

const ItemProductionList = ({ production }: Props) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (production.product.images) {
      const files = JSON.parse(production.product.images).files;
      setImages(files);
    }
  }, []);

  return (
    <section className='w-full grid grid-cols-1 gap-3 md:grid-cols-4 bg-bgHighlight rounded-lg'>
      <img
        src={images[0]}
        className='object-cover w-full h-40 md:h-full col-span-1 bg-center rounded-lg'
        alt='product'
        loading='lazy'
      />
      <div className='col-span-1 md:col-span-3 space-y-2 py-3 pl-5 md:grid md:grid-cols-2'>
        <h2 className='text-2xl font-extrabold leading-snug text-gray-800 capitalize'>
          {production?.product.name}
        </h2>
        <p className='mb-3 text-lg font-normal text-gray-500'>
          {production?.description}
        </p>
        <p className='mb-3 text-lg font-normal text-gray-500'>
          Cantidad: {production?.amount}
        </p>
        <p className='mb-3 text-lg font-normal text-gray-500'>
          Fecha:{' '}
          {production?.createdAt && showDateWithTimezone(production?.createdAt)}
        </p>
      </div>
    </section>
  );
};

export default ItemProductionList;
