import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCategories, getProducts } from '@/store/slices/productSlice';

import { Button, Box, Container, Drawer, Divider, IconButton, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { CategoriesTree } from '@/components/UI/CatalogTree';

export const CatalogPage: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();

  const getCategoryList = (): void => {
    dispatch(getCategories());
    dispatch(getProducts());
  };

  return (
    <Container>
      <Button
        variant="outlined"
        onClick={getCategoryList}
      >
        Load Categories list
      </Button>
      <Container sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
        <Box
          sx={{
            backgroundColor: '#f6f3f7',
            flexBasis: '20%',
            maxWidth: '250px',
            borderRadius: '1%',
            pt: 1,
          }}
        >
          {categories.length !== 0 && <CategoriesTree categories={categories} />}
        </Box>
        <Box
          sx={{
            // backgroundColor: '#f6f3f7',
            flexBasis: '80%',
            // maxWidth: '250px',
            borderRadius: '1%',
            pt: 1,
          }}
        >
          {JSON.stringify(products)}
        </Box>
      </Container>
    </Container>
  );
};
