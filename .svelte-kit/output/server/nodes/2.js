

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.f6af2b7e.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.9f372ec1.js"];
export const stylesheets = [];
export const fonts = [];
