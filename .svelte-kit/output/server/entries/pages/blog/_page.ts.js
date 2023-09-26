async function load() {
  const pathPrefix = "./posts/";
  const allPostFiles = /* @__PURE__ */ Object.assign({ "./posts/ai-browser-extension.md": () => import("../../../chunks/ai-browser-extension.js"), "./posts/angular-reactive-forms-rental-rates-servicecore.md": () => import("../../../chunks/angular-reactive-forms-rental-rates-servicecore.js"), "./posts/code-simplicity.md": () => import("../../../chunks/code-simplicity.js"), "./posts/componentfactoryresolver-explained.md": () => import("../../../chunks/componentfactoryresolver-explained.js"), "./posts/ebike-daily-routine.md": () => import("../../../chunks/ebike-daily-routine.js"), "./posts/how-node-js-fakes-multithreading.md": () => import("../../../chunks/how-node-js-fakes-multithreading.js"), "./posts/how-to-speed-up-angular-builds.md": () => import("../../../chunks/how-to-speed-up-angular-builds.js"), "./posts/incremental-angular-typescript-adoption.md": () => import("../../../chunks/incremental-angular-typescript-adoption.js"), "./posts/job-hunting-fun.md": () => import("../../../chunks/job-hunting-fun.js"), "./posts/offline-podcast-watch-apps-ranked.md": () => import("../../../chunks/offline-podcast-watch-apps-ranked.js"), "./posts/rxjs-7-changes.md": () => import("../../../chunks/rxjs-7-changes.js"), "./posts/rxjs-land-of-paradoxes.md": () => import("../../../chunks/rxjs-land-of-paradoxes.js"), "./posts/unit-test-your-templates.md": () => import("../../../chunks/unit-test-your-templates.js"), "./posts/why-svelte.md": () => import("../../../chunks/why-svelte.js"), "./posts/why-use-small-components.md": () => import("../../../chunks/why-use-small-components.js"), "./posts/wwdc-23-wishlist-free-local-chatgpt.md": () => import("../../../chunks/wwdc-23-wishlist-free-local-chatgpt.js") });
  const iterablePostFiles = Object.entries(allPostFiles);
  const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = await resolver();
    const postPath = path.replace(pathPrefix, "").replace(".md", "");
    return { metadata, postPath };
  });
  const posts = await Promise.all(postJobs);
  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
  return { posts };
}
export {
  load
};
