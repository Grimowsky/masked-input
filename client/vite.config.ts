/// <reference types="vitest" />
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  preview: {
    host: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup.js',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
    },
  },
});
