import { useAppSelector } from '@/hooks/reduxHooks';
import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

const Message = () => {
  const snackbarInfo = useAppSelector((state) => state.customers.snackbarInfo);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!snackbarInfo.massage || !!snackbarInfo.errorMassage) {
      setOpen(true);
    }
  }, [snackbarInfo]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      data-testId={'massage'}
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarInfo.errorMassage ? 'error' : 'success'}
        sx={{ width: '100%' }}
      >
        {snackbarInfo.errorMassage ? snackbarInfo.errorMassage : `${snackbarInfo.massage}`}
      </Alert>
    </Snackbar>
  );
};

export default Message;
