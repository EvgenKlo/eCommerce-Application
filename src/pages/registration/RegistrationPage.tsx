import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useState } from 'react';
import { createCustomer, createNewCustomer } from '@/store/slices/customerSlice';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function RegistrationPage() {
  const customer = useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',

    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',

    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',

    defaultBillingAddress: '',
    defaultShippingAddress: '',
  });

  const register = () => {
    dispatch(createCustomer(data));
    dispatch(createNewCustomer(data));
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="content"
    >
      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '@media (max-width: 600px)': {
            '& .MuiTextField-root': {
              marginBottom: '0.3rem',
              fontSize: '10px',
              height: '40px',
            },
          },
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', display: { xs: 'block', md: 'block' } }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="firstName"
                id="firstName"
                label="first name"
                sx={{ marginBottom: 0.3 }}
                size="small"
                autoFocus
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                id="lastName"
                label="last name"
                name="lastName"
                autoComplete="family-name"
                sx={{ marginBottom: 0.3 }}
                size="small"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                sx={{ marginBottom: 0.3 }}
                size="small"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="new-password"
                sx={{ marginBottom: 0.3 }}
                size="small"
                value={`Email: ${customer.email} and Pass: ${customer.password} id: ${
                  customer.id ? customer.id : ''
                } `}
                // onChange={(e) => setData({ ...data, password: e.target.value
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name="birthDate"
                type="date"
                id="birthDate"
                sx={{ marginBottom: 2 }}
                size="small"
                value={data.birthDate}
                onChange={(e) => setData({ ...data, birthDate: e.target.value })}
              />
            </Grid>

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <Typography variant="subtitle1">Billing Address</Typography>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="billingStreet"
                  label="Billing Street"
                  id="billingStreet"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.billingStreet}
                  onChange={(e) => setData({ ...data, billingStreet: e.target.value })}
                />
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="billingCity"
                  label="Billing City"
                  id="billingCity"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.billingCity}
                  onChange={(e) => setData({ ...data, billingCity: e.target.value })}
                />
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="billingPostalCode"
                  label="Billing Postal Code"
                  id="billingPostalCode"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.billingPostalCode}
                  onChange={(e) => setData({ ...data, billingPostalCode: e.target.value })}
                />
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="billingCountry"
                  label="Billing Country"
                  id="billingCountry"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.billingCountry}
                  onChange={(e) => setData({ ...data, billingCountry: e.target.value })}
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
              <Grid
                item
                xs={12}
                sm={6}
              >
                <Typography variant="subtitle1">Shipping Address</Typography>

                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="shippingStreet"
                  label="Shipping Street"
                  id="shippingStreet"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.shippingStreet}
                  onChange={(e) => setData({ ...data, shippingStreet: e.target.value })}
                />
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="shippingCity"
                  label="Shipping City"
                  id="shippingCity"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.shippingCity}
                  onChange={(e) => setData({ ...data, shippingCity: e.target.value })}
                />
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="shippingPostalCode"
                  label="Shipping Postal Code"
                  id="shippingPostalCode"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.shippingPostalCode}
                  onChange={(e) => setData({ ...data, shippingPostalCode: e.target.value })}
                />
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="shippingCountry"
                  label="Shipping Country"
                  id="shippingCountry"
                  sx={{ marginBottom: 0.5 }}
                  size="small"
                  value={data.shippingCountry}
                  onChange={(e) => setData({ ...data, shippingCountry: e.target.value })}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="useShippingAsBilling"
                      color="primary"
                      name="useShippingAsBilling"
                    />
                  }
                  label="Use by default"
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={register}
          >
            Sign Up
          </Button>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Link
                href="/login"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
