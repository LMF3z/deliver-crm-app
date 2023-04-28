import { useEffect, MouseEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUsers, HiOfficeBuilding } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa';
import {
  MdLogout,
  MdProductionQuantityLimits,
  MdLocalShipping,
} from 'react-icons/md';
import { routes } from '../../../constants/routes';
import sidebarMenuStorage from '../../../store/sidebar.store';
import ItemSideBar from './components/ItemSidebar';
import useAuthStore from '../../../store/auth.store';

const SideBarMenu = () => {
  const navigate = useNavigate();

  const { isOpen, toggleSidebar } = sidebarMenuStorage();
  const { setLogout } = useAuthStore();

  const containerSideRef = useRef<HTMLDivElement | null>(null);
  const navSideRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen === true) {
      handleToggleSideBar();
    }
  }, [isOpen]);

  const handleToggleSideBar = () => {
    toggleSidebar();
    containerSideRef!.current!.classList!.toggle(
      'container_menu_sidebar_mobile_active'
    );
    navSideRef!.current!.classList.toggle('nav_sidebar_active');
  };

  const handleCloseNav = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerSideRef.current) {
      handleToggleSideBar();
      toggleSidebar();
    }
  };

  return (
    <div
      ref={containerSideRef}
      className={`container_menu_sidebar_mobile_inactive z-30`}
      onClick={(e) => handleCloseNav(e)}
    >
      <nav ref={navSideRef} className={`nav_sidebar_inactive z-40`}>
        <ItemSideBar
          icon={<HiOfficeBuilding />}
          label={'sucursales'}
          collapse={true}
          views={[
            {
              label: 'registrar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.subsidiariesCreateScreen);
              },
            },
            {
              label: 'listar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.subsidiariesScreen);
              },
            },
          ]}
        />

        <ItemSideBar
          icon={<HiUsers />}
          label={'usuarios'}
          collapse={true}
          views={[
            {
              label: 'registrar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.usersCreateScreen);
              },
            },
            {
              label: 'listar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.usersScreen);
              },
            },
          ]}
        />

        <ItemSideBar
          icon={<MdProductionQuantityLimits />}
          label={'Productos'}
          collapse={true}
          views={[
            {
              label: 'registrar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.productsCreateScreen);
              },
            },
            {
              label: 'listar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.productsListScreen);
              },
            },
          ]}
        />

        <ItemSideBar
          icon={<MdProductionQuantityLimits />}
          label={'Producción'}
          collapse={false}
          views={
            [
              // {
              //   label: 'registrar',
              //   icon: <FaUsers />,
              //   handleClick: () => {
              //     handleToggleSideBar();
              //     toggleSidebar();
              //     navigate(routes.productionCreateScreen);
              //   },
              // },
              // {
              //   label: 'listar',
              //   icon: <FaUsers />,
              //   handleClick: () => {
              //     handleToggleSideBar();
              //     toggleSidebar();
              //     navigate(routes.productionListScreen);
              //   },
              // },
            ]
          }
          handleClick={() => {
            handleToggleSideBar();
            toggleSidebar();
            navigate(routes.productionListScreen);
          }}
        />

        <ItemSideBar
          icon={<MdLocalShipping />}
          label={'Envios'}
          collapse={true}
          views={[
            {
              label: 'registrar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.shippingCreateScreen);
              },
            },
            {
              label: 'listar',
              icon: <FaUsers />,
              handleClick: () => {
                handleToggleSideBar();
                toggleSidebar();
                navigate(routes.shippingListScreen);
              },
            },
          ]}
        />

        <div className='flex-1' />

        <ItemSideBar
          icon={<MdLogout />}
          label={'Cerrar Sesión'}
          collapse={false}
          handleClick={() => {
            setLogout();
            navigate(routes.loginScreen);
            handleToggleSideBar();
            toggleSidebar();
          }}
        />
      </nav>
    </div>
  );
};

export default SideBarMenu;
