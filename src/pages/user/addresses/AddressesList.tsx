import { type BaseAddress, type Customer } from '@commercetools/platform-sdk';
import { Box, Button, Typography } from '@mui/material';
import { styleTitle } from '../UserPage';
import { useState } from 'react';
import { AddressForm } from '@/components/UI/AddressForm';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { AddCustomerAddress } from '@/store/slices/customerSlice';
import AddressesItem from './AddressesItem';

const AddressesList: React.FC<{
  customer: Customer;
}> = ({ customer }) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState({} as BaseAddress);

  const [newAddress, setNewAddress] = useState(false);

  const getAddress = (address: BaseAddress) => {
    setData(address);
  };

  return (
    <Box>
      <Typography sx={{ ...styleTitle, textAlign: 'start', marginTop: '10px', fontSize: '20px' }}>
        Addresses List:
      </Typography>
      {customer.addresses.length ? (
        customer.addresses.map((address) => (
          <AddressesItem
            key={address.id}
            address={address}
          />
        ))
      ) : (
        <Typography margin={2}>No addresses</Typography>
      )}
      {newAddress ? (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (data.streetName && data.city && data.country && data.postalCode) {
              void dispatch(AddCustomerAddress(data));
              setNewAddress(false);
            }
          }}
          noValidate={false}
        >
          <AddressForm
            id={undefined}
            address={''}
            getAddress={getAddress}
            addressValue={{ street: '', city: '', country: '', postalCode: '' }}
          />
          <Button
            variant="contained"
            sx={{ margin: 2 }}
            onClick={() => setNewAddress(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 2 }}
            type="submit"
          >
            Add address
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={() => setNewAddress(true)}
        >
          Add new address
        </Button>
      )}
    </Box>
  );
};

export default AddressesList;
