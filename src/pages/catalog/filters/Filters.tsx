import { CategoriesTree } from '@/pages/catalog/filters/CatalogTree';
import { RangeSlider } from '@/pages/catalog/filters/Slider';
import { ColorPicker } from '@/pages/catalog/filters/ColorPicker';
import { ManufacturerPicker } from '@/pages/catalog/filters/ManufacturerPicker';
import { SizePicker } from '@/pages/catalog/filters/SizePicker';
import { GenderPicker } from '@/pages/catalog/filters/GenderPicker';
import { Recycling as RecyclingIcon, PriceChange as PriceChangeIcon } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  getCategories,
  getProducts,
  getProductsWithFilter,
  resetFilter,
} from '@/store/slices/productSlice';
import { useEffect, useState } from 'react';

export const Filters = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const activeCat = useAppSelector((state) => state.products.filters.catId);
  const filters = useAppSelector((state) => state.products.filters);
  const sort = useAppSelector((state) => state.products.sort);
  const search = useAppSelector((state) => state.products.search);

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState(activeCat ? activeCat : '');

  const handleAllCategories = () => {
    dispatch(resetFilter());
    setSelected('');
  };

  const handleCatClick = () => void dispatch(getProductsWithFilter());

  const loadData = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };

  useEffect(() => {
    if (!categories.length) void loadData();
    else void dispatch(getProductsWithFilter());
  }, [JSON.stringify(filters), JSON.stringify(sort), search]);

  useEffect(() => {
    activeCat ? setSelected(activeCat) : setSelected('');
  }, [activeCat]);

  return (
    <Box
      sx={{
        backgroundColor: '#f6f3f7',
        width: '200px',
        borderRadius: 5,
        pt: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h5"
        color="#87a2ab"
      >
        Filters
      </Typography>
      <Divider sx={{ mb: 2, mt: 2 }} />

      <Button
        variant="outlined"
        size="small"
        startIcon={<RecyclingIcon />}
        sx={{ '&:focus': { outline: 'none' }, margin: 'auto' }}
        onClick={() => handleAllCategories()}
      >
        Reset
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
  );
};
