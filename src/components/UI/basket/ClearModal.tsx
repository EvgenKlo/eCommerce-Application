import { Box, Button, Modal, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { clearCart, setLoader } from '@/store/slices/cartSlice';
import { type CartChangeLineItemQuantityAction } from '@commercetools/platform-sdk';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  boxSizing: 'border-box',
  display: 'flex',
};

const ClearModal: React.FC<{
  open: false | true;
  setOpen: React.Dispatch<React.SetStateAction<false | true>>;
}> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const cart = useAppSelector((state) => state.carts.cart);

  const dispatch = useAppDispatch();

  const clearBasket = () => {
    const actions = cart.lineItems.map((item) => {
      return {
        action: 'changeLineItemQuantity',
        lineItemId: item.id,
        quantity: 0,
      };
    });
    dispatch(setLoader());
    void dispatch(clearCart(actions as CartChangeLineItemQuantityAction[]));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <WarningIcon
          color="secondary"
          sx={{ textAlign: 'end', fontSize: '7rem' }}
        />
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            display={'flex'}
            textAlign={'center'}
            marginBottom={3}
          >
            Are you sure you want to empty the cart?
          </Typography>
          <Button
            variant="contained"
            color="info"
            sx={{ marginRight: 2 }}
            onMouseDown={handleMouseDown}
            onClick={clearBasket}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onMouseDown={handleMouseDown}
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ClearModal;
