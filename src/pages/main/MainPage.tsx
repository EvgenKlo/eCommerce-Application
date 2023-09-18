import { Container } from '@mui/material';
import { Greeting } from './Greeting';
import { PagesButtons } from './PagesButtons';
import { DiscountBannersList } from './DiscountBannersList';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { getProductsForSlider } from '@/store/slices/productSlice';
import { MainSlider } from './MainSlider';

export type objectSliderInfo = {
  id: string;
  name: string;
  url: string;
};

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.productsForSlider);

  useEffect(() => {
    !products.length && void dispatch(getProductsForSlider());
  }, []);

  const sliders = products.map((product) => ({
    id: product.id,
    name: product.name.en,
    url: product.masterVariant.images?.[0]?.url || '',
  }));

  return (
    <Container>
      <Greeting />
      <PagesButtons />
      <MainSlider sliders={sliders} />
      <DiscountBannersList />
    </Container>
  );
};
