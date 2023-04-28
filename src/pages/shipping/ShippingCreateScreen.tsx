import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiCloseCircleFill } from 'react-icons/ri';
import { requestErrorI } from '../../vite-env';
import useAuthStore from '../../store/auth.store';
import { useShippingStore } from '../../store/shipping/shipping.store';
import { CreateShippingDtoI } from '../../entitites/shipping/shipping.entity';
import { getImageFromArrayString } from '../../helpers/commonFunctions.helpers';
import ContainerModal from '../../shared/components/Modals/ContainerModal';
import SelectBranchModal from '../../shared/components/Modals/shipping/SelectBranchModal';
import Button from '../../shared/components/ContainerButton';
import { createNewShippingQuery } from '../../shared/hooks/shipping/useShippingQuery';
import Loader from '../../shared/components/loader/Loader';
import { COLORS } from '../../constants/colors';

const ShippingCreateScreen = () => {
  const { isAuth } = useAuthStore();

  const {
    id_subsidiary,
    products,
    deleteProductShipping,
    editPriceProductShipping,
    editStockProductShipping,
    resetNewShippingState,
  } = useShippingStore();

  const { mutate: registerShipping, isLoading: registerShippingIsLoading } =
    createNewShippingQuery();

  const [isOpenModalSelectBranch, setIsOpenModalSelectBranch] =
    useState<boolean>(false);

  const toggleModalSelectBranch = () =>
    setIsOpenModalSelectBranch(!isOpenModalSelectBranch);

  const sendShipping = () => {
    if (!id_subsidiary) {
      toast.error('Debe seleccionar una sucursal.');
      return;
    }

    if (products.length <= 0) {
      toast.error('Debe seleccionar, al menos, un producto.');
      return;
    }

    if (
      products.some((prod) => prod.price > prod.product?.price!) ||
      products.some((prod) => prod.stock > prod.product?.stock!)
    ) {
      toast.error(
        'Precio y stock no puede ser mayor al del producto seleccionado.'
      );
      return;
    }

    const data: CreateShippingDtoI = {
      id_company: isAuth?.id_company!,
      id_subsidiary,
      products_shipping: products,
    };

    registerShipping(data, {
      onSuccess: (success) => {
        toast.success(success.message);
        resetNewShippingState();
      },
      onError: (error: unknown) => {
        const {
          response: {
            data: { message },
          },
        } = error as requestErrorI;
        toast.error(message);
      },
    });
  };

  return (
    <>
      <ContainerModal
        isOpen={isOpenModalSelectBranch}
        closeModal={toggleModalSelectBranch}
      >
        <SelectBranchModal handleAccept={toggleModalSelectBranch} />
      </ContainerModal>
      <div className='container-page space-y-10'>
        <h1>Crear Envío</h1>

        {<Loader isOpen={registerShippingIsLoading} />}

        <Button
          positionContentContainer='w-full flex justify-end'
          handleClick={toggleModalSelectBranch}
          classes='w-36'
        >
          Seleccionar Sucursal
        </Button>

        <article className='w-full space-y-5'>
          {products.length > 0 &&
            products.map((product) => (
              <div
                key={product.id_product}
                className='p-3 bg-bgHighlight rounded-lg relative'
              >
                <RiCloseCircleFill
                  className='w-5 h-5 absolute top-4 right-4 cursor-pointer'
                  color={COLORS.iconsHightWhite}
                  onClick={() => deleteProductShipping(product.id_product)}
                />
                <img
                  src={getImageFromArrayString(product.product?.images!)}
                  alt=''
                  className='w-full object-cover rounded-md'
                />
                <div className='text-lg text-gray-500 font-bold p-3 flex-1 flex flex-col justify-center items-start'>
                  <label className='capitalize'>{product.product?.name}</label>
                  <label>Modelo: {product.product?.model}</label>
                  <label>Talla: {product.product?.size}</label>
                  <label
                    className={`${
                      product.price > product.product?.price! && 'text-red-600'
                    }`}
                  >
                    Precio: (max: ${product.product?.price})
                  </label>
                  <input
                    type='number'
                    step={0.01}
                    min={1}
                    max={product.product?.price}
                    className={`w-[60%] h-7 rounded-md ${
                      product.price > product.product?.price! && 'text-red-600'
                    }`}
                    value={product.price}
                    onChange={({ target: { value } }) => {
                      if (Number(value) > product.product?.price!) {
                        toast.error(
                          `El precio no puede ser mayor al precio del producto: ${product.product?.price}`
                        );
                      }

                      editPriceProductShipping(
                        product.id_product,
                        Number(value)
                      );
                    }}
                  />
                  <label
                    className={`${
                      product.stock > product.product?.stock! && 'text-red-600'
                    }`}
                  >
                    Stock: (max: {product.product?.stock})
                  </label>
                  <input
                    type='number'
                    step={1}
                    min={1}
                    max={product.product?.stock}
                    className={`w-[60%] h-7 rounded-md ${
                      product.stock > product.product?.stock! && 'text-red-600'
                    }`}
                    value={product.stock}
                    onChange={({ target: { value } }) => {
                      if (Number(value) > product.product?.stock!) {
                        toast.error(
                          `El stock no puede ser mayor al precio del producto: ${product.product?.stock}`
                        );
                      }

                      editStockProductShipping(
                        product.id_product,
                        Number(value)
                      );
                    }}
                  />
                </div>
              </div>
            ))}
        </article>

        {<Loader isOpen={registerShippingIsLoading} />}

        <Button
          handleClick={sendShipping}
          isDisable={registerShippingIsLoading}
        >
          Envíar
        </Button>
      </div>
    </>
  );
};

export default ShippingCreateScreen;
