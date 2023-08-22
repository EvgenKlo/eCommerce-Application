import { useAppDispatch } from '@/hooks/reduxHooks';
import { getProduct } from '@/store/slices/productSlice';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Product } from '@commercetools/platform-sdk';
import { error } from 'console';

const Product = () => {
  const { key } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({} as Product);

  useEffect(() => {
    if (key) {
      void dispatch(getProduct(key))
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }, [key]);

  return <>{}</>;
};

export default Product;
