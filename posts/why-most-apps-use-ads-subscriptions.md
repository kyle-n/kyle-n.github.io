---
layout: post
title: Why most apps have ads or subscriptions
description: The realities of consumer app development in 2026.
date: 2026-05-28
keywords: apple
---

I recently saw a comment on Reddit asking why so many apps include ads or subscriptions. What happened to just buying an app, this person wondered. I wrote them a long reply and wanted to expand on it here.

Apps intended for general consumers have overwhelmingly migrated to one of two business models: free with ads, or paid with a subscription. They've done this because there are no other viable business models on the App Store.

(For the purposes of this post, we are only considering consumer apps. Business-to-business software is another story).

### Free with ads

Most consumer apps in 2026 are free with ads because that is what the market overwhelmingly demands.

Economists distinguish between people's [stated and revealed preferences](https://en.wikipedia.org/wiki/Revealed_preference). For example, people might state a preference for healthy food, but their revealed preference is they hit the McDonald's drive-thru every day.

Most apps are free with ads because the revealed preference of the majority of consumers is they will _never_ pay for an app. Not a cent, at any price. There’s just an expectation, especially among non-techy people, that Apps Are Free. Google, Instagram and TikTok are all free!

If you can't charge users, you have to show them ads. [Many people do not mind them](https://variety.com/2026/tv/news/netflix-claims-ad-tier-reaches-250-million-viewers-1236746219/).

Ads also provide ongoing revenue. Developers need that.

### Subscriptions

Some consumers are willing to pay for software. However, charging them once for an app is poor business.

Almost all apps require ongoing support and dev work. An app is never "one and done," especially on Apple platforms. Just this year, every app had to redo their UI to support [Liquid Glass](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) and not look totally out of place. Heck, 10 years ago, Apple switched their chips to 64-bit. Every single 32-bit app had to be updated or [it would stop working](https://developer.apple.com/news/upcoming-requirements/?id=06062022a)! ([Tons of early iPhone games were lost in this transition](https://www.reddit.com/r/ios/comments/wwgwzl/anybody_lost_a_childhood_games_to_the_ios_11/)).

Ongoing work requires ongoing revenue, and that means subscriptions. People get mad about this, because subscriptions are annoying, but it is simple business. $5 or whatever one-time purchase cannot justify perpetual support.

#### What about lifetime purchases?

Some apps offer a lifetime purchase option, but if you squint, this is also a subscription.

Every subscription app developer calculates the lifetime expected value of a user. If your app costs $20 a year and users subscribe for an average of 3 years, the average lifetime expected value of one user is $60.

Most "lifetime purchase" options I've seen are priced around 3-4 years of the equivalent yearly subscription. In other words, the expected lifetime value of an average user. A "lifetime purchase" is just paying the subscription up front.

#### What about [X pay-once app]?

Many apps require only one-time payments (like [all of my apps](https://nazariosoftware.com)). But they are overwhelmingly not what consumers want. It is a known fact among iOS and Mac developers that "subscription with a free trial" is more popular than "paid up front," and "free with ads" is exponentially more popular than _that_.

My own pay-once apps are hobby projects, just something for beer money. I shoulder the ongoing cost of maintenance and App Store developer fees simply because I like making apps.

#### What about paid upgrades?

For years, many Mac apps were sold as one-time purchases. This was nice, because it let you use the software forever without paying a subscription. You bought Photoshop CS4 and just had it for as long as CS4 worked with macOS. If you wanted the features in CS5, you had to buy that separately.

This is a good, fair business model. It provides ongoing revenue to developers when users upgrade to the new major version, while not requiring users to pay a fee every month.

[It is impossible on the App Store](https://thenextweb.com/news/apples-refusal-to-allow-paid-upgrades-in-the-app-store-hurts-developers-and-users). Apple has had nearly 20 years to support it, and has chosen not to.

Some third-party developers have tried to hack it into the App Store. Tapbots, for example, [released Tweetbot 4 in 2015](https://wccftech.com/tweetbot-4-released-ios-revamped-ipad-ui-quick-relpy-notifications/) as a new app, separate from Tweetbot 3. The "upgrade" was to buy the new app. This meant losing all the existing app's downloads, reviews and store position, though. Developers have overwhelmingly decided it is not feasible. (Telling that to find an example of this, I had to go back 11 years).

#### Some customers are better than others

Not to be rude, but some customers are not worth the trouble. Someone who expects you to do work in exchange for $5 three years ago is not worth it. Better to chase customers who _don't_ mind paying a little every month for ongoing support. Over the years, developers have realized those people are their real audience. They'll let you build a sustainable business.

### Ongoing work requires ongoing revenue

I'm not saying ads and subscriptions are not tiring. They absolutely are. I'm an iOS and Mac developer and I'm tired of subscriptions! But this is the reality of the market.
