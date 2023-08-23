import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import { MainPage } from '../pages/main/MainPage';
import { AboutPage } from '@/pages/about/AboutPage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegistrationPage } from '@/pages/registration/RegistrationPage';
import { ErrorPage } from '@/pages/error/ErrorPage';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { UserPage } from '@/pages/user/UserPage';
import { useAuth } from '@/hooks/AuthHooks';
import BasketPage from '@/pages/basket/BasketPage';
import Product from '@/pages/catalog/products/Product';

export const AppRouter = (): ReactElement => {
  const [changeAuth] = useAuth();

  const handleLogin = changeAuth as (val: boolean) => void;

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout logout={handleLogin} />}
      >
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path="catalog"
          element={<CatalogPage />}
        />
        <Route
          path="catalog/:id"
          element={<Product />}
        />
        <Route
          path="about"
          element={<AboutPage />}
        />
        <Route
          path="profile"
          element={<UserPage />}
        />
        <Route
          path="basket"
          element={<BasketPage />}
        />
        <Route
          path="login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="registration"
          element={<RegistrationPage handleLogin={handleLogin} />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Route>
    </Routes>
  );
};
