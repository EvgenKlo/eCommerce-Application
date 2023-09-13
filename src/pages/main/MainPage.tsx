import { useAppSelector } from '@/hooks/reduxHooks';
import { Chip, Container, Stack, Tooltip, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import { Greeting } from './Greeting';
import { PagesButtons } from './PagesButtons';

export const MainPage: React.FC = () => {
  const discounts = useAppSelector((state) => state.carts.discounts);

  return (
    <Container>
      <Greeting />
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
