import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { type Product, type ProductProjection } from '@commercetools/platform-sdk';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { Link as RouterLink } from 'react-router-dom';

const ProductItem: React.FC<{ product: ProductProjection }> = ({ product }) => {
  const imageNumber = 0;
  const language = 'en';

  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
    >
      <RouterLink to={`${product.id}`}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onMouseDown={handleMouseDown}>
            <CardMedia
              component="img"
              image={
                product.masterVariant.images?.length
                  ? `${product.masterVariant.images[imageNumber].url.split(' ').join('')}.png`
                  : 'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='
              }
              alt={product.name[language]}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {product.name[language]}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {product.description ? product.description[language] : 'No description'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {product.masterVariant.prices
                  ? product.masterVariant.prices[imageNumber].value.centAmount +
                    ' ' +
                    product.masterVariant.prices[imageNumber].value.currencyCode
                  : 'No price'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RouterLink>
    </Grid>
  );
};

export default ProductItem;
