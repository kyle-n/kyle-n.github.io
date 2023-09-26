

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7952cba3.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.9f372ec1.js","_app/immutable/chunks/singletons.c8a3f3e0.js"];
export const stylesheets = [];
export const fonts = [];
