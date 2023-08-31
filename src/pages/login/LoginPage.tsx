import { Avatar, Button, CssBaseline, Link, Grid, Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { SignIn } from '@/store/slices/customerSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/UI/Loader';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import EmailField from '@/components/UI/profileFields/EmailField';
import { type CustomerDraft } from '@commercetools/platform-sdk';
import PasswordField from '@/components/UI/profileFields/PasswordField';
interface loginProps {
  handleLogin: (val: boolean) => void;
}
export const LoginPage: React.FC<loginProps> = (props) => {
  const { handleLogin } = props;
  const customer = useAppSelector((state) => state.customers.customer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formsValue, setFormsValue] = useState({} as CustomerDraft);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formsValue.email && formsValue.password) {
      setLoading(true);
      void dispatch(SignIn({ email: formsValue.email, password: formsValue.password, setLoading }));
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
    } catch (error) {
      console.log(error);
    }
  }, [customer]);

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
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate={false}
          sx={{ mt: 8 }}
        >
          <Grid
            container
            spacing={2}
            columns={1}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <EmailField
                data={formsValue}
                setData={setFormsValue}
                initialValue=""
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <PasswordField
                data={formsValue}
                setData={setFormsValue}
                initialValue=""
              />
            </Grid>
          </Grid>

          <Button
            data-testid="Log in"
            type="submit"
            fullWidth
            variant="contained"
            onMouseDown={handleMouseDown}
            sx={{
              mt: 5,
              mb: 3,
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            Log in
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
      <Loader isLoading={isLoading} />
    </Container>
  );
};
