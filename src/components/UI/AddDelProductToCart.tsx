import { handleMouseDown } from '@/helpers/handleMouseDown';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addProductToCart, changeProductQuantityInCart } from '@/store/slices/cartSlice';
import { Button } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { changeSnackbarInfo } from '@/store/slices/customerSlice';

const AddDelProductToCart: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    void dispatch(addProductToCart(id));
    dispatch(changeSnackbarInfo({ name: 'Product added to cart', message: '' }));
  };

  const cart = useAppSelector((state) => state.carts.cart);

  const idCartProduct = cart.lineItems.find((item) => item.productId === id);

  const removeFromCart = () => {
    idCartProduct &&
      void dispatch(changeProductQuantityInCart({ productId: idCartProduct.id, quantity: 0 }));
    dispatch(changeSnackbarInfo({ name: 'Product removed from cart', message: '' }));
  };

  return (
    <>
      {idCartProduct ? (
        <Button
          variant="contained"
          color="info"
          onClick={(e) => {
            e.preventDefault();
            removeFromCart();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleMouseDown(e);
          }}
        >
          Remove from{' '}
          <span>
            <RemoveShoppingCartIcon />
          </span>
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleMouseDown(e);
          }}
        >
          Add to{' '}
          <span>
            <ShoppingCartIcon />
          </span>
        </Button>
      )}
    </>
  );
};

export default AddDelProductToCart;
