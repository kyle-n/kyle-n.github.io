import { describe, test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import Footer from './footer.svelte';
import 'vitest-dom/extend-expect';

describe('Footer', () => {
  test('displays copyright for current year', () => {
    render(Footer);

    const currentYear = new Date().getFullYear();
    expect(screen.getByTestId('copyright').textContent).toContain(currentYear)
  });
});
