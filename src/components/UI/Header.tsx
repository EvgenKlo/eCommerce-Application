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
import { Link as RouterLink, useLocation } from 'react-router-dom';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { signOut } from '@/store/slices/customerSlice';
import { logoutProps } from '@/types/components';
import { handleMouseDown } from '@/helpers/handleMouseDown';

const styleLinks = {
  color: 'background.default',
  fontSize: '0.9rem',
  marginX: 1,
  '&:hover': {
    color: 'secondary.main',
    transition: 'color 0.3s ease-in-out',
  },
  '@media (max-width: 415px)': {
    padding: 0,
    marginRight: '10px',
    fontSize: '0.75rem',
    marginLeft: '0px',
  },
};

const pages = ['Home', 'Catalog', 'About'];

const signLinks = [
  { text: 'Log in', link: '/login' },
  { text: 'Sign up', link: '/registration' },
];

export const Header: React.FC<logoutProps> = (props) => {
  const { logout } = props;

  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const authorized = useAppSelector((state) => state.customers.authorized);
  const dispatch = useAppDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleExit = () => {
    dispatch(signOut());
    logout(false);
    localStorage.removeItem('tokendata');
  };

  return (
    <AppBar
      position="absolute"
      sx={{ width: '100%' }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <RouterLink to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: location.pathname === '/' ? 'secondary.main' : 'background.default',
                '&:hover': {
                  color: 'secondary.main',
                  transition: 'color 0.3s ease-in-out',
                },
              }}
            >
              <PetsIcon
                fontSize="small"
                sx={{ marginTop: '4px', marginRight: '5px' }}
              />
              PetJoy
            </Typography>
          </RouterLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              onMouseDown={handleMouseDown}
              onClick={handleOpenNavMenu}
              size="large"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              color={anchorElNav ? 'secondary' : 'inherit'}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="mobile-menu"
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
                  <RouterLink to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        width: '100px',
                        ...styleLinks,
                        color:
                          location.pathname === (page === 'Home' ? '/' : `/${page.toLowerCase()}`)
                            ? 'secondary.main'
                            : 'primary.main',
                      }}
                    >
                      {page.toUpperCase()}
                    </Typography>
                  </RouterLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  ...styleLinks,
                  color:
                    location.pathname === (page === 'Home' ? '/' : `/${page.toLowerCase()}`)
                      ? 'secondary.main'
                      : 'background.default',
                }}
                component={RouterLink}
                to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' }}>
            {signLinks.map((link) => {
              if (!authorized) {
                return (
                  <Button
                    key={link.text}
                    onClick={handleCloseNavMenu}
                    sx={{
                      ...styleLinks,
                      colorHoverLinks: 'background.default',
                      color:
                        location.pathname === link.link ? 'secondary.main' : 'background.default',
                      border: link.text === 'Sign up' ? 1 : null,
                    }}
                    component={RouterLink}
                    to={link.link}
                  >
                    {link.text}
                  </Button>
                );
              }
            })}

            <Tooltip title="Open cart">
              <RouterLink to={'/basket'}>
                <IconButton
                  onMouseDown={handleMouseDown}
                  sx={{
                    color: 'background.default',
                    '&:hover': {
                      color: 'info.main',
                      transition: 'color 0.3s ease-in-out',
                    },
                    '@media (max-width: 400px)': {
                      margin: 0,
                    },
                  }}
                >
                  <Badge>
                    <ShoppingBasketIcon />
                  </Badge>
                </IconButton>
              </RouterLink>
            </Tooltip>

            {authorized && (
              <>
                <Tooltip title="Profile">
                  <RouterLink to={'/profile'}>
                    <IconButton onMouseDown={handleMouseDown}>
                      <PersonIcon
                        sx={{
                          color: location.pathname === '/profile' ? 'info.main' : 'white',
                          '&:hover': {
                            color: 'info.main',
                            transition: 'color 0.3s ease-in-out',
                          },
                        }}
                      />
                    </IconButton>
                  </RouterLink>
                </Tooltip>
                <Tooltip title="Exit">
                  <RouterLink to={'/'}>
                    <IconButton
                      onMouseDown={handleMouseDown}
                      color="secondary"
                      onClick={handleExit}
                    >
                      <LogoutIcon
                        sx={{
                          '&:hover': {
                            color: 'red',
                            transition: 'color 0.3s ease-in-out',
                          },
                          '@media (max-width: 400px)': {
                            padding: '0px',
                          },
                        }}
                      />
                    </IconButton>
                  </RouterLink>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
