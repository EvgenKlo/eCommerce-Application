import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { type Product } from '@commercetools/platform-sdk';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { Link as RouterLink } from 'react-router-dom';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const imageNumber = 0;
  const language = 'en';
  //console.log(product);

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
                product.masterData.current.masterVariant.images?.length
                  ? `${product.masterData.current.masterVariant.images[imageNumber].url
                      .split(' ')
                      .join('')}.png`
                  : 'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='
              }
              alt={product.masterData.current.name[language]}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {product.masterData.current.name[language]}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {product.masterData.current.description
                  ? product.masterData.current.description[language]
                  : 'No description'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {product.masterData.current.masterVariant.prices
                  ? product.masterData.current.masterVariant.prices[imageNumber].value.centAmount +
                    ' ' +
                    product.masterData.current.masterVariant.prices[imageNumber].value.currencyCode
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
