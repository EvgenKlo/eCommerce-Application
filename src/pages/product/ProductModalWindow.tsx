import { type ProductProjection } from '@commercetools/platform-sdk';
import { Box, Button, Modal } from '@mui/material';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import CloseIcon from '@mui/icons-material/Close';
import { handleMouseDown } from '@/helpers/handleMouseDown';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 1,
};

export const ProductModalWindow: React.FC<{
  openModalWindow: false | true;
  setOpenModalWindow: React.Dispatch<React.SetStateAction<false | true>>;
  product: ProductProjection;
}> = ({ openModalWindow, setOpenModalWindow, product }) => {
  const noImage =
    'https://cdn.discordapp.com/attachments/1128421935286599820/1144219455061250108/icon-image-not-found-free-vector.png';

  const images: ReactImageGalleryItem[] = product.masterVariant.images?.length
    ? product.masterVariant.images?.map((image) => {
        return {
          original: image.url,
          thumbnail: image.url,
          originalHeight: 700,
          originalAlt: product.name.en,
          thumbnailAlt: product.name.en,
        };
      })
    : [
        {
          original: noImage,
          thumbnail: noImage,
        },
      ];

  const handleClose = () => setOpenModalWindow(false);

  return (
    <>
      <Modal
        open={openModalWindow}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageGallery
            items={images}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={
              product.masterVariant.images?.length && product.masterVariant.images?.length > 1
                ? true
                : false
            }
          />
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
    </>
  );
};
