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
      thresholds: {
        '100': true,
      },
      exclude: [
        'src/config/**',
        '.next/',
        'next-env.d.ts',
        'next.config.js',
        'playwright.config.ts',
        'playwright/**',
        'vitest.config.ts',
        '**/*.test.*',
        '**/*.d.ts',
      ],
      provider: 'v8',
    },
  },
});
