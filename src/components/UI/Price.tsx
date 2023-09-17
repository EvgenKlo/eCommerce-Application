import { Box, Typography } from '@mui/material';

const Price: React.FC<{
  price: number | undefined;
  discountPrice: number | undefined;
  currencyCode: string | undefined;
  fractionDigits: number | undefined;
}> = ({ price, discountPrice, currencyCode, fractionDigits }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {discountPrice && (
        <Typography
          variant="body2"
          sx={{ color: 'secondary.dark', fontSize: '1.5rem', fontWeight: 700 }}
        >
          {new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: currencyCode,
          }).format(discountPrice / 10 ** (fractionDigits || 0))}
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{
          textDecoration: discountPrice && 'line-through',
          color: discountPrice ? 'text.disabled' : 'secondary.dark',
          fontSize: discountPrice ? '1rem' : '1.5rem',
          fontWeight: discountPrice ? 400 : 700,
          marginLeft: 1,
        }}
      >
        {price &&
          new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: currencyCode,
          }).format(price / 10 ** (fractionDigits || 0))}
      </Typography>
    </Box>
  );
};

export default Price;
