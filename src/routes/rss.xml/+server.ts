import {
  BLOG_AUTHOR,
  BLOG_AUTHOR_EMAIL,
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  BLOG_URL
} from '$lib/blog-metadata';
import { getAllPosts, getCorrectedPostDate } from '$lib/post-handlers';
import { create } from 'xmlbuilder2';
import { JSDOM } from 'jsdom';
import { readFile } from 'fs/promises';
import showdown from 'showdown';
import { base } from '$app/paths';

export const prerender = true;

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(await getRssXml(), { headers });
}

// prettier-ignore
async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts();
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
    .ele('subtitle').txt(BLOG_DESCRIPTION).up()

  for await (const post of allPosts) {
    const pubDate = getCorrectedPostDate(post.metadata.date);
    const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
    const postHtml = await getHtmlForPost(post.postPath, post.metadata.image, post.metadata.caption);
    const summary = post.metadata.description;

    root.ele('entry')
      .ele('title').txt(post.metadata.title).up()
      .ele('link', { href: postUrl }).up()
      .ele('updated').txt(pubDate).up()
      .ele('id').txt(postUrl).up()
      .ele('content', { type: 'html' }).txt(postHtml).up()
      .ele('summary').txt(summary).up()
    .up();
  }

  return root.end()
}

const converter = new showdown.Converter();
async function getHtmlForPost(
  postPath: string,
  leadImageFilename?: string,
  leadImageCaption?: string
): Promise<string> {
  const postMarkdownWithFrontmatter = await readFile(
    `./src/routes/blog/posts/${postPath}.md`,
    'utf-8'
  );
  const postMarkdown = postMarkdownWithFrontmatter.split('---')[2].trim();
  let postHtml = converter.makeHtml(postMarkdown);
  // prevents HTML in code tags from being rendered
  postHtml = postHtml
    .replaceAll('&lt;', '&amp;lt;')
    .replaceAll('&gt;', '&amp;gt;')
    .replaceAll('{base}', '');
  if (leadImageFilename) {
    const dom = new JSDOM();
    const leadImage = dom.window.document.createElement('img');
    leadImage.src = `${base}/img/${leadImageFilename}`;
    if (leadImageCaption) {
      const caption = dom.window.document.createElement('caption');
      caption.textContent = leadImageCaption;
      postHtml = caption.outerHTML + postHtml;
    }
    postHtml = leadImage.outerHTML + postHtml;
  }
  return postHtml;
}
