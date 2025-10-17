import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import App from './App';

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('renders navigation links', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /JobsByPay/i })).toBeInTheDocument();

    const aboutLinks = screen.getAllByRole('link', { name: /About/i });
    expect(aboutLinks).not.toHaveLength(0);
  });
});
