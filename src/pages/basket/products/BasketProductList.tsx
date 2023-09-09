import { useAppSelector } from '@/hooks/reduxHooks';
import { Button, Grid, Typography } from '@mui/material';
import BasketProductItem from './BasketProductItem';

const BasketProductList = () => {
  const cart = useAppSelector((state) => state.carts.cart);

  const clearCart = () => {
    console.log('Clear cart');
  };

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
        onClick={clearCart}
      >
        Clear cart
      </Button>
    </Grid>
  );
};

export default BasketProductList;
