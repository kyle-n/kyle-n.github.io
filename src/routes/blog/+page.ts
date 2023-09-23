import type { ResolvedBlogPostList, BlogPostMetadata } from '$lib/types';

export async function load(): Promise<ResolvedBlogPostList> {
  const pathPrefix = './posts/';
  const allPostFiles = import.meta.glob('./posts/*.md');
  const iterablePostFiles = Object.entries(allPostFiles);
  const posts = iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
    const postPath = path.replace(pathPrefix, '').replace('.md', '');
    return { metadata, postPath };
  });
  return { posts: await Promise.all(posts) };
}
