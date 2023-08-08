import './init';
import { createRoot } from 'react-dom/client';
import { ReactElement } from 'react';
import './App.scss';

import { withProviders } from '@/router/providers';
import { AppRouter } from '@/router/AppRouter';

export const App = withProviders((): ReactElement => <AppRouter />);

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
