import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import RelatedPosts from './related-posts.svelte';
import type { PostLink } from '$lib/types';
import { whenStable } from '../../tests/helpers';

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

  test('renders nothing with no related posts', () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue([])
      };
    });
    const { container } = render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostHnLink: undefined,
      parentPostKeywords: undefined
    });

    expect(container.querySelector('div')?.childElementCount).toBe(0);
  });

  test('renders related posts', async () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue(mockRelatedPosts)
      };
    });
    render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostHnLink: undefined,
      parentPostKeywords: undefined
    });
    await whenStable();

    expect(screen.getByText('foo title')).toBeInTheDocument();
  });

  test('render the HN discussion link', async () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue(mockRelatedPosts)
      };
    });
    const env = render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostHnLink: undefined,
      parentPostKeywords: undefined
    });
    await whenStable();

    expect(
      screen.queryByText('Hacker News discussion')
    ).not.toBeInTheDocument();

    env.component.$set({
      parentPostTitle: 'foo',
      parentPostHnLink: 'foo',
      parentPostKeywords: undefined
    });
    await whenStable();

    expect(screen.getByText('Hacker News discussion')).toBeInTheDocument();
  });
});
