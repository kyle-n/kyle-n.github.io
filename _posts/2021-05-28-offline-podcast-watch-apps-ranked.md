---
layout: post
title: Offline podcast apps for Apple Watch, reviewed
tags: watch, iOS, watchOS, podcasts
---

I run alone most days in regular times and every day in quarantine. When running alone, I fill the time with podcasts.

<!--break-->

I bought Apple Watch Series 3 (Wifi) in 2019. With the Watch, runs require only a pair of Bluetooth headphones. No more awkwardly carrying my phone.

Offline Watch playback is crucial because I don’t want to pay for a second data plan. However, iOS podcast apps support offline Watch playback with varying levels of success.

First, a disclaimer. This problem is hard. [Overcast](https://overcast.fm) developer [Marco Arment](https://twitter.com/marcoarment) has explained many times how hostile watchOS is to third-party developers. Any long-running or computationally expensive operation (like, say, downloading a two-hour audio file) is first on the OS’s hit list. On some episode of [ATP](https://atp.fm), he posited there is no way to do offline Watch playback in a way that makes everyone happy. He's probably right.

This post will discuss where some podcast apps come short, but let’s acknowledge any kind of offline Watch playback is a minor miracle.

## Apple Podcasts | 0/5 - Unusable

Apple Podcasts is built into the OS and [supports offline Watch playback](https://support.apple.com/guide/watch/add-podcasts-apd14ab6460c/watchos). You can select which shows or stations to sync to the Watch.

Positives:

- Free, built into the OS

Negatives:

- Appears to not sync any episode over two hours. This limit is not documented anywhere, nor is it explained with an actionable error message. The episodes just… don’t sync.

I love listening to [comedians wax rhapsodic about *Robocop* for two-and-a-half hours](https://soundcloud.com/griffin-and-david-present/robocop), so this is a dealbreaker.

## Overcast | 1/5 - Barely Usable

Overcast used to have the implementation of offline playback that best fit my needs. Before, I could manually start a sync, track its progress, and run when it finished. Unfortunately, an update last year rendered offline sync useless for me.

In the new system, you set a podcast or playlist to auto-sync to the Watch. Alternatively, you can tap a button next to an episode to sync. In theory, the Watch will download the marked episodes on wifi. In practice, it almost never does.

Positives:

- Free, does not require subscription

Negatives:

- Episodes rarely sync. Even after leaving my Watch on a charger for multiple nights right next to my router, maybe 10% of episodes ever downloaded. I just got used to checking my Watch before a run and being disappointed.
- [There is no way to manually start a sync](https://twitter.com/OvercastFM/status/1258779092889096193?s=20). You just have to put the Watch on a charger and hope for the best.
- No way to know what the Watch app is doing. No progress indicator, no active download, nothing. You just hope the little cloud icon goes away.
- Sometimes an episode is marked as “downloaded,” you tap it and the Now Playing screen shows no title or progress indicator. The episode does not play.

## Castro | 3/5 - Decent

Castro offers offline Watch playback for subscribers to Castro Plus ($19/year). A lot of people have subscription fatigue, but I welcome the chance to support good developers.

In Castro, you tap a button below the episode to save a compressed copy and transfer it to the Watch ([full details](https://9to5mac.com/2019/11/18/castro-apple-watch-streaming-iphone-free-playback/)). Episodes played from the Watch have lower audio quality, with voice boost and trim silence baked in, but that's fine.

Positives:

- Sync is reliable and fast
- Seems faster when the Watch is on the charger?
- Requires $19/year subscription. This lets you support a great indie iOS developer, but it is the priciest of the available options
- Great inbox-style UI in the phone app

Negatives:

- There's an irritating bug that loses your playback progress. If I'm 49:12 into [The Talk Show](https://daringfireball.net/thetalkshow/) on my phone but start an unplayed [Rocket](https://www.relay.fm/rocket) from my Watch, Castro will jump me to 49:12 in Rocket. I DM’d [@CastroSupport](https://twitter.com/CastroSupport) weeks ago with steps to reproduce this and got no reply.
- No iPad app ([it's coming](https://twitter.com/CastroPodcasts/status/1341139082232008705?s=20))
- No progress indicator for syncs

## [Outcast](https://outcastapp.com) | Disqualified

Seems like a cool app, but I want a podcast app that runs on my phone and iPad too.

## Pocket Casts | 4/5 - Good

Pocket Casts impressed me with its thoughtfully designed offline mode. It requires an in-app purchase, but their subscription is dirt cheap ($1/mo or $10/year).

Positives:

- Episodes download reliably
- Simple, clear Watch UI that makes it easy to tell whether you’re playing episodes from the phone or Watch
- Download progress indicator
- Reliably syncs playback position back and forth between the Watch and phone
- Has an iPad app

Negatives:

- Weird, non-native phone UI. It works but it’s not amazing

## Winner: Pocket Casts

I love Castro and its inbox model, but the Watch playback bug and lack of an iPad app put it just behind Pocket Casts. Pocket Casts' UI is iffy, but that Watch app is rock solid.