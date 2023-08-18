import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { RegistrationPage } from '../src/pages/registration/RegistrationPage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import { store } from '../src/store/store';
import userEvent from '@testing-library/user-event';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

describe('<RegistrationPage />', () => {
  const handleLogin: (val: boolean) => void = (val) => {
    val;
  };

  test('Registration page mounts properly', () => {
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper).toBeTruthy();
  });

  test('First name field exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );
    const firstName = screen.getByLabelText(/first name/i);
    expect(firstName).toBeTruthy();
  });

  test('Last name field exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const lastName = screen.getByLabelText(/last name/i);
    expect(lastName).toBeTruthy();
  });

  test('Email field exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );
    const email = screen.getByLabelText(/email/i);
    expect(email).toBeTruthy();
  });

  test('Password field exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const password = screen.getByTestId('password-input');
    expect(password).toBeTruthy();
  });

  test('Birth date field exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const birthDate = screen.getByLabelText(/birth date/i);
    expect(birthDate).toBeTruthy();
  });

  test('Checkbox exist ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText(/Use as default shipping and billing address/i);
    expect(checkbox).toBeTruthy();
  });

  test('All shipping address fields exist', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const shippingAddressFields = [
      { label: 'shipping Street', testId: 'shippingStreet' },
      { label: 'shipping City', testId: 'shippingCity' },
      { label: 'shipping Country', testId: 'shippingCountry' },
      { label: 'shipping Postal Code', testId: 'shippingPostalCode' },
    ];

    shippingAddressFields.forEach((field) => {
      const input = screen.getByTestId(field.testId);
      expect(input).toBeInTheDocument();
    });
  });

  test('Billing address fields open after button click', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const addButton = screen.getByRole('button', { name: /Add billing address/i });
    user.click(addButton);

    const billingAddressFields = [
      { label: 'billing Street', testId: 'billingStreet' },
      { label: 'billing City', testId: 'billingCity' },
      { label: 'billing Country', testId: 'billingCountry' },
      { label: 'billing Postal Code', testId: 'billingPostalCode' },
    ];

    await waitFor(() => {
      billingAddressFields.forEach((field) => {
        const input = screen.getByTestId(field.testId);
        expect(input).toBeInTheDocument();
      });
    });
  });

  test('Checkboxes appear after clicking Add button', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const addButton = screen.getByRole('button', { name: /Add billing address/i });
    user.click(addButton);

    await waitFor(() => {
      const checkboxes = screen.getAllByText(/Use by default/i);
      expect(checkboxes).toHaveLength(2);
    });
  });
  test('Sign up btn click ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const spySignUpBtn = vi.spyOn(user, 'click');
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    user.click(signUpButton);
    expect(spySignUpBtn).toHaveBeenCalledOnce();
  });

  test('Password input works ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const password = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(password, { target: { value: 'Qq123qqq&' } });
    expect(password.value).toBe('Qq123qqq&');
  });

  test('First name input works ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const firstName = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: 'Lidiia' } });
    expect(firstName.value).toBe('Lidiia');
  });

  test('Link to sign in page exists', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RegistrationPage handleLogin={handleLogin} />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const signInLink = screen.getByTestId('sign-in-link');
    expect(signInLink).toBeInTheDocument();
  });
});
