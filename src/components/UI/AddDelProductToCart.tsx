import { handleMouseDown } from '@/helpers/handleMouseDown';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addProductToCart, changeProductQuantityInCart } from '@/store/slices/cartSlice';
import { Button } from '@mui/material';

const AddDelProductToCart: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    void dispatch(addProductToCart(id));
  };

  const cart = useAppSelector((state) => state.carts.cart);

  const idCartProduct = cart.lineItems.find((item) => item.productId === id);

  const removeFromCart = () => {
    idCartProduct &&
      void dispatch(changeProductQuantityInCart({ productId: idCartProduct.id, quantity: 0 }));
  };

  return (
    <>
      {idCartProduct ? (
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            removeFromCart();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e);
          }}
        >
          Remove from Cart
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e);
          }}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddDelProductToCart;
