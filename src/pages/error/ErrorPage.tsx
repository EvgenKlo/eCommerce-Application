import { Link } from 'react-router-dom';
// import NotFoundImage from '../../assets/not-found/not-found-cat.svg';
import { Typography, Grid, Box, Button } from '@mui/material';
import { CatSvg } from '@/components/UI/CatSvg';
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
          <CatSvg />
        </Grid>
      </Grid>
      <Button
        component={Link}
        to={'/'}
        variant="contained"
        sx={{ margin: '2rem', '&:hover': { color: 'secondary.main' } }}
      >
        Go back to main page
      </Button>
    </Box>
  );
};
