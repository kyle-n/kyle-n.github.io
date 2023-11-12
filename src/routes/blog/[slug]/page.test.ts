import Header from '$lib/components/header.svelte';
import type { ResolvedBlogPost } from '$lib/types';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, beforeEach } from 'vitest';
import BlogPostPage from './+page.svelte';
import { BLOG_TITLE } from '$lib/blog-metadata';

describe('Blog post page', () => {
  let mockResolvedBlogPost: ResolvedBlogPost;

  beforeEach(() => {
    mockResolvedBlogPost = {
      metadata: {
        layout: 'post',
        title: 'Test post',
        description: 'Test description',
        date: '2021-01-01',
      },
      content: Header,
    };

    render(BlogPostPage, {data: mockResolvedBlogPost});
  });

  it('should render the mock article component, the header', () => {
    expect(screen.getByText(BLOG_TITLE)).toBeInTheDocument();
  });

  it('should render the article title', () => {
    expect(screen.getByText(mockResolvedBlogPost.metadata.title)).toBeInTheDocument();
  });
});