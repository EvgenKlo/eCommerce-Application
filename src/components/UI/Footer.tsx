import React from 'react';
import { Typography, Link, Box, Container, AppBar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceIcon from '@mui/icons-material/Place';
import { COLORS } from '@/GlobalVariables';

export const Footer: React.FC = () => {
  interface ItemProps {
    children: React.ReactNode;
  }

  const Item: React.FC<ItemProps> = ({ children }) => (
    <Box
      sx={{
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      transition: 'color 0.3s ease-in-out',
      color: COLORS.orange,
    },
  };

  const gitLinkStyles = {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      transition: 'color 0.3s ease-in-out',
      color: COLORS.orange,
    },
  };

  const styleContainer = {
    position: 'static',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  };

  return (
    <>
      <Box sx={styleContainer}>
        <AppBar position="static">
          <Container>
            <Box
              sx={{
                display: 'grid',
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: 'repeat(3, 1fr)',
                backgroundColor: COLORS.violet,
                '@media (max-width: 500px)': {
                  gridTemplateColumns: '1fr',
                  rowGap: 2,
                },
              }}
            >
              <Item>
                <PlaceIcon style={{ color: 'white' }} />
                <Typography
                  style={linkStyles}
                  variant="body1"
                >
                  <Link
                    sx={linkStyles}
                    variant="body1"
                    target="_blank"
                    href="https://www.google.com/maps/@34.035897,-118.3307848,3a,75y,3.58h,85.44t/data=!3m6!1e1!3m4!1s_Ran1t5GhSHiydc8I5iShw!2e0!7i16384!8i8192?entry=ttu"
                  >
                    12 Avenu st., Los Angeles
                  </Link>
                </Typography>
              </Item>
              <Item>
                <Typography variant="body2">
                  <Link
                    sx={linkStyles}
                    variant="body1"
                    href="tel:+1234567890"
                  >
                    +6 (234)-567-8903
                  </Link>
                </Typography>
              </Item>
              <Item>
                <Typography variant="body1">
                  <Link
                    sx={linkStyles}
                    href="mailto:info@example.com"
                  >
                    petjoy-info@google.com
                  </Link>
                </Typography>
              </Item>
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
            <Item>
              {' '}
              <GitHubIcon style={{ margin: '0 8', color: 'black' }} />
              <Link
                sx={gitLinkStyles}
                href="https://github.com/EvgenKlo"
                target="_blank"
                rel="noopener"
              >
                EvgenKlo
              </Link>
            </Item>
            <Item>
              <GitHubIcon style={{ margin: '0 8', color: 'black' }} />
              <Link
                sx={gitLinkStyles}
                href="https://github.com/lidasharova"
                target="_blank"
                rel="noopener"
              >
                lidasharova
              </Link>
            </Item>
            <Item>
              <GitHubIcon style={{ margin: '0 8', color: 'black' }} />

              <Link
                sx={gitLinkStyles}
                href="https://github.com/fasty86"
                target="_blank"
                rel="noopener"
              >
                fasty86
              </Link>
            </Item>
          </Box>
        </Container>
      </Box>
    </>
  );
};
