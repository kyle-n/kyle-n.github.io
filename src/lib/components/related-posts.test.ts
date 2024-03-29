import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import RelatedPosts from './related-posts.svelte';
import type { PostLink } from '$lib/types';

const { mockRelatedPosts } = vi.hoisted(() => ({
  mockRelatedPosts: [
    {
      metadata: {
        layout: 'post',
        title: 'foo title',
        description: 'foo',
        date: 'foo',
        image: 'foo',
        caption: 'foo',
        keywords: 'foo'
      },
      postPath: 'foo'
    }
  ] as PostLink[]
}));

describe('RelatedPosts', () => {
  beforeEach(() => {
    vi.mock('$lib/post-handlers');
  });

  it('renders nothing with no related posts', () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue([])
      };
    });
    const { container } = render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostKeywords: undefined,
      parentPostRelatedLinks: undefined
    });

    expect(container.querySelector('div')?.childElementCount).toBe(0);
  });

  it('renders related posts', async () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue(mockRelatedPosts)
      };
    });
    render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostKeywords: undefined,
      parentPostRelatedLinks: undefined
    });

    await waitFor(() => {
      expect(screen.getByText('foo title')).toBeInTheDocument();
    });
  });

  it('render the HN discussion link', async () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue(mockRelatedPosts)
      };
    });
    const env = render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostKeywords: undefined,
      parentPostRelatedLinks: undefined
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Hacker News discussion')
      ).not.toBeInTheDocument();
    });

    env.component.$set({
      parentPostTitle: 'foo',
      parentPostKeywords: undefined,
      parentPostRelatedLinks: {
        'Hacker News discussion': 'https://news.ycombinator.com/item?id=1'
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Hacker News discussion')).toBeInTheDocument();
    });
  });
});
