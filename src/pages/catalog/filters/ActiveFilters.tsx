import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { FilterProducts } from '@/types/products';
import {
  setPrice,
  setFilterColors,
  setFilterSize,
  setFilterManufacturer,
  setFilterGender,
  getProductsWithFilter,
} from '@/store/slices/productSlice';

type filterActiveFormat = {
  price: {
    value: string;
    action: () => void;
  };
  gender: {
    value: string;
    action: () => void;
  };
  color: {
    value: string;
    action: () => void;
  };
  size: {
    value: string;
    action: () => void;
  };
  brand: {
    value: string;
    action: () => void;
  };
};

export default function ActiveFilters() {
  const filter = useAppSelector((state) => state.products.filters);
  const [activeFilter, setActiveFilter] = useState(filter);
  const maxPrice = useAppSelector((state) => state.products.maxPrice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setActiveFilter(filter);
    dispatch(getProductsWithFilter());
  }, [JSON.stringify(filter)]);

  const format = (data: Required<FilterProducts>) => {
    const result: filterActiveFormat = {} as filterActiveFormat;
    Object.keys(data).forEach((filterOption) => {
      switch (filterOption) {
        case 'price':
          result.price = {
            value: `from ${data[filterOption].lower} to ${data[filterOption].upper}`,
            action: () => dispatch(setPrice({ range: [0, maxPrice], operand: '=' })),
          };
          break;
        case 'colors':
          if (data[filterOption].length)
            result.color = {
              value: (data[filterOption] as string[]).join(','),
              action: () => dispatch(setFilterColors({ colors: [] })),
            };
          break;
        case 'size':
          if (data[filterOption].length)
            result.size = {
              value: (data[filterOption] as string[]).join(','),
              action: () => dispatch(setFilterSize({ sizes: [] })),
            };
          break;
        case 'manufacturer':
          if (data[filterOption].length)
            result.brand = {
              value: (data[filterOption] as string[]).join(','),
              action: () => dispatch(setFilterManufacturer({ manufacturers: [] })),
            };
          break;
        case 'gender':
          if (data[filterOption].length)
            result.brand = {
              value: (data[filterOption] as string[]).join(','),
              action: () => dispatch(setFilterGender({ genders: [] })),
            };
          break;
      }
    });
    return result;
  };
  const result = format(activeFilter as Required<FilterProducts>);
  return (
    <div>
      <Stack
        sx={{ marginInline: 3, marginBottom: 1 }}
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
          />
        }
        spacing={1}
      >
        {(Object.keys(result) as Array<keyof typeof result>).map((option) => {
          return (
            <Button
              key={option}
              size="small"
              sx={{ fontSize: '9px' }}
              variant="outlined"
              endIcon={<HighlightOffIcon />}
              onClick={result[option].action}
            >
              {option}:{result[option]!.value}
            </Button>
          );
        })}
      </Stack>
    </div>
  );
}
