import { useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdNotificationsOutline } from 'react-icons/io';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { routes } from '../../../constants/routes';
import sidebarMenuStorage from '../../../store/sidebar.store';
import useAuthStore from '../../../store/auth.store';
import { useShippingStore } from '../../../store/shipping/shipping.store';

const Header = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();
  const { toggleSidebar } = sidebarMenuStorage();
  const { products } = useShippingStore();

  return (
    <header className='w-full h-12 px-5 bg-bgHighlight sticky top-0 flex justify-between items-center z-10'>
      {isAuth && (
        <IoMdMenu className='w-8 h-8 cursor-pointer' onClick={toggleSidebar} />
      )}

      <div className='pl-3 flex-1' onClick={() => navigate(routes.mainApp)}>
        <label onClick={() => navigate(routes.mainApp)}>Deliver Crm</label>
      </div>

      <div className='flex space-x-2'>
        {isAuth && (
          <>
            <div className='relative'>
              {products.length > 0 && (
                <span className='w-2 h-2 rounded-full bg-green-700 absolute top-0 right-0'></span>
              )}
              <BsCart3
                onClick={() => navigate(routes.shippingCreateScreen)}
                className='w-6 h-6 cursor-pointer'
              />{' '}
            </div>
            <IoMdNotificationsOutline className='w-6 h-6 cursor-pointer' />
            <FaRegCalendarAlt className='w-6 h-6 cursor-pointer' />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
