import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCategories, getProducts } from '@/store/slices/productSlice';

import { Button, Box, Container } from '@mui/material';
import ProductList from './products/ProductList';
import { CategoriesTree } from '@/components/UI/CatalogTree';

export const CatalogPage: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);

  const dispatch = useAppDispatch();

  const getCategoryList = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };
  console.log(categories);

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
            flexBasis: '20%',
            maxWidth: '250px',
            borderRadius: '1%',
            pt: 1,
          }}
        >
          {categories.length !== 0 && <CategoriesTree categories={categories} />}
        </Box>
        <ProductList />
      </Container>
    </Container>
  );
};
