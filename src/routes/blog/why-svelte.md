---
layout: post
title: Why I chose Svelte for my new app
date: 2021-05-14
image: bnt-1.png
keywords: svelte, fe, js, ts, bnt
hn: https://news.ycombinator.com/item?id=27166097
---

I recently published [Beautiful New Tabs](https://apps.apple.com/us/app/beautiful-new-tabs/id1567068235). It replaces the new tab page in Safari with a nice wallpaper and weather widget.

<!--break-->

While it uses Swift to download and cache wallpapers in the background, everything in the new tab page is HTML, CSS and JS. That's how you make [web extensions](https://developer.mozilla.org/en-US/docs/Glossary/WebExtensions), which Safari [now supports](https://sixcolors.com/post/2021/01/safari-14-added-webextensions-support-so-where-are-the-extensions/).

After building a prototype in vanilla JS, I switched Beautiful New Tabs to [Svelte](https://svelte.dev) and am happy with the results.

## v1: Vanilla JS

The first version was vanilla JS filling in an HTML page. Displaying a wallpaper seemed too small for a framework.

I also wanted the wallpaper to appear as quickly as possible. Cmd-T, see wallpaper. Cmd-N, see wallpaper. Even though Safari reads my JS bundle from file, not over the network, the bundle should still be small.

The problem was my vanilla JS got imperative and messy, especially when I started adding features. The weather widget alone made me look for a new solution.

## v2: Svelte

I had read about Svelte and realized it was perfect for my use case. [Svelte is a compiler](https://dev.to/joshnuss/svelte-compiler-under-the-hood-4j20) that turns declarative `.svelte` files into imperative, DOM-updating JS. With Svelte, I could break my application into reusable, declarative components and still ship a tiny bundle to customers. [^1]

[^1]: I could have used [another framework with small minified bundles](https://dev.to/hanna/why-svelte-is-revolutionary-415e), but I wanted to try a cool new tool :).

And you know what? Svelte worked like a charm.

- **Source code (TypeScript classes and Svelte components)**: 16 KB
- **Output bundle (minified)**: 16 KB

No extra KBs of data for a framework. It’s 16 KB because the app requires 16 KB of source code to juggle two APIs and a local cache. The bundle loads instantly.

## ty, Svelte

Svelte is new and still has rough edges, but I would recommend it as a way to write “vanilla” JS with the advantages of a framework.