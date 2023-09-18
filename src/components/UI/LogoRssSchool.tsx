import { Box, Link } from '@mui/material';
import LogoSvg from '/src/assets/svg/logo-rss.svg';

const boxStyles = {
  backgroundColor: 'white',
  boxShadow: '4px 4px 18px 0px rgba(253, 254, 255, 0.2)',
  backgroundImage: `url(${LogoSvg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '123px',
  height: '45px',
  transition: 'all 0.4s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
};

export const LogoRssSchool: React.FC = () => {
  return (
    <>
      {' '}
      <Box
        marginTop={10}
        marginBottom={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Link
          href={`https://rs.school/js/`}
          target="_blank"
          rel="noopener"
        >
          <Box sx={boxStyles}></Box>
        </Link>
      </Box>
    </>
  );
};
