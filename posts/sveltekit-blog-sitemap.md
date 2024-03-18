---
layout: post
title: How to create a sitemap for your SvelteKit blog
description: Boost your SEO!
date: 2024-01-05
keywords: svelte, tutorial
image: google-map-cartoon.webp
caption: DALL-E 2 - "a map with the google logo in the upper left. Cute, cartoony, pastel colors"
---

<script>
  import {base} from '$app/paths';
</script>

You can boost your SvelteKit blog's SEO by creating a [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview). To quote Google's documentation:

> A sitemap is a file where you provide information about the pages, videos, and other files on your site, and the relationships between them. Search engines like Google read this file to crawl your site more efficiently.

Building a sitemap is similar to [creating an RSS feed]({base}/blog/full-content-rss-feed-with-sveltekit-part-two).

### Steps

First, install [xmlbuilder2](https://oozcitak.github.io/xmlbuilder2/) using NPM.

Second, create a function called `getAllPosts()` that returns an array of file paths to your blog posts. See [this guide](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#writing-a-utility-to-fetch-posts) or [my implementation](https://github.com/kyle-n/kyle-n.github.io/blob/d1671c1eec8fd2da93b5a5abdffb805fa8e4b4c0/src/lib/post-handlers.ts#L3).

Third, add a folder in `src/routes` called `sitemap.xml`. Create a file `+server.ts` inside this folder. At the top of the file, write:

```typescript
// src/routes/sitemap.xml/+server.ts

export const prerender = true;

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(await getSitemapXml(), { headers });
}
```

When SvelteKit builds the site, it will create `sitemap.xml` at `yourdomain.com/sitemap.xml`. We'll give this URL to Google later.

### Build the XML

We'll use `xmlbuilder2` to create the sitemap without messy string interpolation.

```typescript
// src/routes/sitemap.xml/+server.ts
// ...

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

// ...
```

This will produce an XML shell...

```xml
<?xml version="1.0" encoding="utf-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" />
```

...which we can fill in with links to our blog posts.

<!-- prettier-ignore -->
```typescript
// src/routes/sitemap.xml/+server.ts
// ...

  for await (const post of allPosts) {
    const postUrl = `${BLOG_URL}/blog/${post.postPath}`;
    const pubDate = post.metadata.date;

    root.ele('url')
      .ele('loc').txt(postUrl).up()
      .ele('lastmod').txt(pubDate).up()
    .up();
  }

// ...
```

`BLOG_URL` comes from a [file](https://github.com/kyle-n/kyle-n.github.io/blob/main/src/lib/blog-metadata.ts) of sitewide constants:

```typescript
// src/lib/blog-metadata.ts
// ...

export let BLOG_URL: string;
if (dev) {
  BLOG_URL = 'http://localhost:5173';
} else {
  BLOG_URL = 'https://kylenazario.com';
}

// ...
```

`loc` gives Google the post URL, and `lastMod` the last modified date. `post.metadata.date` comes from the [frontmatter](https://jekyllrb.com/docs/step-by-step/03-front-matter/) in my posts. Each post file is prefixed by:

```markdown
---
title: Blog post title here
date: 2024-01-05
---
```

The [final version of `+server.ts`](https://github.com/kyle-n/kyle-n.github.io/blob/main/src/routes/sitemap.xml/%2Bserver.ts) looks like:

```typescript
// src/routes/sitemap.xml/+server.ts

import { BLOG_URL } from '$lib/blog-metadata';
import { getAllPosts } from '$lib/post-handlers';
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
    const pubDate = post.metadata.date;

    root.ele('url')
      .ele('loc').txt(postUrl).up()
      .ele('lastmod').txt(pubDate).up()
    .up();
  }

  return root.end()
}
```

Publish your site. Make sure you can see the XML file content at `yourdomain.com/sitemap.xml`.

Last, follow [Google's instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap) to submit a sitemap in the Search Console. They will periodically crawl your site from now on to get an index of pages.
