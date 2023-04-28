import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { UserI } from '../../../entitites/users/users.entity';

interface Props {
  user: UserI;
}

const ItemListUsers = ({ user }: Props) => {
  return (
    <article className='w-full max-h-[12vh] py-3 pl-5 flex justify-start gap-5 items-center rounded-lg text-md bg-bgHighlight'>
      <FaUserAlt />
      <section className='w-full break-all flex flex-col'>
        <label className='text-textBoldColor'>
          Nombre:{' '}
          <span>
            {user.name} {user.last_name}
          </span>
        </label>
        <label>
          Correo: <span>{user.email}</span>
        </label>
      </section>
    </article>
  );
};

export default ItemListUsers;
