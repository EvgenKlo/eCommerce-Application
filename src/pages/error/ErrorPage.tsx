import NotFoundImage from '../../assets/not-found/not-found-cat.svg';
import { Typography, Card, CardMedia, Grid, Box } from '@mui/material';

export const ErrorPage: React.FC = () => {
  return (
    <Box alignItems="center">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Typography
            variant="h4"
            gutterBottom
          >
            404 - Page Not Found
          </Typography>
          <Typography>Sorry, the page you are looking for does not exist.</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
        >
          <Card>
            <CardMedia
              component="img"
              image={NotFoundImage}
              alt="page-not-found-cat"
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
