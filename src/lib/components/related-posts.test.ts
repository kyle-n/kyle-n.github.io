import { describe, test, expect, beforeEach, vi } from 'vitest';
import { act, render, screen } from '@testing-library/svelte';
import RelatedPosts from './related-posts.svelte';
import 'vitest-dom/extend-expect';
import type { PostLink } from '$lib/types';

describe('RelatedPosts', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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
        getRelatedPosts: vi.fn().mockResolvedValue([
          {
            metadata: {
              layout: 'post',
              title: 'foo title',
              description: 'foo',
              date: 'foo',
              image: 'foo',
              caption: 'foo',
              keywords: 'foo',
              hn: 'foo'
            },
            postPath: 'foo'
          }
        ] as PostLink[])
      };
    });
    render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostHnLink: undefined,
      parentPostKeywords: undefined
    });
    await act(async () => await new Promise(r => setTimeout(r, 1)));

    expect(screen.getByText('foo title')).toBeInTheDocument();
  });
});
