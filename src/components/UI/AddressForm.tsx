import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { type BaseAddress } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { FormValidator } from '@/helpers/formValidator';

const mediaStyleInput = {
  '@media (max-width: 400px)': {
    width: '90%',
  },
};

const countryList = ['Great Britain', 'USA', 'Canada', 'Brazil'];

type Props = {
  address: string;
  getAddress: (address: BaseAddress) => void;
  id: number;
};

export const AddressForm: React.FC<Props> = (props) => {
  const { address, getAddress, id } = props;

  const [addressData, setAddressData] = useState({
    id: id + '',
  } as BaseAddress);

  const [cityError, setCityError] = useState(false);

  const [postalCodeError, setPostalCodeError] = useState(false);

  useEffect(() => {
    getAddress(addressData);
  }, [addressData]);

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
        name={`${address}Street`}
        label={`${address} Street`}
        id={`${address}Street`}
        sx={mediaStyleInput}
        size="small"
        onChange={(e) => {
          setAddressData({ ...addressData, streetName: e.target.value });
        }}
      />
      <TextField
        variant="filled"
        required
        fullWidth
        name={`${address}City`}
        label={`${address} City`}
        id={`${address}City`}
        sx={mediaStyleInput}
        size="small"
        onChange={(e) => {
          if (FormValidator.nameValodator(e.target.value)) {
            setAddressData({ ...addressData, city: '' });
            setCityError(true);
          } else {
            setAddressData({ ...addressData, city: e.target.value });
            setCityError(false);
          }
        }}
        error={cityError}
        helperText={cityError ? 'this field must not contain special characters or numbers' : null}
      />

      <FormControl
        variant="filled"
        fullWidth
        required
        sx={mediaStyleInput}
      >
        <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={addressData.country || ''}
          onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countryList.map((country) => {
            return (
              <MenuItem
                key={country}
                value={country}
              >
                {country}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        variant="filled"
        required
        fullWidth
        name={`${address}PostalCode`}
        label={`${address} Postal Code`}
        id={`${address}PostalCode`}
        sx={mediaStyleInput}
        size="small"
        onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
        error={postalCodeError}
      />
    </Grid>
  );
};
