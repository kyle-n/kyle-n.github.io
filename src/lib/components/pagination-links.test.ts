import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PaginationLinks from './pagination-links.svelte';
import 'vitest-dom/extend-expect';

describe('PaginationLinks', () => {
  test('displays pagination links', () => {
    render(PaginationLinks, { currentPage: 1, totalPageCount: 3 });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
