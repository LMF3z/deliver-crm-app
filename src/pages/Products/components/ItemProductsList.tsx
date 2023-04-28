import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { AiFillFileAdd } from 'react-icons/ai';
import { ProductI } from '../../../entitites/products/products.entity';
import { useShippingStore } from '../../../store/shipping/shipping.store';
import Button from '../../../shared/components/ContainerButton';
import { routes } from '../../../constants/routes';

interface Props {
  product: ProductI;
}

const ItemProductsList = ({ product }: Props) => {
  const navigate = useNavigate();

  const { addProductToShipping, products } = useShippingStore();

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product.images) {
      const files = JSON.parse(product.images).files;
      setImages(files);
    }
  }, []);

  const isAdded = () => products.some((p) => p.id_product === product.id);

  return (
    <section className='w-full grid grid-cols-1 gap-1 md:grid-cols-4 bg-bgHighlight rounded-lg'>
      <img
        src={images[0]}
        className='object-cover w-full h-40 md:h-full col-span-1 bg-center rounded-lg'
        alt='Kutty'
        loading='lazy'
        onClick={() => navigate(`${routes.productsViewScreen}/${product.id}`)}
      />
      <div
        className='col-span-1 md:col-span-3 space-y-2 pl-5 grid grid-cols-2'
        onClick={() => navigate(`${routes.productsViewScreen}/${product.id}`)}
      >
        <h2 className='text-2xl font-extrabold leading-snug text-gray-800 capitalize'>
          {product.name}
        </h2>
        <label className='font-bold text-xl'>
          $ {product.price.toFixed(2)}
        </label>
        <p className='mb-3 text-lg font-normal text-gray-500'>
          {product.model}
        </p>
        <p className='mb-3 text-lg font-normal text-gray-500'>
          {product.brand}
        </p>
        <p className='mb-3 text-lg font-normal text-gray-500'>
          {product.description}
        </p>
      </div>
      <div className='px-4 flex gap-2'>
        <Button
          handleClick={() =>
            navigate(`${routes.productionCreateScreen}/${product.id}`)
          }
        >
          Agregar
          <AiFillFileAdd />
        </Button>
        <Button
          handleClick={() =>
            addProductToShipping({
              id_product: product.id!,
              price: product.price,
              stock: product.stock,
              product,
            })
          }
        >
          {isAdded() ? 'Quitar de envío' : 'Agregar a envío'}
          <FaCartPlus />
        </Button>
      </div>
    </section>
  );
};

export default ItemProductsList;
