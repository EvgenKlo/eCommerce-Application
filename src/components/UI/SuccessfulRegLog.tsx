import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Alert, Snackbar } from '@mui/material';
import { cleanSnackbarInfo } from '@/store/slices/customerSlice';

const SuccessfulRegLog = () => {
  const snackbarInfo = useAppSelector((state) => state.customers.snackbarInfo);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(cleanSnackbarInfo());
  };

  return (
    <Snackbar
      open={!!snackbarInfo.name || !!snackbarInfo.errorMassage}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarInfo.errorMassage ? 'error' : 'success'}
        sx={{ width: '100%' }}
      >
        {snackbarInfo.errorMassage
          ? snackbarInfo.errorMassage
          : `Successful authorization. Hello ${snackbarInfo.name}`}
      </Alert>
    </Snackbar>
  );
};

export default SuccessfulRegLog;
