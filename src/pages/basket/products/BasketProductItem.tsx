import Price from '@/components/UI/Price';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { changeProductQuantityInCart, setLoader } from '@/store/slices/cartSlice';
import { type LineItem } from '@commercetools/platform-sdk';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const BasketProductItem: React.FC<{ product: LineItem }> = ({ product }) => {
  const productImage = product.variant.images && product.variant.images[0].url;
  const productName = product.name.en;

  const price = !!product.price.discounted
    ? product.price.discounted.value.centAmount
    : product.variant.prices && product.variant.prices[0].value.centAmount;

  // const discountPrice = product.discountedPricePerQuantity.length
  //   ? product.discountedPricePerQuantity[0].discountedPrice.value.centAmount
  //   : product.variant.prices
  //   ? product.variant.prices[0].discounted?.value.centAmount
  //   : undefined;
  const discountPrice = product.discountedPricePerQuantity.length
    ? product.discountedPricePerQuantity[0].discountedPrice.value.centAmount
    : undefined;
  //   product.variant.prices && product.variant.prices[0].discounted?.value.centAmount;

  const currencyCode = product.variant.prices && product.variant.prices[0].value.currencyCode;

  const fractionDigits = product.variant.prices && product.variant.prices[0].value.fractionDigits;

  const dispatch = useAppDispatch();

  const handleAddToCart = (quantity: number): void => {
    dispatch(setLoader());
    void dispatch(changeProductQuantityInCart({ productId: product.id, quantity }));
  };

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
            margin: 'auto',
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
              // discountPrice={product.discountedPricePerQuantity[0].discountedPrice.value.centAmount}
              currencyCode={currencyCode}
              fractionDigits={fractionDigits}
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
            <Button
              variant="contained"
              onClick={() => handleAddToCart(product.quantity - 1)}
            >
              <Typography fontSize={20}>-</Typography>
            </Button>
            <Typography
              variant="body2"
              sx={{ padding: '0px 20px', fontSize: '2rem' }}
            >
              {product.quantity}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleAddToCart(product.quantity + 1)}
            >
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
              }).format(product.totalPrice.centAmount / 10 ** (fractionDigits || 0))}
            </span>
          </Typography>
        </CardContent>
        <CardContent>
          <Button
            variant="contained"
            onClick={() => handleAddToCart(0)}
          >
            Delete product
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BasketProductItem;
