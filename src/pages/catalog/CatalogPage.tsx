import { useAppSelector } from '@/hooks/reduxHooks';
import { Box, Button, Container } from '@mui/material';
import ProductList from './products/ProductList';
import { ActiveFilters } from '@/pages/catalog/filters/ActiveFilters';
import { Loader } from '@/components/UI/Loader';
import { Toolbar } from './filters/Toolbar';
import { BreadCrumbs } from './filters/Breadcrumbs';
import { Filters } from './filters/Filters';
import { useState } from 'react';
import { FilterModalWindow } from './filters/FilterModalWindow';
import { Pagination } from './filters/Pagination';

export const CatalogPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const isCartLoading = useAppSelector((state) => state.carts.isLoading);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Loader isLoading={isCartLoading} />
      <Button
        sx={{ display: { xs: 'flex', sm: 'none' } }}
        onClick={handleOpen}
        variant="contained"
      >
        Filters
      </Button>
      <FilterModalWindow
        open={open}
        setOpen={setOpen}
      />
      <BreadCrumbs />
      <ActiveFilters />
      <Container sx={{ display: 'flex' }}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Filters />
        </Box>
        <Box
          width="100%"
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Toolbar />
          <ProductList />
          <Pagination />
        </Box>
      </Container>
    </Container>
  );
};
