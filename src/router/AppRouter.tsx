import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from '@/pages';

export const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      >
        <Route
          path="main"
          element={<MainPage />}
        />
        <Route
          path="*"
          element={<MainPage />}
        />
      </Route>
    </Routes>
  );
};
