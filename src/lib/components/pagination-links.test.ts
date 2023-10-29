import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PaginationLinks from './pagination-links.svelte';

describe('PaginationLinks', () => {
  it('displays pagination links', () => {
    render(PaginationLinks, { currentPage: 1, totalPageCount: 3 });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
