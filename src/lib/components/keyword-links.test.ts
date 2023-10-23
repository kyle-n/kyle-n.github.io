import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import KeywordLinks from './keyword-links.svelte';
import 'vitest-dom/extend-expect';

describe('KeywordLinks', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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
