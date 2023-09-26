import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "layout": "post",
  "title": "How to speed up your Angular builds",
  "date": "2022-04-19T00:00:00.000Z",
  "keywords": "javascript, typescript, angular, frontend",
  "image": "fast_pc.jpg",
  "caption": "Image via Mohamed Hassan on Pixabay"
};
const How_to_speed_up_angular_builds = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-1psk79q">Slow builds <a href="https://steven-lemon182.medium.com/a-guide-to-reducing-development-wait-time-part-1-why-9dcbbfdc1224" rel="nofollow">stop developers’ productivity cold</a>. If code takes even two minutes to compile, it’s easy to get distracted. You lose your train of thought or, god forbid, open social media.</p> <p data-svelte-h="svelte-177yt0l"><img src="/static/img/compiling.png" alt="An XKCD comic of two programmers fighting with toy swords. Their boss yells at them to work, but they say their code is compiling."></p> <p data-svelte-h="svelte-3krl8">Slow builds are also expensive. Imagine you have one developer paid $100,000 a year, approximately <a href="https://www.ziprecruiter.com/Salaries/Software-Engineer-Salary" rel="nofollow">the average salary of a software engineer in the United States</a>. That’s $50 an hour, assuming they get two weeks off and work 40 hours a week. If they rebuild the app ten times a day and each rebuild takes two minutes, that person is paid $3,320 per year to watch a progress bar. And that’s not even factoring in the cost of running builds on cloud infrastructure.</p> <p data-svelte-h="svelte-jlqtvx">No wonder a Reddit engineer <a href="https://twitter.com/softwarejameson/status/1455971162060697613?s=20&t=nG4msUNBfLolUl_TEndsYQ" rel="nofollow">announced</a> last year that they were buying new Apple Silicon MacBook Pros for their Android developers. According to this engineer, the improved build times paid for the laptops in just three months.</p> <p data-svelte-h="svelte-3je846">So if you are running into slow Angular builds, try these steps to reduce build time. They are listed in order of increasing complexity.</p> <h2 data-svelte-h="svelte-16i54v3">Step 1: Update your local environment</h2> <p data-svelte-h="svelte-1xqnupa">First, increase Node’s memory limit. This consumes more RAM, but it helps.</p> <p data-svelte-h="svelte-1m0lhz">Second, keep ahead-of-time (AOT) compilation turned on. Builds will take slightly longer than just-in-time (JIT) compilation, but the page will refresh so quickly that it may be worth it.</p> <h2 data-svelte-h="svelte-1ws0kxy">Step 2: Check your build process</h2> <p data-svelte-h="svelte-1cd0hbd"><img src="/static/img/angular-build-flags.png" alt="A chart of Angular build flags and their effect on compile times"></p> <p data-svelte-h="svelte-1a5cp1y">I tested every command-line option for ng build for its performance while enabled and disabled. These are the flags I’d recommend using, depending on the context.</p> <table data-svelte-h="svelte-12eatwf"><thead><tr><th>Dev only</th> <th>Prod only</th></tr></thead> <tbody><tr><td>—named-chunks</td> <td>—build-optimizer</td></tr> <tr><td>—vendor-chunk</td> <td>—optimization</td></tr> <tr><td></td> <td>—output-hashing</td></tr> <tr><td></td> <td>—extract-licenses</td></tr> <tr><td></td> <td>—subresource-integrity</td></tr></tbody></table> <p data-svelte-h="svelte-1e424sz"><code>--named-chunks</code> and <code>--vendor-chunk</code> help cache JavaScript bundles across builds. The flags in the prod column tend to optimize the build for smaller bundle sizes at the expense of compile time.</p> <h3 data-svelte-h="svelte-lmrcgh">Try hot module reloading.</h3> <p data-svelte-h="svelte-1dtrphx"><a href="https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7" title="https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7" rel="nofollow">Hot module reloading (HMR) is much easier</a> in Angular 11. When Angular rebuilds a module, it updates the app without reloading the page. It just swaps in new code.</p> <p data-svelte-h="svelte-1k0s387">However, use caution as it has strange behaviour with RxJS subscriptions and WebSockets. If you don’t <a href="https://levelup.gitconnected.com/unsubscribing-in-angular-the-right-way-6ed82be43ccc" title="https://levelup.gitconnected.com/unsubscribing-in-angular-the-right-way-6ed82be43ccc" rel="nofollow">correctly unsubscribe</a> from either, it could create duplicate connections and confusing errors.</p> <h2 data-svelte-h="svelte-6ayt46">Step 3: Minimize the work required</h2> <p data-svelte-h="svelte-qosjzt">Builds are faster if there’s less code. Consolidate components, delete old code and get rid of what you can.</p> <h3 data-svelte-h="svelte-z3ng9p">Avoid custom build processes</h3> <p data-svelte-h="svelte-1ihayob">Our <a href="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" title="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" rel="nofollow">team of Angular experts</a> worked with one client whose builds were being slowed by localization files. They had eschewed Angular’s localization system for a custom process that combined over a thousand JSON files at build time.</p> <p data-svelte-h="svelte-19f6qvy">Avoid adding extra steps to the build process where possible. If Angular includes some functionality, use it instead of rolling your own. Using built-in features, whether localization or scripting or bundling, will give you the benefit of work done by the Angular team to optimize build times.</p> <p data-svelte-h="svelte-1r1oifg">If you have some pressing product needs and need to do a custom process during the build, consider whether that step can be done asynchronously.</p> <h3 data-svelte-h="svelte-1lvqcvl">Use small modules</h3> <p data-svelte-h="svelte-m8r4a7">Lastly, use small Angular modules. When an Angular application is being served, and a file changes, only the module containing that file is rebuilt.</p> <h3 data-svelte-h="svelte-1kvptoo">Step 4: Upgrade Angular</h3> <p data-svelte-h="svelte-1d1wvx3">Angular, unlike other frameworks, <a href="https://dev.to/dubyabrian/comment/37cp" title="https://dev.to/dubyabrian/comment/37cp" rel="nofollow">includes batteries</a>. With React or Svelte, you can use a completely different and faster compiler. <a href="https://create-react-app.dev/" title="https://create-react-app.dev" rel="nofollow">Create-React-App</a> might start you with <a href="https://webpack.js.org/" title="https://webpack.js.org" rel="nofollow">webpack</a>, but you can speed up <a href="https://esbuild.github.io/" title="https://esbuild.github.io" rel="nofollow">esbuild</a>.</p> <p data-svelte-h="svelte-6tyg1o">With Angular, the compiler the framework ships is the one you get. Updating to new major versions of Angular will get you faster, with fewer buggy compilers with better build times. Angular 9 and Ivy are <a href="https://www.piotrl.net/angular-ivy-build-performance/" title="https://www.piotrl.net/angular-ivy-build-performance/" rel="nofollow">especially fast</a>.</p> <p data-svelte-h="svelte-j7sdl9"><img src="/static/img/ivy-build-comparison.png" alt="A bar chart showing how Ivy has made dev and prod builds faster"></p> <p data-svelte-h="svelte-10x6b0r">Performance for a production build, <a href="https://indepth.dev/posts/1221/angular-with-ivy-build-performance-review" title="https://indepth.dev/posts/1221/angular-with-ivy-build-performance-review" rel="nofollow">as tested by Piotr Lewandowski</a>.</p> <p data-svelte-h="svelte-1nk0qta">When you do the upgrade, be sure to use <code>ng update</code>. The Angular CLI will apply migrations to your build config to <a href="https://github.com/angular/angular/issues/42100#issuecomment-847331725" title="https://github.com/angular/angular/issues/42100#issuecomment-847331725" rel="nofollow">automatically use the fastest settings</a>. After the upgrade, you can also run these migrations (<code>ng update @angular/cli --migrate-only</code>).</p> <p data-svelte-h="svelte-1x4vqvh">Now, upgrading major Angular versions is easier said than done. Sometimes you’re working on a massive old enterprise app, and there’s just no time or budget to upgrade. </p> <p data-svelte-h="svelte-1o6uk24">If you need help upgrading your Angular app <a href="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" title="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" rel="nofollow">fill out our form</a> to get a free consultation! See also our guide to <a href="https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint" title="https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint" rel="nofollow">migrating tslint to eslint</a>.</p> <h3 data-svelte-h="svelte-fu4xxv">Step 5: Use caching</h3> <p data-svelte-h="svelte-haszsa">Tools like Nx also cache build data in the cloud and share it among developers. They can be compelling if you don’t mind introducing another dependency to the build process.</p> <p data-svelte-h="svelte-wto03y">If your builds are bottlenecked specifically during continuous integration, try caching your node_modules folder. People have reported up to <a href="https://medium.com/vendasta/how-to-speed-up-angular-build-times-with-caching-5856d369de88" title="https://medium.com/vendasta/how-to-speed-up-angular-build-times-with-caching-5856d369de88" rel="nofollow">75% faster builds</a> from preserving node_modules between CI runs.</p>`;
});
export {
  How_to_speed_up_angular_builds as default,
  metadata
};
