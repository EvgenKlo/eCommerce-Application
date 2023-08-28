import { Divider, Stack, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { FilterProducts, filterActiveFormat } from '@/types/products';
import {
  setPrice,
  setFilterColors,
  setFilterSize,
  setFilterManufacturer,
  setFilterGender,
  getProductsWithFilter,
} from '@/store/slices/productSlice';

export const ActiveFilters: React.FC = () => {
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
            <Chip
              key={option}
              sx={{ fontSize: '12px' }}
              variant="outlined"
              onDelete={result[option].action}
              label={`${option}: ${result[option]!.value}`}
            />
          );
        })}
      </Stack>
    </div>
  );
};
