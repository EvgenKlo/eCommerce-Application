import { Grid } from '@mui/material';
import ProductItem from './ProductItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import noProducts from '../../../assets/png/no-product-found.png';

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
        {products.length ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <Grid item>
            <img
              src={noProducts}
              alt="No products"
              loading="lazy"
              width="100%"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProductList;
//
