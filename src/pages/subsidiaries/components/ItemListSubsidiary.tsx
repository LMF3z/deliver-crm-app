import React from 'react';
import { BsBank2 } from 'react-icons/bs';
import { SubsidiaryI } from '../../../entitites/subsidiaries/subsidiaries.entity';

interface Props {
  subsidiary: SubsidiaryI;
  handleClick?: () => void;
}

const ItemListSubsidiary = ({ subsidiary, handleClick }: Props) => {
  return (
    <article
      className='w-full max-h-[12vh] py-3 pl-5 flex justify-start gap-5 items-center rounded-lg text-md bg-bgHighlight'
      onClick={handleClick}
    >
      <BsBank2 className='w-8 h-8' />

      <section className='flex flex-col'>
        <label className='text-textBoldColor'>
          Nombre: <span>{subsidiary.name}</span>
        </label>
        <label>
          Dirección: <span>{subsidiary.subsidiary_address}</span>
        </label>
      </section>
    </article>
  );
};

export default ItemListSubsidiary;
