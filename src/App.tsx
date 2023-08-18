import './init';
import { AppRouter } from './router/AppRouter';
import './App.scss';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import { store } from '@/store/store';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS } from '@mui/x-date-pickers/locales';

const theme = createTheme(
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

const container = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
