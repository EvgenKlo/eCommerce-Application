import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { postalCodeRegexMap } from '@/helpers/postalCode';
import { type BaseAddress } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { FormValidator } from '@/helpers/formValidator';

const countryList = Object.keys(postalCodeRegexMap);

type Props = {
  address: string;
  getAddress: (address: BaseAddress) => void;
  id: number | undefined;
  addressValue: { street: string; city: string; country: string; postalCode: string };
};

export const AddressForm: React.FC<Props> = (props) => {
  const { address, getAddress, id, addressValue } = props;

  const [addressData, setAddressData] = useState({
    id: id ? id + '' : undefined,
    streetName: addressValue.street,
    city: addressValue.city,
    postalCode: addressValue.postalCode,
    country: addressValue.country,
  } as BaseAddress);

  const [cityError, setCityError] = useState(false);

  const [postalCodeError, setPostalCodeError] = useState(false);

  const [streetValue, setStreetValue] = useState(addressValue.street);
  const [cityValue, setCityValue] = useState(addressValue.city);
  const [countryValue, setCountryValue] = useState(addressValue.country);
  const [postalCodeValue, setPostalCodeValue] = useState(addressValue.postalCode);

  useEffect(() => {
    getAddress(addressData);
  }, [addressData]);

  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

  return (
    <Grid item>
      <TextField
        variant="filled"
        required
        fullWidth
        data-testid={`${address}Street`}
        name={`${address}Street`}
        label={`${address} Street`}
        id={`${address}Street`}
        size="small"
        value={streetValue}
        onChange={(e) => {
          setStreetValue(e.target.value);
          setAddressData({ ...addressData, streetName: e.target.value });
        }}
      />
      <TextField
        variant="filled"
        required
        fullWidth
        data-testid={`${address}City`}
        name={`${address}City`}
        label={`${address} City`}
        id={`${address}City`}
        size="small"
        value={cityValue}
        onChange={(e) => {
          setCityValue(e.target.value);
          if (FormValidator.cityValidator(e.target.value)) {
            setAddressData({ ...addressData, city: e.target.value });
            setCityError(false);
          } else {
            setAddressData({ ...addressData, city: '' });
            setCityError(true);
          }
        }}
        error={cityError}
        helperText={
          cityError
            ? 'this field must not contain special characters or numbers and must not begin or end with a space'
            : null
        }
      />

      <FormControl
        variant="filled"
        fullWidth
        required
      >
        <InputLabel
          data-testid={`${address}Country`}
          id={`${address}Country`}
        >
          {`${address} Country`}
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={countryValue}
          onChange={(e) => {
            setCountryValue(e.target.value);
            setAddressData({ ...addressData, country: e.target.value });
          }}
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
                {regionNamesInEnglish.of(country)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        variant="filled"
        required
        fullWidth
        data-testid={`${address}PostalCode`}
        name={`${address}PostalCode`}
        label={addressData.country ? `${address} Postal Code` : 'choose a country'}
        id={`${address}PostalCode`}
        size="small"
        value={postalCodeValue}
        onChange={(e) => {
          setPostalCodeValue(e.target.value);
          if (e.target.value) {
            if (FormValidator.postalCodeValidator(e.target.value, addressData.country)) {
              setAddressData({ ...addressData, postalCode: e.target.value });
              setPostalCodeError(false);
            } else {
              setAddressData({ ...addressData, postalCode: '' });
              setPostalCodeError(true);
            }
          } else {
            setPostalCodeError(false);
          }
        }}
        error={postalCodeError}
        helperText={postalCodeError ? 'invalid postal code for this country' : null}
        disabled={addressData.country ? false : true}
      />
    </Grid>
  );
};
