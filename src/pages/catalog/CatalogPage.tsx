import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  getCategories,
  getProducts,
  getProductsWithFilter,
  resetFilter,
} from '@/store/slices/productSlice';
import {
  CategoryOutlined as CategoryOutlinedIcon,
  PriceChange as PriceChangeIcon,
} from '@mui/icons-material';
import { Button, Box, Container, Divider, Typography, Stack } from '@mui/material';
import ProductList from './products/ProductList';
import { CategoriesTree } from '@/components/UI/CatalogTree';
import { RangeSlider } from '@/pages/catalog/filters/Slider';
import { ColorPicker } from '@/pages/catalog/filters/ColorPicker';
import { ManufacturerPicker } from '@/pages/catalog/filters/ManufacturerPicker';
import { SizePicker } from '@/pages/catalog/filters/SizePicker';
import { GenderPicker } from '@/pages/catalog/filters/GenderPicker';
import { ActiveFilters } from '@/pages/catalog/filters/ActiveFilters';
import { useState, useEffect } from 'react';
import { Loader } from '@/components/UI/Loader';
import { Toolbar } from './filters/Toolbar';
import { BreadCrumbs } from './filters/Breadcrumbs';

export const CatalogPage: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const activeCat = useAppSelector((state) => state.products.filters.catId);
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const [selected, setSelected] = useState('');

  const dispatch = useAppDispatch();

  const loadData = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    activeCat ? setSelected(activeCat) : setSelected('');
  }, [activeCat]);

  const handleAllCategories = () => {
    dispatch(resetFilter());
    setSelected('');
  };

  const handleCatClick = () => dispatch(getProductsWithFilter());

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <BreadCrumbs />
      <Toolbar />
      <ActiveFilters />
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

          <Button
            variant="outlined"
            size="small"
            startIcon={<CategoryOutlinedIcon />}
            sx={{ '&:focus': { outline: 'none' } }}
            onClick={() => handleAllCategories()}
          >
            All
          </Button>
          {categories.length !== 0 && (
            <CategoriesTree
              categories={categories}
              handleClick={handleCatClick}
              selected={selected}
              setSelected={setSelected}
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
          <Divider
            sx={{ mb: 2, mt: 2 }}
            variant="middle"
          />
          <Box>
            <ColorPicker />
          </Box>
          <ManufacturerPicker />
          <SizePicker />
          <GenderPicker />
        </Box>

        <ProductList />
      </Container>
    </Container>
  );
};
