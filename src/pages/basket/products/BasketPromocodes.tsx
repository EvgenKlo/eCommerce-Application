import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { applyDiscount, setLoader } from '@/store/slices/cartSlice';
import { type CartDiscount } from '@commercetools/platform-sdk';
import { Button, Divider, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const getCodeId = (code: string, promos: CartDiscount[]): string | undefined => {
  const discountItem = promos.find(({ key }) => key == code);
  return discountItem!.id;
};
const BasketPromocodes: React.FC = () => {
  const discounts = useAppSelector((state) => state.carts.discounts);
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');

  const handleAddPromo = (): void => {
    dispatch(setLoader());
    const id = getCodeId(code, discounts);
    if (id) void dispatch(applyDiscount(id));
  };

  return (
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
        helperText="Please enter promocode"
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
  );
};

export default BasketPromocodes;
