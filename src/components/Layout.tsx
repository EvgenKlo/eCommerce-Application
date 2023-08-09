import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';
import { Header } from './UI/Header';
import { Footer } from './UI/Footer';

function Layout(): ReactElement {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
