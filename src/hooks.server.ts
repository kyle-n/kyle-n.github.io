import { redirect } from '@sveltejs/kit';
import { minify } from 'html-minifier';
import { building } from '$app/environment';

export async function handle({ event, resolve }) {
  let redirectTo = redirectUrls[event.url.pathname];
  redirectTo = redirectTo ?? redirectUrls[event.url.pathname + '/'];
  if (redirectTo) {
    throw redirect(301, redirectTo);
  }
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
  removeComments: false, // some hydration code needs comments, so leave them in
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};

const redirectUrls: { [oldUrl: string]: string } = {
  '/blog/bruce-willis-name-generator.html': '/blog/bruce-willis-name-generator',
  '/2019/01/21/bruce-willis-movie-title-name-generator/':
    '/blog/bruce-willis-name-generator',
  '/2020/05/16/angular-reactive-forms-rental-rates-servicecore/':
    '/blog/angular-reactive-forms-rental-rates-servicecore',
  '/2021/04/10/job-hunting-fun/': '/blog/job-hunting-fun',
  '/2021/05/14/why-svelte/': '/blog/why-svelte',
  '/2021/05/28/offline-podcast-watch-apps-ranked/':
    '/blog/offline-podcast-watch-apps-ranked',
  '/2021/06/02/rxjs-7-changes/': '/blog/rxjs-7-changes',
  '/2022/04/19/how-to-speed-up-angular-builds/':
    '/blog/how-to-speed-up-angular-builds',
  '/2022/05/23/why-use-small-components/': '/blog/why-use-small-components',
  '/2022/06/22/incremental-angular-typescript-adoption/':
    '/blog/incremental-angular-typescript-adoption',
  '/2022/06/30/componentfactoryresolver-explained/':
    '/blog/componentfactoryresolver-explained',
  '/2022/10/12/rxjs-land-of-paradoxes/': '/blog/rxjs-land-of-paradoxes',
  '/2023/02/15/how-node-js-fakes-multithreading/':
    '/blog/how-node-js-fakes-multithreading',
  '/2023/04/24/wwdc-23-wishlist-free-local-chatgpt/':
    '/blog/wwdc-23-wishlist-free-local-chatgpt',
  '/2023/04/28/ebike-daily-routine/': '/blog/ebike-daily-routine',
  '/2023/05/03/code-simplicity/': '/blog/code-simplicity',
  '/2023/05/04/unit-test-your-templates/': '/blog/unit-test-your-templates',
  '/2023/06/07/ai-browser-extension/': '/blog/ai-browser-extension'
};
