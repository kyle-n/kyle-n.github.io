import { describe, expect, beforeEach, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Footer from './footer.svelte';

describe('Footer', () => {
  beforeEach(() => {
    render(Footer);
  });

  it('displays copyright for current year', () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByTestId('copyright').textContent).toContain(currentYear);
  });
});
