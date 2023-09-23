import type { BlogPostMetadata, PostLink } from './types';

export async function getAllPosts(): Promise<PostLink[]> {
  const pathPrefix = '../routes/blog/posts/';
  const allPostFiles = import.meta.glob('../routes/blog/posts/*.md');
  const iterablePostFiles = Object.entries(allPostFiles);
  const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
    const postPath = path.replace(pathPrefix, '').replace('.md', '');
    return { metadata, postPath };
  });
  const posts = await Promise.all(postJobs);
  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
  return posts;
}