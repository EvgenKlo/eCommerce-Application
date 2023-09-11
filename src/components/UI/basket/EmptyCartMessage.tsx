import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const EmptyCartMessage = () => {
  return (
    <Typography variant="h5">
      Cart is empty. To add products, go to the{' '}
      <span>
        <Link to={'/catalog'}>catalog page</Link>
      </span>
    </Typography>
  );
};

export default EmptyCartMessage;
