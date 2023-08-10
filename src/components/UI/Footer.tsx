import React from 'react';
import { Typography, Link, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceIcon from '@mui/icons-material/Place';

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

  const linkStyles: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
  };

  const gitLinkStyles: React.CSSProperties = {
    color: 'black',
    textDecoration: 'none',
  };

  return (
    <>
      <Box
        style={{
          position: 'static',
          bottom: 0,
          left: 0,
          right: 0,
          marginTop: 20,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: 'repeat(3, 1fr)',
            backgroundColor: '#660066',
          }}
        >
          <Item>
            <PlaceIcon style={{ color: 'white' }} />
            <Typography
              style={linkStyles}
              variant="body2"
            >
              12 Avenu st., Los Angeles
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
              <Link
                style={linkStyles}
                variant="body2"
                href="tel:+1234567890"
              >
                +6 (234)-567-8903
              </Link>
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
              <Link
                style={linkStyles}
                href="mailto:info@example.com"
              >
                petjoy-info@google.com
              </Link>
            </Typography>
          </Item>
        </Box>

        <Box
          sx={{
            display: 'grid',
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: 'repeat(3, 1fr)',
            marginTop: 1,
          }}
        >
          <Item>
            {' '}
            <GitHubIcon style={{ margin: '0 8', color: 'black' }} />
            <Link
              style={gitLinkStyles}
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
              style={gitLinkStyles}
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
              style={gitLinkStyles}
              href="https://github.com/fasty86"
              target="_blank"
              rel="noopener"
            >
              fasty86
            </Link>
          </Item>
        </Box>
      </Box>
    </>
  );
};
