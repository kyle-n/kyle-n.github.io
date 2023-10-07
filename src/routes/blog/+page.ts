import { getAllPosts } from '$lib/post-handlers';
import type { ResolvedBlogPostList } from '$lib/types';

export async function load(): Promise<ResolvedBlogPostList> {
  const posts = await getAllPosts();
  return {
    posts
  };
}
