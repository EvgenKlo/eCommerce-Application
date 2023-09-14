import { useAppSelector } from '@/hooks/reduxHooks';
import { Button, Grid, Stack, Typography } from '@mui/material';
import BasketProductItem from './BasketProductItem';
import BasketPromocodes from './BasketPromocodes';
import { useState } from 'react';
import ClearModal from '@/components/UI/basket/ClearModal';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { type Cart } from '@commercetools/platform-sdk';

const calcTotalPrice = (cart: Cart): number => {
  return cart.lineItems.reduce((accumulator: number, item): number => {
    const price = !!item.price.discounted
      ? item.price.discounted.value.centAmount
      : item.price.value.centAmount;
    return (accumulator += (price / 10 ** cart.totalPrice.fractionDigits) * item.quantity);
  }, 0);
};
const isDiscounted = (cart: Cart): boolean => {
  if (!!cart.discountCodes.length) return true;
  // return cart.lineItems.some((item): boolean => !!item.price.discounted == true);
  return false;
};

const BasketProductList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const cart = useAppSelector((state) => state.carts.cart);

  return (
    <Grid
      container
      spacing={2}
      columns={1}
    >
      {cart.lineItems.map((product) => (
        <BasketProductItem
          key={product.id}
          product={product}
        />
      ))}
      <Stack sx={{ alignItems: 'center', width: 1 }}>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ margin: 'auto', paddingTop: '20px' }}
          >
            Total cost:{' '}
            <span style={{ paddingRight: '15px' }}>
              {new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: cart.totalPrice.currencyCode,
              }).format(cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits)}
            </span>
            {isDiscounted(cart) && (
              <span
                style={{
                  color: '#c3c3c1',
                  textDecoration: 'line-through',
                }}
              >
                (
                {new Intl.NumberFormat('en-EN', {
                  style: 'currency',
                  currency: cart.totalPrice.currencyCode,
                }).format(calcTotalPrice(cart))}
                )
              </span>
            )}
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
        </Stack>
        <BasketPromocodes />
      </Stack>
    </Grid>
  );
};

export default BasketProductList;
