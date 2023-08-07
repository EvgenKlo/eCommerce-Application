import { Outlet } from 'react-router-dom';
import Header from './UI/Header';
import { ReactElement } from 'react';
import React from 'react';

function Layout(): ReactElement {
  return (
    <>
      <Header />
      <Outlet />
      <footer>2023 RS team task</footer>
    </>
  );
}

export default Layout;
