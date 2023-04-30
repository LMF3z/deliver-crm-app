import { ImUser } from 'react-icons/im';
import { ClientI } from '../../../entitites/clients/clients.entity';

interface Props {
  client: ClientI;
}

const ItemClientList = ({ client }: Props) => {
  return (
    <div className='w-full p-5 flex items-center gap-10 bg-bgHighlight rounded-lg'>
      <ImUser className='w-10 h-10' />
      <div className='flex-1 grid text-lg font-bold text-gray-500'>
        <label>Nombre: {client.name}</label>
        <label>Apellido: {client.last_name}</label>
        <label>
          Documento: {client.type_identification}-{client.document}
        </label>
        <label>Teléfono{client.phone}</label>
      </div>
    </div>
  );
};

export default ItemClientList;
