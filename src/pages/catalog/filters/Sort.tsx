import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getProductsWithFilter, setSortingOptions } from '@/store/slices/productSlice';
import { SortOptions } from '@/types/Enums';

const options = Object.keys(SortOptions) as Array<keyof typeof SortOptions>;

export const SortBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState(SortOptions.price);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as SortOptions);
  };

  useEffect(() => {
    dispatch(setSortingOptions({ direction: 'asc', prop: sort }));
    dispatch(getProductsWithFilter());
  }, [sort]);
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, marginInline: 3 }}
    >
      <InputLabel id="sort-label-label">Sort</InputLabel>
      <Select
        labelId="sort-label-label"
        id="sort-label"
        label="Sort"
        onChange={handleChange}
        value={sort}
        sx={{ maxWidth: 150, height: 30 }}
      >
        {options.map((name) => {
          return (
            <MenuItem
              key={name}
              value={SortOptions[name]}
            >
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
