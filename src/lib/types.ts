export type ResolvedBlogPost = {
  metadata: BlogPostMetadata;
  content: ConstructorOfATypedSvelteComponent;
};

export type BlogPostMetadata = {
  layout: 'post';
  title: string;
  date: string;
  image?: string;
  caption?: string;
  keywords?: string[];
  hn?: string;
};

export type ResolvedBlogPostList = {
  posts: PostLink[];
};

export type PostLink = {
    metadata: BlogPostMetadata;
    postPath: string;
}
