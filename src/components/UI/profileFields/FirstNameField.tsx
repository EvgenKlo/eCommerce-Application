import { FormValidator } from '@/helpers/formValidator';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

const FirstNameField: React.FC<{
  data: CustomerDraft;
  setData: React.Dispatch<React.SetStateAction<CustomerDraft>>;
  initialValue: string;
}> = ({ data, setData, initialValue }) => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <TextField
      required
      fullWidth
      name="firstName"
      id="firstName"
      label={'First name'}
      sx={{ marginBottom: 0.3 }}
      size="small"
      autoFocus
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (FormValidator.nameValidator(e.target.value)) {
          setData({ ...data, firstName: '' });
          setFirstNameError(true);
        } else {
          setData({ ...data, firstName: e.target.value });
          setFirstNameError(false);
        }
      }}
      error={firstNameError}
      helperText={
        firstNameError ? 'this field must not contain special characters or numbers' : null
      }
    />
  );
};

export default FirstNameField;
