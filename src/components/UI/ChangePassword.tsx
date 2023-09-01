import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PasswordField from './profileFields/PasswordField';
import { useState } from 'react';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { UpdatePassword, changeSnackbarInfo } from '@/store/slices/customerSlice';

const VerticalLinearStepper: React.FC<{
  setEditPassword: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setEditPassword }) => {
  const customer = useAppSelector((state) => state.customers.customer);

  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState(0);

  const [data, setData] = useState({} as CustomerDraft);

  const [requestData, setRequestData] = useState({
    version: customer.version,
    currentPassword: '',
    newPassword: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  //const [openSnackbar, setOpenSnackbar] = useState(false);

  const steps = [
    {
      label: 'Enter your old password',
      initialValue: requestData.currentPassword,
      next: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.password) {
          setRequestData({ ...requestData, currentPassword: data.password });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setData({ ...data, password: '' });
        } else if (requestData.currentPassword) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      },
    },
    {
      label: 'Enter new password',
      initialValue: requestData.newPassword,
      next: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.password) {
          setRequestData({ ...requestData, newPassword: data.password });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setData({ ...data, password: '' });
        } else if (requestData.newPassword) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      },
      back: () => {
        if (data.password) {
          setRequestData({ ...requestData, newPassword: data.password });
        } else if (requestData.newPassword) {
          setRequestData({ ...requestData, newPassword: '' });
        }
        setData({ ...data, password: '' });
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      },
    },
    {
      label: 'Confirm new password',
      initialValue: confirmPassword,
      next: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.password && data.password === requestData.newPassword) {
          console.log(requestData);
          void dispatch(UpdatePassword(requestData));
          setData({ ...data, password: '' });
          setEditPassword(false);
        } else {
          dispatch(
            changeSnackbarInfo({
              name: '',
              message: 'Wrong password entered in the verification field',
            })
          );
        }
      },
      back: () => {
        if (data.password) {
          setConfirmPassword(data.password);
        } else {
          setConfirmPassword('');
        }
        setData({ ...data, password: '' });
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      },
    },
  ];

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box
                component="form"
                onSubmit={step.next}
                noValidate={false}
              >
                <PasswordField
                  data={data}
                  setData={setData}
                  initialValue={step.initialValue}
                />
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, mr: 1 }}
                      type="submit"
                    >
                      {index === steps.length - 1 ? 'Change password' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={step.back}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Button
        onClick={() => setEditPassword(false)}
        variant="contained"
      >
        Reset
      </Button>
    </Box>
  );
};

export default VerticalLinearStepper;
