import { useAppSelector } from '@/hooks/reduxHooks';
import { Grid } from '@mui/material';
import BasketProductItem from './BasketProductItem';

const BasketProductList = () => {
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
    </Grid>
  );
};

export default BasketProductList;
