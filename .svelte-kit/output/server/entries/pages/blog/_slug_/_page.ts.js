const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
async function load({ params }) {
  const slug = params.slug;
  const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../posts/ai-browser-extension.md": () => import("../../../../chunks/ai-browser-extension.js"), "../posts/angular-reactive-forms-rental-rates-servicecore.md": () => import("../../../../chunks/angular-reactive-forms-rental-rates-servicecore.js"), "../posts/code-simplicity.md": () => import("../../../../chunks/code-simplicity.js"), "../posts/componentfactoryresolver-explained.md": () => import("../../../../chunks/componentfactoryresolver-explained.js"), "../posts/ebike-daily-routine.md": () => import("../../../../chunks/ebike-daily-routine.js"), "../posts/how-node-js-fakes-multithreading.md": () => import("../../../../chunks/how-node-js-fakes-multithreading.js"), "../posts/how-to-speed-up-angular-builds.md": () => import("../../../../chunks/how-to-speed-up-angular-builds.js"), "../posts/incremental-angular-typescript-adoption.md": () => import("../../../../chunks/incremental-angular-typescript-adoption.js"), "../posts/job-hunting-fun.md": () => import("../../../../chunks/job-hunting-fun.js"), "../posts/offline-podcast-watch-apps-ranked.md": () => import("../../../../chunks/offline-podcast-watch-apps-ranked.js"), "../posts/rxjs-7-changes.md": () => import("../../../../chunks/rxjs-7-changes.js"), "../posts/rxjs-land-of-paradoxes.md": () => import("../../../../chunks/rxjs-land-of-paradoxes.js"), "../posts/unit-test-your-templates.md": () => import("../../../../chunks/unit-test-your-templates.js"), "../posts/why-svelte.md": () => import("../../../../chunks/why-svelte.js"), "../posts/why-use-small-components.md": () => import("../../../../chunks/why-use-small-components.js"), "../posts/wwdc-23-wishlist-free-local-chatgpt.md": () => import("../../../../chunks/wwdc-23-wishlist-free-local-chatgpt.js") }), `../posts/${slug}.md`);
  const content = post.default;
  return {
    metadata: post.metadata,
    content
  };
}
export {
  load
};
