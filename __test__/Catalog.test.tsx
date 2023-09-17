import { describe } from 'vitest';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CatalogPage } from '../src/pages/catalog/CatalogPage';

describe('Catalog page', () => {
  test('Catalog mounts properly', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <CatalogPage />
        </Provider>
      </MemoryRouter>
    );

    await expect(wrapper).toBeTruthy();
  });
});
