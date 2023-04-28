import React from 'react';
import { ProductI } from '../../../entitites/products/products.entity';

interface Props {
  handleOnChange: (value: string) => void;
  isLoading: boolean;
  data: { rows: ProductI[]; count: number };
}

const SearchProductsBox = ({ handleOnChange, isLoading, data }: Props) => {
  return (
    <div className='w-full h-14 bg-bgHighlight rounded-lg z-20'>
      <input
        type='text'
        onChange={({ target: { value } }) => handleOnChange(value)}
        className='h-full border border-indigo-600 '
      />
      <div className='w-full bg-bgHighlight'>
        {isLoading && <div className='p-5'>Cargando...</div>}
        {/* {data &&
          data.rows.map((product) => <div className='p-5'>{product.name}</div>)} */}
      </div>
    </div>
  );
};

export default SearchProductsBox;
