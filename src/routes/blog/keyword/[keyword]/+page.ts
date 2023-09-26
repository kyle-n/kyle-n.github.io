import { DEFAULT_POSTS_PER_PAGE } from '$lib/blog-metadata';
import { getAllPosts } from '$lib/post-handlers.js';
import type { ResolvedKeywordPosts } from '$lib/types.js';

export async function load({ params, url }): Promise<ResolvedKeywordPosts> {
  const keyword = params.keyword as string;
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(post =>
    post.metadata.keywords?.includes(keyword)
  );
  const currentPage = Number(url.searchParams.get('page') ?? 1);
  const startIndex = (currentPage - 1) * DEFAULT_POSTS_PER_PAGE;
  const totalPageCount = Math.ceil(posts.length / DEFAULT_POSTS_PER_PAGE);
  return {
    keyword,
    posts: posts.slice(startIndex, startIndex + DEFAULT_POSTS_PER_PAGE),
    currentPage,
    totalPageCount
  };
}
