---
layout: post
title: Offline podcast apps for Apple Watch, reviewed
date: 2021-05-28
image: watch-apps.png
tags: apple
---

When running alone, I fill the time with podcasts.

<!--break-->

I bought Apple Watch Series 3 (Wifi) in 2019. With the Watch, runs require only Bluetooth headphones. No more awkwardly carrying my phone. [^1]

[^1]: I used to run with my iPhone 6 Plus in my pocket, until it bounced out and shattered on the pavement. I’m not saying I’m smart.

Offline Watch playback is essential because I’m not going to pay for a second data plan. However, iOS podcast apps support offline Watch playback to varying success.

First, a disclaimer. This feature is _hard_. [Overcast](https://overcast.fm) developer [Marco Arment](https://twitter.com/marcoarment) has said how hostile watchOS is to third-party developers. Any long-running or computationally expensive operation (like, say, downloading a two-hour audio file) is first on the OS’s hit list. On some episode of [ATP](https://atp.fm), he posited there is no implementation of offline Watch playback that makes everyone happy. He’s probably right.

This post will discuss where some podcast apps come short, but let’s acknowledge any kind of offline Watch playback is a minor miracle. All of these apps have good developers trying their best in an extremely hostile environment.

### [Apple Podcasts](https://apps.apple.com/us/app/apple-podcasts/id525463029) | 0/5 - Unusable

Apple Podcasts is built into the OS and [supports offline Watch playback](https://support.apple.com/guide/watch/add-podcasts-apd14ab6460c/watchos). You can select which shows or stations to sync to the Watch.

Positives:

- Free, built into the OS

Negatives:

- Appears to not sync any episode over two hours. This limit is not documented anywhere, nor is it explained with an actionable error message. The episodes just… don’t sync.

I love listening to [comedians wax rhapsodic about _Robocop_ for two-and-a-half hours](https://soundcloud.com/griffin-and-david-present/robocop), so this is a dealbreaker.

If I’m wrong about the time limit, or there is a workaround, please let me know. The problem could be general sync flakiness or something else.

### [Overcast](https://apps.apple.com/us/app/overcast/id888422857) | 1/5 - Barely usable

Overcast used to have the implementation of offline playback that fit my needs best. Before, I could manually start a sync, track its progress, and run when it finished. Unfortunately, an update last year [changed that](https://sixcolors.com/post/2021/03/running-with-the-new-overcast-watch-app/).

In the new system, you set a playlist to download up to 20 episodes to the Watch. Overcast says it will download the episodes on wifi when charging. For me, it almost never did. [^2]

[^2]: I used Overcast for several months like this, but I’ve been testing other podcast apps for the last month. I re-downloaded Overcast to see if my assessment was still accurate, and [this happened immediately]({base}/img/oh-overcast.jpeg).

Positives:

- Free, does not require subscription
- Can manually start downloads on the Watch and track their progress

Negatives:

- Downloads rarely succeed. Even after leaving my Watch on a charger for multiple nights right next to my router, maybe 10% of episodes ever downloaded. I just got used to checking my Watch before a run and being disappointed.
- Sometimes an episode is marked as “downloaded,” you tap it and the Now Playing screen shows no title or progress indicator. The episode does not play.

Maybe it's because I have a creaky, slow Series 3 Watch. Maybe I was doing something wrong. I could not figure it out.

### [Castro](https://apps.apple.com/us/app/castro-podcast-player/id1080840241) | 3/5 - Decent

Castro offers offline Watch playback for subscribers to Castro Plus ($19/year).

You tap a button below the episode to create a compressed copy and transfer it to the Watch ([full details](https://9to5mac.com/2019/11/18/castro-apple-watch-streaming-iphone-free-playback/)). Episodes played from the Watch have lower audio quality, with voice boost and trim silence baked in, but that’s fine.

Positives:

- Sync is reliable and fast
- Sync seems faster when the Watch is on the charger?
- Requires $19/year subscription. This lets you support a great indie iOS developer, but it is the priciest of the available options.
- Great inbox-style UI in the phone app

Negatives:

- There’s an irritating bug that loses your playback progress. If I’m 49:12 into [The Talk Show](https://daringfireball.net/thetalkshow/) on my phone but start an unplayed [Rocket](https://www.relay.fm/rocket) from my Watch, Castro will jump me to 49:12 in Rocket. I DM’d [@CastroSupport](https://twitter.com/CastroSupport) weeks ago with steps to reproduce and got no reply.
- No iPad app ([it’s coming](https://twitter.com/CastroPodcasts/status/1341139082232008705?s=20))
- No progress indicator for syncs

### [Outcast](https://outcastapp.com) | Disqualified

Seems like a cool app, but I want a podcast app that runs on my phone and iPad too.

### [Pocket Casts](https://apps.apple.com/us/app/pocket-casts/id414834813) | 4/5 - Good

Pocket Casts impressed me with its thoughtfully designed offline mode. It requires an in-app purchase, but their subscription is dirt cheap ($1/mo or $10/year).

Positives:

- Episodes download reliably
- Simple, clear Watch UI that makes it easy to tell whether you’re playing episodes from the phone or Watch
- Download progress indicator
- Reliably syncs playback position back and forth between the Watch and phone
- Has an iPad app

Negatives:

- Weird, non-native phone UI. It works but it’s not amazing

### Winner: Pocket Casts

I love Castro and its inbox model. However, the Watch playback bug and lack of an iPad app put it just behind Pocket Casts. Pocket Casts’ UI is iffy, but that Watch app is rock solid.

<script lang="ts">
  import { base } from '$app/paths';
</script>