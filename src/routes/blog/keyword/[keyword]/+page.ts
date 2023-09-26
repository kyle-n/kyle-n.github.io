import { getAllPosts } from '$lib/post-handlers.js';
import type { ResolvedKeywordPosts } from '$lib/types.js';

export async function load({ params }): Promise<ResolvedKeywordPosts> {
  const keyword = params.keyword as string;
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(post =>
    post.metadata.keywords?.includes(keyword)
  );
  return {
    keyword,
    posts
  };
}
