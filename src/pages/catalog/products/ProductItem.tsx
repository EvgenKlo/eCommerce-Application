import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { Link as RouterLink } from 'react-router-dom';
import DiscountIcon from '@mui/icons-material/Discount';
import { addProductToCart } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/hooks/reduxHooks';

const ProductItem: React.FC<{ product: ProductProjection }> = ({ product }) => {
  const dispatch = useAppDispatch();
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

  const handleAddToCart: React.MouseEventHandler<HTMLButtonElement> = (event): void => {
    event.stopPropagation();
    void dispatch(addProductToCart(product.id));
  };

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
          <CardActionArea onMouseDown={handleMouseDown}>
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
              <Grid
                container
                xl={12}
                spacing={{ xs: 1 }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {discountPrice && (
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="secondary.dark"
                      fontSize="1.5rem"
                      fontWeight={700}
                      sx={{ color: 'secondary.dark', fontSize: '1.5rem', fontWeight: 700 }}
                    >
                      {new Intl.NumberFormat('en-EN', {
                        style: 'currency',
                        currency: currencyCode,
                      }).format(discountPrice)}
                    </Typography>
                  </Grid>
                )}
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: discountPrice && 'line-through',
                      color: discountPrice ? 'text.disabled' : 'secondary.dark',
                      fontSize: discountPrice ? '1rem' : '1.5rem',
                      fontWeight: discountPrice ? 400 : 700,
                    }}
                  >
                    {price &&
                      new Intl.NumberFormat('en-EN', {
                        style: 'currency',
                        currency: currencyCode,
                      }).format(price)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </RouterLink>
      <Button
        onClick={handleAddToCart}
        onMouseDown={(e) => e.stopPropagation()}
      >
        Add to Cart
      </Button>
    </Grid>
  );
};

export default ProductItem;
