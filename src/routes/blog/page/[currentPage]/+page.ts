import type { ResolvedPaginatedBlogPostList } from '../../../../lib/types';
import { getAllPosts } from '../../../../lib/post-handlers';
import { DEFAULT_POSTS_PER_PAGE } from '../../../../lib/blog-metadata';

export async function load({ params }): Promise<ResolvedPaginatedBlogPostList> {
  const allPosts = await getAllPosts();
  const currentPage = Number(params.currentPage);
  const totalPageCount = Math.ceil(allPosts.length / DEFAULT_POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * DEFAULT_POSTS_PER_PAGE;
  const endIndex = startIndex + DEFAULT_POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);
  return {
    posts,
    currentPage,
    totalPageCount
  };
}
