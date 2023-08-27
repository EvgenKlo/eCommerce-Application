import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useState } from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import { KittySvg } from '@/components/UI/KittySvg';
import FirstNameField from '../../components/UI/profileFields/FirstNameField';
import { LastNameField } from '@/components/UI/profileFields/LastNameField';
import EmailField from '../../components/UI/profileFields/EmailField';
import { DateField } from '@/components/UI/profileFields/DateField';
import { AddressForm } from '@/components/UI/AddressForm';
import { type BaseAddress } from '@commercetools/platform-sdk';

export const UserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  console.log(dispatch);
  const customer = useAppSelector((state) => state.customers.customer);
  console.log(customer);
  const [isEditing, setIsEditing] = useState(false);

  const getAddress = (address: BaseAddress) => {
    console.log(address);
  };

  const handleSave = () => {
    //отправка данных на сервер
    setIsEditing(false);
  };

  const staticField = {
    marginTop: '5px',
    fontSize: '22px',
  };

  const boxStyle = {
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          '@media (max-width: 400px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box>
          <KittySvg />
        </Box>
        <Box style={boxStyle}>
          <Typography
            variant="h3"
            sx={{
              marginLeft: '20px',
              '@media (max-width: 500px)': {
                fontSize: '30px',
                textAlign: 'center',
              },
            }}
          >
            User Dashboard
          </Typography>
        </Box>
      </Box>

      <Box style={{ ...boxStyle, padding: '60px' }}>
        <Paper
          elevation={6}
          style={{ padding: '20px', background: '#FFF0F5', width: '900px' }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: '20px',
            }}
          >
            Profile information
          </Typography>
          {isEditing ? (
            <>
              <FirstNameField
                data={customer}
                setData={handleSave}
              />
              <LastNameField
                data={customer}
                setData={handleSave}
              />
              <EmailField
                data={customer}
                setData={handleSave}
              />
              <DateField
                data={customer}
                setData={handleSave}
              />
              <Typography variant="subtitle1">Billing Addresses:</Typography>
              <AddressForm
                address="Billing"
                getAddress={getAddress}
                id={customer.addresses.length + 1}
              />
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                '@media (max-width: 400px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <Typography
                sx={staticField}
                variant="subtitle1"
              >
                <span style={{ fontWeight: 'bold' }}>First Name: </span> {customer.firstName}
              </Typography>
              <Typography
                sx={staticField}
                variant="subtitle1"
              >
                <span style={{ fontWeight: 'bold' }}>Last Name: </span>q{customer.lastName}
              </Typography>
              <Typography
                sx={staticField}
                variant="subtitle1"
              >
                <span style={{ fontWeight: 'bold' }}>Birth Date: </span>
                {customer.dateOfBirth}
              </Typography>
              <Typography
                sx={staticField}
                variant="subtitle1"
              >
                <span style={{ fontWeight: 'bold' }}>Email: </span> {customer.email}
              </Typography>

              {/* //billingadress */}
              {customer.billingAddressIds !== undefined && customer.billingAddressIds.length > 0 ? (
                <Box>
                  <Typography
                    sx={staticField}
                    variant="h5"
                  >
                    <span style={{ fontWeight: 'bold' }}>Billing addresses:</span>
                  </Typography>
                  {customer.billingAddressIds.map((billingAddressId) => {
                    const billingAddress = customer.addresses.find(
                      (address) => address.id === billingAddressId
                    );
                    if (billingAddress) {
                      return (
                        <Box
                          key={billingAddress.id}
                          mt={2}
                          sx={{
                            textAlign: 'left',
                          }}
                        >
                          {Object.entries(billingAddress)
                            .slice(1)
                            .map((row, index) => (
                              <Typography
                                key={index}
                                variant="subtitle1"
                              >
                                {row[0]}: {row[1]}
                              </Typography>
                            ))}
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              ) : null}

              {/* //shippingadress */}
              {customer.shippingAddressIds !== undefined &&
              customer.shippingAddressIds.length > 0 ? (
                <Box>
                  <Typography
                    sx={staticField}
                    variant="h5"
                  >
                    <span style={{ fontWeight: 'bold' }}>Shipping addresses:</span>
                  </Typography>
                  {customer.shippingAddressIds.map((shippingAddressId) => {
                    const shippingAddress = customer.addresses.find(
                      (address) => address.id === shippingAddressId
                    );
                    if (shippingAddress) {
                      return (
                        <Box
                          key={shippingAddress.id}
                          mt={2}
                        >
                          {Object.entries(shippingAddress)
                            .slice(1)
                            .map((row, index) => (
                              <Typography
                                key={index}
                                variant="subtitle1"
                                sx={{
                                  textAlign: 'left',
                                }}
                              >
                                {row[0]}: {row[1]}
                              </Typography>
                            ))}
                        </Box>
                      );
                    }
                    return null;
                  })}
                </Box>
              ) : null}
            </Box>
          )}
        </Paper>
      </Box>
      <Box mt={2}>
        {isEditing ? (
          // кнопка "Сохранить"
          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          // кнопка "Редактировать"
          <Button
            variant="contained"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </Box>
    </>
  );
};
