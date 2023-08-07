import { Box, Typography, Toolbar, AppBar, Link, IconButton, Button } from '@mui/material';
import { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingBasketOutlined } from '@mui/icons-material';
import React from 'react';

function Header(): ReactElement {
  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: { xs: 'flex', sm: 'flex' }, gap: 2 }}>
          <Typography
            color="#fff"
            variant="h5"
            component="div"
            sx={{ width: 100 }}
          >
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="hover"
            >
              main
            </Link>
          </Typography>
          <Typography
            color="#fff"
            variant="h5"
            component="div"
            sx={{ width: 100 }}
          >
            <Link
              component={RouterLink}
              to="/login"
              color="inherit"
              underline="hover"
            >
              login
            </Link>
          </Typography>
          <Typography
            color="#fff"
            variant="h5"
            component="div"
            sx={{ width: 100 }}
          >
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              underline="hover"
            >
              about
            </Link>
          </Typography>
          <Typography
            color="#fff"
            variant="h5"
            component="div"
            sx={{ width: 100 }}
          >
            <Link
              component={RouterLink}
              to="/registration"
              color="inherit"
              underline="hover"
            >
              registration
            </Link>
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            sx={{ color: '#ec8a59' }}
          >
            Main
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            sx={{ color: '#ec8a59' }}
          >
            About
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            sx={{ color: '#ec8a59' }}
          >
            Login
          </Button>
        </Box>
        <IconButton
          color="inherit"
          sx={{ width: '50px' }}
        >
          <ShoppingBasketOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
