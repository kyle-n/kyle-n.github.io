import * as universal from '../entries/pages/blog/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/+page.ts";
export const imports = ["_app/immutable/nodes/4.6b689c2e.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.9f372ec1.js","_app/immutable/chunks/post-date.5bc99a03.js"];
export const stylesheets = ["_app/immutable/assets/post-date.e48032c5.css"];
export const fonts = [];
