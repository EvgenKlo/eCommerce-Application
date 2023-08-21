import { Grid } from '@mui/material';
import ProductItem from './ProductItem';
import { type Product } from '@commercetools/platform-sdk';

const ProductList = () => {
  const products = Array(9) as Product[];

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {Array.from(products).map((product, index) => (
        <ProductItem
          key={index}
          product={product}
        />
      ))}
    </Grid>
  );
};

export default ProductList;
