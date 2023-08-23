import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getProduct } from '@/store/slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { type Product } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

const Product = () => {
  const { id } = useParams();
  const product = useAppSelector((state) => state.products.product);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(product);

  const getProductToRender = (): void => {
    id && void dispatch(getProduct(id));
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={getProductToRender}
      >
        Load Product
      </Button>
      {product.id && <h1>{product.masterData.current.name.en}</h1>}
    </>
  );
};

export default Product;
