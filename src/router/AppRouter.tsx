import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/main/MainPage';
import { AboutPage } from '@/pages/about/AboutPage';
import LoginPage from '@/pages/login/LoginPage';
import RegistrationPage from '@/pages/registration/RegistrationPage';
import Layout from '@/components/Layout';

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
          path="about"
          element={<AboutPage />}
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
          element={<MainPage />}
        />
      </Route>
    </Routes>
  );
};
