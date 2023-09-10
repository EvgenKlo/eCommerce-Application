import { handleMouseDown } from '@/helpers/handleMouseDown';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addProductToCart, changeProductQuantityInCart, setLoader } from '@/store/slices/cartSlice';
import { Button } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AddDelProductToCart: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(setLoader());
    void dispatch(addProductToCart(id));
  };

  const cart = useAppSelector((state) => state.carts.cart);

  const idCartProduct = cart.lineItems
    ? cart.lineItems.find((item) => item.productId === id)
    : false;

  const removeFromCart = () => {
    dispatch(setLoader());
    idCartProduct &&
      void dispatch(changeProductQuantityInCart({ productId: idCartProduct.id, quantity: 0 }));
  };

  return (
    <>
      {idCartProduct ? (
        <Button
          variant="contained"
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
          color="info"
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
