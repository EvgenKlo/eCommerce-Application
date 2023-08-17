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
import { COLORS } from '@/GlobalVariables';

const styleLinks = {
  color: COLORS.light,
  fontSize: '0.9rem',
  marginX: 1,
  '&:hover': {
    color: COLORS.ligthOrange,
    transition: 'color 0.3s ease-in-out',
  },
  '@media (max-width: 400px)': {
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
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          <RouterLink
            to="/"
            style={{
              textDecoration: 'none',
              color: location.pathname === '/' ? COLORS.ligthOrange : COLORS.light,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                '&:hover': {
                  color: COLORS.ligthOrange,
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
              color="inherit"
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
                      style={{
                        textAlign: 'center',
                        width: '100px',
                        ...styleLinks,
                        color:
                          location.pathname === (page === 'Home' ? '/' : `/${page.toLowerCase()}`)
                            ? COLORS.ligthOrange
                            : COLORS.violet,
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
                      ? COLORS.ligthOrange
                      : COLORS.light,
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
                      colorHoverLinks: COLORS.light,
                      color: location.pathname === link.link ? COLORS.ligthOrange : COLORS.light,
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
              <IconButton
                onMouseDown={handleMouseDown}
                color="inherit"
                sx={{ p: 0 }}
              >
                <Badge color="secondary">
                  <ShoppingBasketIcon
                    sx={{
                      margin: '0 10px',
                      '&:hover': {
                        color: 'info.main',
                        transition: 'color 0.3s ease-in-out',
                      },
                      '@media (max-width: 400px)': {
                        margin: 0,
                      },
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>

            {authorized && (
              <>
                <Tooltip title="Profile">
                  <IconButton onMouseDown={handleMouseDown}>
                    <PersonIcon
                      sx={{
                        color: 'white',
                        '&:hover': {
                          color: COLORS.green,
                          transition: 'color 0.3s ease-in-out',
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Exit">
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
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
