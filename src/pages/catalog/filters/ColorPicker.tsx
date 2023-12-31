import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Box, Fade, IconButton } from '@mui/material';
import { Fingerprint, ColorLensOutlined as ColorLensOutlinedIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { setFilterColors } from '@/store/slices/productSlice';

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
  const [selected, setSelected] = useState(filterColors ? filterColors : []);
  const dispatch = useAppDispatch();

  const handleClick = (color: string): void => {
    const res = selected.includes(color)
      ? [...selected].filter((item) => item !== color)
      : [...selected, color];

    setSelected(res);

    void dispatch(setFilterColors({ colors: res }));
  };

  useEffect(() => {
    if (!filterColors?.length) setSelected([]);
  }, [filterColors]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ColorLensOutlinedIcon sx={{ color: '#87a2ab' }} />
      <Box sx={boxSX}>
        {colors.map((color) => {
          return (
            <IconButton
              key={color}
              sx={{
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
    </Box>
  );
};
