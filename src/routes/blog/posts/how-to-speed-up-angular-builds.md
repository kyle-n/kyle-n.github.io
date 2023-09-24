---
layout: post
title: How to speed up your Angular builds
date: 2022-04-19
keywords: javascript, typescript, angular, frontend, tutorial
image: fast_pc.jpg
caption: Image via Mohamed Hassan on Pixabay
---

Slow builds [stop developers' productivity cold](https://steven-lemon182.medium.com/a-guide-to-reducing-development-wait-time-part-1-why-9dcbbfdc1224). If code takes even two minutes to compile, it's easy to get distracted. You lose your train of thought or, god forbid, open social media.

![An XKCD comic of two programmers fighting with toy swords. Their boss yells at them to work, but they say their code is compiling.](/img/compiling.png)

Slow builds are also expensive. Imagine you have one developer paid $100,000 a year, approximately [the average salary of a software engineer in the United States](https://www.ziprecruiter.com/Salaries/Software-Engineer-Salary). That's $50 an hour, assuming they get two weeks off and work 40 hours a week. If they rebuild the app ten times a day and each rebuild takes two minutes, that person is paid $3,320 per year to watch a progress bar. And that's not even factoring in the cost of running builds on cloud infrastructure.

No wonder a Reddit engineer [announced](https://twitter.com/softwarejameson/status/1455971162060697613?s=20&t=nG4msUNBfLolUl_TEndsYQ) last year that they were buying new Apple Silicon MacBook Pros for their Android developers. According to this engineer, the improved build times paid for the laptops in just three months.

So if you are running into slow Angular builds, try these steps to reduce build time. They are listed in order of increasing complexity.

## Step 1: Update your local environment

First, increase Node’s memory limit. This consumes more RAM, but it helps.

Second, keep ahead-of-time (AOT) compilation turned on. Builds will take slightly longer than just-in-time (JIT) compilation, but the page will refresh so quickly that it may be worth it.

## Step 2: Check your build process

![A chart of Angular build flags and their effect on compile times](/img/angular-build-flags.png)

I tested every command-line option for ng build for its performance while enabled and disabled. These are the flags I’d recommend using, depending on the context.

|Dev only|Prod only|
|--------|---------|
|--named-chunks|--build-optimizer|
|--vendor-chunk|--optimization|
| |--output-hashing|
| |--extract-licenses|
| |--subresource-integrity|

`--named-chunks` and `--vendor-chunk` help cache JavaScript bundles across builds. The flags in the prod column tend to optimize the build for smaller bundle sizes at the expense of compile time.

### Try hot module reloading.

[Hot module reloading (HMR) is much easier](https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7 "https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7") in Angular 11. When Angular rebuilds a module, it updates the app without reloading the page. It just swaps in new code.

However, use caution as it has strange behaviour with RxJS subscriptions and WebSockets. If you don't [correctly unsubscribe](https://levelup.gitconnected.com/unsubscribing-in-angular-the-right-way-6ed82be43ccc "https://levelup.gitconnected.com/unsubscribing-in-angular-the-right-way-6ed82be43ccc") from either, it could create duplicate connections and confusing errors.

Step 3: Minimize the work required
----------------------------------

Builds are faster if there's less code. Consolidate components, delete old code and get rid of what you can.

### Avoid custom build processes

Our [team of Angular experts](https://www.bitovi.com/frontend-javascript-consulting/angular-consulting "https://www.bitovi.com/frontend-javascript-consulting/angular-consulting") worked with one client whose builds were being slowed by localization files. They had eschewed Angular's localization system for a custom process that combined over a thousand JSON files at build time.

Avoid adding extra steps to the build process where possible. If Angular includes some functionality, use it instead of rolling your own. Using built-in features, whether localization or scripting or bundling, will give you the benefit of work done by the Angular team to optimize build times.

If you have some pressing product needs and need to do a custom process during the build, consider whether that step can be done asynchronously.

### Use small modules

Lastly, use small Angular modules. When an Angular application is being served, and a file changes, only the module containing that file is rebuilt.

### Step 4: Upgrade Angular

Angular, unlike other frameworks, [includes batteries](https://dev.to/dubyabrian/comment/37cp "https://dev.to/dubyabrian/comment/37cp"). With React or Svelte, you can use a completely different and faster compiler. [Create-React-App](https://create-react-app.dev/ "https://create-react-app.dev") might start you with [webpack](https://webpack.js.org/ "https://webpack.js.org"), but you can speed up [esbuild](https://esbuild.github.io/ "https://esbuild.github.io").

With Angular, the compiler the framework ships is the one you get. Updating to new major versions of Angular will get you faster, with fewer buggy compilers with better build times. Angular 9 and Ivy are [especially fast](https://www.piotrl.net/angular-ivy-build-performance/ "https://www.piotrl.net/angular-ivy-build-performance/").

![A bar chart showing how Ivy has made dev and prod builds faster](/img/ivy-build-comparison.png)

Performance for a production build, [as tested by Piotr Lewandowski](https://indepth.dev/posts/1221/angular-with-ivy-build-performance-review "https://indepth.dev/posts/1221/angular-with-ivy-build-performance-review").

When you do the upgrade, be sure to use `ng update`. The Angular CLI will apply migrations to your build config to [automatically use the fastest settings](https://github.com/angular/angular/issues/42100#issuecomment-847331725 "https://github.com/angular/angular/issues/42100#issuecomment-847331725"). After the upgrade, you can also run these migrations (`ng update @angular/cli --migrate-only`).

Now, upgrading major Angular versions is easier said than done. Sometimes you're working on a massive old enterprise app, and there's just no time or budget to upgrade .

If you need help upgrading your Angular app [fill out our form](https://www.bitovi.com/frontend-javascript-consulting/angular-consulting "https://www.bitovi.com/frontend-javascript-consulting/angular-consulting") to get a free consultation! See also our guide to [migrating tslint to eslint](https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint "https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint").

### Step 5: Use caching

Tools like Nx also cache build data in the cloud and share it among developers. They can be compelling if you don't mind introducing another dependency to the build process.

If your builds are bottlenecked specifically during continuous integration, try caching your node_modules folder. People have reported up to [75% faster builds](https://medium.com/vendasta/how-to-speed-up-angular-build-times-with-caching-5856d369de88 "https://medium.com/vendasta/how-to-speed-up-angular-build-times-with-caching-5856d369de88") from preserving node_modules between CI runs.