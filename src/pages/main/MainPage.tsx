import { Container } from '@mui/material';
import { Greeting } from './Greeting';
import { PagesButtons } from './PagesButtons';
import { DiscountBannersList } from './DiscountBannersList';

export const MainPage: React.FC = () => {
  return (
    <Container>
      <Greeting />
      <PagesButtons />
      <DiscountBannersList />
    </Container>
  );
};
