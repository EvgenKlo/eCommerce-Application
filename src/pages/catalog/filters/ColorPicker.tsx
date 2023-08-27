import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Box, Fade } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useEffect, useState } from 'react';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { setFilterColors, getProductsWithFilter } from '@/store/slices/productSlice';

const boxSX = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  justifyContent: 'space-evenly',
  padding: 1,
};

export const ColorPicker: React.FC = () => {
  const colors = useAppSelector((state) => state.products.colors);
  const filterColors = useAppSelector((state) => state.products.filters.colors);
  const [selected, setSelected] = useState([] as string[]);
  const dispatch = useAppDispatch();

  const handleClick = (color: string): void => {
    const res = selected.includes(color)
      ? [...selected].filter((item) => item !== color)
      : [...selected, color];
    setSelected(res);
    dispatch(setFilterColors({ colors: res }));
  };
  useEffect(() => {
    if (!filterColors?.length) setSelected([]);
    dispatch(getProductsWithFilter());
  }, [filterColors]);
  return (
    <>
      <ColorLensOutlinedIcon sx={{ color: '#87a2ab' }} />

      <Box sx={boxSX}>
        {colors.map((color) => {
          return (
            <IconButton
              key={color}
              sx={{
                // border: selected.includes(color) ? `1px solid ${color}` : '1px solid transparent',
                boxShadow: selected.includes(color) ? `0 0 15px 3px ${color}` : 'none',
                p: 1,
              }}
              onClick={() => handleClick(color)}
              onMouseDown={handleMouseDown}
            >
              <Fade
                in={!!color}
                timeout={1000}
              >
                <Fingerprint sx={{ color: `${color}` }} />
              </Fade>
            </IconButton>
          );
        })}
      </Box>
    </>
  );
};
