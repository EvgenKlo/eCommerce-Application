import { Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setPrice } from '@/store/slices/productSlice';

export default function RangeSlider() {
  const price = useAppSelector((state) => state.products.filters.price);
  const value = [price.lower, price.upper];
  const dispatch = useAppDispatch();

  const handleChange = (_: Event, newValue: number | number[]) => {
    dispatch(setPrice({ range: newValue as number[], operand: '=' }));
  };

  return (
    <Slider
      sx={{ maxWidth: '150px', pb: 0.5 }}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      size="small"
      marks
      track="inverted"
    />
  );
}
