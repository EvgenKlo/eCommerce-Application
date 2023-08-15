import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';
function Message(props: { setOpen: (val: string) => void; open: string }) {
  const { setOpen, open } = props;
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen('');
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Snackbar
      key={`top,center`}
      open={!!open}
      action={action}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message={open}
    />
  );
}

export default Message;
