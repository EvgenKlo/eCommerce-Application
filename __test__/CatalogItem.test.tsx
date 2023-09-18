import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import ProductItem from '../src/pages/catalog/products/ProductItem';
import React from 'react';
import { type LocalizedString, type ProductProjection } from '@commercetools/platform-sdk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import userEvent from '@testing-library/user-event';

describe('Catalog item', () => {
  const product = {
    id: '10',
    name: { 'en': 'test' } as LocalizedString,
    description: { 'en': 'test' } as LocalizedString,
    masterVariant: { prices: [{ value: { centAmount: 1000, currencyCode: 'EUR' } }] },
  } as ProductProjection;
  const wrapper = render(
    <MemoryRouter>
      <Provider store={store}>
        <ProductItem product={product} />
      </Provider>
    </MemoryRouter>
  );

  const button = screen.getByTestId('add/del to cart');

  test('Catalog item mounts properly', () => {
    expect(wrapper.findByText('test')).toBeTruthy();
  });

  test('Button has been mounted to add and remove items from the cart', () => {
    expect(button).toBeTruthy();
  });

  test('Click on the add to cart button', () => {
    const user = userEvent.setup();
    vi.spyOn(user, 'click');
    user.click(button);
    expect(screen.findByTestId('message')).toBeTruthy();
  });
});
