---
layout: post
title: Meet the new NazarioSoftware.com
keywords: extensions, svelte, showcase
date: 2025-12-30
---

I publish apps as a hobby under Nazario Software LLC. It requires a website. You need a place to put privacy policies, help documentation, that kind of thing.

So, I made [NazarioSoftware.com](https://nazariosoftware.com/). It was a [Jekyll](https://jekyllrb.com/) app with several downsides. The font was messed up in Firefox. The prebuilt theme didn’t have enough flexibility. The app documentation pages were rendered as blog posts, with dates in the URL and everything. Most annoyingly, running it locally required Ruby, a language I don’t know and never works right.

So, I deleted the whole thing and started over with [SvelteKit](https://svelte.dev/docs/kit/introduction). I’ve made [several](https://github.com/nazariosoftwarellc/oscars.watch) [sites](https://github.com/kyle-n/spooky-pictures) with the framework, [including this blog](https://github.com/kyle-n/kyle-n.github.io), and enjoyed the process every time. SvelteKit has useful features, few abstractions and less boilerplate. It feels like writing vanilla HTML / CSS / JS, but with components. Just not [WebComponents](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

Additionally, SvelteKit got me out of Ruby land and back to JavaScript. Easier managing dependencies in Node than whatever Ruby does.

SvelteKit made it easy to punch out a bunch of basic components. The [file-based routing](https://svelte.dev/docs/kit/routing) and [layout system](https://svelte.dev/tutorial/kit/layouts) are intuitive and simple.

The site runs on Node, but serves static pre-rendered content. There’s nothing on the site that can’t be rendered at build time.

Pre-rendering keeps speed up. SvelteKit also has some tricks that the old Jekyll site lacked, like [preloading pages on hover](https://svelte.dev/tutorial/kit/preload). That and converting almost all images to WebP means pages load nearly instantly.

The old site ran on [GitHub Pages](https://pages.github.com/). That, while a great free host for static content, would not work anymore. As part of the rewrite, I changed the site URL scheme to be aesthetically pleasing. For example, the old page with [JavaSnipt](https://nazariosoftware.com/apps/javasnipt/about)’s privacy policy was:

```
https://nazariosoftware.com/2021/04/07/javasnipt-privacy-policy.html
```

That page is now:

```
https://nazariosoftware.com/apps/javasnipt/privacy
```

Far cleaner. But [cool URLs don’t change](https://www.w3.org/Provider/Style/URI). Any good webmaster (what a fun old word) would redirect traffic to the old URLs. This is generally good practice, but required in my case. My App Store / Chrome Web Store / Firefox Add-Ons listings use the old paths. I can’t remove those unless I update every app, on every platform.

Performing redirects means running a server. That ruled out GitHub Pages. The best free replacement, from my research, was [Cloudflare Workers](https://workers.cloudflare.com/). They give you plenty of free builds per month, plus a decent subset of Node APIs to run a real server with. They also [natively support SvelteKit](https://svelte.dev/docs/kit/adapter-cloudflare).

After adding a [quick GitHub Action](https://github.com/nazariosoftwarellc/nazariosoftwarellc.github.io/blob/main/.github/workflows/cd.yml) to deploy all pushes to `main` and moving over my custom domain, I was done! The new NazarioSoftware.com was live on Cloudflare.

There’s only one dumb mistake left to fix. All my Mac apps have an option to view more of my apps. That option loads a JSON file of other apps. Unfortunately, I decided to source the JSON from:
```
https://github.com/nazariosoftwarellc/nazariosoftwarellc.github.io/raw/refs/heads/main/assets/json/app-list.json
```

...instead of from `nazariosoftware.com/*`. I have no idea why I did this. It’s a bad idea. The apps should obviously rely on the _deployed site_ and have no knowledge of how the site source code is organized. But I did, and now I have two `app-list.json` files- one under `/static`, where SvelteKit expects it, and one under `assets/json`. The second one is used only for the client apps.

Sigh. Now I have to update all my apps to use the correct URL.

Still, the new site looks great and loads fast. It’ll make a strong foundation for the next 5 years. Read the [source code](https://github.com/nazariosoftwarellc/nazariosoftwarellc.github.io) if you’re interested.
