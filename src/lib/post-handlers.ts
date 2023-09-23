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

export async function getRelatedPosts(parentPostTitle: string, parentPostKeywords?: string): Promise<PostLink[]> {
  const allPosts = await getAllPosts();
  const parentKeywords = getKeywordArray(parentPostKeywords);

  const relatedPosts = allPosts.filter(post => {
    if (post.metadata.title === parentPostTitle) return false;

    const postKeywords = getKeywordArray(post.metadata.keywords);
    const intersection = parentKeywords.filter(keyword => postKeywords.includes(keyword));
    return intersection.length > 0;
  });
  return relatedPosts.slice(0, 3);
}

function getKeywordArray(keywords?: string): string[] {
  return keywords?.split(',').map(keyword => keyword.trim()) ?? [];
}