/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
});
