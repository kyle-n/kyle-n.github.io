import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extension: '.md',
      remarkPlugins: [remarkFootnotes]
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
    // paths: {
    //   base: dev ? '' : 'https://www.kylenazario.com'
    // }
  }
};

export default config;
