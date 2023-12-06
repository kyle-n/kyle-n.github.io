import { minify } from 'html-minifier';
import { building } from '$app/environment';

export async function handle({ event, resolve }) {
  let page = '';
  return resolve(event, {
    transformPageChunk: ({ html, done }) => {
      page += html;
      if (done) {
        return building ? minify(page, minificationOptions) : page;
      }
    }
  });
}

const minificationOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeComments: false, // some hydration code needs comments
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};
