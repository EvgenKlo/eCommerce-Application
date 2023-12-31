import { useAppSelector } from '@/hooks/reduxHooks';
import { Typography } from '@mui/material';

const styleTitle = {
  fontSize: '25px',
  fontWeight: 'bold',
  mt: 2,
  '@media (max-width: 900px)': { fontSize: '23px' },
  '@media (max-width: 600px)': { fontSize: '19px' },
};
export const Greeting: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);
  return (
    <>
      <Typography sx={styleTitle}>
        Welcome {customer ? customer.firstName : ''} to PetJoy store!
      </Typography>
    </>
  );
};
