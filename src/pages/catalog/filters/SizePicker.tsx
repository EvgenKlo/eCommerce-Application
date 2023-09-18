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
import { setFilterSize } from '@/store/slices/productSlice';

const boxSX = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  mt: 0,
};

export const SizePicker: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [checked, setChecked] = useState([] as string[]);

  const dispatch = useAppDispatch();

  const sizes = useAppSelector((state) => state.products.size);

  const filterSizes = useAppSelector((state) => state.products.filters.size);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const filteredSizes: string[] = [...newChecked];
    dispatch(setFilterSize({ sizes: filteredSizes }));
  };

  useEffect(() => {
    if (!filterSizes?.length) setChecked([]);
    else {
      setChecked([...filterSizes]);
    }
  }, [filterSizes]);

  const handleShow = () => setCollapsed((state) => !state);

  return (
    <Box sx={boxSX}>
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
          {sizes.map((value) => {
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
                    sx={{ color: '#333333' }}
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
