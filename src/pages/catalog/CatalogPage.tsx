import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCategories, getProducts, getProductsByCat } from '@/store/slices/productSlice';

import { Button, Box, Container, Drawer, Divider, IconButton, Typography } from '@mui/material';
import ProductList from './products/ProductList';
import { CategoriesTree } from '@/components/UI/CatalogTree';
import RangeSlider from '@/components/UI/Slider';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { ColorPicker } from '@/pages/catalog/filters/ColorPicker';

export const CatalogPage: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);

  const dispatch = useAppDispatch();

  const loadData = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };

  const getCategoryList = (): void => {
    void loadData();
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleCatClick = (catId: string) => dispatch(getProductsByCat(catId));

  return (
    <Container>
      <Button
        variant="outlined"
        onClick={getCategoryList}
        sx={{ mb: 2 }}
      >
        Load Categories list
      </Button>
      <Container sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
        <Box
          sx={{
            backgroundColor: '#f6f3f7',
            flexBasis: '25%',
            maxWidth: '300px',
            borderRadius: '1%',
            pt: 1,
          }}
        >
          <Typography
            variant="h5"
            color="#87a2ab"
          >
            Categories
          </Typography>
          <Divider sx={{ mb: 2, mt: 2 }} />
          {categories.length !== 0 && (
            <CategoriesTree
              categories={categories}
              handleClick={handleCatClick}
            />
          )}
          <Divider
            component="li"
            sx={{ mb: 2, mt: 2 }}
            textAlign="left"
          >
            <Typography
              variant="h6"
              color="#60677b"
            >
              Filter options
            </Typography>
          </Divider>
          <Box>
            <PriceChangeIcon sx={{ display: 'block', marginInline: 'auto', color: '#87a2ab' }} />
            <RangeSlider />
          </Box>
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box>
            {/* <Typography
              sx={{ pt: 0, mt: 0 }}
              variant="h6"
              color="#87a2ab"
            >
              Color
            </Typography> */}
            <ColorPicker />
          </Box>
        </Box>
        <ProductList />
      </Container>
    </Container>
  );
};
