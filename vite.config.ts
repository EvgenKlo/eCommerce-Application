import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export const pathResolver = (p: string) => resolve(__dirname, '.', p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': pathResolver('./src'),
    },
  },
  test: {
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        'src/shared/types',
        'src/main.tsx',
        'src/__test__/__mocks__',
      ],
      all: true,
      src: ['src'],
      provider: 'c8',
      reporter: ['text'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
  },
});
