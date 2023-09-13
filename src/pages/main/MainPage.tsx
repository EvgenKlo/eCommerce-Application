import { useAppSelector } from '@/hooks/reduxHooks';
import { Chip, Container, Stack, Tooltip, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import { PagesButtons } from './PagesButtons';

export const MainPage: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);
  const discounts = useAppSelector((state) => state.carts.discounts);

  return (
    <Container>
      {customer ? (
        <h3>Welcome {customer.firstName} to our pet store!</h3>
      ) : (
        <h3>Welcome to our pet store!</h3>
      )}

      <PagesButtons />
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
              title={discount.description!.en}
              key={discount.id}
              sx={{ '&:hover': { cursor: 'cursor' } }}
            >
              <Chip
                label={discount.code}
                color="secondary"
              />
            </Tooltip>
          );
        })}
      </Stack>
    </Container>
  );
};
