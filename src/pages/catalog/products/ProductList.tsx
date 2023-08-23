import { Button, Grid } from '@mui/material';
import ProductItem from './ProductItem';
//import { type Product } from '@commercetools/platform-sdk';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { getProducts } from '@/store/slices/productSlice';

const ProductList = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const getProductList = (): void => {
    void dispatch(getProducts());
  };

  console.log(products);

  return (
    <>
      <Button
        variant="outlined"
        onClick={getProductList}
      >
        Load Product list
      </Button>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product, index) => (
          <ProductItem
            key={index}
            product={product}
          />
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
