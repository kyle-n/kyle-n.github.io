import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import KeywordLinks from './keyword-links.svelte';

describe('KeywordLinks', () => {
  test('displays keywords', () => {
    render(KeywordLinks, { keywords: 'foo, bar' });

    expect(screen.getByText('#foo')).toBeInTheDocument();
    expect(screen.getByText('#bar')).toBeInTheDocument();
  });

  test('hides component entirely with no keywords', () => {
    const { container } = render(KeywordLinks, { keywords: undefined });

    expect(container.querySelector('div')?.childElementCount).toBe(0);
  });
});
