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
        //columns={{ xs: 2, sm: 4, md: 12 }}
        padding={2}
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
