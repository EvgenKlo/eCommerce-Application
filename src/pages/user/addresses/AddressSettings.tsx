import { IOSSwitch } from '@/components/IOSSwitch';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  AddBillingAddressId,
  AddShippingAddressId,
  RemoveBillingAddressId,
  RemoveShippingAddressId,
  SetDefaultBillingAddress,
  SetDefaultShippingAddress,
  isLoading,
} from '@/store/slices/customerSlice';
import { type BaseAddress } from '@commercetools/platform-sdk';
import { FormControlLabel, Grid } from '@mui/material';

export const AddressSettings: React.FC<{
  address: BaseAddress;
}> = ({ address }) => {
  const customer = useAppSelector((state) => state.customers.customer);

  const dispatch = useAppDispatch();

  const defaultBillingAddress = customer.defaultBillingAddressId === address.id;

  const defaultShippingAddress = customer.defaultShippingAddressId === address.id;

  const billingAddress = customer.billingAddressIds?.find((item) => item === address.id)
    ? true
    : false;

  const shippingAddress = customer.shippingAddressIds?.find((item) => item === address.id)
    ? true
    : false;

  return (
    <Grid
      item
      maxWidth={250}
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 1 }}
    >
      <FormControlLabel
        control={
          <IOSSwitch
            onChange={() => {
              dispatch(isLoading(true));
              void dispatch(SetDefaultBillingAddress(address.id as string));
            }}
            sx={{ m: 1 }}
            checked={defaultBillingAddress}
            disabled={defaultBillingAddress}
          />
        }
        label="default billing address"
      />
      <FormControlLabel
        control={
          <IOSSwitch
            onChange={() => {
              dispatch(isLoading(true));
              void dispatch(SetDefaultShippingAddress(address.id as string));
            }}
            sx={{ m: 1 }}
            checked={defaultShippingAddress}
            disabled={defaultShippingAddress}
          />
        }
        label="default shipping address"
      />
      <FormControlLabel
        control={
          <IOSSwitch
            onChange={() => {
              dispatch(isLoading(true));
              if (billingAddress) {
                void dispatch(RemoveBillingAddressId(address.id as string));
              } else {
                void dispatch(AddBillingAddressId(address.id as string));
              }
            }}
            sx={{ m: 1 }}
            checked={billingAddress}
          />
        }
        label="billing address"
      />
      <FormControlLabel
        control={
          <IOSSwitch
            onChange={() => {
              dispatch(isLoading(true));
              if (shippingAddress) {
                void dispatch(RemoveShippingAddressId(address.id as string));
              } else {
                void dispatch(AddShippingAddressId(address.id as string));
              }
            }}
            sx={{ m: 1 }}
            checked={shippingAddress}
          />
        }
        label="shipping address"
      />
    </Grid>
  );
};
