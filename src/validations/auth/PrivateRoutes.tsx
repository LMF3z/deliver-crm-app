import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../constants/routes';
import useAuthStore from '../../store/auth.store';

const PrivateRoutes = () => {
  const { isAuth } = useAuthStore();

  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate(routesPaths.loginScreen, { replace: true });
  //     return;
  //   }

  //   if (isAuth && !checkPermissions(location.pathname, isAuth?.role!)) {
  //     navigate(routesPaths.homeAppScreen, { replace: true });
  //     return;
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuth]);

  if (!isAuth) {
    return <Navigate to={routes.loginScreen} replace={true} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
