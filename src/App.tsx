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
import { COLORS } from './GlobalVariables';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: COLORS.violet,
      },
      secondary: {
        main: COLORS.ligthOrange,
        dark: COLORS.orange,
        light: COLORS.lightViolet,
      },
      background: {
        default: COLORS.light,
        paper: COLORS.gray,
      },
      error: {
        main: COLORS.error.main,
      },
      success: {
        main: COLORS.success.main,
      },
      text: {
        primary: COLORS.text.primary,
        secondary: COLORS.text.secondary,
      },
      info: {
        main: COLORS.info.main,
      },
      divider: COLORS.divider,
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
