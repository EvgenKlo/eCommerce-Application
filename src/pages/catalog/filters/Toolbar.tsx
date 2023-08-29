import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFilterSize, getProductsWithFilter } from '@/store/slices/productSlice';
import { SortBar } from './Sort';

export const Toolbar: React.FC = () => {
  return (
    <Stack sx={{ maxWidth: 400 }}>
      <SortBar />
    </Stack>
  );
};
