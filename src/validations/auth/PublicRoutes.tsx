import { Outlet, Navigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import useAuthStore from '../../store/auth.store';

const PublicRoutes = () => {
  const { isAuth } = useAuthStore();

  if (isAuth) {
    return <Navigate to={routes.mainApp} replace={true} />;
  }

  return <Outlet />;
};

export default PublicRoutes;
