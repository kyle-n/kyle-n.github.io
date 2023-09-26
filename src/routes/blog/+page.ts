import { DEFAULT_POSTS_PER_PAGE } from '$lib/blog-metadata.js';
import { getAllPosts } from '$lib/post-handlers';
import type { ResolvedBlogPostList, BlogPostMetadata } from '$lib/types';

export async function load({url}): Promise<ResolvedBlogPostList> {
  const posts = await getAllPosts();
  const page = Number(url.searchParams.get('page') ?? 1);
  const postsPerPage = Number(url.searchParams.get('postsPerPage') ?? DEFAULT_POSTS_PER_PAGE);
  const startIndex = (page - 1) * postsPerPage;
  return { posts: posts.slice(startIndex, startIndex + postsPerPage) };
}
