import { Grid } from '@mui/material';
import ProductItem from './ProductItem';
import { useAppSelector } from '@/hooks/reduxHooks';

const ProductList = () => {
  const products = useAppSelector((state) => state.products.products);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        padding={2}
        height="100%"
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
