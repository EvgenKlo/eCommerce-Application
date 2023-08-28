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
import { setFilterGender, getProductsWithFilter } from '@/store/slices/productSlice';

const boxSX = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  mt: 0,
};

export const GenderPicker: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState([] as number[]);
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state) => state.products.gender);
  const filterGenders = useAppSelector((state) => state.products.filters.gender);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const filteredGender: string[] = newChecked.map((idx) => gender[idx]);
    dispatch(setFilterGender({ genders: filteredGender }));
  };
  useEffect(() => {
    if (!filterGenders?.length) setChecked([]);
    dispatch(getProductsWithFilter());
  }, [filterGenders]);
  const handleShow = () => setCollapsed((state) => !state);

  return (
    <Box sx={boxSX}>
      <Button
        variant="outlined"
        onClick={() => handleShow()}
        sx={{ '&:focus': { outline: 'none' }, width: 150 }}
      >
        Gender
      </Button>
      <List sx={{ width: '100%', maxWidth: 250, overflow: 'auto', maxHeight: 300 }}>
        <Collapse
          in={collapsed}
          timeout="auto"
          unmountOnExit
        >
          {gender.map((value, idx) => {
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
