---
layout: post
title: Why my apps include nutrition labels
description: Show users you respect them by never shipping mystery meat.
date: 2024-01-27
keywords: opinion, javascript, frontend
image: nutrition-label.webp
caption: Via Google ImageFX
---

Whenever I release an app, I also publish its [nutrition label](https://www.nazariosoftware.com/tags.html#h-privacy-policy). The nutrition label tells users what third-party code runs in the app. As I write in the privacy policy:

> You shouldn’t have to worry [App Name] is using some privacy-sucking third-party library. Apps shouldn't be mystery meat. You should know what code goes into them.

For example, here is the [privacy label](https://www.nazariosoftware.com/2023/06/02/mute-chat-privacy-policy.html) for [Mute Chat for BoardGameArena](https://www.nazariosoftware.com/2023/06/02/play-in-peace-with-mute-chat-for-boardgamearena.html):

> ### Third-party code included in Mute Chat
>
> This code runs on your device.
>
> - [detect-browser](https://www.npmjs.com/package/detect-browser): Small tool to check which browser is running Mute Chat so the extension can use the correct icon image. This information is not logged or shared.
> - [webextension-polyfill](https://github.com/mozilla/webextension-polyfill): A Mozilla library that smoothes over differences between web browsers, allowing Mute Chat to run on all of them with the same code.
>
> ### Third-party code used to build BNT
>
> This code does _not_ run on your device.
>
> **The app**
>
> - [Svelte](https://svelte.dev): A framework for building fast, lightweight web apps.
> - [TypeScript](https://www.typescriptlang.org): A variant of JavaScript. Helps you write safer, less crash-y code.
> - [@tsconfig/svelte](https://www.npmjs.com/package/@tsconfig/svelte): Basic TypeScript configuration for Svelte.
>
> [...]

I know this is unusual. I do it for a few reasons.

First and most importantly, I just think it's the right thing to do. Apps shouldn't be mystery meat. The least I can do is show the top-level NPM dependencies for my browser extensions.

Second, it's a gesture of respect to the user. My code is closed source [^1], but users can at least see I'm trying to be straightforward. A nutrition label and privacy policy make a promise - kick me a couple bucks and you get an app. No funny business.

[^1]: I develop browser extensions. Never tried open-sourcing any of them. I've heard from other iOS devs if your open source app gets popular enough, people will just upload copies of it to the App Store. I don't want to spend my time filing takedown requests.

Third, it increases credibility with technical users. Most customers don't know web dev, but some of them do. Some of them know JavaScript developers have a reputation for [solving every problem with a new NPM dependency](https://blog.appsignal.com/2020/04/09/ride-down-the-javascript-dependency-hell.html). This way, technical users can see I add packages for a reason. These are the kind of people who write scathing comments on Hacker News and Reddit complaining about bundle sizes. Don't want to make them angry!

Fourth, it's a way to get credit. I don't bloat my apps with unnecessary packages and SDKs and dependencies. My bundle sizes are better than many competitors. Users should _see_ how little third-party code is taking up space on their device.

Fourth, it's interesting to other developers. They can see what tools I'm using without de-minimizers or any of that nonsense.

### Caveats

I know this idea has limits.

1. Most users won't care
2. Users who do have to rely on me instead of open source code
3. The labels also don't list _every_ dependency, just the top-level NPM packages I've installed
4. Where do you draw the line? Should you list [Blink](https://www.chromium.org/blink/) or [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore)?

Those are valid downsides, especially the last one. For me, I draw the line at top-level NPM dependencies. It's not perfect, but a little disclosure is better than none.

I think it's worth doing, and I hope more people try it.
