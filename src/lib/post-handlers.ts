import type { BlogPostMetadata, PostLink } from './types';

export async function getAllPosts(): Promise<PostLink[]> {
  const pathPrefix = '../../posts/';
  const allPostFiles = import.meta.glob('../../posts/*.md');
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

export async function getRelatedPosts(
  parentPostTitle: string,
  parentPostKeywords?: string
): Promise<PostLink[]> {
  const allPosts = await getAllPosts();
  const parentKeywords = getKeywordArray(parentPostKeywords);

  const relatedPosts: Array<{
    post: PostLink;
    intersectingKeywords: string[];
  }> = [];
  allPosts.forEach(post => {
    if (post.metadata.title === parentPostTitle) return;

    const postKeywords = getKeywordArray(post.metadata.keywords);
    const intersectingKeywords = parentKeywords.filter(keyword =>
      postKeywords.includes(keyword)
    );
    if (intersectingKeywords.length > 0) {
      relatedPosts.push({ post, intersectingKeywords });
    }
  });
  relatedPosts.sort(
    (a, b) => b.intersectingKeywords.length - a.intersectingKeywords.length
  );
  return relatedPosts.slice(0, 3).map(relatedPost => relatedPost.post);
}

function getKeywordArray(keywords?: string): string[] {
  return keywords?.split(',').map(keyword => keyword.trim()) ?? [];
}

export function getCorrectedPostDate(date: Date | string): string {
  const dateWithTimezoneOffset = new Date(date);
  dateWithTimezoneOffset.setHours(dateWithTimezoneOffset.getHours() + 6);
  return dateWithTimezoneOffset.toISOString().split('T')[0];
}
