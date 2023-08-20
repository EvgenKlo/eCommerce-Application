import { useAppSelector } from '@/hooks/reduxHooks';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const MainPage: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);

  return (
    <>
      {customer ? <h3>Hello {customer.firstName} !</h3> : <h3>Hello !</h3>}
      <Button
        variant="contained"
        sx={{ margin: '2rem', '&:hover': { color: 'secondary.main' } }}
        component={Link}
        to={'/login'}
      >
        Go to Login Page
      </Button>
    </>
  );
};
