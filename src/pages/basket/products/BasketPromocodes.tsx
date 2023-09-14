import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { applyDiscount, setLoader } from '@/store/slices/cartSlice';

import { Button, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { type Cart } from '@commercetools/platform-sdk';

const BasketPromocodes: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.carts.cart);
  const discounts = useAppSelector((state) => state.carts.discounts);
  const [code, setCode] = useState('');

  const handleAddPromo = (): void => {
    dispatch(setLoader());
    void dispatch(applyDiscount(code));
  };

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
          />
        }
        spacing={2}
        useFlexGap
        sx={{ justifyContent: 'center', maxHeight: '100px', mt: 2 }}
      >
        <TextField
          id="promocode"
          label="Promocode"
          value={code}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCode(event.target.value);
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleAddPromo()}
        >
          apply promocode
        </Button>
      </Stack>
      {!!cart.discountCodes && (
        <Stack
          sx={{ mt: 1, gap: 1, justifyContent: 'center' }}
          direction="row"
          useFlexGap
        >
          <Typography sx={{ pt: 0.5 }}>Applied: </Typography>
          {cart.discountCodes.map((code) => (
            <Chip
              label={discounts.find((discount) => discount.id == code.discountCode.id)?.code}
              key={code.discountCode.id}
              color="secondary"
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default BasketPromocodes;
