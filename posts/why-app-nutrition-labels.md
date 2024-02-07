---
layout: post
title: Why my apps include nutrition labels
description: Show users you respect them by never shipping mystery meat.
date: 2024-01-27
keywords: opinion, javascript, frontend
image: nutrition-label.png
caption: Via Google ImageFX
---

Whenever I publish an app, I also publish its [nutrition label](https://www.nazariosoftware.com/tags.html#h-privacy-policy). The nutrition label tells users what third-party code runs in the app. As I write in my apps' privacy policies:

> You shouldn’t have to worry [App Name] is using some privacy-sucking third-party library. Apps shouldn't be mystery meat. You should know what code goes into them.

I write browser extensions, so I usually list the app's NPM packages. For example, here is the [privacy label](https://www.nazariosoftware.com/2023/06/02/mute-chat-privacy-policy.html) for [Mute Chat for BoardGameArena](https://www.nazariosoftware.com/2023/06/02/play-in-peace-with-mute-chat-for-boardgamearena.html):

> ### Third-party code included in Mute Chat
>
> This code runs on your device.
>
> - [detect-browser](https://www.npmjs.com/package/detect-browser): Small tool to check which browser is running Mute Chat so the extension can use the correct icon image. This information is not logged or shared.
> - [webextension-polyfill](https://github.com/mozilla/webextension-polyfill): A Mozilla library that smoothes over differences between web browsers, allowing Mute Chat to run on all of them with the same code.
>
> ### Third-party code used to build BNT 
>
> This code does *not* run on your device.
>
> **The app**
>
> - [Svelte](https://svelte.dev): A framework for building fast, lightweight web apps.
> - [TypeScript](https://www.typescriptlang.org): A variant of JavaScript. Helps you write safer, less crash-y code.
> - [@tsconfig/svelte](https://www.npmjs.com/package/@tsconfig/svelte): Basic TypeScript configuration for Svelte.
>
> [...]

I know this is unusual. I do it for a few reasons. 

First and most importantly, I just don't think apps should be mystery meat. You shouldn't have to worry if an app is using some privacy-destroying SDK. 

Second, it's a gesture of respect to the user. My code is closed source [^1], but they can at least see I'm trying to be straightforward. A nutrition label and a regular privacy policy make a promise to users - kick me a couple bucks and you get an app. No funny business.

[^1]: I develop browser extensions. Never tried open-sourcing any of them. I've heard from other iOS devs if your open source app gets popular enough, people will just upload copies of it to the App Store. I don't want to spend my time filing takedown requests.

Third, it increases credibility with technical users. Most customers don't know web dev, but some of them do. Some of them know JavaScript developers have a reputation for [solving every problem with a new NPM dependency](https://blog.appsignal.com/2020/04/09/ride-down-the-javascript-dependency-hell.html). By listing my dependencies and the reasons for them, technical users can see I add packages for a reason. Those are the kind of people who write scathing reviews on Hacker News and Reddit talking about "bloat." Don't want to make them angry!

Fourth, it's a way to get credit. I don't bloat my apps with unnecessary packages and SDKs and dependencies. My bundle sizes are better than many competitors. Users should *see* how little third-party code is taking up space on their device.

Fourth, it's interesting to other developers. They can see what tools I'm using without de-minimizers or any of that nonsense.

I hope sharing my dependencies will inspire others to do the same. I would like it if more apps I used did this. 

### Caveats

I know this idea has limits. 

- Most users won't care
- Users who do have to rely on me instead of open source code
- The labels also don't list *every* dependency, just the top-level NPM packages I've installed
- Where do you draw the line? Should you list [Blink](https://www.chromium.org/blink/) or [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore)?

Those are valid downsides, especially the last one. For me, I draw the line at top-level NPM dependencies. First-party stuff like the JavaScript engine doesn't need calling out. You already trust Apple with JavaScriptCore. That runs *all* the code in Safari. 

All that said, I think it's still worth doing. I hope more people try it.