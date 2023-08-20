import { useAppSelector } from '@/hooks/reduxHooks';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const MainPage: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);

  const pages = ['catalog', 'about', 'login', 'registration', 'basket'];

  return (
    <>
      <h3>Hello {customer.firstName} !</h3>
      {pages.map((page) => (
        <Button
          key={page}
          variant="contained"
          sx={{ margin: '2rem', '&:hover': { color: 'secondary.main' } }}
          component={Link}
          to={`/${page}`}
        >
          {`Go to ${page} Page`}
        </Button>
      ))}
    </>
  );
};
