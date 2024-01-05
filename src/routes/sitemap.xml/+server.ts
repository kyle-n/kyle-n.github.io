import { BLOG_URL, DEFAULT_POSTS_PER_PAGE } from '$lib/blog-metadata';
import { getAllPosts, getCorrectedPostDate } from '$lib/post-handlers';
import { create } from 'xmlbuilder2';

export const prerender = true;

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(await getSitemapXml(), { headers });
}

// prettier-ignore
async function getSitemapXml(): Promise<string> {
  const allPosts = await getAllPosts();
  const root = create({ version: '1.0', encoding: 'utf-8' })
  .ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
    'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
    'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
    'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',
  })

  for await (const post of allPosts) {
    const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
    const pubDate = getCorrectedPostDate(post.metadata.date);

    root.ele('url')
      .ele('loc').txt(postUrl).up()
      .ele('lastmod').txt(pubDate).up()
    .up();
  }

  return root.end()
}