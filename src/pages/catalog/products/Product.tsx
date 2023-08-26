import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { clearProduct, getProduct } from '@/store/slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { type Product } from '@commercetools/platform-sdk';
import { useEffect } from 'react';

const Product = () => {
  const { id } = useParams();
  const product = useAppSelector((state) => state.products.product);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //!product.id && navigate('error');

  console.log(product);

  const getProductToRender = (): void => {
    id && void dispatch(getProduct(id));
  };

  useEffect(() => {
    getProductToRender();
    dispatch(clearProduct());
  }, []);

  return <>{product.id && <h1>{product.name.en}</h1>}</>;
};

export default Product;
