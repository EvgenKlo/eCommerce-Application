import { Button, Grid } from '@mui/material';
import ProductItem from './ProductItem';
//import { type Product } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getProducts } from '@/store/slices/productSlice';
//import { useEffect } from 'react';

const ProductList = () => {
  const products = useAppSelector((state) => state.products.products);

  // const dispatch = useAppDispatch();

  // const getProductList = (): void => {
  //   void dispatch(getProducts());
  // };

  /* useEffect(() => {
    void dispatch(getCategories());
  }, [products]); */

  return (
    <>
      {/* <Button
        variant="outlined"
        onClick={getProductList}
      >
        Load Product list
      </Button> */}
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
