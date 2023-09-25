import { dev } from '$app/environment';

export const BLOG_TITLE = 'Kyle Nazario';
export let BLOG_URL: string;
if (dev) {
  BLOG_URL = 'http://localhost:5173';
} else {
  BLOG_URL = 'https://www.kylenazario.com';
}
export const BLOG_DESCRIPTION = 'Frontend web developer, app tinkerer and TypeScript enthusiast.';
export const BLOG_AUTHOR = 'Kyle Nazario';
export const BLOG_AUTHOR_TWITTER = '@kbn_au';
export const BLOG_AUTHOR_GITHUB = 'kyle-n';
export const BLOG_AUTHOR_EMAIL = 'kylebnazario@gmail.com';
