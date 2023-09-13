import React from 'react';
import { Box, Typography, AccordionDetails, Accordion, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TeamName {
  name: string;
  title: string;
  description: string;
}

const teamName: TeamName[] = [
  {
    name: 'KISS ',
    title: 'Do not complicate, but explain',
    description: 'We always discuss and explain our ideas.',
  },
  {
    name: 'DRY',
    title: 'Do not repeat, but complement',
    description: 'We complement each other like a puzzle.',
  },
  {
    name: 'YAGNI',
    title: 'Do not rush, just follow the plan',
    description: 'We follow the plan to move forward.',
  },
];

export const TeamNameAccordion: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontSize: '22px',
          fontWeight: 'bold',
          display: 'block',
          marginTop: 5,
          '@media (max-width: 600px)': { fontSize: '15px' },
        }}
      >
        OUR TEAM - &quot;KISS DRY YAGNI&quot;
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row', xl: 'row' }}
        justifyContent="center"
        alignItems="center"
        sx={{
          marginBottom: 5,
          gap: 2,
          p: 3,
          '@media (max-width: 600px)': {
            gap: 1,
            p: 1,
          },
        }}
        flexWrap="wrap"
      >
        {teamName.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              backgroundColor: '#eed4e2',
              width: '400px',
              boxShadow: '5px 1px 10px 3px rgba(0, 0, 0, 0.22)',
              '@media (max-width: 500px)': {
                width: '80%',
              },
              transition: 'all 0.4s',
              '&:hover': { boxShadow: 10 },
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#f2dce8',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              sx={{
                backgroundColor: '#FFF0F8',
                width: '400px',
                boxShadow: '2px 4px 5px 2px rgba(0, 0, 0, 0.03)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#f2dce8',
                '@media (max-width: 500px)': {
                  width: '100%',
                },
              }}
            >
              <Typography
                sx={{
                  width: '33%',
                  flexShrink: 0,
                  fontWeight: 'bold',
                  color: 'secondary.dark',
                }}
              >
                {item.name}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};
