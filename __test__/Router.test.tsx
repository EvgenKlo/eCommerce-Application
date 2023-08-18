import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../src/router/AppRouter';
import { Provider } from 'react-redux/es/exports';
import { store } from '../src/store/store';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Demonstrating  navigation ', () => {
  test('from main to About', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    );
    const user = userEvent.setup();

    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'About' }));
    expect(screen.getByText(/AboutPage/i)).toBeInTheDocument();
  });
  test('from about to catalog', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    );
    const user = userEvent.setup();

    expect(screen.getByText(/AboutPage/i)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Catalog' }));
    expect(screen.getByText(/CatalogPage/i)).toBeInTheDocument();
  });

  test('landing on a bad page', async () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist./i)
    ).toBeInTheDocument();
  });
});
