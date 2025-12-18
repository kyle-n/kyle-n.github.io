import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';
import remarkImgLinks from '@pondorasti/remark-img-links';
import remarkBehead from 'remark-behead';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeLazyLoadImages from 'rehype-plugin-image-native-lazy-loading';

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
        [remarkImgLinks, { absolutePath: BLOG_URL + '/img/' }],
        [remarkBehead, {minDepth: 3}]
      ],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeLazyLoadImages]
    })
  ],

  extensions: ['.svelte', '.md'],

  kit: {
    adapter: adapter({
      memory: 128,
      runtime: 'nodejs22.x'
    }),
    paths: {
      base
    },
    inlineStyleThreshold: 1024
  }
};

export default config;
