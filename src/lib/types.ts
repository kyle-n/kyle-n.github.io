export type BlogPostData = {
  title: string;
  date: Date;
  content: ConstructorOfATypedSvelteComponent;
};

export type BlogPostMetadata = {
  layout: 'post',
  title: string;
  date: string;
  image?: string;
  keywords?: string[];
  hn?: string;
}
