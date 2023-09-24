import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from '$lib/blog-metadata';
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
  const root = create({ version: '1.0' })
  .ele('rss', {
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
      .ele('lastBuildDate').txt(new Date().toUTCString()).up();
  
  const converter = new Converter();

  for await (const post of allPosts) {
    const pubDate = new Date(post.metadata.date).toUTCString();
    const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
    const postMarkdown = await readFile(`./src/routes/blog/posts/${post.postPath}.md`, 'utf-8');
    const postHtml = converter.makeHtml(postMarkdown);
    console.log(postHtml)
    const postHtmlWithoutHeader = getSanitizedPostHtml(postHtml);
    const description = getPostPreviewText(postHtml);

    root.ele('item')
      .ele('title').txt(post.metadata.title).up()
      .ele('description').txt(description).up()
      .ele('guid').txt(postUrl).up()
      .ele('dc:creator').txt('Kyle Nazario').up()
      .ele('link').txt(postUrl).up()
      .ele('pubDate').txt(pubDate).up()
      .ele('content:encoded').txt(postHtmlWithoutHeader).up()
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
  return dom.window.document.body.innerHTML;
}

function getPostPreviewText(postHtml: string): string {
  const dom = new JSDOM(postHtml);
  const firstParagraph = dom.window.document.querySelector('article p');
  return firstParagraph?.textContent?.trim() ?? '';
}
