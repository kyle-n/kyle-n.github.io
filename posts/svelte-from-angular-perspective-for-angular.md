---
title: Svelte from the perspective of an Angular developer (for Angular devs)
description: Impressions of a new framework after living in Observable land for years.
date: 2024-01-17
keywords: svelte, angular, opinion
image: angular-svelte.png
---

<script lang="ts">
  import { base } from '$app/paths';
</script>

Last year, I rewrote this blog in [SvelteKit](https://kit.svelte.dev). It was a nice change of pace from my day job helping clients build Angular apps (please [get in touch](https://www.bitovi.com/services/frontend-development-consulting) if you need help!).

As someone who's been Angular-focused for the last four and a half years, I found SvelteKit great in most ways and lacking in others. This post will be for Angular devs - you don't need to know anything about Svelte.

(I have a [separate post for Svelte devs]({base}/blog/svelte-from-angular-perspective-for-svelte) with my impressions.)

### Simplicity

This may be a hot take in 2024's React-ified world, but I like Angular. I like that it ships with a [router](https://angular.io/api/router/Router), [test suite](https://angular.io/guide/testing), [dependency injection](https://angular.io/guide/dependency-injection), [cross-app state management](https://angular.io/guide/architecture-services), [internationalization tools](https://angular.io/guide/i18n-overview), [animations](https://angular.io/guide/animations) and [end-to-end testing](https://blog.angular.io/the-state-of-end-to-end-testing-with-angular-d175f751cb9c). Angular has everything necessary to make great web apps, if you can learn its features.

But that's the problem - Angular's features are useful _once you learn them_. It's a lot to learn! I've been forced to reckon with this having spent the last year and a half teaching Angular to backend devs going full stack. You don't realize how deep Angular goes until somebody on your team wants to know why you keep adding [OnPush change detection](https://angular.io/api/core/ChangeDetectionStrategy) to components.

SvelteKit is minimalist. It provides a Node server, routing, server-side rendering, components, some state management, and... that's it. Even the unit and end-to-end tests are optional.

Svelte feels like the bare minimum implementation of a component-based framework. It's the answer to the question of "what's the least syntax we need to put an app on screen, without using vanilla HTML / CSS / JS." I mean, look at this syntax:

```svelte
<!-- footer.svelte -->

<script>
  import RssLink from './rss-link.svelte';

  const copyrightYear = new Date().getFullYear();
</script>

<hr />
<footer>
  <p>© {copyrightYear} Kyle Nazario</p>
  <RssLink />
</footer>

<style>
  footer {
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 2rem 0;
  }
</style>
```

...compared to the Angular version of the same component:

```typescript
// footer.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RssLinkComponent } from '../rss-link/rss-link.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RssLinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly copyrightYear = new Date().getFullYear();
}
```

```html
<!-- footer.component.html -->

<footer>
  <p>© {{ copyrightYear }} Kyle Nazario</p>
  <app-rss-link></app-rss-link>
</footer>
```

```css
/* footer.component.scss */

footer {
  display: flex;
  justify-content: space-between;
}
hr {
  margin: 2rem 0;
}
```

It's just so much less to learn. I would rather teach Svelte than Angular to a team new to frontend.

### Components are all in one file

This is petty, but I prefer Svelte's approach to code organization. Everything related to a component goes in one file - styles, markup and logic.

You can do the same thing in Angular, but most projects don't. `ng generate component` creates multiple files by default.

### More front in the frontend

Learning Angular requires learning HTML, JavaScript and CSS. It also requires learning dependency injection, services, change detection, lifecycle hooks and all that fun framework nonsense.

Svelte and SvelteKit feel closer to vanilla HTML, JavaScript and CSS. It feels like the web plus components (but not [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)).

I like that! I like that the framework gets out of the way as much as possible and lets you get closer to your actual content. I _really_ like that [Svelte is a compiler](https://dev.to/joshnuss/svelte-compiler-under-the-hood-4j20) that turns your declarative components into imperative JavaScript. No [shadow DOM](https://legacy.reactjs.org/docs/faq-internals.html) needed. It's all the advantages of vanilla JS without _writing_ vanilla JS.

### Full stack by default

In recent years, frontend frameworks have become more full stack. It's not enough to have components. You have to have a way to serve them from a Node app. That lets you do [server-side rendering](https://www.reddit.com/r/Frontend/comments/vjok9v/what_is_server_side_rendering/) and share code with your JS backend. It's a powerful way to create a full stack app quickly.

Angular is adapting with [Angular Universal](https://github.com/angular/universal) and some [recent SSR improvements](https://blog.angular.io/introducing-angular-v17-4d7033312e4b). However, Angular Universal feels halfhearted compared to Next.js and SvelteKit. The latter two have more features and feel more production-ready. You can't even selectively prerender some routes with Angular Universal - it requires SSR for the whole app.

### No RxJS

I was once out to dinner with some coworkers. We were discussing different programming languages and tools. One of my coworkers asked why functional programming has never caught on. People who try it love it, this coworker said.

Our team lead, who's been in the industry for years, sighed. "For most people, functional programming is just too hard."

Now let's talk about [RxJS](https://rxjs.dev).

For a long time, Angular's only tool for reactivity was RxJS. It's amazing. You can write logic in a powerful, declarative way that avoids whole categories of bugs. You can create [complex flows]({base}/blog/angular-reactive-forms-rental-rates-servicecore) with minimal state.

The problem with RxJS is, to quote my team lead, it's just [too hard to learn]({base}/blog/rxjs-land-of-paradoxes). Even figuring out the difference between [`map`](https://rxjs.dev/api/operators/map) and [`mergeMap`](https://rxjs.dev/api/operators/mergeMap) is challenging for new devs.

Fortunately or unfortunately, RxJS is everywhere in Angular. You can skate by for a while without knowing it [^1], but at a certain point it's required and a significant barrier to entry.

[^1]: Teams weak with RxJS will often skip the [`async` pipe](https://angular.io/api/common/AsyncPipe). They'll instead treat every Observable like a Promise - `subscribe()` and assign the emitted value to `this.someVar`. This is ugly but functional until the app gets complicated. Then it's ugly and causes race conditions.

Angular has announced it, like every other frontend framework, is adopting a version of [Signals](https://angular.io/guide/signals). Signals will provide fine-grained reactivity without forcing devs to learn RxJS. The Angular dev team hasn't confirmed anything, but it would not surprise me if Signals replaced RxJS.

That process could take years. Until then, newbies will have to learn Observables don't run unless you subscribe to them (except for the [ones that do](https://www.decodedfrontend.io/hot-vs-cold-observable-in-rxjs/#:~:text=When%20the%20data%20source%20is,when%20we%20subscribe%20to%20them.)).

SvelteKit, conversely, is [going straight to Signals (aka runes)](https://svelte.dev/blog/runes). SvelteKit is young enough and small enough to just adopt them in Svelte 5. Though I [wish runes were better]({base}/blog/svelte-5-runes-impressions), they give SvelteKit 90% of the functionality of RxJS at 10% of the complexity.

If you want Signals without waiting years for Angular to update every part of the framework to use them, try Svelte.

### Testing

I have never loved Angular testing. I understand _why_ [TestBed](https://angular.io/api/core/testing/TestBed) is the way it is, but I've never enjoyed it. Stubbing injected services and sub-components to do proper [shallow unit tests](https://www.reddit.com/r/reactjs/comments/t9dpgz/whats_the_point_of_shallow_rendering_tests/) is verbose and annoying.

Using Svelte, however, made me appreciate Angular testing more. Major system modules like [HttpClientModule](https://angular.io/api/common/http/HttpClientModule) have test-friendly equivalents like [HttpClientTestingModule](https://angular.io/api/common/http/testing/HttpClientTestingModule).

Testing also gets significant attention from the Angular team! TestBed is built into the framework and gets updated with Angular. The team is [adding support for Jest](https://blog.angular.io/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca). They have also worked on [speeding up tests](https://github.com/angular/angular/issues/12409) for years.

Svelte outsources testing to [Testing Library](https://testing-library.com), a large open source test suite with versions for each framework. The [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)... [could be better]({base}/blog/testing-in-sveltekit). Documentation is sparse. Support is limited to one Discord. A Discord! One of my Angular clients blocked Discord on their network.

As I wrote in a [previous post]({base}/blog/testing-in-sveltekit):

> The Discord and GitHub issues don’t have much activity. Plenty of people with problems, and lots left unfixed.

Silence seems to be a trend with the Svelte Testing Library team. My previous post again:

> The [releases page](https://github.com/testing-library/svelte-testing-library/releases) shows sporadic, rare updates. The last one was two weeks ago, but before that there was a three-month gap. Before that, it went eight months without publishing an update.

It just gives me heartburn that testing is not built into the framework. Testing is crucial, and it's in the hands of volunteers who go months without answering questions or updating it.

### Angular or Svelte? Depends

I can see advantages with Angular and Svelte. Sometimes you need a framework with a crazy powerful [dependency injection](https://angular.io/guide/dependency-injection) system. Maybe you just want a framework with almost everything already included. Maybe you really love reactive programming, the way the good lord intended, and want to use RxJS. All valid reasons to reach for Angular.

Most apps aren't that complicated, though. They need components, a little styling and maybe some SSR for SEO. SvelteKit is perfect for that. It provides a quick, fast, performant way to get a complex, server-rendered app on the page. I'd recommend that for most projects that aren't in the enterprise.
