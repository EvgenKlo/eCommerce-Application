import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Box, Button, Collapse } from '@mui/material';
import { setFilterManufacturer, getProductsWithFilter } from '@/store/slices/productSlice';

export const ManufacturerPicker: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState([] as number[]);
  const dispatch = useAppDispatch();
  const manufacturers = useAppSelector((state) => state.products.manufacturer);
  const filterManufacturers = useAppSelector((state) => state.products.filters.manufacturer);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const filteredManufacturers: string[] = newChecked.map((idx) => manufacturers[idx]);
    dispatch(setFilterManufacturer({ manufacturers: filteredManufacturers }));
  };
  useEffect(() => {
    if (!filterManufacturers) setChecked([]);
    dispatch(getProductsWithFilter());
  }, [filterManufacturers]);
  const handleShow = () => setCollapsed((state) => !state);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => handleShow()}
        sx={{ '&:focus': { outline: 'none' }, width: 150 }}
      >
        Brands
      </Button>
      <List sx={{ width: '100%', maxWidth: 250, overflow: 'auto', maxHeight: 300 }}>
        <Collapse
          in={collapsed}
          timeout="auto"
          unmountOnExit
        >
          {manufacturers.map((value, idx) => {
            const labelId = `${value}`;

            return (
              <ListItem
                key={value}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(idx)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(idx) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={value}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </Collapse>
      </List>
    </Box>
  );
};
