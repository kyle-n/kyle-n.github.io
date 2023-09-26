import * as universal from '../entries/pages/blog/_slug_/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.ts";
export const imports = ["_app/immutable/nodes/5.9a4ae76b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.9f372ec1.js","_app/immutable/chunks/post-date.5bc99a03.js"];
export const stylesheets = ["_app/immutable/assets/5.bb950bb0.css","_app/immutable/assets/post-date.e48032c5.css"];
export const fonts = [];
