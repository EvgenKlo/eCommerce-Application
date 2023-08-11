import { useAppDispatch } from '@/hooks/reduxHooks';
import { useState } from 'react';
import { createNewCustomer } from '@/store/slices/customerSlice';
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
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const mediaStyleInput = {
  '@media (max-width: 400px)': {
    width: '90%',
  },
};

export function RegistrationPage() {
  // const customer = useAppSelector((state) => state.customers.customer);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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

  const register = (): void => {
    // dispatch(createCustomer(data));
    void dispatch(createNewCustomer(data));
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
              marginTop: '0',
              fontSize: '10px',
              height: '40px',
            },
          },
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', display: { xs: 'none', md: 'flex' } }}>
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
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
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
              {/* <TextField
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
              /> */}
              <FormControl
                sx={{ m: 1, width: '34ch' }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <DatePicker
                label="birth date"
                value={data.birthDate}
                format="yyyy/MM/dd"
                onChange={(newDate) => setData({ ...data, birthDate: newDate ?? '' })}
                className="date-picker"
                disableFuture
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
                <Typography
                  variant="subtitle1"
                  color={'#660066'}
                  sx={{
                    marginTop: { xs: '2rem', sm: '1.5rem' },
                    marginBottom: { xs: '1rem', sm: '1rem' },
                  }}
                >
                  Billing Address
                </Typography>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="billingStreet"
                  label="Billing Street"
                  id="billingStreet"
                  sx={mediaStyleInput}
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
                  sx={mediaStyleInput}
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
                  sx={mediaStyleInput}
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
                  sx={mediaStyleInput}
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
                <Typography
                  variant="subtitle1"
                  color={'#660066'}
                  sx={{
                    marginTop: { xs: '1rem', sm: '1.5rem' },
                    marginBottom: { xs: '1rem', sm: '1rem' },
                  }}
                >
                  Shipping Address
                </Typography>

                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="shippingStreet"
                  label="Shipping Street"
                  id="shippingStreet"
                  sx={mediaStyleInput}
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
                  sx={mediaStyleInput}
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
                  sx={mediaStyleInput}
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
                  sx={mediaStyleInput}
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
            sx={{
              mt: 3,
              mb: 2,
              width: { xs: '220px' },
            }}
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
