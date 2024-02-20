---
layout: post
title: Svelte from the perspective of an Angular developer (for Svelte devs)
description: Impressions of the framework coming from something very different.
date: 2024-01-07
keywords: svelte, angular, opinion
image: angular-svelte.png
---

<script lang="ts">
  import { base } from '$app/paths';
</script>

Last year, I rewrote this blog in [SvelteKit](https://kit.svelte.dev). It was a nice change of pace from my day job helping clients build Angular apps (please [get in touch](https://www.bitovi.com/services/frontend-development-consulting) if you need help!).

As someone who's been Angular-focused for the last four and a half years, I found SvelteKit great in most ways and lacking in others. This post will be for Svelte devs - you don't need to know anything about Angular.

(I have a [separate post for Angular devs]({base}/blog/svelte-from-angular-perspective-for-angular) with my Svelte impressions.)

### Simplicity

I've spent the last year and a half teaching Angular to a client with a team of backend devs going full stack. I'm painfully familiar with how difficult it is to explain all of its features.

Angular is a ["batteries-included"](https://en.wikipedia.org/wiki/Batteries_Included#:~:text=Motto%20of%20the%20Python%20programming,parts%20required%20for%20full%20usability) framework. Imagine if React also shipped with a [router](https://angular.io/api/router/Router), [test suite](https://angular.io/guide/testing), [dependency injection](https://angular.io/guide/dependency-injection), [cross-app state management](https://angular.io/guide/architecture-services), [internationalization tools](https://angular.io/guide/i18n-overview), [animations](https://angular.io/guide/animations), [end-to-end testing](https://blog.angular.io/the-state-of-end-to-end-testing-with-angular-d175f751cb9c), and more.

Everything in Angular is _useful_, but, as [Johanna Pearce](https://toot.cat/@johanna) pointed out in her great [ng-conf](https://ng-conf.org) talk last year (sadly not online), putting it all in the framework can be overwhelming. There's no progressive disclosure.

SvelteKit is minimalist. It provides a Node server, routing, server-side rendering, components, some state management, and... that's it. Even the unit and end-to-end tests are optional.

It's just so much less to learn. I would much rather teach Svelte than Angular to a team new to frontend.

### Full stack by default

In recent years, frontend frameworks have become more full stack. It's not enough to have components. You have to have a way to serve them from a Node app. That lets you do [server-side rendering](https://www.reddit.com/r/Frontend/comments/vjok9v/what_is_server_side_rendering/) and share code with your JS backend. It's a really powerful way to create a full stack app quickly.

Angular is adapting with [Angular Universal](https://github.com/angular/universal) and some [recent SSR improvements](https://blog.angular.io/introducing-angular-v17-4d7033312e4b). However, Angular Universal feels halfhearted compared to Next.js and SvelteKit. The latter two have more features and feel more production-ready. You can't even selectively prerender some routes with Angular Universal - it requires SSR for the whole app.

### No RxJS

I was once out to dinner with some coworkers. We were discussing different programming languages and tools. One of my coworkers asked why functional programming has never caught on. People who try it love it, this coworker said.

Our team lead, who's been in the industry for years, sighed. "For most people, functional programming is just too hard."

Now let's talk about [RxJS](https://rxjs.dev).

For a long time, Angular's only tool for reactivity was RxJS. It's a [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) library for JavaScript.

Everything in RxJS is an object that emits events over time. Instead of you imperatively _telling_ Angular how to run, your code listens to those events and _reacts_ to them.

I love reactive programming. You can write logic in a powerful, declarative way that avoids whole categories of bugs. You can do [awesome things]({base}/blog/angular-reactive-forms-rental-rates-servicecore) with minimal state.

The problem with RxJS is, to quote my team lead, it's just [too hard to learn]({base}/blog/rxjs-land-of-paradoxes). Even figuring out the difference between [`map`](https://rxjs.dev/api/operators/map) and [`mergeMap`](https://rxjs.dev/api/operators/mergeMap) is challenging for new devs.

Fortunately or unfortunately, RxJS is everywhere in Angular. You can skate by for a while without knowing it, but at a certain point it's required and a significant barrier to entry.

Angular has announced it, like every other frontend framework, is adopting a version of [Signals](https://angular.io/guide/signals). Signals will provide fine-grained reactivity without forcing devs to learn RxJS. The Angular dev team hasn't confirmed anything, but it would not surprise me if Signals replaced RxJS.

That process could take years. Until then, newbies will have to learn Observables don't run unless you subscribe to them (except for the [ones that do](https://www.decodedfrontend.io/hot-vs-cold-observable-in-rxjs/#:~:text=When%20the%20data%20source%20is,when%20we%20subscribe%20to%20them.)).

SvelteKit, conversely, is [going straight to Signals](https://svelte.dev/blog/runes). I mean runes. SvelteKit is young enough and small enough to just adopt them in Svelte 5. Though I [wish runes were better]({base}/blog/svelte-5-runes-impressions), I like them. Runes give SvelteKit 90% of the functionality of RxJS at 10% of the complexity.

### Testing

It [makes me sweat]({base}/blog/testing-in-sveltekit) that unit and e2e tests are separate projects from SvelteKit. Testing is _crucial_, and SvelteKit outsources it to unpaid volunteers.

Angular, for all its faults, treats testing as a first-class concern. The test suite is built into the framework and gets updates from the dev team.

Last time I blogged about this, a tech lead [commented](https://hachyderm.io/@kn/111301829286345500) his team had to invest significant time into ironing out the bugs in their Svelte test suite before wider adoption.

### Angular or Svelte? Depends

I can see advantages with Angular and Svelte. Sometimes you need a framework with a crazy powerful [dependency injection](https://angular.io/guide/dependency-injection) system. Maybe you just want a framework with almost everything already included. Maybe you really love reactive programming, the way the good lord intended, and want to use RxJS. All valid reasons to reach for Angular.

Most apps aren't that complicated, though. They need components, a little styling and maybe some SSR for SEO. SvelteKit is perfect for that. It provides a quick, fast, performant way to get a complex, server-rendered app on the page. I'd recommend that for most projects that aren't in the enterprise.
