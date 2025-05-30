import './index.css';
import '@mantine/core/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <DevTools />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
