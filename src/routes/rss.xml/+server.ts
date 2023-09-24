import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from '$lib/blog-metadata';
import { getAllPosts } from '$lib/post-handlers';
import { create } from 'xmlbuilder2';

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(await getRssXml(), { headers });
}

async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts();
  const root = create({ version: '1.0' }).ele('rss', {
    'xmlns:dc': 'https://purl.org/dc/elements/1.1/',
    'xmlns:content': 'https://purl.org/rss/1.0/modules/content/',
    'xmlns:atom': 'https://www.w3.org/2005/Atom',
    version: '2.0'
  })
  .ele('channel')
  .ele('title').txt(BLOG_TITLE).up()
  .ele('link').txt(BLOG_URL).up()
  .ele('description').txt(BLOG_DESCRIPTION).up()
  .ele('language').txt('en').up()
  .ele('lastBuildDate').txt(new Date().toUTCString()).up()
  .up()
  .up();
  return root.toString();
}
