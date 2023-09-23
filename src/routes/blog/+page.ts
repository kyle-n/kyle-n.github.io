import { getAllPosts } from '$lib/post-handlers';
import type { ResolvedBlogPostList, BlogPostMetadata } from '$lib/types';

export async function load(): Promise<ResolvedBlogPostList> {
  const posts = await getAllPosts();
  return { posts };
}
