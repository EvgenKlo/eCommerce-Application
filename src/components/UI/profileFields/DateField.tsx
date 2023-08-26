import { FormValidator } from '@/helpers/formValidator';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';

export const DateField: React.FC<{
  data: CustomerDraft;
  setData: React.Dispatch<React.SetStateAction<CustomerDraft>>;
}> = ({ data, setData }) => {
  const [dateError, setDateError] = useState(false);

  return (
    <DatePicker
      label="Birth date"
      format="yyyy/MM/dd"
      onChange={(newDate) => {
        const birthDate = newDate as Date;
        if (FormValidator.ageValidator(birthDate)) {
          setDateError(false);
          setData({ ...data, dateOfBirth: birthDate.toISOString().substring(0, 10) });
        } else {
          setDateError(true);
          setData({ ...data, dateOfBirth: '' });
        }
      }}
      className="date-picker"
      disableFuture
      slotProps={{
        textField: {
          fullWidth: true,
          variant: 'outlined',
          error: dateError,
          required: true,

          helperText: dateError ? 'you must be over 14 years old' : null,
        },
      }}
    />
  );
};
