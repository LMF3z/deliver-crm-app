import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetailsQuery } from '../../shared/hooks/products/useproductsQuery';
import Loader from '../../shared/components/loader/Loader';

const ProductViewScreen = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = getProductDetailsQuery(Number(id));

  const [images, setImages] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState<string>('');

  useEffect(() => {
    if (productData) {
      const resImg = JSON.parse(productData?.images!).files;
      setImages(resImg);
      setImageSelected(resImg[0]);
    }
  }, [productData]);

  const changeImage = (image: string) => setImageSelected(image);

  console.log('productData --------->', productData);

  return (
    <div className='container-page space-y-12'>
      <h1 className='capitalize md:text-5xl'>{productData?.name}</h1>

      {<Loader isOpen={isLoading} />}

      <div className='w-full flex flex-col gap-2'>
        <figure className='w-full h-[35vh] rounded-lg border border-indigo-600'>
          <img
            src={imageSelected}
            alt='product'
            className='w-full h-full object-cover md:object-contain rounded-lg'
          />
        </figure>

        <div className='w-full flex justify-evenly h-20 md:h-28'>
          {images.map((img, i) => (
            <figure
              key={i}
              onClick={() => changeImage(img)}
              className={`w-20 md:w-28 h-20 md:h-28 ${
                imageSelected === img && 'border border-indigo-500 rounded-lg'
              }`}
            >
              <img
                src={img}
                alt='product'
                className='w-full h-full object-cover cursor-pointer rounded-lg'
              />
            </figure>
          ))}
        </div>
      </div>

      <section className='w-full p-5 grid grid-cols-2 gap-3 text-lg capitalize rounded-lg bg-bgHighlight'>
        <label>
          <span className='font-bold'>{productData?.name}</span>
        </label>
        {/* <label>
          <span className='font-bold'>{productData?.description}</span>
        </label> */}
        <label>
          Modelo: <span className='font-bold'>{productData?.model}</span>
        </label>
        <label>
          Talla: <span className='font-bold'>{productData?.size}</span>
        </label>
        <label>
          <span className='font-bold'>{productData?.color}</span>
        </label>
        <label>
          Marca: <span className='font-bold'>{productData?.brand}</span>
        </label>
        <label>
          Stock: <span className='font-bold'>{productData?.stock}</span>
        </label>
        <label>
          Precio:{' '}
          <span className='font-bold'>${productData?.price?.toFixed(2)}</span>
        </label>
      </section>
    </div>
  );
};

export default ProductViewScreen;
