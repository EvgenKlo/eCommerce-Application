import React from 'react';
import { ImageListItem } from '@mui/material';

interface FullWidthImageProps {
  src: string;
  alt: string;
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({ src, alt }) => {
  return (
    <ImageListItem
      sx={{
        marginBottom: '25px',
        '@media (max-width: 900px)': { marginBottom: '10px' },
        '@media (max-width: 600px)': { marginBottom: '8px' },
      }}
    >
      <img
        width="100%"
        height="auto"
        src={src}
        alt={alt}
      />
    </ImageListItem>
  );
};

export default FullWidthImage;
