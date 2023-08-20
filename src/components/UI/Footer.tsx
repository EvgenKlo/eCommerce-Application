import React, { useEffect, useState } from 'react';
import { Link, Box, Container, AppBar, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { useAppSelector } from '@/hooks/reduxHooks';

export const Footer: React.FC = () => {
  const authorized = useAppSelector((state) => state.customers.authorized);
  const [open, setOpen] = useState(false);
  const developers = ['EvgenKlo', 'lidasharova', 'fasty86'];

  const boxStyle = {
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  };
  useEffect(() => {
    if (authorized) setOpen(true);
  }, [authorized]);
  const linkStyles = {
    textDecoration: 'none',
    '&:hover': {
      transition: 'color 0.3s ease-in-out',
      color: 'secondary.main',
    },
  };
  const handleClick = () => {
    setOpen(false);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box>
        <AppBar position="static">
          <Container>
            <Box
              sx={{
                display: 'grid',
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: 'repeat(3, 1fr)',
                '@media (max-width: 500px)': {
                  gridTemplateColumns: '1fr',
                  rowGap: 2,
                },
              }}
            >
              <Box sx={boxStyle}>
                <PlaceIcon style={{ color: 'white' }} />
                <Link
                  sx={{
                    ...linkStyles,
                    color: 'white',
                  }}
                  variant="body1"
                  target="_blank"
                  href="https://www.google.com/maps/@34.035897,-118.3307848,3a,75y,3.58h,85.44t/data=!3m6!1e1!3m4!1s_Ran1t5GhSHiydc8I5iShw!2e0!7i16384!8i8192?entry=ttu"
                >
                  12 Avenu st., Los Angeles
                </Link>
              </Box>
              <Box sx={boxStyle}>
                <Link
                  sx={{
                    ...linkStyles,
                    color: 'white',
                  }}
                  variant="body1"
                  href="tel:+1234567890"
                >
                  +6 (234)-567-8903
                </Link>
              </Box>
              <Box sx={boxStyle}>
                <Link
                  sx={{
                    ...linkStyles,
                    color: 'white',
                  }}
                  href="mailto:info@example.com"
                >
                  petjoy-info@google.com
                </Link>
              </Box>
            </Box>
          </Container>
        </AppBar>

        <Container>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
              marginTop: 1,
              '@media (max-width: 500px)': {
                gridTemplateColumns: '1fr',
                rowGap: 0,
              },
            }}
          >
            {developers.map((developer) => (
              <Box
                sx={boxStyle}
                key={developer}
              >
                <GitHubIcon style={{ margin: '0 8', color: 'black' }} />
                <Link
                  sx={linkStyles}
                  href={`https://github.com/${developer}`}
                  target="_blank"
                  rel="noopener"
                >
                  {developer}
                </Link>
              </Box>
            ))}
          </Box>
          <Button
            variant="outlined"
            onClick={handleClick}
          >
            Open success snackbar
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Success!
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};
