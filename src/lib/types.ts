import type { ComponentType, SvelteComponent } from 'svelte';

export type ResolvedBlogPost = {
  metadata: BlogPostMetadata;
  content: ComponentType<SvelteComponent>;
  slug: string
};

export type BlogPostMetadata = {
  layout: 'post';
  title: string;
  description: string;
  date: string;
  image?: string;
  caption?: string;
  keywords?: string;
  relatedLinks?: Record<string, string>;
};

export type ResolvedBlogPostList = {
  posts: PostLink[];
};

export type ResolvedPaginatedBlogPostList = ResolvedBlogPostList & {
  currentPage: number;
  totalPageCount: number;
};

export type ResolvedKeywordPosts = ResolvedBlogPostList & {
  keyword: string;
};

export type PostLink = {
  metadata: BlogPostMetadata;
  postPath: string;
};

export type ResolvedKeywordList = {
  keywords: string[];
};
