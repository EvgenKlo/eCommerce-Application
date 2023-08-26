import { FormValidator } from '@/helpers/formValidator';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

const EmailField: React.FC<{
  data: CustomerDraft;
  setData: React.Dispatch<React.SetStateAction<CustomerDraft>>;
}> = ({ data, setData }) => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  return (
    <TextField
      required
      fullWidth
      id="email"
      label="Email"
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
  );
};

export default EmailField;
