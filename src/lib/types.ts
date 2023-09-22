export type BlogPostLoadData = {
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

export type BlogLandingPageLoadData = {
  posts: Array<{
    metadata: BlogPostMetadata;
    postPath: string;
  }>;
};
