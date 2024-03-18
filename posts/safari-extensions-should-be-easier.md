---
layout: post
title: I wish building a Safari extension was easier
date: 2024-03-18
description: I like Safari and wish it was easier to support.
image: three-browsers.webp
---

I recently published a browser extension, [Replies for Hacker News](https://www.nazariosoftware.com/2024/02/23/never-miss-a-conversation-with-replies-for-hacker-news.html). It notifies you if somebody replies to one of your posts on [Hacker News](https://news.ycombinator.com) and adds a link to quickly view that reply. I wrote it because I was tired of missing good replies to my comments.

![The top bar of Hacker News with a link to your unread replies, added by my extension](rhn-top-bar.webp)

I made a version of the extension for three browsers:

1. [Chrome](https://chromewebstore.google.com/detail/replies-for-hacker-news/kjoojcgancofjkmknljjcedlkilcbdbb?pli=1), because it has the most desktop users.
2. [Firefox](https://addons.mozilla.org/en-US/firefox/addon/replies-for-hacker-news/), because it required changing one line of code from Chrome.
3. [Safari](https://apps.apple.com/us/app/replies-for-hacker-news/id6477880820), because I wanted to use my own extension in my favorite desktop browser.

That's right, I said it. I like Safari. I like that it feels most native to the Mac. I like that it's fast, and has [privacy features](https://www.apple.com/safari/docs/Safari_White_Paper_Nov_2019.pdf). Most of all, I like that [it crushes Chromium-based browsers at power efficiency](https://medium.com/homullus/8-browsers-in-a-tiny-car-energy-efficiency-benchmark-fe3ca82f1690). I can work outside on my MacBook for a couple hours without murdering my battery with tabs.

Supporting Safari was no small choice. It has less market share, and it more than **doubled** my workload.

Yes, doubled. This is because of a few choices Apple has made with regards to the rules and distribution of Safari extensions. These rules have reasons—good ones!—but they undeniably make development harder.

I wish they didn't, because I like Safari and want it to get more extensions.

### Problem 1: Safari extensions must live inside a Mac or iPhone app

You cannot distribute a standalone Safari extension. It [used to be a thing](https://underpassapp.com/news/2023-4-24.html), but now all extensions must live inside a Mac or iPhone app. The extension is an addition to the app.

This makes a lot of sense for some apps. [Ivory](https://tapbots.com/ivory/) includes a Safari extension that opens Mastodon pages in the app. Perfect use case. For extensions like mine, though, there is no greater app. It's just the browser code. Building a container app is pure overhead.

The Safari team has done yeoman's work to help us poor web developers avoid learning Swift and AppKit or UIKit. When you create a new Safari WebExtension in Xcode, it comes with premade container apps. These apps display a web view with your app's name and icon. The Mac version tells the user whether it's enabled.

This is good, because it lets us JavaScript jockeys build very simple UIs in the container apps - enough to tell users how to enable the extension.

It's still a significant burden, though. It requires web developers to learn enough Xcode and native app development to get something into App Store Connect. [^1]

[^1]: The Safari team also built a nifty [tool to convert existing WebExtensions to Safari apps](https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari), which also helps reduce the learning barrier.

I also found when developing [Replies for Hacker News](https://www.nazariosoftware.com/2024/02/23/never-miss-a-conversation-with-replies-for-hacker-news.html) that the premade web view container app wouldn't work for me. I had to build native UIs in Swift and SwiftUI for monetization.

### Problem 2: Safari extensions must use a completely different monetization scheme

My extension is free to trial for 14 days. After that, a one-time payment of $2 unlocks it forever.

On Chrome and Firefox, that payment is through Stripe. The user clicks the "Purchase" button and is redirected to a purchase URL, where they pay and provide an email address. That email unlocks the extension for them (see my [previous post on creating a paid Chrome extension](https://kylenazario.com/blog/paid-extension-setup-with-cloudflare)).

![The settings of my extension. There's a link to open the purchase page and a box to restore your purchase](rhn-settings.webp)

On Safari, you can't use Stripe for in-app purchases. Not if you want to distribute the extension through the App Store, which is required to reach users on iOS and iPadOS. In-app purchases with Safari have to go through the App Store and [StoreKit](https://developer.apple.com/storekit/).

As far as I know, there is no way to initiate a StoreKit purchase on the web. So, I rewrote the Mac and iPhone container apps for my extension in SwiftUI (which I learned a few years ago foolishly [trying to make a third-party Substack app](https://kylenazario.com/blog/compose-for-substack-eulogy)). [^2]

[^2]: I might have been able to keep the web view container app and call into Swift from it, but that also seems extremely complicated and difficult. It would also still require RevenueCat, a separate source of truth for purchases, etc.

![The Mac purchase UI for my app](rhn-mac-sidebyside.webp)

The IAP code for Mac and iPhone was a significant amount of work. I had to sign up for [RevenueCat](https://www.revenuecat.com), link it with App Store Connect, and spend time testing it with sandbox accounts. Sandbox accounts are weird and hard to use, especially on Mac.

I got it set up, but now there are two sources of truth for "who bought the full version of Replies for Hacker News" - my private database of Stripe purchases, and the App Store. I know how naive it sounds to ask for this given [the news](https://www.theverge.com/2024/1/24/24048561/spotify-dma-eu-apple-app-store-epic), but it really would be easier if I could just use Stripe for everything. [^3]

This may seem like a lot of complaining for a small amount of UI, but it took months to learn enough SwiftUI, AppKit and UIKit to do it. I'm not a super experienced Swift dev. 🤷‍♂️

[^3]: One Safari extension I saw tried to offer "cross purchase" between Safari and other browsers by bunding the Chrome extension _inside_ the container Mac app. You had to buy the Safari app from the App Store, then use Chrome's extension developer menu to install the Chrome version locally. Clever, but god, imagine the support emails.

### Problem 3: Safari extensions have to go through the App Store

There are a couple hoops to jump through if you want your extension available to users on iOS and iPadOS.

First, you have to have an active Apple developer account, which is $99 per year. Chrome is a one-time payment of $5.

Then there's App Store review. Hot take, I don't love this process. It can take up to a few days for new apps, and reviewers often make mistakes (possibly because they see [50-100 apps a day](https://www.cnbc.com/2019/06/21/how-apples-app-review-process-for-the-app-store-works.html)). I'll never forget getting a rejection for [JavaSnipt](https://www.nazariosoftware.com/2021/04/07/about-javasnipt.html), my NoScript equivalent for Safari, where the reviewer said it was broken. No further details. After begging them for an explanation, I got another rejection. This one also had no explanation, but it did have a screenshot... of the app saying it needed to be enabled in Settings.

I understand why Apple makes Safari extensions get reviewed, especially since you can add extensions to the iPhone now. I just don't enjoy going through it every time I publish an update. It feels bad, especially compared to the Chrome store. With Chrome, new versions of my extension go live in _minutes_. Sometimes instantly. Again, for a platform with more customers.

### This process should be easier

I understand Apple has reasons for all of these things. Forcing Safari extensions through the App Store lets them weed out some scams, malware and broken apps.

Making extensions live in container Mac and iPhone apps also probably solves a ton of problems with distribution. Making a whole separate download path for Safari extensions is probably never gonna happen.

I also get why apps can't use alternate in-app purchase schemes. Apple uses its in-app purchase system to [collect commissions](https://www.theverge.com/2021/9/13/22671574/epic-apple-app-store-new-rules-meaning-ruling-decision) from third-party developers. Channeling all IAPs through StoreKit is the easiest way for them to do that.

All of this _makes sense_. But as a developer with limited time, it does not make me feel more encouraged to develop for Safari. It's so many barriers to support a less popular browser. [^4] Compared to Chrome, which has more users and barely any hoops to jump through, it's tempting to just... not do it.

[^4]: Firefox is the least popular browser among my users by a mile, but supporting it is basically free.

I really do like Safari. That's why I've spent 1,500 words complaining. I want it to get more extensions. I want it to become more popular, so the web isn't just a [Chromium monoculture](https://dev.to/kenbellows/chromium-and-the-browser-monoculture-problem-420n). I like making Safari extensions. I just wish it was easier.
