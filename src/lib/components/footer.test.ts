import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Footer from './footer.svelte';
import 'vitest-dom/extend-expect';

describe('Footer', () => {
  beforeEach(() => {
    render(Footer);
  });

  test('displays copyright for current year', () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByTestId('copyright').textContent).toContain(currentYear);
  });
});
