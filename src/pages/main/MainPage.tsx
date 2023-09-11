import { useAppSelector } from '@/hooks/reduxHooks';
import { Button, Chip, Container, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const MainPage: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);
  const discounts = useAppSelector((state) => state.carts.discounts);

  const pages = ['catalog', 'about', 'login', 'registration', 'basket'];

  return (
    <Container>
      {customer ? <h3>Hello {customer.firstName} !</h3> : <h3>Hello !</h3>}
      {pages.map((page) => (
        <Button
          key={page}
          variant="contained"
          sx={{ margin: '1rem', '&:hover': { color: 'secondary.main' } }}
          component={Link}
          to={`/${page}`}
        >
          {`Go to ${page} Page`}
        </Button>
      ))}
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 1,
          pt: 2,
          m: 0,
        }}
      >
        <Typography
          paddingRight={1}
          variant="h5"
        >
          Promocodes:
        </Typography>
        <Stack
          direction="row"
          spacing={1}
        >
          {discounts.map((discount) => {
            return (
              <Tooltip
                title={discount.name.en}
                key={discount.id}
                sx={{ '&:hover': { cursor: 'cursor' } }}
              >
                <Chip
                  label={discount.key}
                  color="secondary"
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Paper>
    </Container>
  );
};
