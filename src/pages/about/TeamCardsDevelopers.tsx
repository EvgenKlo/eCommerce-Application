import { Box, Typography, CardContent, Card, Link } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import LidaImg from '/src/assets/photo/Lida.jpg';
import OlegImg from '/src/assets/photo/Oleg.jpg';
import ZhenyaImg from '/src/assets/photo/Zhenya.jpg';

const biographyStyles = { fontSize: '13px', marginTop: '15px', color: '#666666' };
const iconStyles = { fontSize: '12px', marginRight: '3px' };
const gitIconStyle = { margin: '0 3', color: 'black', width: '14px' };

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  width: '300px',
  height: '790px',
  backgroundColor: 'white',
  '@media (max-width: 600px)': {
    width: '300px',
    height: 'auto',
  },
  boxShadow: '0px 1px 33px 13px rgba(0, 0, 0, 0.22)',
  color: 'primary.dark',
  fontWeight: 'bold',
  transition: 'all 0.5s',
  '&:hover': { boxShadow: 10, transform: 'scale(1.03)' },
  cursor: 'default',
};

const linkStyle = {
  textDecoration: 'none',
  fontWeight: 'normal',
  fontSize: '15px',
  '&:hover': {
    transition: 'color 0.3s ease-in-out',
    color: 'secondary.main',
  },
};

interface CardData {
  image: string;
  name: string;
  city: string;
  role: string;
  description: string;
  education: string;
  job: string;
  hobby: string;
  git: string;
}

const cardsData: CardData[] = [
  {
    image: `${ZhenyaImg}`,
    name: 'Evgeniy',
    city: 'Yekaterinburg',
    role: 'Team Lead & Frontend Developer',
    description:
      'Team leader is a real captain. He is a responsible and attentive person who is always able to delve into the details to ensure the successful completion of the project. His attentiveness and determination help the team in the most difficult situations.',
    education:
      'Graduated from the Russian State Vocational Pedagogical University and has a higher education in the field of maintenance and operation of road transport',
    job: 'Currently work at the Lexus center Yekaterinburg.',
    hobby: 'Loves cycling, mountain and cross-country skiing, bouldering and filming.',
    git: 'EvgenKlo',
  },

  {
    image: `${OlegImg}`,
    name: 'Oleg',
    city: 'Moscow',
    role: 'Frontend Developer',
    description:
      'The most experienced member of the team is a determined and enterprising person with a sharp mind and excellent memory. He is always ready to take on the most difficult and new tasks. His resourcefulness and perseverance make a significant contribution to our work.',
    education:
      'Graduated from the National Research Nuclear University MEPhI with a degree in Applied Mathematics.',
    job: 'Сurrently working as a consultant for SAP BW/BI/ BW4 Hana',
    hobby: 'Loves reading science fiction, cycling, Formula 1, hiking and rafting.',
    git: 'fasty86',
  },

  {
    image: `${LidaImg}`,
    name: 'Lidiia',
    city: 'Nizhny Novgorod',
    role: 'Frontend Developer',
    description:
      'Tireless worker is an amazing girl who takes care of all the routine work and design. She is not only hardworking and diligent, but also capable of performing several tasks at the same time. Her multitasking and creative approach make our project more vibrant and unique.',
    education: 'She has a pharmaceutical education and a higher one in economics',
    job: 'Currently devoting all free time to learning front-end development in Rolling Scopes School',
    hobby: 'Loves traveling,bike rides, snowboarding, photography and coffee.',
    git: 'lidasharova',
  },
];
export const TeamCardsDevelopers: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row', xl: 'row' }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          gap: 5,
          '@media (max-width: 600px)': {
            gap: 4,
          },
          '@media (max-width: 900px)': {
            gap: 5,
          },
        }}
      >
        {cardsData.map((card, index) => (
          <Card
            key={index
            sx={cardStyle}
          >
            <img
              width="300px"
              height="300px"
              src={card.image}
              alt={card.name}
            />
            <CardContent sx={{ backgroundColor: 'white', textAlign: 'left' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '19px', textAlign: 'center' }}>
                {card.name}
              </Typography>
              <Typography
                color="secondary.dark"
                sx={{ fontSize: '16px', textAlign: 'center' }}
              >
                {card.city}
              </Typography>
              <Typography
                sx={{ fontSize: '12px', textAlign: 'center' }}
                marginBottom={'15px'}
                color="black"
              >
                {card.role}
              </Typography>
              <Typography
                sx={{ fontSize: '13px' }}
                color="primary.dark"
              >
                {card.description}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={biographyStyles}>
                  <SchoolIcon sx={iconStyles}></SchoolIcon>
                  {card.education}
                </Typography>

                <Typography sx={biographyStyles}>
                  <EngineeringIcon sx={iconStyles}></EngineeringIcon>
                  {card.job}
                </Typography>
                <Typography sx={biographyStyles}>
                  <FavoriteBorderIcon sx={iconStyles}></FavoriteBorderIcon>
                  {card.hobby}
                </Typography>
              </Box>

              <Box
                sx={{ ...boxStyle, marginTop: '20px' }}
                key={card.git}
              >
                <GitHubIcon style={gitIconStyle} />
                <Link
                  sx={linkStyle}
                  href={`https://github.com/${card.git}`}
                  target="_blank"
                  rel="noopener"
                >
                  {card.git}
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};
