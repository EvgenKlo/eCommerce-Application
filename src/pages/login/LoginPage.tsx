import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { SignIn } from '@/store/slices/customerSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormValidator } from '@/helpers/formValidator';
import { Loader } from '@/components/UI/Loader';
import Message from '@/components/UI/Message';
interface loginProps {
  handleLogin: (val: boolean) => void;
}
export const LoginPage: React.FC<loginProps> = (props) => {
  const { handleLogin } = props;
  const customer = useAppSelector((state) => state.customers.customer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState('');

  const [formsValue, setFormsValue] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formsValue.email && formsValue.password && !emailError && !passwordError) {
      setLoading(true);
      void dispatch(
        SignIn({ email: formsValue.email, password: formsValue.password, setOpen, setLoading })
      );
    }
  };

  useEffect(() => {
    setLoading(false);
    try {
      if ('id' in customer) {
        setFormsValue({ email: '', password: '' });
        handleLogin(true);
        navigate('/');
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
    // eslint-disable-next-line
  }, [customer]);

  useEffect(() => {
    if (formsValue.email) {
      if (formsValue.email.slice(-1) === ' ') {
        setEmailError(true);
      } else {
        const isValid = FormValidator.emailValidator(formsValue.email);
        setEmailError(!isValid);
      }
    } else {
      setEmailError(false);
    }
    if (formsValue.password) {
      const isValid = FormValidator.passwordValidator(formsValue.password);
      setPasswordError(!isValid);
    } else {
      setPasswordError(false);
    }
  }, [formsValue]);

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Login in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate={false}
          sx={{ mt: 8 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setFormsValue({
                ...formsValue,
                email: e.target.value,
              });
            }}
            error={emailError}
            helperText={
              emailError
                ? formsValue.email[0] === ' ' || formsValue.email.slice(-1) === ' '
                  ? 'E-mail must not start or end with a space'
                  : 'Invalid e-mail'
                : null
            }
          />

          <FormControl
            sx={{ mt: 1 }}
            variant="outlined"
            fullWidth
            required
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              error={passwordError}
              label={'Password'}
              onChange={(e) => {
                setFormsValue({
                  ...formsValue,
                  password: e.target.value,
                });
              }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
                {formsValue.password[0] === ' ' || formsValue.password.slice(-1) === ' '
                  ? 'Password must not start or end with a space'
                  : 'The password must be at least 8 characters long and contain: A-Z, a-z, 0-9 and at least one special character (e.g., !@#$%^&*)'}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 5,
              mb: 3,
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            ></Grid>
            <Grid item>
              <Link
                href="/registration"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Message
        open={open}
        setOpen={setOpen}
      />
      <Loader isLoading={isLoading} />
    </Container>
  );
};
