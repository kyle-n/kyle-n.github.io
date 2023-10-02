import { dev } from '$app/environment';
import { base } from '$app/paths';

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
export const BLOG_IMAGE = `${base}/img/me.jpeg`;

export const DEFAULT_POSTS_PER_PAGE = 10;
