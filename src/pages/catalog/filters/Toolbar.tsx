import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Box,
  Button,
  Collapse,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFilterSize, getProductsWithFilter } from '@/store/slices/productSlice';
import { SortBar } from './Sort';

export const Toolbar: React.FC = () => {
  return (
    <Stack>
      <SortBar />
    </Stack>
  );
};
