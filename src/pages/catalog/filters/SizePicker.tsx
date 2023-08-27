import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Box, Button, Collapse } from '@mui/material';
import { setFilterSize, getProductsWithFilter } from '@/store/slices/productSlice';

export const SizePicker: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState([] as number[]);
  const dispatch = useAppDispatch();
  const sizes = useAppSelector((state) => state.products.size);
  const filterSizes = useAppSelector((state) => state.products.filters.size);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const filteredSizes: string[] = newChecked.map((idx) => sizes[idx]);
    dispatch(setFilterSize({ sizes: filteredSizes }));
  };
  useEffect(() => {
    if (!filterSizes?.length) setChecked([]);
    dispatch(getProductsWithFilter());
  }, [filterSizes]);
  const handleShow = () => setCollapsed((state) => !state);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 0,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => handleShow()}
        sx={{ '&:focus': { outline: 'none' }, width: 150 }}
      >
        Size
      </Button>
      <List sx={{ width: '100%', maxWidth: 250, overflow: 'auto', maxHeight: 300 }}>
        <Collapse
          in={collapsed}
          timeout="auto"
          unmountOnExit
        >
          {sizes.map((value, idx) => {
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
