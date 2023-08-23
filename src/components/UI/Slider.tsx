import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function RangeSlider() {
  const [value, setValue] = useState<number[]>([0, 100]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}s`;
  }
  return (
    // <Box sx={{ maxWidth: '150px' }}>
    <Slider
      sx={{ maxWidth: '150px' }}
      getAriaLabel={() => 'Price range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      getAriaValueText={valuetext}
      size="small"
      marks
    />
    // </Box>
  );
}
