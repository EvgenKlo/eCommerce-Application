import { AddressForm } from '@/components/UI/AddressForm';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { RemoveCustomerAddress, UpdateCustomerAddress } from '@/store/slices/customerSlice';
import { type BaseAddress } from '@commercetools/platform-sdk';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { AddressSettings } from './AddressSettings';

const styleTitleAddress = { display: 'block', fontWeight: 'bold' };

const countryNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

const AddressesItem: React.FC<{
  address: BaseAddress;
}> = ({ address }) => {
  const dispatch = useAppDispatch();

  const [update, setUpdate] = useState(false);

  const [data, setData] = useState({} as BaseAddress);

  const getAddress = (address: BaseAddress) => {
    setData(address);
  };

  return (
    <Grid
      container
      sx={{
        marginBottom: 2,
        border: 1,
        borderRadius: 2,
        padding: 2,
        justifyContent: 'space-between',
      }}
    >
      {update ? (
        <Grid item>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (data.streetName && data.city && data.country && data.postalCode) {
                setUpdate(false);
                void dispatch(UpdateCustomerAddress({ id: address.id as string, data: data }));
              }
            }}
            noValidate={false}
          >
            <AddressForm
              address=""
              id={undefined}
              getAddress={getAddress}
              addressValue={{
                street: address.streetName as string,
                city: address.city as string,
                country: address.country,
                postalCode: address.postalCode as string,
              }}
            />
            <Button
              variant="contained"
              sx={{ margin: 2 }}
              onClick={() => setUpdate(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 2 }}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </Grid>
      ) : (
        <>
          <Grid item>
            {Object.entries(address)
              .slice(1)
              .map(([key, value]: [string, string]) => (
                <Box
                  key={address.id + key}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'start',
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'start',
                    }}
                    variant="subtitle1"
                  >
                    <span style={styleTitleAddress}>{key}:</span>
                  </Typography>

                  {key === 'country' ? (
                    <Typography
                      key={key}
                      sx={{
                        fontSize: '17px',
                        marginLeft: '5px',
                      }}
                      variant="subtitle1"
                    >
                      {countryNamesInEnglish.of(value)}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: '17px',
                        marginLeft: '5px',
                      }}
                      variant="subtitle1"
                    >
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            <Button
              variant="contained"
              sx={{ margin: 2 }}
              onClick={() => {
                setUpdate(true);
              }}
            >
              Update fields
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 2 }}
              onClick={() => {
                void dispatch(RemoveCustomerAddress(address.id as string));
              }}
            >
              Remove address
            </Button>
          </Grid>
          <AddressSettings address={address} />
        </>
      )}
    </Grid>
  );
};

export default AddressesItem;
