import { MdLocalShipping } from 'react-icons/md';
import { ShippingI } from '../../../entitites/shipping/shipping.entity';
import { showDateWithTimezone } from '../../../helpers/handleTime.helpers';
import { COLORS } from '../../../constants/colors';

interface Props {
  shiping: ShippingI;
}

const ItemShippingList = ({ shiping }: Props) => {
  return (
    <li className='w-full p-5 flex items-center gap-5 bg-bgHighlight rounded-lg'>
      <MdLocalShipping className='w-10 h-10' color={COLORS[shiping.status]} />
      <div className='w-full grid grid-cols-2 md:place-items-center gap-2 text-sm font-bold text-gray-500'>
        <label>
          N° envío: <span>{shiping.id}</span>
        </label>
        <label>
          Enviado a: <span>{shiping.subsidiary?.name}</span>
        </label>
        <label>
          Fecha: <span>{showDateWithTimezone(shiping.createdAt!)}</span>
        </label>
        <label>
          N° productos: <span>{shiping.products_shipping?.length}</span>
        </label>
      </div>
    </li>
  );
};

export default ItemShippingList;
