import { Button, Paper, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const pages = [
  { name: 'catalog', icon: <MenuBookIcon /> },
  { name: 'about', icon: <InfoIcon /> },
  { name: 'login', icon: <VpnKeyIcon /> },
  { name: 'registration', icon: <AppRegistrationIcon /> },
  { name: 'basket', icon: <ShoppingBasketIcon /> },
];

export const PagesButtons: React.FC = () => {
  return (
    <>
      {pages.map((page, index) => (
        <Card
          key={index}
          sx={{ transition: 'all 0.3s', '&:hover': { boxShadow: 10, transform: 'scale(1.05)' } }}
        >
          <CardContent>
            <IconButton>{page.icon}</IconButton>
            <Typography variant="h6">{page.name}</Typography>
          </CardContent>
          <Button
            key={index}
            variant="contained"
            sx={{ margin: '1rem', '&:hover': { color: 'secondary.main' } }}
            component={Link}
            to={`/${page.name}`}
          >
            {`Go to ${page.name} Page`}
          </Button>
        </Card>
      ))}
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 1,
          pt: 2,
          m: 0,
        }}
      ></Paper>
    </>
  );
};
