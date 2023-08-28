import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Typography, Box, Paper, Checkbox, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { KittySvg } from '@/components/UI/KittySvg';
import FirstNameField from '../../components/UI/profileFields/FirstNameField';
import { LastNameField } from '@/components/UI/profileFields/LastNameField';
import EmailField from '@/components/UI/profileFields/EmailField';
import EditIcon from '@mui/icons-material/Edit';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import CancelIcon from '@mui/icons-material/Cancel';
// import EmailField from '../../components/UI/profileFields/EmailField';
// import { DateField } from '@/components/UI/profileFields/DateField';
// import { AddressForm } from '@/components/UI/AddressForm';

import {
  UpdateLastName,
  UpdateFirstName,
  UpdateEmail,
  UpdateDateOfBirth,
} from '@/store/slices/customerSlice';
import { DateField } from '@/components/UI/profileFields/DateField';
import { useNavigate } from 'react-router';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const styleEditIcon = { marginLeft: '15px' };

const styleContainerField = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '600px',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
  },
};

const styleContainerButton = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
const boxStyle = {
  padding: '0px',
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
};

const styleTitle = { display: 'block', fontWeight: 'bold', width: '140px' };
const styleTitleAddress = { display: 'block', fontWeight: 'bold' };

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
  // const [editBillingAddress, setEditBillingAddress] = useState(false);
  // const [editShippingAddress, setEditShippingAddress] = useState(false);

  // const getAddress = (address: BaseAddress) => {
  //   console.log(address);
  // };

  const [data, setData] = useState({} as CustomerDraft);

  const styleNameField = { fontSize: '20px', textAlign: 'start' };

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
            <Typography
              sx={styleNameField}
              variant="subtitle1"
            >
              <span style={styleTitle}>First name: </span>
            </Typography>

            {editFirstName ? (
              <>
                <FirstNameField
                  data={customer}
                  setData={setData}
                  initialValue={customer.firstName || ''}
                />

                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="info"
                      disabled={!data.firstName}
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
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      disabled={!!data.firstName}
                      onClick={() => {
                        setEditFirstName(false);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <>
                {customer.firstName}

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
            <Typography
              sx={styleNameField}
              variant="subtitle1"
            >
              <span style={styleTitle}>Last name: </span>
            </Typography>
            {editLastName ? (
              <>
                <LastNameField
                  data={customer}
                  setData={setData}
                  initialValue={customer.lastName || ''}
                />

                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="info"
                      disabled={!data.lastName}
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
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      disabled={!!data.lastName}
                      onClick={() => {
                        setEditLastName(false);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <>
                {customer.lastName}
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
            <Typography
              sx={styleNameField}
              variant="subtitle1"
            >
              <span style={styleTitle}>Email: </span>
            </Typography>
            {editEmail ? (
              <>
                <EmailField
                  data={customer}
                  setData={setData}
                  initialValue={customer.email}
                />
                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="info"
                      disabled={!data.email}
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
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      disabled={!!data.email}
                      onClick={() => {
                        setEditEmail(false);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <>
                {customer.email}
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
            <Typography
              sx={styleNameField}
              variant="subtitle1"
            >
              <span style={styleTitle}>Date of birth: </span>
            </Typography>
            {editDateOfBirth ? (
              <>
                <DateField
                  data={customer}
                  setData={setData}
                />
                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="info"
                      disabled={!data.dateOfBirth}
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
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      disabled={!!data.dateOfBirth}
                      onClick={() => {
                        setEditDateOfBirth(false);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <>
                {customer.dateOfBirth}

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

          <Box>
            {customer.addresses.map((address, index) => (
              <Box key={index}>
                <Typography sx={{ textAlign: 'start', margin: '10px' }}>{index + 1}</Typography>
                {Object.entries(address)
                  .slice(1)
                  .map(([key, value]) => (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          alignContent: 'center',
                          justifyContent: 'start',
                        }}
                      >
                        <Typography
                          key={key}
                          sx={{
                            textAlign: 'start',
                          }}
                          variant="subtitle1"
                        >
                          <span style={styleTitleAddress}>{key}:</span>
                        </Typography>
                        <Typography
                          key={key}
                          sx={{
                            fontSize: '17px',
                            marginLeft: '5px',
                          }}
                          variant="subtitle1"
                        >
                          {value}
                        </Typography>
                      </Box>
                    </>
                  ))}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </>
  );
};
