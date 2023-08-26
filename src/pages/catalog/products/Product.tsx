import { useAppSelector } from '@/hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/UI/Loader';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';

const Product = () => {
  const { id } = useParams();

  const api = useAppSelector((state) => state.customers.apiInstance);

  const navigate = useNavigate();

  const [product, setProduct] = useState({} as ProductProjection);

  useEffect(() => {
    id &&
      void api.getProduct(id).then(({ data, error }) => {
        if (data?.id) {
          console.log(data.name);

          setProduct(data);
        } else if (error) {
          navigate('error');
        }
      });
    // eslint-disable-next-line
  }, []);

  if (!product.id) {
    return <Loader isLoading={true}></Loader>;
  }

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
      >
        {product.name.en}
      </Typography>
      <Grid container>
        <Grid item>
          <img
            src={product.masterVariant.images[0].url}
            alt=""
          />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
};

export default Product;
