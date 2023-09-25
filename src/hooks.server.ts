import { redirect } from '@sveltejs/kit';

const redirectUrls: { [oldUrl: string]: string } = {
  '/blog/bruce-willis-name-generator.html': '/blog/bruce-willis-name-generator'
};

export async function handle({ event, resolve }) {
  const redirectTo = redirectUrls[event.url.pathname];
  if (redirectTo) {
    throw redirect(301, redirectTo);
  }
  return resolve(event);
}
