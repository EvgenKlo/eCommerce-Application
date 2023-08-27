import { Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setPrice } from '@/store/slices/productSlice';
import { SyntheticEvent } from 'react';
import { getProductsWithFilter } from '@/store/slices/productSlice';

export default function RangeSlider() {
  const price = useAppSelector((state) => state.products.filters.price);
  const maxPrice = useAppSelector((state) => state.products.maxPrice);
  const value = [price.lower, price.upper];
  const dispatch = useAppDispatch();

  const handleChange = (_: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    dispatch(setPrice({ range: newValue as number[], operand: '=' }));
  };

  return (
    <Slider
      sx={{
        maxWidth: '150px',
        pb: 0.5,
        '& .MuiSlider-valueLabel': {
          fontSize: 9,
          fontWeight: 'normal',
          top: -6,
          backgroundColor: 'rgba(135, 162, 171, 0.7)',
          color: 'white',
          '&:before': {
            display: 'none',
          },
        },
      }}
      value={value}
      onChange={handleChange}
      onChangeCommitted={() => dispatch(getProductsWithFilter())}
      valueLabelDisplay="on"
      size="small"
      marks
      track="inverted"
      max={maxPrice}
    />
  );
}
