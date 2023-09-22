import type { BlogPostData } from '$lib/types';

export async function load({ params }): Promise<BlogPostData> {
  const slug: string = params.slug;
  const post = await import(`../posts/${slug}.md`);
  const { title, date } = post.metadata;
  const content = post.default;
  return {
    title,
    date,
    content
  };
}
