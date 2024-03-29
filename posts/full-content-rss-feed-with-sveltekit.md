---
layout: post
title: How to make a full-content RSS feed for your SvelteKit blog
date: 2023-08-03
keywords: javascript, typescript, showcase, frontend, svelte, tutorial
description: Time to escape some HTML tags
---

I recently rebuilt this blog in [SvelteKit](https://kit.svelte.dev) using [Josh Collinsworth's awesome guide](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog). I highly recommend his post for anyone wanting to do the same.

I also spent some time adding an RSS feed with the full content of every post. As a longtime RSS user, I prefer blogs that don't make me click through to the website.

Let's be the change we want to see in the world and build a full-content RSS feed in SvelteKit.

**Update Dec. 2023:** This guide is partially outdated. Please see the [updated version]({base}/blog/full-content-rss-feed-with-sveltekit-part-two).

### Prerendering

To make an RSS feed for your SvelteKit blog, create a new folder under `/routes` called `rss.xml`. This file will technically be an [Atom](<https://en.wikipedia.org/wiki/Atom_(web_standard)>) feed, not RSS, but the difference is irrelevant and I'm just going to use the term "RSS" in this post (do not @ me).

Inside `/routes/rss.xml`, create `+server.ts`. In a normal SvelteKit app, this would be a Node API route. With a static, pre-rendered website, this "server route" creates a file at build time.

```typescript
export const prerender = true;

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response('', { headers });
}
```

Now when we build the site, a file called `rss.xml` will be created at the site root. This file will be empty, because the `Response` is empty.

### Building the XML

A lot of RSS examples online just use string interpolation to build their RSS XML files. Frankly, any kind of heavy string interpolation or concatenation makes me like I'm about to get in trouble.

So let's use a library. Run `npm i -D xmlbuilder2` to install [xmlbuilder2](https://oozcitak.github.io/xmlbuilder2/). This will let us build XML using nice, safe JavaScript.

Now we can add a function called `getRssXml()`:

```typescript
import {
  BLOG_AUTHOR,
  BLOG_AUTHOR_EMAIL,
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  BLOG_URL
} from '$lib/blog-metadata';
import { create } from 'xmlbuilder2';

// prettier-ignore
async function getRssXml(): Promise<string> {
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

  return root.end();
}
```

`xmlbuilder2` syntax is one big chained function call. `.ele()` starts a new XML tag, `.txt()` puts content inside it, and `.up()` closes it.

The blog metadata is a separate file I keep for site information.

```typescript
import { dev } from '$app/environment';

export const BLOG_TITLE = 'Kyle Nazario';
export let BLOG_URL: string;
if (dev) {
  BLOG_URL = 'http://localhost:5173';
} else {
  BLOG_URL = 'https://www.kylenazario.com';
}
export const BLOG_DOMAIN = 'kylenazario.com';
export const BLOG_DESCRIPTION =
  'Frontend web developer, app tinkerer and TypeScript enthusiast.';
export const BLOG_AUTHOR = 'Kyle Nazario';
export const BLOG_AUTHOR_TWITTER = '@kbn_au';
export const BLOG_AUTHOR_GITHUB = 'kyle-n';
export const BLOG_AUTHOR_EMAIL = 'kylebnazario@gmail.com';
export const BLOG_AUTHOR_LINKEDIN = 'kylenazario';
export const BLOG_AUTHOR_MASTODON = '@kn';
export const BLOG_AUTHOR_BLUESKY = 'kylenazario.com';
export const BLOG_IMAGE_FILENAME = 'banner.webp';
export const BLOG_IMAGE = `${BLOG_URL}/img/${BLOG_IMAGE_FILENAME}`;
```

When we do an `npm run build`, `rss.xml` will now contain:

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed
    xmlns="http://www.w3.org/2005/Atom">
    <title>Kyle Nazario</title>
    <link href="https://www.kylenazario.com"/>
    <link rel="self" href="https://www.kylenazario.com/rss.xml"/>
    <updated>2023-10-03T14:24:24.696Z</updated>
    <id>https://www.kylenazario.com</id>
    <author>
        <name>Kyle Nazario</name>
        <email>kylebnazario@gmail.com</email>
    </author>
    <subtitle>Frontend web developer, app tinkerer and TypeScript enthusiast.</subtitle>
</feed>
```

The only thing missing are the posts.

### Loading post content

I have a function in my `$lib` called `getAllPosts()`. This is adapted from [Josh Collinsworth's tutorial](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog):

```typescript
export async function getAllPosts(): Promise<PostLink[]> {
  const pathPrefix = '../routes/blog/posts/';
  const allPostFiles = import.meta.glob('../routes/blog/posts/*.md');
  const iterablePostFiles = Object.entries(allPostFiles);
  const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
    const postPath = path.replace(pathPrefix, '').replace('.md', '');
    return { metadata, postPath };
  });
  const posts = await Promise.all(postJobs);
  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
  return posts;
}
```

The paths in this function depend on your blog's file organization. It returns an array of `PostLink`s, which look like:

```typescript
export type PostLink = {
  metadata: BlogPostMetadata;
  postPath: string;
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
```

`BlogPostMetadata` has the properties it does because those are the things I write in the frontmatter of every blog post. For example, the Markdown file for [my AI post]({base}/blog/ai-browser-extension) has at the top:

<script lang="ts">
  import { base } from '$app/paths';
</script>

```yaml
---
layout: post
title: How AI helped me write a browser extension
date: 2023-06-07
keywords: ai, javascript, typescript, extensions, showcase, frontend
image: ai.webp
description: Making the case AI is not magic, but it is useful.
---
```

Back to `getAllPosts()`. This method returns a list of paths to my blog posts, and the frontmatter metadata for each post. That'll be our starting point for building the rest of the RSS feed.

```typescript
async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts(); // <-- new
  const rssUrl = `${BLOG_URL}/rss.xml`;
```

Once we've loaded all posts, we can iterate over them and add their metadata as XML.

<!-- prettier-ignore -->
```typescript
for await (const post of allPosts) {
  const pubDate = post.metadata.date;
  const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
  const summary = post.metadata.description;

  root
    .ele('entry')
      .ele('title').txt(post.metadata.title).up()
      .ele('link', { href: postUrl }).up()
      .ele('updated').txt(pubDate).up()
      .ele('id').txt(postUrl).up()
      .ele('summary').txt(summary).up()
    .up();
}
```

This is good! Now our RSS feed will have a list of posts with titles and descriptions. It just needs the content.

### Putting content in the feed

We're going to add the content of each post to our XML using this process:

1. Load the post Markdown
2. Convert it to HTML
3. Add the HTML to our RSS XML

To do step 2, we'll use [Showdown.js](https://github.com/showdownjs/showdown), a JavaScript-based Markdown-to-HTML converter. Run `npm i -D showdown`.

At the top of `+server.ts`, import Showdown and `readFile`:

```typescript
import { readFile } from 'fs/promises';
import showdown from 'showdown';
```

Inside the `for await` loop in `getRssXml()`, add:

```typescript
const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
const postHtml = await getHtmlForPost(post.postPath); // <-- new
const summary = post.metadata.description;
```

At the end of the file, add:

```typescript
const converter = new showdown.Converter();
async function getHtmlForPost(postPath: string): Promise<string> {
  const postMarkdown = await readFile(
    `./src/routes/blog/posts/${postPath}.md`, // <-- your path may vary
    'utf-8'
  );
  return converter.makeHtml(postMarkdown);
}
```

This code reads the Markdown from the blog post file and converts it to HTML. Simple as that.

#### Remove the frontmatter

However, if you preview the RSS feed, you will see something unfortunate.

![A post in an RSS feed with the YAML frontmatter displayed](bad-feed-1.webp)

Showdown tries to render the YAML frontmatter as content. We don't want any of that.

```typescript
async function getHtmlForPost(postPath: string): Promise<string> {
  const postMarkdownWithFrontmatter = await readFile(
    `./src/routes/blog/posts/${postPath}.md`,
    'utf-8'
  );
  const postMarkdown = postMarkdownWithFrontmatter.split('---')[2].trim();
  return converter.makeHtml(postMarkdown);
}
```

The feed's better! Looks like we can finally- wait a minute, is a real HTML button?

#### Escape the HTML

![A post in an RSS reader. A clickable button is displayed inside a code snippet](bad-feed-2.webp)

There shouldn't be real button in that code snippet.

If you put valid HTML tags in your Markdown, even inside a `<code>` block, they will be rendered in RSS readers. This is unfortunate for me, a frontend dev who often writes posts with HTML snippets.

After a _lot_ of experimenting and pain, I figured out when Showdown converts your Markdown to HTML, it will encode the tag arrows. `<button>` becomes `&amp;lt;button&amp;gt;` However, RSS readers will _un-encode_ those arrows and just render the word `<button>` as a real button.

To fix this, we have to double-encode our HTML tags:

```typescript
async function getHtmlForPost(postPath: string): Promise<string> {
  const postMarkdownWithFrontmatter = await readFile(
    `./src/routes/blog/posts/${postPath}.md`,
    'utf-8'
  );
  const postMarkdown = postMarkdownWithFrontmatter.split('---')[2].trim();
  let postHtml = converter.makeHtml(postMarkdown);
  // prevents HTML in code tags from being rendered
  postHtml = postHtml
    .replaceAll('&lt;', '&amp;lt;')
    .replaceAll('&gt;', '&amp;gt;');
  return postHtml;
}
```

![A post in an RSS reader. HTML code is displayed in a code snippet](good-feed-1.webp)

Much better.

#### Fix image paths

Another issue I ran into was with image URLs. When I add an image within the body of my post, I use this syntax:

```markdown
![Alt text here]({base}/img/filename.ts)

<script lang="ts">import { base } from '$app/paths';</script>
```

Writing `{base}` before every image URL is a pain in the ass, to be honest. [Get in touch]({base}/contact) if you have a better way.

**Update**: There is [a better way]({base}/blog/markdown-images-for-sveltekit-blogs).

Using `{base}` in every image URL is also disadvantageous because Showdown does not understand it. The inline images URLs in your RSS feed will 404.

Luckily, this can be fixed with one line of code:

```typescript
postHtml = postHtml
  .replaceAll('&lt;', '&amp;lt;')
  .replaceAll('&gt;', '&amp;gt;')
  .replaceAll('{base}', '');
```

#### Lead images

All of my posts have an `image` property in their frontmatter. It's the filename of the post's lead image. This lead image is displayed prominently at the top of the page and used as the preview image on social media.

Right now, this image does not appear within the RSS feed entries. Let's add it. Install `jsdom` to your `devDependencies`. We'll use it to create a new `<image>` element and add it to the front of the post HTML.

```typescript
const postHtml = await getHtmlForPost(post.postPath, post.metadata.image);

// ...

async function getHtmlForPost(
  postPath: string,
  leadImageFilename?: string
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
    postHtml = leadImage.outerHTML + postHtml;
  }
  return postHtml;
}
```

My posts also have an optional `caption` property. We can add that on too.

```typescript
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
```

### RSS file size

Last, we should make sure the file size of `rss.xml` never gets too big.

```typescript
async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts();
  const rssPosts = allPosts.slice(0, 10);
// ...
  for await (const post of rssPosts) {
```

### Conclusion

The final `+server.ts` file looks like this:

```typescript
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
```

The downside of this setup is if you use a Svelte component within your post, it will not render in the RSS feed (Showdown doesn't understand Svelte). If any Svelte experts (Sveltesperts?) know how to get an image component rendered in this feed, please [write in]({base}/contact).
