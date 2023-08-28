import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { Typography, Box, Paper, Button, Checkbox } from '@mui/material';
import { KittySvg } from '@/components/UI/KittySvg';
import FirstNameField from '../../components/UI/profileFields/FirstNameField';
import { LastNameField } from '@/components/UI/profileFields/LastNameField';
import EmailField from '@/components/UI/profileFields/EmailField';
import EditIcon from '@mui/icons-material/Edit';
// import EmailField from '../../components/UI/profileFields/EmailField';
// import { DateField } from '@/components/UI/profileFields/DateField';
// import { AddressForm } from '@/components/UI/AddressForm';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import {
  UpdateLastName,
  UpdateFirstName,
  UpdateEmail,
  UpdateDateOfBirth,
} from '@/store/slices/customerSlice';
import { DateField } from '@/components/UI/profileFields/DateField';
import { useNavigate } from 'react-router';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const styleButton = {
  marginLeft: '50px',
  marginBottom: '5px',
  fontSize: '10px',
  fontWeight: 'bold',
  padding: '2px 5px',
  width: '200px',
  height: '30px',
};
const styleEditIcon = { marginLeft: '15px' };

const styleContainerField = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
  maxWidth: '600px',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
  },
};

const boxStyle = {
  padding: '0px',
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
};

export const UserPage: React.FC = () => {
  const auth = useAppSelector((state) => state.customers.authorized);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) navigate('/');
  }, []);

  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state.customers.customer);
  //console.log(customer);

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editDateOfBirth, setEditDateOfBirth] = useState(false);

  const [data, setData] = useState({} as CustomerDraft);

  const styleNameField = { marginTop: '5px', fontSize: '20px', textAlign: 'start' };

  return (
    <>
      <Box
        sx={{
          ...boxStyle,
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
          <Box sx={styleContainerField}>
            {editFirstName ? (
              <>
                <FirstNameField
                  data={customer}
                  setData={setData}
                  initialValue={customer.firstName || ''}
                />
                <Button
                  sx={styleButton}
                  variant="contained"
                  onClick={() => {
                    data.firstName &&
                      void dispatch(
                        UpdateFirstName({
                          id: customer.id,
                          firstName: data.firstName,
                          version: customer.version,
                        })
                      );
                    setEditFirstName(false);
                  }}
                >
                  update first name
                </Button>
              </>
            ) : (
              <>
                <Typography
                  sx={styleNameField}
                  variant="subtitle1"
                >
                  <span style={{ fontWeight: 'bold' }}>First name: </span>

                  {customer.firstName}
                </Typography>
                <Checkbox
                  {...label}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
                      sx={styleEditIcon}
                    />
                  }
                  checkedIcon={<EditIcon />}
                  checked={editFirstName}
                  onChange={() => setEditFirstName(!editFirstName)}
                />
              </>
            )}
          </Box>
          <Box sx={styleContainerField}>
            {editLastName ? (
              <>
                <LastNameField
                  data={customer}
                  setData={setData}
                  initialValue={customer.lastName || ''}
                />
                <Button
                  sx={styleButton}
                  variant="contained"
                  onClick={() => {
                    data.lastName &&
                      void dispatch(
                        UpdateLastName({
                          id: customer.id,
                          lastName: data.lastName,
                          version: customer.version,
                        })
                      );
                    setEditLastName(false);
                  }}
                >
                  update last name
                </Button>
              </>
            ) : (
              <>
                <Typography
                  sx={styleNameField}
                  variant="subtitle1"
                >
                  <span style={{ fontWeight: 'bold' }}>Last name: </span>

                  {customer.lastName}
                </Typography>
                <Checkbox
                  {...label}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
                      sx={styleEditIcon}
                    />
                  }
                  checkedIcon={<EditIcon />}
                  checked={editLastName}
                  onChange={() => setEditLastName(!editLastName)}
                />
              </>
            )}
          </Box>
          <Box sx={styleContainerField}>
            {editEmail ? (
              <>
                <EmailField
                  data={customer}
                  setData={setData}
                  initialValue={customer.email}
                />
                <Button
                  sx={styleButton}
                  variant="contained"
                  onClick={() => {
                    data.email &&
                      void dispatch(
                        UpdateEmail({
                          id: customer.id,
                          email: data.email,
                          version: customer.version,
                        })
                      );
                    setEditEmail(false);
                  }}
                >
                  update email
                </Button>
              </>
            ) : (
              <>
                <Typography
                  sx={styleNameField}
                  variant="subtitle1"
                >
                  <span style={{ fontWeight: 'bold' }}>Email: </span>

                  {customer.email}
                </Typography>
                <Checkbox
                  {...label}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
                      sx={styleEditIcon}
                    />
                  }
                  checkedIcon={<EditIcon />}
                  checked={editEmail}
                  onChange={() => setEditEmail(!editEmail)}
                />
              </>
            )}
          </Box>
          <Box sx={styleContainerField}>
            {editDateOfBirth ? (
              <>
                <DateField
                  data={customer}
                  setData={setData}
                />
                <Button
                  sx={styleButton}
                  variant="contained"
                  onClick={() => {
                    data.dateOfBirth &&
                      void dispatch(
                        UpdateDateOfBirth({
                          id: customer.id,
                          date: data.dateOfBirth,
                          version: customer.version,
                        })
                      );
                    setEditDateOfBirth(false);
                  }}
                >
                  update date
                </Button>
              </>
            ) : (
              <>
                <Typography
                  sx={styleNameField}
                  variant="subtitle1"
                >
                  <span style={{ fontWeight: 'bold' }}>Date of birth: </span>

                  {customer.dateOfBirth}
                </Typography>
                <Checkbox
                  {...label}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
                      sx={styleEditIcon}
                    />
                  }
                  checkedIcon={<EditIcon />}
                  checked={editDateOfBirth}
                  onChange={() => setEditDateOfBirth(!editDateOfBirth)}
                />
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};
