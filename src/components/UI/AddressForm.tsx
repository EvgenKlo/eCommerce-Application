import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { useAppSelector } from '@/hooks/reduxHooks';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';

const mediaStyleInput = {
  '@media (max-width: 400px)': {
    width: '90%',
  },
};

type Props = {
  address: string;
  data: Customer;
  setData: (data: Customer) => void;
};

export const AddressForm: React.FC<Props> = (props) => {
  const { address, data, setData } = props;

  const [addressData, setAddressData] = useState({} as BaseAddress);

  //const state = useAppSelector((state) => state.customers);

  return (
    <Grid
      item
      xs={12}
      sm={6}
    >
      <TextField
        variant="filled"
        required
        fullWidth
        name="shippingStreet"
        label="Shipping Street"
        id="shippingStreet"
        sx={mediaStyleInput}
        size="small"
        /* value={data.shippingStreet}
                  onChange={(e) => setData({ ...data, shippingStreet: e.target.value })} */
      />
      <TextField
        variant="filled"
        required
        fullWidth
        name="shippingCity"
        label="Shipping City"
        id="shippingCity"
        sx={mediaStyleInput}
        size="small"
        /* value={data.shippingCity}
                  onChange={(e) => setData({ ...data, shippingCity: e.target.value })} */
      />
      <TextField
        variant="filled"
        required
        fullWidth
        name="shippingPostalCode"
        label="Shipping Postal Code"
        id="shippingPostalCode"
        sx={mediaStyleInput}
        size="small"
        /* value={data.shippingPostalCode}
                  onChange={(e) => setData({ ...data, shippingPostalCode: e.target.value })} */
      />
      <TextField
        variant="filled"
        required
        fullWidth
        name="shippingCountry"
        label="Shipping Country"
        id="shippingCountry"
        sx={mediaStyleInput}
        size="small"
        /* value={data.shippingCountry}
                  onChange={(e) => setData({ ...data, shippingCountry: e.target.value })} */
      />
      <FormControlLabel
        control={
          <Checkbox
            value="useBillingAsShipping"
            color="primary"
            name="useBillingAsShipping"
          />
        }
        label="Use by default"
      />
    </Grid>
  );
};
