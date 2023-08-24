import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Box, ButtonGroup } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Button from '@mui/material/Button';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useState } from 'react';

export const ColorPicker: React.FC = () => {
  const colors = useAppSelector((state) => state.products.colors);
  const [selected, setSelected] = useState([] as string[]);

  const handleClick = (color: string): void => {
    const res = selected.includes(color)
      ? [...selected].filter((item) => item !== color)
      : [...selected, color];
    setSelected(res);
  };
  return (
    <>
      <ColorLensOutlinedIcon sx={{ color: '#87a2ab' }} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-evenly',
          marginInline: 2,
          // maxWidth: '150px',
        }}
      >
        {colors.map((color) => {
          return (
            // <Button
            //   key={color}
            //   sx={{
            //     backgroundColor: `${color}`,
            //     minWidth: '25px',
            //     minHeight: '25px',
            //     borderRadius: '50%',
            //   }}
            // ></Button>
            <IconButton
              key={color}
              sx={{ border: selected.includes(color) ? `1px solid ${color}` : 'none' }}
              onClick={() => handleClick(color)}
            >
              <Fingerprint sx={{ color: `${color}` }} />
            </IconButton>
          );
        })}
      </Box>
    </>
  );
};
