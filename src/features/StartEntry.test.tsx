import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  RouterProvider,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';

import { StartEntry } from './StartEntry';

describe('StartEntry', () => {
  it('renders StartEntry', () => {
    const rootRoute = createRootRoute();
    const router = createRouter({
      routeTree: rootRoute,
    });

    render(
      <MantineProvider>
        <RouterProvider router={router} defaultComponent={StartEntry} />
      </MantineProvider>,
    );
    expect(screen.getByText('Upload File')).toBeInTheDocument();
    expect(screen.getByText('Create Blank Image')).toBeInTheDocument();
  });
});
