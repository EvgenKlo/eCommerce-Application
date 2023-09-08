import { createTheme } from '@mui/material';
import { enUS } from '@mui/x-date-pickers/locales';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#5c417c',
        dark: '#412e57',
        light: '#bb9ebb',
      },
      secondary: {
        main: '#d68b4e',
        dark: '#db731d',
      },
      background: {
        default: '#ffffff',
        paper: '#f0f0f0',
      },
      error: {
        main: '#ff0000',
      },
      success: {
        main: '#00ff00',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
      info: {
        main: '#8cd4ac',
      },
      divider: '#e0e0e0',
    },
  },
  enUS
);
