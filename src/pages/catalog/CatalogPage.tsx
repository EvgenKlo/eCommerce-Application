import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCategories, getProducts, getProductsByCat } from '@/store/slices/productSlice';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import { Button, Box, Container, Divider, Typography } from '@mui/material';
import ProductList from './products/ProductList';
import { CategoriesTree } from '@/components/UI/CatalogTree';
import RangeSlider from '@/pages/catalog/filters/Slider';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { ColorPicker } from '@/pages/catalog/filters/ColorPicker';
import { ManufacturerPicker } from './filters/ManufacturerPicker';
import { SizePicker } from './filters/SizePicker';
import { GenderPicker } from './filters/GenderPicker';

export const CatalogPage: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const [selected, setSelected] = useState('');
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

  const handleAllCategories = () => {
    loadData();
    setSelected('');
  };
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
