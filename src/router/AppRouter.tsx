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

export const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
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
          path="about"
          element={<AboutPage />}
        />
        <Route
          path="profile"
          element={<UserPage />}
        />
        <Route
          path="login"
          element={<LoginPage />}
        />
        <Route
          path="registration"
          element={<RegistrationPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Route>
    </Routes>
  );
};
