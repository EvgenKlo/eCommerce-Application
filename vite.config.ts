import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

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
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
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
    css: false,
  },
});
