import { describe, beforeEach, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Header from './header.svelte';
import { BLOG_TITLE } from '$lib/blog-metadata';

describe('Header', () => {
  beforeEach(() => {
    render(Header);
  });

  it('displays the correct title', () => {
    expect(screen.getByText(BLOG_TITLE)).toBeInTheDocument();
  });
});
