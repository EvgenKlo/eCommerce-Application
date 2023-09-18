import { Box, Fab, Typography } from '@mui/material';
import { handleMouseDown } from '@/helpers/handleMouseDown';

const teamMethods = [
  'Assignment of responsibilities',
  'Joint decision making',
  'Daily meetings',
  'Active discussion and exchange of idea',
  'Shared code review of completed tasks',
  'Immediate collective problem solving',
];

const psevdoButtonStyle = {
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow: 10,
    transform: 'scale(1.02)',
    borderColor: '#72b691',
    backgroundColor: '#acffd1',
  },
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#72b691',
  cursor: 'default',
  textTransform: 'lowercase',
  fontSize: '16px',
};
export const TeamMethods: React.FC = () => {
  return (
    <>
      <Typography
        variant="h5"
        color="dark"
        sx={{
          fontSize: '27px',
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '10px',
          marginTop: '70px',
          '@media (max-width: 600px)': { fontSize: '15px' },
        }}
      >
        Our effective collaboration methods:
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row', xl: 'row' }}
        justifyContent="center"
        alignItems="center"
        p={1}
        flexWrap="wrap"
        sx={{
          gap: 2,
          '@media (max-width: 600px)': {
            gap: 1,
          },
          '@media (max-width: 900px)': {
            gap: 2,
          },
        }}
      >
        {teamMethods.map((method, index) => (
          <Fab
            variant="extended"
            size="large"
            color="info"
            key={index}
            sx={psevdoButtonStyle}
            disableRipple={true}
            onMouseDown={(e) => {
              e.preventDefault();
              handleMouseDown(e);
            }}
          >
            {method}
          </Fab>
        ))}
      </Box>
    </>
  );
};
