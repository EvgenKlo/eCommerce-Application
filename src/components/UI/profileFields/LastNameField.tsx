import { FormValidator } from '@/helpers/formValidator';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

export const LastNameField: React.FC<{
  data: CustomerDraft;
  setData: React.Dispatch<React.SetStateAction<CustomerDraft>>;
  initialValue: string;
}> = ({ data, setData, initialValue }) => {
  const [lastNameError, setLastNameError] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <TextField
      required
      fullWidth
      id="lastName"
      label="Last name"
      name="lastName"
      autoComplete="family-name"
      sx={{ marginBottom: 0.3 }}
      size="small"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (FormValidator.nameValidator(e.target.value)) {
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
  );
};
