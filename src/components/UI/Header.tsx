import React from 'react';
import {
  AppBar,
  Badge,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import PetsIcon from '@mui/icons-material/Pets';

const styleSighLinks = {
  color: '#ffffff',
  fontSize: '0.9rem',
  marginX: 1,
  '&:hover': {
    color: '#FF8C00',
  },
};

const pages = ['Catalog', 'About', 'Main', 'Profile'];

const signLinks = [
  { text: 'Sign in', link: '/login' },
  { text: 'Sign up', link: '/registration' },
];

export function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="absolute"
      sx={{ width: '100%' }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: '#e6a8d5',
                transition: 'color 0.1s ease-in-out',
              },
            }}
          >
            <PetsIcon
              fontSize="small"
              sx={{ marginTop: '4px', marginRight: '5px' }}
            />
            PetJoy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Button
                    component={RouterLink}
                    to={page === 'Main' ? '/' : `/${page.toLowerCase()}`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: '#e6a8d5',
                transition: 'color 0.1s ease-in-out',
              },
            }}
          >
            <PetsIcon
              fontSize="small"
              sx={{ marginTop: '4px', marginRight: '5px' }}
            />
            PetJoy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={styleSighLinks}
                component={RouterLink}
                to={page === 'Main' ? '/' : `/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' }}>
            {signLinks.map((link) => (
              <Button
                key={link.text}
                onClick={handleCloseNavMenu}
                sx={styleSighLinks}
                component={RouterLink}
                to={link.link}
              >
                {link.text}
              </Button>
            ))}

            <Tooltip title="Open cart">
              <IconButton
                color="inherit"
                sx={{ p: 0 }}
              >
                <Badge color="secondary">
                  <ShoppingBasketIcon
                    sx={{
                      marginRight: '10px',
                      '&:hover': {
                        color: '#04B431',
                        transition: 'color 0.3s ease-in-out',
                      },
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Exit">
              <IconButton color="secondary">
                <LogoutIcon
                  sx={{
                    '&:hover': {
                      color: 'red',
                      transition: 'color 0.3s ease-in-out',
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
