import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const boxStyle = {
  marginBottom: 1,
  gap: 5,
  p: 3,
  '@media (max-width: 600px)': {
    gap: 1,
    p: 1,
  },
  '@media (max-width: 800px) and (min-width: 600px)': { gap: 2, p: 3 },
};
const iconStyle = {
  color: 'primary.main',
  mt: 0.7,
  fontSize: '32px',
  '@media (max-width: 800px) and (min-width: 600px)': { fontSize: '27px' },
  '@media (max-width: 600px)': { fontSize: '21px' },
};
const pages = [
  {
    name: 'catalog',
    url: 'catalog',
    icon: <MenuBookIcon sx={iconStyle} />,
  },
  { name: 'about', url: 'about', icon: <InfoIcon sx={iconStyle} /> },
  { name: 'log in', url: 'login', icon: <VpnKeyIcon sx={iconStyle} /> },
  { name: 'sign up', url: 'registration', icon: <AppRegistrationIcon sx={iconStyle} /> },
  { name: 'basket', url: 'basket', icon: <ShoppingBasketIcon sx={iconStyle} /> },
];

export const PagesButtons: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: 'row', md: 'row', xl: 'row' }}
        justifyContent="center"
        alignItems="center"
        sx={boxStyle}
        flexWrap="wrap"
      >
        {pages.map((page, index) => (
          <Link
            to={`/${page.url}`}
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <Card
              key={index}
              sx={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                bgcolor: '#FFF0F8',
                transition: 'all 0.3s',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#edc6da',
                boxShadow: 3,
                '&:hover': { boxShadow: 10, transform: 'scale(1.09)' },
                '@media (max-width: 800px) and (min-width: 600px)': {
                  width: '72px',
                  height: '72px',
                },
                '@media (max-width: 600px)': { width: '59px', height: '59px' },
              }}
            >
              <CardContent sx={{ pb: 0, pt: 0.6, m: 0 }}>
                <IconButton
                  disableRipple={true}
                  key={index}
                  sx={{
                    bgcolor: '#FFF0F8',
                    p: 0,
                    m: 0,
                    mt: 0.5,
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  {page.icon}
                </IconButton>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#666666',
                    '@media (max-width: 800px) and (min-width: 600px)': { fontSize: '12px' },
                    '@media (max-width: 600px)': { fontSize: '8px' },
                  }}
                >
                  {page.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
};
