import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { createNewCustomer } from '@/store/slices/customerSlice';
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { type BaseAddress, type CustomerDraft } from '@commercetools/platform-sdk';
import { Loader } from '@/components/UI/Loader';
import { useNavigate } from 'react-router-dom';
import { AddressForm } from '@/components/UI/AddressForm';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import EmailField from '@/components/UI/profileFields/EmailField';
import PasswordField from '@/components/UI/profileFields/PasswordField';
import FirstNameField from '@/components/UI/profileFields/FirstNameField';
import { LastNameField } from '@/components/UI/profileFields/LastNameField';
import { DateField } from '@/components/UI/profileFields/DateField';

interface loginProps {
  handleLogin: (val: boolean) => void;
}

export const RegistrationPage: React.FC<loginProps> = (props) => {
  const { handleLogin } = props;

  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state.customers.customer);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({ shippingAddresses: [0] } as CustomerDraft);

  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const register = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (data.firstName && data.lastName && data.email && data.email && data.dateOfBirth) {
      setLoading(true);
      void dispatch(createNewCustomer({ data, setLoading }));
    }
  };

  useEffect(() => {
    try {
      if ('id' in customer) {
        handleLogin(true);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }, [customer]);

  const getAddress = (address: BaseAddress) => {
    console.log(data);

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
              <FirstNameField
                data={data}
                setData={setData}
                initialValue={customer.firstName || ''}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <LastNameField
                data={data}
                setData={setData}
                initialValue={customer.lastName || ''}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <EmailField
                data={data}
                setData={setData}
                initialValue={customer.email || ''}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <PasswordField
                data={data}
                setData={setData}
                initialValue=""
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <DateField
                data={data}
                setData={setData}
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            color="primary.dark"
            sx={{
              marginTop: { xs: '2rem', sm: '1.5rem', xl: '1,5rem' },
              marginBottom: { xs: '1rem', sm: '1rem' },
            }}
          >
            Shipping Address
          </Typography>
          <AddressForm
            id={data.addresses ? data.addresses.length + 1 : 1}
            address={'shipping'}
            getAddress={getAddress}
            addressValue={{ street: '', city: '', country: '', postalCode: '' }}
          />
          {!showBillingAddress ? (
            <>
              <FormControlLabel
                sx={{
                  marginTop: { xs: '1rem', sm: '1.5rem', xl: '1,5rem' },
                }}
                control={
                  <Checkbox
                    value="useBillingAsShipping"
                    color="primary"
                    name="useBillingAsShipping"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setData({ ...data, defaultShippingAddress: 0, defaultBillingAddress: 0 });
                      } else {
                        setData({
                          ...data,
                          defaultShippingAddress: undefined,
                          defaultBillingAddress: undefined,
                          shippingAddresses: [0],
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
                onMouseDown={handleMouseDown}
                sx={{
                  mt: 3,
                  mb: 2,
                  width: { xs: '220px' },
                  fontSize: '12px',
                  bgcolor: 'primary.light',
                }}
                onClick={() => {
                  setShowBillingAddress(true);
                  setData({
                    ...data,
                    defaultBillingAddress: undefined,
                    billingAddresses: [1],
                  });
                }}
              >
                Add billing address
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
                          shippingAddresses: [0],
                        });
                      }
                    }}
                  />
                }
                label="Use by default"
              />
              <Typography
                variant="subtitle1"
                color="primary.dark"
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
                addressValue={{
                  street: '',
                  city: '',
                  country: '',
                  postalCode: '',
                }}
              />

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
                          billingAddresses: [1],
                        });
                      }
                    }}
                  />
                }
                label="Use by default"
              />
            </>
          )}
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onMouseDown={handleMouseDown}
              sx={{
                mt: 3,
                mb: 2,
                width: { xs: '220px' },
                bgcolor: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Link
                data-testid="sign-in-link"
                href="/login"
                variant="body2"
              >
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Loader isLoading={isLoading} />
    </Container>
  );
};
