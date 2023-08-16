import { Outlet } from 'react-router-dom';
import { Header } from './UI/Header';
import { Footer } from './UI/Footer';
import { logoutProps } from '@/types/components';

const Layout: React.FC<logoutProps> = (props) => {
  const { logout } = props;
  return (
    <>
      <Header logout={logout} />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
