---
layout: post
title: How to use Markdown images with your SvelteKit blog
date: 2023-10-11
keywords: svelte, tutorial
description: Use these plugins for short, easy-to-write image URLs.
---

Quick note for anybody trying to set up a blog using [SvelteKit](https://kit.svelte.dev/) with posts written in [Markdown](https://www.markdownguide.org/).

Normally, Markdown image syntax is:

```other
![A black lab dog looking at the camera](https://i.imgur.com/zfwjIxQg.webp)
```

If your image is hosted somewhere else, you're good. Just put the URL for the image.

However, if your image is stored as a file in your SvelteKit blog's `/static` folder, you need to reference it using the `base` path.

```other
![Blog logo]({base}/img/blog-logo.webp)

<script>
  import {base} from '$app/paths';
</script>
```

This is legal syntax! You can always put HTML in Markdown, and [MDsveX](https://github.com/pngwn/MDsveX) will fill in `{base}` on compile.

However, if you (correctly) think this is a verbose and annoying way to write image URLs, there is a better option.

First, install [@pondorasti/remark-img-links](https://github.com/Pondorasti/remark-img-links). Next, open `svelte.config.js` and import your plugin to use with MDSVex.

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import imgLinks from '@pondorasti/remark-img-links';

const dev = process.argv.includes('dev');
const base = dev ? '' : process.env.BASE_PATH;
let BLOG_URL;
if (dev) {
  BLOG_URL = 'http://localhost:5173';
} else {
  BLOG_URL = 'https://www.your-blog-name-here.com';
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extension: '.md',
      remarkPlugins: [
        // My blog images are at /static/img
        [imgLinks, { absolutePath: BLOG_URL + '/img/' }]
      ]
    })
  ],

  extensions: ['.svelte', '.md'],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: false
    }),
    paths: {
      base
    }
  }
};

export default config;
```

Now when writing Markdown, you can simply put:

```javascript
![Blog logo](blog-logo.webp)
```

No `<script>` import, no `{base}` - just put the filename of the image at the folder indicated by the `absolutePath` in your `svelte.config.js`.
