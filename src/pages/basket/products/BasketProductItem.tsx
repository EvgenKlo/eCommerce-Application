import Price from '@/components/UI/Price';
import { type LineItem } from '@commercetools/platform-sdk';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const BasketProductItem: React.FC<{ product: LineItem }> = ({ product }) => {
  const productImage = product.variant.images && product.variant.images[0].url;
  const productName = product.name.en;

  const price = product.variant.prices && product.variant.prices[0].value.centAmount;

  const discountPrice =
    product.variant.prices && product.variant.prices[0].discounted?.value.centAmount;

  const currencyCode = product.variant.prices && product.variant.prices[0].value.currencyCode;

  return (
    <Grid
      item
      width="100%"
    >
      <Card
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          '@media (max-width: 820px)': {
            justifyContent: 'space-evenly',
          },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={productImage}
          alt={productName}
          sx={{ maxWidth: 200 }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {productName}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: 'secondary.dark', fontSize: '1.5rem', fontWeight: 700, marginRight: 1 }}
            >
              Price
            </Typography>
            <Price
              price={price}
              discountPrice={discountPrice}
              currencyCode={currencyCode}
            />
          </Box>
        </CardContent>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            Quantity in cart:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Button variant="contained">
              <Typography fontSize={20}>-</Typography>
            </Button>
            <Typography
              variant="body2"
              sx={{ padding: '0px 20px', fontSize: '2rem' }}
            >
              {product.quantity}
            </Typography>
            <Button variant="contained">
              <Typography fontSize={20}>+</Typography>
            </Button>
          </Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            Total cost:{' '}
            <span>
              {new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: product.totalPrice.currencyCode,
              }).format(product.totalPrice.centAmount)}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BasketProductItem;
