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
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
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
  const rssPosts = allPosts.slice(0, 10);
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

  for await (const post of rssPosts) {
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

async function getHtmlForPost(
  postPath: string,
  leadImageFilename?: string,
  leadImageCaption?: string
): Promise<string> {
  const postMarkdownWithFrontmatter = await readFile(
    `./posts/${postPath}.md`,
    'utf-8'
  );
  const postMarkdown = postMarkdownWithFrontmatter
    .split('---')
    .slice(2)
    .join('---')
    .trim();
  const processedMarkdown = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)
    .use(remarkGfm)
    .process(postMarkdown);
  let postHtml = processedMarkdown.toString();
  // prevents HTML in code tags from being rendered
  postHtml = postHtml.replaceAll('&#x3C;', '&amp;lt;');

  const postDom = new JSDOM();
  postDom.window.document.body.innerHTML = postHtml;

  addBasePrefixToImages(postDom);
  removeBasePrefixFromElements(postDom);
  inlineFootnotes(postDom);
  convertYouTubeEmbedsToLinks(postDom);

  if (leadImageFilename) {
    const leadImage = postDom.window.document.createElement('img');
    leadImage.src = `${base}/img/${leadImageFilename}`;
    if (leadImageCaption) {
      const caption = postDom.window.document.createElement('caption');
      caption.textContent = leadImageCaption;
      postDom.window.document.body.prepend(caption);
    }
    postDom.window.document.body.prepend(leadImage);
  }
  return postDom.window.document.body.innerHTML;
}

function addBasePrefixToImages(dom: JSDOM): void {
  const allImages = Array.from(
    dom.window.document.getElementsByTagName('img')
  ) as HTMLImageElement[];
  allImages.forEach(image => {
    const src = image.getAttribute('src');
    if (src) {
      image.setAttribute('src', `${base}/img/${src}`);
    }
  });
}

function removeBasePrefixFromElements(dom: JSDOM): void {
  const basePrefix = '{base}';
  const encodedBasePrefix = encodeURIComponent(basePrefix);
  const allElements = Array.from(dom.window.document.getElementsByTagName('*'));
  allElements.forEach(element => {
    const href = element.getAttribute('href');
    if (href?.startsWith(basePrefix)) {
      element.setAttribute('href', href.slice(basePrefix.length));
    }
    if (href?.startsWith(encodedBasePrefix)) {
      element.setAttribute('href', href.slice(encodedBasePrefix.length));
    }
    const src = element.getAttribute('src');
    if (src?.startsWith(basePrefix)) {
      element.setAttribute('src', src.slice(basePrefix.length));
    }
    if (src?.startsWith(encodedBasePrefix)) {
      element.setAttribute('src', src.slice(encodedBasePrefix.length));
    }
  });
}

function inlineFootnotes(dom: JSDOM): void {
  const footnoteLinkPrefix = '#user-content-fn-';
  const prefixToRemove = '#user-content-';
  const allLinks = Array.from(dom.window.document.getElementsByTagName('a'));
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href?.startsWith(footnoteLinkPrefix)) {
      const newFootnoteHref = '#' + href.slice(prefixToRemove.length);
      const footnoteContentElem = dom.window.document.getElementById(
        href.slice(1)
      ) as HTMLLIElement | null;
      footnoteContentElem?.setAttribute('id', newFootnoteHref.slice(1));
      link.setAttribute('href', newFootnoteHref);
    }
  });
}

function convertYouTubeEmbedsToLinks(dom: JSDOM): void {
  dom.window.document.body.innerHTML =
    dom.window.document.body.innerHTML.replaceAll('&amp;lt;iframe', '&#x3C;iframe');
  const youtubeIframes = Array.from(
    dom.window.document.getElementsByTagName('iframe')
  ).filter(iframe => {
    const src = iframe.getAttribute('src') ?? '';
    return src.startsWith('https://www.youtube.com/embed/');
  }) as HTMLIFrameElement[];

  youtubeIframes.forEach(iframe => {
    const src = iframe.getAttribute('src') ?? '';
    const videoId = src.slice('https://www.youtube.com/embed/'.length);
    const link = dom.window.document.createElement('a');
    link.setAttribute('href', `https://youtu.be/${videoId}`);
    link.textContent = `https://youtu.be/${videoId}`;
    iframe.replaceWith(link);
  });
}
