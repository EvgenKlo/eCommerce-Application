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

import {
  UpdateLastName,
  UpdateFirstName,
  UpdateEmail,
  UpdateDateOfBirth,
} from '@/store/slices/customerSlice';
import { DateField } from '@/components/UI/profileFields/DateField';
import { useNavigate } from 'react-router';
import VerticalLinearStepper from '@/pages/user/password/ChangePassword';
import AddressesList from './addresses/AddressesList';

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

export const styleTitle = { display: 'block', fontWeight: 'bold', minWidth: '140px' };

export const UserPage: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);

  const navigate = useNavigate();

  /* useEffect(() => {
    try {
      if (!customer.id) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }, [customer]); */

  const dispatch = useAppDispatch();

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editDateOfBirth, setEditDateOfBirth] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

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
                  data={data}
                  setData={setData}
                  initialValue={customer.firstName || ''}
                />

                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <span>
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
                          setData({ ...data, firstName: '' });
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      onClick={() => {
                        setEditFirstName(false);
                        setData({ ...data, firstName: '' });
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
                  sx={styleEditIcon}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
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
                  data={data}
                  setData={setData}
                  initialValue={customer.lastName || ''}
                />

                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <span>
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
                          setData({ ...data, lastName: '' });
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      onClick={() => {
                        setEditLastName(false);
                        setData({ ...data, lastName: '' });
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
                  sx={styleEditIcon}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
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
                  data={data}
                  setData={setData}
                  initialValue={customer.email}
                />
                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <span>
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
                          setData({ ...data, email: '' });
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      onClick={() => {
                        setEditEmail(false);
                        setData({ ...data, email: '' });
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
                  sx={styleEditIcon}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
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
                  data={data}
                  setData={setData}
                />
                <Box sx={styleContainerButton}>
                  <Tooltip
                    title="save"
                    arrow
                    placement="right-start"
                  >
                    <span>
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
                          setData({ ...data, dateOfBirth: '' });
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip
                    title="cancel"
                    arrow
                    placement="right-start"
                  >
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="error"
                      onClick={() => {
                        setEditDateOfBirth(false);
                        setData({ ...data, dateOfBirth: '' });
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
                  sx={styleEditIcon}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
                    />
                  }
                  checkedIcon={<EditIcon />}
                  checked={editDateOfBirth}
                  onChange={() => setEditDateOfBirth(!editDateOfBirth)}
                />
              </>
            )}
          </Box>

          <Box sx={styleContainerField}>
            <Typography
              sx={styleNameField}
              variant="subtitle1"
            >
              <span style={styleTitle}>Password: </span>
            </Typography>
            {editPassword ? (
              <VerticalLinearStepper setEditPassword={setEditPassword} />
            ) : (
              <>
                {customer.password}

                <Checkbox
                  {...label}
                  sx={styleEditIcon}
                  icon={
                    <EditIcon
                      fontSize="small"
                      color="primary"
                    />
                  }
                  checkedIcon={<EditIcon />}
                  checked={editDateOfBirth}
                  onChange={() => setEditPassword(!editPassword)}
                />
              </>
            )}
          </Box>

          {!!customer.id && <AddressesList customer={customer} />}
        </Paper>
      </Box>
    </>
  );
};
