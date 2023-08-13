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
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { type BaseAddress, type CustomerDraft } from '@commercetools/platform-sdk';

import { AddressForm } from '@/components/UI/AddressForm';
import { FormValidator } from '@/helpers/formValidator';

export function RegistrationPage() {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [data, setData] = useState({} as CustomerDraft);

  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);

  const [lastNameError, setLastNameError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordText, setPasswordText] = useState('');

  const [dateError, setDateError] = useState(false);

  const register = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(data);
    if (!firstNameError && !lastNameError && !emailError && !passwordError && !dateError) {
      void dispatch(createNewCustomer(data));
    }
  };

  const getAddress = (address: BaseAddress) => {
    addAddressToCustomer(address);
  };

  const addAddressToCustomer = (address: BaseAddress) => {
    if (data.addresses) {
      const id = address.id;
      if (data.addresses.find((item) => item.id === id)) {
        setData({
          ...data,
          addresses: [...data.addresses.map((item) => (item.id === id ? { ...address } : item))],
        });
      } else {
        setData({
          ...data,
          addresses: [...data.addresses, address],
        });
      }
    } else {
      setData({
        ...data,
        addresses: [{ ...address }],
      });
    }
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
          noValidate={false}
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
                label={'first name'}
                sx={{ marginBottom: 0.3 }}
                size="small"
                autoFocus
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
                helperText={
                  firstNameError
                    ? 'this field must not contain special characters or numbers'
                    : null
                }
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
                helperText={
                  lastNameError ? 'this field must not contain special characters or numbers' : null
                }
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
                onChange={(e) => {
                  if (!FormValidator.emailValidator(e.target.value) && e.target.value.length > 0) {
                    setData({ ...data, email: '' });
                    setEmailError(true);
                    if (e.target.value[0] === ' ' || e.target.value.slice(-1) === ' ') {
                      setEmailErrorText('e-mail must not start or end with a space');
                    } else {
                      setEmailErrorText('Invalid e-mail');
                    }
                  } else {
                    if (e.target.value.slice(-1) === ' ') {
                      setData({ ...data, email: '' });
                      setEmailError(true);
                      setEmailErrorText('e-mail must not start or end with a space');
                    } else {
                      setData({ ...data, email: e.target.value });
                      setEmailError(false);
                    }
                  }
                }}
                error={emailError}
                helperText={emailError ? emailErrorText : null}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControl
                variant="outlined"
                fullWidth
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  error={passwordError}
                  label={'Password'}
                  onChange={(e) => {
                    setPasswordText(e.target.value);
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
                {passwordError && (
                  <FormHelperText
                    error
                    id="outlined-adornment-password"
                  >
                    {passwordText[0] === ' ' || passwordText.slice(-1) === ' '
                      ? 'password must not start or end with a space'
                      : 'the password must be at least 8 characters long and contain: A-Z, a-z, 0-9 and at least one special character (e.g., !@#$%^&*)'}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <DatePicker
                label="birth date"
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
                    required: true,

                    helperText: dateError ? 'you must be over 14 years old' : null,
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
            id={data.addresses ? data.addresses.length + 1 : 1}
            address={'shipping'}
            getAddress={getAddress}
          ></AddressForm>
          {!showBillingAddress ? (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    value="useBillingAsShipping"
                    color="primary"
                    name="useBillingAsShipping"
                    required
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setData({ ...data, defaultShippingAddress: 0, defaultBillingAddress: 0 });
                      } else {
                        setData({
                          ...data,
                          defaultShippingAddress: undefined,
                          defaultBillingAddress: undefined,
                        });
                      }
                    }}
                  />
                }
                label="Use as default shipping and billing address"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: { xs: '220px' },
                }}
                onClick={() => {
                  setShowBillingAddress(true);
                  setData({
                    ...data,
                    defaultBillingAddress: undefined,
                  });
                }}
              >
                Use a different billing address
              </Button>
            </>
          ) : (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    value="useShipping"
                    color="primary"
                    name="useShipping"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setData({ ...data, defaultShippingAddress: 0 });
                      } else {
                        setData({
                          ...data,
                          defaultShippingAddress: undefined,
                        });
                      }
                    }}
                  />
                }
                label="Use by default"
              />
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
                id={data.addresses ? data.addresses.length + 1 : 1}
                address={'billing'}
                getAddress={getAddress}
              ></AddressForm>
              <FormControlLabel
                control={
                  <Checkbox
                    value="useBilling"
                    color="primary"
                    name="useBilling"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setData({ ...data, defaultBillingAddress: 1 });
                      } else {
                        setData({
                          ...data,
                          defaultBillingAddress: undefined,
                        });
                      }
                    }}
                  />
                }
                label="Use by default"
              />
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
