import { getAllPosts } from '$lib/post-handlers';
import type { ResolvedKeywordList } from '$lib/types';

export async function load(): Promise<ResolvedKeywordList> {
  const allPosts = await getAllPosts();
  const keywordsWithDuplicates = allPosts
    .map(post => post.metadata.keywords ?? '')
    .map(keywordString => keywordString.split(','))
    .flat()
    .map(keyword => keyword.trim())
    .filter(keyword => keyword !== '')
    .sort();
  const keywords = Array.from(new Set(keywordsWithDuplicates));
  return {
    keywords
  };
}
