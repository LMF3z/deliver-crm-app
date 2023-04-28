import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { routes } from './constants/routes';

// components
import MainLayout from './shared/Layouts/MainLayout';
import PublicRoutes from './validations/auth/PublicRoutes';
import PrivateRoutes from './validations/auth/PrivateRoutes';

// pages

// auth
import LoginScreen from './pages/auth/LoginScreen';

// private
import MainApp from './pages/MainApp';

// users
import UsersScreen from './pages/users/UsersScreen';
import CreateUserScreen from './pages/users/CreateUserScreen';
import CreateSubsidiary from './pages/subsidiaries/CreateSubsidiary';
import SubsidiariesListScreen from './pages/subsidiaries/SubsidiariesListScreen';

// products
import CreateProductScreen from './pages/Products/CreateProductScreen';
import ProductsListScreen from './pages/Products/ProductsListScreen';
import ProductViewScreen from './pages/Products/ProductViewScreen';

// production
import ProductionListScreen from './pages/Production/ProductionListScreen';
import ProductionCreateScreen from './pages/Production/ProductionCreateScreen';
import ProductionDetailScreen from './pages/Production/ProductionDetailScreen';

// shipping
import ShippingListScreen from './pages/shipping/ShippingListScreen';
import ShippingCreateScreen from './pages/shipping/ShippingCreateScreen';
import ShippingDetailsScreen from './pages/shipping/ShippingDetailsScreen';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_ROUTE;

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route index path={routes.loginScreen} element={<LoginScreen />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path={routes.mainApp} element={<MainApp />} />

            {/* users */}
            <Route path={routes.usersScreen} element={<UsersScreen />} />
            <Route
              path={routes.usersCreateScreen}
              element={<CreateUserScreen />}
            />

            {/* subsidiaries */}
            <Route
              path={routes.subsidiariesCreateScreen}
              element={<CreateSubsidiary />}
            />
            <Route
              path={routes.subsidiariesScreen}
              element={<SubsidiariesListScreen />}
            />

            {/* Products */}
            <Route
              path={routes.productsCreateScreen}
              element={<CreateProductScreen />}
            />
            <Route
              path={routes.productsListScreen}
              element={<ProductsListScreen />}
            />
            <Route
              path={`${routes.productsViewScreen}/:id`}
              element={<ProductViewScreen />}
            />

            {/* production */}
            <Route
              path={`${routes.productionCreateScreen}/:id`}
              element={<ProductionCreateScreen />}
            />
            <Route
              path={routes.productionListScreen}
              element={<ProductionListScreen />}
            />
            <Route
              path={`${routes.productionViewScreen}/:id`}
              element={<ProductionDetailScreen />}
            />

            {/* Shiiping */}
            <Route
              path={routes.shippingListScreen}
              element={<ShippingListScreen />}
            />
            <Route
              path={routes.shippingCreateScreen}
              element={<ShippingCreateScreen />}
            />
            <Route
              path={`${routes.shippingViewScreen}/:id`}
              element={<ShippingDetailsScreen />}
            />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
