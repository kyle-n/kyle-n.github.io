import { BLOG_AUTHOR, BLOG_AUTHOR_EMAIL, BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from '$lib/blog-metadata';
import { getAllPosts } from '$lib/post-handlers';
import { create } from 'xmlbuilder2';
import { JSDOM } from 'jsdom';
import { readFile } from 'fs/promises';
import { Converter } from 'showdown';

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(await getRssXml(), { headers });
}

// prettier-ignore
async function getRssXml(): Promise<string> {
  const allPosts = (await getAllPosts()).filter((post) => post.metadata.title === 'You should unit test component templates');
  const rssUrl = `${BLOG_URL}/rss.xml`;
  const root = create({ version: '1.0', encoding: 'utf-8' })
  .ele('feed', {
    xmlns: 'http://www.w3.org/2005/Atom',
  })
    .ele('title').txt(BLOG_TITLE).up()
    .ele('link', { href: BLOG_URL }).up()
    .ele('link', { rel: 'self', href: rssUrl }).up()
    .ele('updated').txt(new Date().toISOString()).up()
    .ele('id').txt(BLOG_URL).up()
    .ele('author')
      .ele('name').txt(BLOG_AUTHOR).up()
      .ele('email').txt(BLOG_AUTHOR_EMAIL).up()
    .up()
  
  const converter = new Converter();

  for await (const post of allPosts) {
    const pubDate = new Date(post.metadata.date).toISOString();
    const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
    const postMarkdown = await readFile(`./src/routes/blog/posts/${post.postPath}.md`, 'utf-8');
    const postHtml = converter.makeHtml(postMarkdown);
    const postHtmlWithoutHeader = getSanitizedPostHtml(postHtml);
    const description = getPostPreviewText(postHtml);

    root.ele('entry')
      .ele('title').txt(post.metadata.title).up()
      .ele('link', { href: postUrl }).up()
      .ele('updated').txt(pubDate).up()
      .ele('id').txt(postUrl).up()
      .ele('content', { type: 'html' }).txt(postHtmlWithoutHeader).up()
    .up();
  }

  return root.end()
}

function getSanitizedPostHtml(postHtml: string): string {
  const dom = new JSDOM(postHtml);

  const elementsToRemove = [
    dom.window.document.getElementsByTagName('p')[0]
  ];
  elementsToRemove.forEach((element) => element?.remove());
  return '<p>1</p>' + dom.window.document.body.innerHTML;
}

function getPostPreviewText(postHtml: string): string {
  const dom = new JSDOM(postHtml);
  const firstParagraph = dom.window.document.querySelector('article p');
  return firstParagraph?.textContent?.trim() ?? '';
}
