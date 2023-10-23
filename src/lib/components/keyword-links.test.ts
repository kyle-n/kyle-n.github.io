import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte';
import KeywordLinks from './keyword-links.svelte';
import 'vitest-dom/extend-expect';

describe('KeywordLinks', () => {
  afterEach(() => {
    cleanup();
  });

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
