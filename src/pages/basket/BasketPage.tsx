import { useAppSelector } from '@/hooks/reduxHooks';
import BasketProductList from './products/BasketProductList';
import { Container, Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EmptyCartMessage from '@/components/UI/basket/EmptyCartMessage';
import { Loader } from '@/components/UI/Loader';

export const BasketPage = () => {
  const cart = useAppSelector((state) => state.carts.cart);

  const isCartLoading = useAppSelector((state) => state.carts.isLoading);

  return (
    <Container>
      <Loader isLoading={isCartLoading} />
      <Typography fontSize={50}>
        <span>
          <ShoppingBasketIcon sx={{ fontSize: 40 }} />
        </span>
        <span> Cart</span>
      </Typography>
      {cart.lineItems ? (
        cart.lineItems.length ? (
          <BasketProductList />
        ) : (
          <EmptyCartMessage />
        )
      ) : (
        <EmptyCartMessage />
      )}
    </Container>
  );
};
