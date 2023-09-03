import { useAppSelector } from '@/hooks/reduxHooks';
import { Box, Button, Container, Modal } from '@mui/material';
import ProductList from './products/ProductList';
import { ActiveFilters } from '@/pages/catalog/filters/ActiveFilters';
import { Loader } from '@/components/UI/Loader';
import { Toolbar } from './filters/Toolbar';
import { BreadCrumbs } from './filters/Breadcrumbs';
import { Filters } from './filters/Filters';
import { useState } from 'react';
import { handleMouseDown } from '@/helpers/handleMouseDown';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  bgcolor: '#f6f3f7',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  height: '100%',
};

export const CatalogPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Button
        sx={{ display: { xs: 'flex', sm: 'none' } }}
        onClick={handleOpen}
      >
        Filters
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Filters />
          <Button
            sx={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}
            onMouseDown={handleMouseDown}
            onClick={handleClose}
          >
            <CloseIcon sx={{ width: '100%', height: '100%' }}></CloseIcon>
          </Button>
        </Box>
      </Modal>
      <BreadCrumbs />
      <ActiveFilters />
      <Container sx={{ display: 'flex' }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Filters />
        </Box>
        <Box>
          <Toolbar />
          <ProductList />
        </Box>
      </Container>
    </Container>
  );
};
