import { FormValidator } from '@/helpers/formValidator';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';

const PasswordField: React.FC<{
  data: CustomerDraft;
  setData: React.Dispatch<React.SetStateAction<CustomerDraft>>;
}> = ({ data, setData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordText, setPasswordText] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      required
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        data-testid="password-input"
        error={passwordError}
        label={'Password'}
        onChange={(e) => {
          setPasswordText(e.target.value);
          if (!FormValidator.passwordValidator(e.target.value) && e.target.value.length > 0) {
            setData({ ...data, password: '' });
            setPasswordError(true);
          } else {
            setData({ ...data, password: e.target.value });
            setPasswordError(false);
          }
        }}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {passwordError && (
        <FormHelperText
          error
          id="outlined-adornment-password"
        >
          {passwordText[0] === ' ' || passwordText.slice(-1) === ' '
            ? 'password must not start or end with a space'
            : 'the password must be at least 8 characters long and contain: A-Z, a-z, 0-9 and at least one special character (e.g., !@#$%^&*)'}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordField;
