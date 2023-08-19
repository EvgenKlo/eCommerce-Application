import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { LoginPage } from '../src/pages/login/LoginPage';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../src/router/AppRouter';
import { Provider } from 'react-redux/es/exports';
import { store } from '../src/store/store';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('<LoginPage />', () => {
  const handleLogin: (val: boolean) => void = (val) => {
    val;
  };

  test('Login mounts properly', () => {
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage handleLogin={handleLogin} />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper).toBeTruthy();
  });

  test('email field exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage handleLogin={handleLogin} />
        </Provider>
      </MemoryRouter>
    );

    const email = screen.getByLabelText(/email/i);
    expect(email).toBeTruthy();
  });

  test('email input works ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage handleLogin={handleLogin} />
        </Provider>
      </MemoryRouter>
    );

    const email = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'test@mail.com' } });
    expect(email.value).toBe('test@mail.com');
  });

  test('sign in btn click ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage handleLogin={handleLogin} />
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const spySignInBtn = vi.spyOn(user, 'click');
    const btn = screen.getByTestId('Log in') as HTMLButtonElement;
    user.click(btn);
    expect(spySignInBtn).toHaveBeenCalledOnce();
  });
});
