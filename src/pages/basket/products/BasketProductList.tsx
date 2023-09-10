import { useAppSelector } from '@/hooks/reduxHooks';
import { Button, Grid, Typography } from '@mui/material';
import BasketProductItem from './BasketProductItem';
import { useState } from 'react';

import ClearModal from '@/components/UI/basket/ClearModal';
import { handleMouseDown } from '@/helpers/handleMouseDown';

const BasketProductList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const cart = useAppSelector((state) => state.carts.cart);

  return (
    <Grid
      container
      spacing={2}
    >
      {cart.lineItems.map((product) => (
        <BasketProductItem
          key={product.id}
          product={product}
        />
      ))}
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ margin: 'auto', paddingTop: '20px' }}
      >
        Total cost:{' '}
        <span>
          {new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: cart.totalPrice.currencyCode,
          }).format(cart.totalPrice.centAmount)}
        </span>
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={{ margin: 1 }}
        onMouseDown={handleMouseDown}
      >
        Clear cart
      </Button>
      <ClearModal
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  );
};

export default BasketProductList;
