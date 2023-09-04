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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFilterManufacturer } from '@/store/slices/productSlice';

const boxSX = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  mt: 0,
};

export const ManufacturerPicker: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [checked, setChecked] = useState([] as string[]);

  const dispatch = useAppDispatch();

  const manufacturers = useAppSelector((state) => state.products.manufacturer);

  const filterManufacturers = useAppSelector((state) => state.products.filters.manufacturer);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const filteredManufacturers: string[] = [...newChecked];
    dispatch(setFilterManufacturer({ manufacturers: filteredManufacturers }));
  };
  useEffect(() => {
    if (!filterManufacturers?.length) setChecked([]);
    else {
      setChecked([...filterManufacturers]);
    }
  }, [filterManufacturers]);

  const handleShow = () => setCollapsed((state) => !state);

  return (
    <Box sx={boxSX}>
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
          {manufacturers.map((value) => {
            const labelId = `${value}`;

            return (
              <ListItem
                key={value}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
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
