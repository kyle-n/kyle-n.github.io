import { DEFAULT_POSTS_PER_PAGE } from '$lib/blog-metadata.js';
import { getAllPosts } from '$lib/post-handlers';
import type { ResolvedBlogPostList, BlogPostMetadata } from '$lib/types';

export async function load({ url }): Promise<ResolvedBlogPostList> {
  const posts = await getAllPosts();
  const currentPage = Number(url.searchParams.get('page') ?? 1);
  const startIndex = (currentPage - 1) * DEFAULT_POSTS_PER_PAGE;
  const totalPageCount = Math.ceil(posts.length / DEFAULT_POSTS_PER_PAGE);
  return {
    posts: posts.slice(startIndex, startIndex + DEFAULT_POSTS_PER_PAGE),
    totalPageCount,
    currentPage
  };
}
