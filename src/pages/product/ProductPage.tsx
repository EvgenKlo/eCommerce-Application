import { useAppSelector } from '@/hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/UI/Loader';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductPage = () => {
  const { id } = useParams();

  const api = useAppSelector((state) => state.customers.apiInstance);

  const navigate = useNavigate();

  const [product, setProduct] = useState({} as ProductProjection);

  useEffect(() => {
    id &&
      void api.getProduct(id).then(({ data, error }) => {
        if (data?.id) {
          setProduct(data);
        } else if (error) {
          navigate('error');
        }
      });
    // eslint-disable-next-line
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
        };
      })
    : [
        {
          original: noImage,
          thumbnail: noImage,
        },
      ];

  console.log(product);

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
          {product.masterVariant.attributes?.map((attribute) => (
            <Typography
              variant="body1"
              key={attribute.name}
            >
              {/* eslint-disable-next-line */}
              {`${attribute.name} - ${attribute.value ? attribute.value.en : attribute.value}`}
            </Typography>
          ))}
          <Typography
            variant="body1"
            sx={{ marginTop: '1rem' }}
          >
            {product.masterVariant.prices?.length &&
              'Price ' +
                new Intl.NumberFormat('en-EN', {
                  style: 'currency',
                  currency: product.masterVariant.prices[0].value.currencyCode,
                }).format(product.masterVariant.prices[0].value.centAmount)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
