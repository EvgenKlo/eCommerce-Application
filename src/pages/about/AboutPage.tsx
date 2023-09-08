import React from 'react';
import { Box, Typography, CardContent, Card, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LidaImg from '/src/assets/photo/Lida.jpg';
import OlegImg from '/src/assets/photo/Oleg.jpg';
import ZhenyaImg from '/src/assets/photo/Zhenya.jpg';

const linkStyles = {
  textDecoration: 'none',
  fontWeight: 'normal',
  '&:hover': {
    transition: 'color 0.3s ease-in-out',
    color: 'secondary.main',
  },
};

const boxStyle = {
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  margin: '15px',
};
interface CardData {
  image: string;
  title: string;
  city: string;
  description: string;
  git: string;
}

const cardsData: CardData[] = [
  {
    image: `${ZhenyaImg}`,
    title: 'Zhenya',
    city: 'Yekaterinburg',
    description:
      'Our team leader is a real captain. He is a responsible and attentive person who is always able to delve into the details to ensure the successful completion of the project. His attentiveness and determination help the team in the most difficult situations.',
    git: 'EvgenKlo',
  },

  {
    image: `${OlegImg}`,
    title: 'Oleg',
    city: 'Moscow',
    description:
      'The most experienced member of our team is determined and an enterprising person with a sharp mind and excellent memory. He is always ready to take on the most difficult and new tasks. His resourcefulness and persistence make a significant contribution to our work.',
    git: 'fasty86',
  },

  {
    image: `${LidaImg}`,
    title: 'Lida',
    city: 'Nizhny Novgorod',
    description:
      'Our tireless worker is an amazing girl who takes care of all the routine work and design. She is not only hardworking and diligent, but also capable of performing several tasks at the same time. Her multitasking and creative approach make our project more vibrant and unique.',
    git: 'lidasharova',
  },
];

export const AboutPage: React.FC = () => {
  const teamCards = [
    {
      name: 'KISS',
      title: 'Do not complicate, but explain',
      description: 'We always discuss and explain our ideas to each other.',
    },
    {
      name: 'DRY',
      title: 'Do not repeat, but complement each other',
      description: 'We complement each other like a puzzle.',
    },
    {
      name: 'YAGINI',
      title: 'Do not rush, just follow the plan',
      description: 'We follow the plan to move forward.',
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        style={{ display: 'block', margin: '10px' }}
      >
        OUR TEAM
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row', xl: 'row' }}
        justifyContent="center"
        alignItems="center"
        gap={3}
        p={5}
        flexWrap="wrap"
      >
        {teamCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: window.innerWidth < 500 ? '300px' : '460px',
              height: window.innerWidth < 500 ? 'auto' : '150px',
              boxShadow: '9px 6px 35px 11px rgba(34, 60, 80, 0.22)',
              backgroundColor: '#FFF0F5',
              borderRadius: '10%',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.dark',
                  margin: '15px',
                  '@media (max-width: 500px)': {
                    fontSize: '16px',
                  },
                }}
              >
                {card.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.dark',
                  '@media (max-width: 500px)': {
                    fontSize: '13px',
                  },
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.dark',
                  '@media (max-width: 500px)': {
                    fontSize: '10px',
                  },
                }}
              >
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row', xl: 'row' }}
        justifyContent="center"
        alignItems="center"
        p={2}
        flexWrap="wrap"
        sx={{
          gap: 20,
          '@media (max-width: 600px)': {
            gap: 5,
          },
          '@media (max-width: 900px)': {
            gap: 7,
          },
        }}
      >
        {cardsData.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: window.innerWidth < 500 ? '300px' : '300px',
              height: window.innerWidth < 500 ? 'auto' : '600px',
              boxShadow: '-14px -13px 22px -4px rgba(34, 60, 80, 0.29)',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              color: 'primary.dark',
              fontWeight: 'bold',
            }}
          >
            <img
              width="300px"
              height="300px"
              src={card.image}
              alt={card.title}
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >
                {card.title}
                <Typography
                  variant="h6"
                  color="secondary.dark"
                  marginBottom={'15px'}
                >
                  {card.city}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="black"
              >
                {card.description}
              </Typography>
              <Box
                sx={boxStyle}
                key={card.git}
              >
                <GitHubIcon style={{ margin: '0 8', color: 'black', width: '15px' }} />
                <Link
                  sx={linkStyles}
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
