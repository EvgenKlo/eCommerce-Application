import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFilterSize, getProductsWithFilter } from '@/store/slices/productSlice';
import { SortBar } from './Sort';
import { Search } from './Search';

export const Toolbar: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '500px', display: 'flex' }}>
      <SortBar />
      <Search />
    </Box>
  );
};
