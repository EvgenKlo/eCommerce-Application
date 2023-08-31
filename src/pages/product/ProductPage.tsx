import { useAppSelector } from '@/hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/UI/Loader';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ProductModalWindow } from './ProductModalWindow';
import DiscountIcon from '@mui/icons-material/Discount';

const ProductPage = () => {
  const { id } = useParams();

  const api = useAppSelector((state) => state.customers.apiInstance);

  const navigate = useNavigate();

  const [product, setProduct] = useState({} as ProductProjection);

  const [openModalWindow, setOpenModalWindow] = useState(false);

  const handleOpen = () => setOpenModalWindow(true);

  useEffect(() => {
    id &&
      void api.getProduct(id).then(({ data, error }) => {
        if (data?.id) {
          setProduct(data);
        } else if (error) {
          navigate('error');
        }
      });
  }, []);

  if (!product.id) {
    return <Loader isLoading={true}></Loader>;
  }

  const noImage =
    'https://cdn.discordapp.com/attachments/1128421935286599820/1144219455061250108/icon-image-not-found-free-vector.png';

  const images: ReactImageGalleryItem[] = product.masterVariant.images?.length
    ? product.masterVariant.images?.map((image) => {
        return {
          original: image.url,
          thumbnail: image.url,
          originalHeight: 400,
          originalAlt: product.name.en,
          thumbnailAlt: product.name.en,
          originalClass: 'slider-img',
        };
      })
    : [
        {
          original: noImage,
          thumbnail: noImage,
        },
      ];

  const priceNumber = 0;

  const price =
    product.masterVariant.prices && product.masterVariant.prices[priceNumber].value.centAmount;

  const discountPrice =
    product.masterVariant.prices &&
    product.masterVariant.prices[priceNumber].discounted?.value.centAmount;

  const currencyCode =
    product.masterVariant.prices && product.masterVariant.prices[priceNumber].value.currencyCode;

  return (
    <Container>
      <Grid container>
        <Grid
          item
          sx={{ width: { xs: '100%', sm: '50%' }, marginBottom: { xs: '1rem', sm: '0' } }}
        >
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={
              product.masterVariant.images?.length && product.masterVariant.images?.length > 1
                ? true
                : false
            }
            onClick={handleOpen}
          />
        </Grid>
        <Grid
          item
          sx={{ width: { xs: '100%', sm: '50%' } }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, marginBottom: '1rem' }}
          >
            {product.name.en}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: '1rem' }}
          >
            {product.description?.en}
          </Typography>
          {product.masterVariant.attributes?.map((attribute) => {
            const value = attribute.value as { en: string };
            return (
              <Typography
                variant="body1"
                key={attribute.name}
              >
                {`${attribute.name} - ${value.en}`}
              </Typography>
            );
          })}
          <Grid
            container
            xl={12}
            spacing={{ xs: 1 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              sx={{ position: 'relative' }}
            >
              <Typography
                variant="body2"
                color="secondary.dark"
                fontSize="1.5rem"
                fontWeight={700}
                sx={{ color: 'secondary.dark', fontSize: '1.5rem', fontWeight: 700 }}
              >
                Price
              </Typography>
            </Grid>
            {discountPrice && (
              <Grid
                item
                sx={{ position: 'relative' }}
              >
                <DiscountIcon
                  sx={{
                    position: 'absolute',
                    color: 'info.main',
                    bottom: -28,
                    right: -28,
                    zIndex: 10,
                    fontSize: '2rem',
                    display: discountPrice ? 'block' : 'none',
                  }}
                />
                <Typography
                  variant="body2"
                  color="secondary.dark"
                  fontSize="1.5rem"
                  fontWeight={700}
                  sx={{ color: 'secondary.dark', fontSize: '1.5rem', fontWeight: 700 }}
                >
                  {new Intl.NumberFormat('en-EN', {
                    style: 'currency',
                    currency: currencyCode,
                  }).format(discountPrice)}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: discountPrice && 'line-through',
                  color: discountPrice ? 'text.disabled' : 'secondary.dark',
                  fontSize: discountPrice ? '1rem' : '1.5rem',
                  fontWeight: discountPrice ? 400 : 700,
                }}
              >
                {price &&
                  new Intl.NumberFormat('en-EN', {
                    style: 'currency',
                    currency: currencyCode,
                  }).format(price)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ProductModalWindow
        openModalWindow={openModalWindow}
        setOpenModalWindow={setOpenModalWindow}
        product={product}
      />
    </Container>
  );
};

export default ProductPage;
