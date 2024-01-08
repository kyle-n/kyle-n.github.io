import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import imgLinks from '@pondorasti/remark-img-links';

const dev = process.argv.includes('dev');
const base = dev ? '' : process.env.BASE_PATH;
let BLOG_URL;
if (dev) {
  BLOG_URL = 'http://localhost:5173';
} else {
  BLOG_URL = 'https://kylenazario.com';
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extension: '.md',
      remarkPlugins: [
        remarkFootnotes,
        [imgLinks, { absolutePath: BLOG_URL + '/img/' }]
      ],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
    })
  ],

  extensions: ['.svelte', '.md'],

  kit: {
    adapter: adapter({
      memory: 128
    }),
    paths: {
      base
    }
  }
};

export default config;
