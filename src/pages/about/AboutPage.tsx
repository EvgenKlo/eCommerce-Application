import React from 'react';
import { Container } from '@mui/system';
import { TeamNameAccordion } from './TeamNameAccordion';
import { TeamCardsDevelopers } from './TeamCardsDevelopers';
import { TeamMethods } from './TeamMethods';
import { LogoRssSchool } from '@/components/UI/LogoRssSchool';

export const AboutPage: React.FC = () => {
  return (
    <Container>
      <TeamNameAccordion />
      <TeamCardsDevelopers />
      <TeamMethods />
      <LogoRssSchool />
    </Container>
  );
};
