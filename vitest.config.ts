import { fileURLToPath } from 'url';
import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '**/playwright/**'],
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    environment: 'jsdom',
    setupFiles: './src/test/test-setup.ts',
    coverage: {
      all: true,
      enabled: true,
      branches: 51,
      functions: 35,
      lines: 38,
      statements: 38,
      exclude: [
        'src/config/**',
        '.next/',
        'next-env.d.ts',
        'next.config.js',
        'playwright.config.ts',
        'playwright/**',
        'vitest.config.ts',
      ],
      provider: 'c8',
    },
  },
});
