import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { Link as RouterLink } from 'react-router-dom';
import DiscountIcon from '@mui/icons-material/Discount';
import Price from '@/components/UI/Price';
import AddDelProductToCart from '@/components/UI/AddDelProductToCart';

const ProductItem: React.FC<{ product: ProductProjection }> = ({ product }) => {
  const imageOrPriceNumber = 0;
  const language = 'en';

  const price =
    product.masterVariant.prices &&
    product.masterVariant.prices[imageOrPriceNumber].value.centAmount;

  const discountPrice =
    product.masterVariant.prices &&
    product.masterVariant.prices[imageOrPriceNumber].discounted?.value.centAmount;

  const currencyCode =
    product.masterVariant.prices &&
    product.masterVariant.prices[imageOrPriceNumber].value.currencyCode;

  const fractionDigits =
    product.masterVariant.prices &&
    product.masterVariant.prices[imageOrPriceNumber].value.fractionDigits;

  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      sx={{
        position: 'relative',
      }}
    >
      <RouterLink to={`${product.id}`}>
        <DiscountIcon
          sx={{
            position: 'absolute',
            color: 'info.main',
            top: 30,
            right: -25,
            zIndex: 10,
            fontSize: '4rem',
            display: discountPrice ? 'block' : 'none',
          }}
        />
        <Card
          sx={{ transition: 'all 0.3s', '&:hover': { boxShadow: 10, transform: 'scale(1.05)' } }}
        >
          <CardMedia
            component="img"
            image={
              product.masterVariant.images?.length
                ? `${product.masterVariant.images[imageOrPriceNumber].url}`
                : 'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='
            }
            alt={product.name[language]}
            sx={{ maxHeight: 250, minHeight: 250 }}
          />
          <CardContent sx={{ bgcolor: '#bb9ebb4d' }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
            >
              {`${product.name[language].slice(0, 20)}`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
            >
              {product.description
                ? `${product.description[language].slice(0, 40)}...`
                : 'No description'}
            </Typography>
            <Price
              price={price}
              discountPrice={discountPrice}
              currencyCode={currencyCode}
              fractionDigits={fractionDigits}
            />
            <AddDelProductToCart id={product.id} />
          </CardContent>
        </Card>
      </RouterLink>
    </Grid>
  );
};

export default ProductItem;
