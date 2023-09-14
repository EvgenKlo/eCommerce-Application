import { ImageListItem } from '@mui/material';

type FullWidthImageProps = {
  src: string;
  alt: string;
};

const FullWidthImage: React.FC<FullWidthImageProps> = ({ src, alt }) => {
  return (
    <ImageListItem
      sx={{
        marginBottom: '30px',
        '@media (max-width: 900px)': { marginBottom: '20px' },
        '@media (max-width: 600px)': { marginBottom: '10px' },
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
