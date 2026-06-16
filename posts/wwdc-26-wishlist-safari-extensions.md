---
layout: post
title: WWDC Wishlist fulfilled - Building Safari extensions got easier
date: 2026-06-16
description: Making it easier to get into the ecosystem.
image: three-browsers.webp
keywords: extensions, apple
---

On March 18, 2024, [I wrote](/blog/safari-extensions-should-be-easier):

> I really do like Safari. That's why I've spent 1,500 words complaining. I want it to get more extensions. I want it to become more popular, so the web isn't just a [Chromium monoculture](https://dev.to/kenbellows/chromium-and-the-browser-monoculture-problem-420n). I like making Safari extensions. I just wish it was easier.
>
> [...]
>
> [Supporting it] more than **doubled** my workload.

This was because of three problems:

> Problem 1: Safari extensions must live inside a Mac or iPhone app
>
> [...]
>
> Problem 2: Safari extensions must use a completely different monetization scheme
>
> [...]
>
> Problem 3: Safari extensions have to go through the App Store

This year at WWDC, Apple announced third-parties can [make Safari extensions without a Mac or Xcode](https://developer.apple.com/videos/play/wwdc2026/216/):

> To get started, I'll head over to developer.apple.com and enroll in the Apple Developer Program. After enrolling, I'll go to appstoreconnect.apple.com. Since Safari web extensions need to be packaged within a containing app, I can use App Store Connect to create this app for me.

On Problem 1, Apple has not bent. Safari extensions must still live inside a container app. But now you don't even have to touch Swift - Apple can build the entire container app for you in Xcode Cloud. Just upload the WebExtension bundle.

On Problem 2, Apple bent. All iOS Safari extensions must be distributed through the App Store, and everything in the App Store must use Apple's in-app purchase system. But...

...Apple also bent on Problem 3. Last year, Apple announced third-party developers can [distribute extensions for Mac Safari outside the App Store](https://developer.apple.com/documentation/safariservices/distributing-your-safari-web-extension#Distribute-your-Developer-ID-signed-and-notarized-extension-outside-the-Mac-App-Store). Notarized extensions can be sideloaded like any other app on macOS. Doesn't solve the issue on iOS, but you can avoid the App Store and its associated taxes on macOS.

These are all good ideas that make Safari extension development easier. As a Safari user, I hope more developers take advantage.

### Remaining problems

However, there are still some barriers around Safari extension development:

1. Although Safari implements the same [WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) API, its appearence and behavior differs from Chrome and Firefox. To properly test an extension, developers still need a Mac with Safari.
2. Developers still have to pay $100 per year to join the Apple Developer program.
3. Reaching users on iOS still requires running the app review gauntlet.
