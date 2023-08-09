import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createCustomer, createNewCustomer } from '@/store/slices/customerSlice';

function RegistrationPage() {
  const customer = useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();

  const [data, setData] = useState({ email: '', password: '' });

  const register = () => {
    dispatch(createCustomer(data));
    dispatch(createNewCustomer(data));
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexGrow: 1,
        gap: 1,
        padding: 2,
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="Required"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <TextField
        id="outlined-password-input"
        required
        label="Password"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <TextField
        sx={{ flexGrow: 1 }}
        id="outlined-password-input"
        label="что в базе сейчас"
        value={`Email: ${customer.email} and Pass: ${customer.password} id: ${
          customer.id ? customer.id : ''
        }`}
      />
      <Button
        variant="outlined"
        onClick={register}
      >
        Register
      </Button>
    </Box>
  );
}

export default RegistrationPage;
