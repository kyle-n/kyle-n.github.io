export type ResolvedBlogPost = {
  metadata: BlogPostMetadata;
  content: ConstructorOfATypedSvelteComponent;
};

export type BlogPostMetadata = {
  layout: 'post';
  title: string;
  description: string;
  date: string;
  image?: string;
  caption?: string;
  keywords?: string;
  hn?: string;
};

export type ResolvedBlogPostList = {
  posts: PostLink[];
};

export type ResolvedKeywordPosts = ResolvedBlogPostList & {
  keyword: string;
};

export type PostLink = {
  metadata: BlogPostMetadata;
  postPath: string;
};
