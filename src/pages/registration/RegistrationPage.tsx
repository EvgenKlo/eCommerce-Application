import { useAppDispatch } from '@/hooks/reduxHooks';
import { useState } from 'react';
import { createNewCustomer } from '@/store/slices/customerSlice';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
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
import { Customer } from '@commercetools/platform-sdk';

import { AddressForm } from '@/components/UI/AddressForm';
import { FormValidator } from '@/helpers/formValidator';

const mediaStyleInput = {
  '@media (max-width: 400px)': {
    width: '90%',
  },
};

export function RegistrationPage() {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [data, setData] = useState({
    id: '1',
    version: 1,
    createdAt: new Date().toUTCString(),
    lastModifiedAt: new Date().toUTCString(),
    isEmailVerified: false,
    authenticationMode: 'Password',

    /* firstName: '',
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
    defaultShippingAddress: '', */
  } as Customer);

  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);

  const [lastNameError, setLastNameError] = useState(false);

  const [emailError, setEmailError] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const [dateError, setDateError] = useState(false);

  const register = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setData({
      ...data,
    });
    console.log(data);
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
          onSubmit={register}
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
                //value={data.firstName}
                onChange={(e) => {
                  if (FormValidator.nameValodator(e.target.value)) {
                    setData({ ...data, firstName: '' });
                    setFirstNameError(true);
                  } else {
                    setData({ ...data, firstName: e.target.value });
                    setFirstNameError(false);
                  }
                }}
                error={firstNameError}
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
                //value={data.lastName}
                onChange={(e) => {
                  if (FormValidator.nameValodator(e.target.value)) {
                    setData({ ...data, lastName: '' });
                    setLastNameError(true);
                  } else {
                    setData({ ...data, lastName: e.target.value });
                    setLastNameError(false);
                  }
                }}
                error={lastNameError}
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
                //value={data.email}
                onChange={(e) => {
                  if (!FormValidator.emailValidator(e.target.value) && e.target.value.length > 0) {
                    setData({ ...data, email: '' });
                    setEmailError(true);
                  } else {
                    setData({ ...data, email: e.target.value });
                    setEmailError(false);
                  }
                }}
                error={emailError}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControl
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  error={passwordError}
                  label={'Password'}
                  onChange={(e) => {
                    if (
                      !FormValidator.passwordValodator(e.target.value) &&
                      e.target.value.length > 0
                    ) {
                      setData({ ...data, password: '' });
                      setPasswordError(true);
                    } else {
                      setData({ ...data, password: e.target.value });
                      setPasswordError(false);
                    }
                  }}
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
                //value={data.birthDate}
                format="yyyy/MM/dd"
                onChange={(newDate) => {
                  if (FormValidator.ageValodator(newDate as Date)) {
                    setDateError(false);
                    setData({ ...data, dateOfBirth: JSON.stringify(newDate) });
                  } else {
                    setDateError(true);
                    setData({ ...data, dateOfBirth: '' });
                  }
                }}
                className="date-picker"
                disableFuture
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: dateError,
                    //helperText: 'Errorrrr',
                  },
                }}
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            color={'#660066'}
            sx={{
              marginTop: { xs: '2rem', sm: '1.5rem' },
              marginBottom: { xs: '1rem', sm: '1rem' },
            }}
          >
            Shipping Address
          </Typography>
          <AddressForm
            address={'shipping'}
            data={data}
            setData={setData}
          ></AddressForm>
          {!showBillingAddress ? (
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: { xs: '220px' },
              }}
              onClick={() => setShowBillingAddress(true)}
            >
              Указать адрес для выставления счетов
            </Button>
          ) : (
            <>
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
              <AddressForm
                address={'billing'}
                data={data}
                setData={setData}
              ></AddressForm>
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              width: { xs: '220px' },
            }}
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
