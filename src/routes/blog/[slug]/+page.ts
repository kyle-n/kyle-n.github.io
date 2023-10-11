import type { ResolvedBlogPost } from '$lib/types';

export async function load({ params }): Promise<ResolvedBlogPost> {
  const slug: string = params.slug;
  const post = await import(`../../../../posts/${slug}.md`);
  const content = post.default;
  return {
    metadata: post.metadata,
    content
  };
}
