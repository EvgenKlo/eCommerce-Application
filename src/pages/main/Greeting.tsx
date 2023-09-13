import { useAppSelector } from '@/hooks/reduxHooks';
import { Typography } from '@mui/material';

const styleTitle = { fontSize: '25px', fontWeight: 'bold', mt: 2 };
export const Greeting: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);
  return (
    <>
      {customer ? (
        <Typography sx={styleTitle}>Welcome {customer.firstName} to our pet store!</Typography>
      ) : (
        <Typography sx={styleTitle}>Welcome to our pet store!</Typography>
      )}
    </>
  );
};
