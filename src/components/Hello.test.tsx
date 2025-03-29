import '@testing-library/jest-dom/vitest';
import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Hello } from './Hello';

describe('Hello', () => {
  it('renders Hello World', () => {
    render(<Hello />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
