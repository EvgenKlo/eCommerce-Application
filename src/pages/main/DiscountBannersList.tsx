import { Typography, Box } from '@mui/material';
import FullWidthImage from './FullWidthImage';
import bannerCode10Perсent from '/src/assets/banners/banner-code1.png';
import bannerCode10Euro from '/src/assets/banners/banner-code2.png';
import bannerDiscound30Perсent from '/src/assets/banners/banner3.png';
import bannerDiscound15Perсent from '/src/assets/banners/banner4.png';
import bannerDiscound20Perсent from '/src/assets/banners/banner5.png';

const banners = [
  { src: `${bannerCode10Perсent}`, alt: 'banner-code-10-perсent' },
  { src: `${bannerCode10Euro}`, alt: 'banner-code-10-euro' },
  { src: `${bannerDiscound30Perсent}`, alt: 'banner-discound-30-perсent' },
  { src: `${bannerDiscound15Perсent}`, alt: 'banner-discound-15-perсent' },
  { src: `${bannerDiscound20Perсent}`, alt: 'banner-discound-20-perсent' },
];

export const DiscountBannersList: React.FC = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: '25px',
          fontSize: '27px',
          '@media (max-width: 900px)': { marginBottom: '15px', fontSize: '25px' },
          '@media (max-width: 600px)': { marginBottom: '10px', fontSize: '20px' },
        }}
      >
        Our offers and discounts:
      </Typography>
      <Box>
        {banners.map((banner) => (
          <FullWidthImage
            key={banner.alt}
            src={banner.src}
            alt={banner.alt}
          />
        ))}
      </Box>
    </>
  );
};
