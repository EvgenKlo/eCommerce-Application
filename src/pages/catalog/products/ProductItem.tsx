import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { type Product } from '@commercetools/platform-sdk';
import { handleMouseDown } from '@/helpers/handleMouseDown';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const imageNumber = 0;
  const language = 'en';

  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onMouseDown={handleMouseDown}>
          <CardMedia
            component="img"
            height="140"
            //image={product.masterData.current.masterVariant.images[imageNumber].url}
            //alt={product.masterData.current.description[language]}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {/* {product.masterData.current.name[language]} */}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {/* {product.masterData.current.description[language]} */}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {/* {product.masterData.current.masterVariant.price.value} */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductItem;
