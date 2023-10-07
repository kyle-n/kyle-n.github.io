import type { ResolvedPaginatedBlogPostList } from '../../../../lib/types';
import { getAllPosts } from '../../../../lib/post-handlers';
import { DEFAULT_POSTS_PER_PAGE } from '../../../../lib/blog-metadata';
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export async function load({ params }): Promise<ResolvedPaginatedBlogPostList> {
  const allPosts = await getAllPosts();
  const currentPage = Number(params.currentPage);
  const totalPageCount = Math.ceil(allPosts.length / DEFAULT_POSTS_PER_PAGE);

  if (currentPage < 1) {
    const firstPageUrl = `${base}/blog/page/1`;
    throw redirect(308, firstPageUrl);
  }

  if (currentPage > totalPageCount) {
    const lastPageUrl = `${base}/blog/page/${totalPageCount}`;
    throw redirect(308, lastPageUrl);
  }

  const startIndex = (currentPage - 1) * DEFAULT_POSTS_PER_PAGE;
  const endIndex = startIndex + DEFAULT_POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);
  return {
    posts,
    currentPage,
    totalPageCount
  };
}
