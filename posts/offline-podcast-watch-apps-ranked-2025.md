---
layout: post
title: Offline podcast apps for Apple Watch, reviewed (2025 edition)
date: 2025-05-28
image: watch-apps.webp
tags: apple
description: For when you want to run without your phone.
---

Exactly four years ago, I reviewed [Apple Watch podcast apps with offline playback](/posts/offline-podcast-watch-apps-ranked). I wanted to do a very simple thing: go running without my phone. Apparently this is rocket science. Of 2021's major apps, just [Pocket Casts](https://apps.apple.com/us/app/pocket-casts/id414834813) offered consistent, bug-free offline Watch playback.

I _was_ a happy Pocket Casts. Their Watch app did the impossible: it consistently downloaded new episodes for offline playback, and played them without major bugs.

Until recently. These days, I open Pocket Casts on Apple Watch and find my queue has not downloaded. Worse, there is no way to manually trigger a download. You just have to hope the files found their way home while the Watch charged overnight.

This has inspired me to re-check the state of offline Watch podcast playback, a brutal thing to implement. To quote my previous post:

> This feature is _hard_. [Overcast](https://overcast.fm) developer [Marco Arment](https://mastodon.social/@marcoarment) has said how hostile watchOS is to third-party developers. Any long-running or computationally expensive operation (like, say, downloading a two-hour audio file) is first on the OS’s hit list. On some episode of [ATP](https://atp.fm), he posited there is no implementation of offline Watch playback that makes everyone happy. He’s probably right.
>
> This post will discuss where some podcast apps come short, but let’s acknowledge any kind of offline Watch playback is a minor miracle. All of these apps have good developers trying their best in an extremely hostile environment.

### [Pocket Casts](https://apps.apple.com/us/app/pocket-casts/id414834813) | 2/5 - Bad

Pocket Casts for Apple Watch plays audio well, but downloads are painful. As far as I can tell, episodes download under one of two conditions:

1. At some indeterminate point overnight, while the Watch is charging.
2. While the app is open.

I can't trigger 1, and 2 is a nightmare. You open the app, the download starts and then you have to _keep the Watch awake_ or the download won't finish. The second it goes to sleep, bam. All progress lost.

Also, the Watch app does not consistently sync playback progress back to the phone.

Offline playback requires a Plus subscription ($4/month or $40/year).

### [Castro](https://apps.apple.com/us/app/castro-podcast-player/id1080840241) | 0/5 - Unusable

Episodes almost never download to the Watch.

Additionally, in my last post, I noted a deal-breaking bug with offline Watch playback in Castro.

> If I’m 49:12 into [The Talk Show](https://daringfireball.net/thetalkshow/) on my phone but start an unplayed [Rocket](https://www.relay.fm/rocket) from my Watch, Castro will jump me to 49:12 in Rocket.

Four years later, that bug still exists!

I emailed Castro support and was told it's a known issue.

> The current state of the Apple Watch has been mostly unchanged since we took over Castro [^1]. We have plans for a full rewrite of the Apple Watch app and unfortunately there may be some hiccups with it until we do that. This specific item has been reported a couple times, and we are documenting / keeping track of all feedback. Once we ship some of the big items we are working on now, they will all help in the rebuild process of the Apple Watch app.

[^1]: Castro's original developers [sold it](https://techcrunch.com/2024/01/31/podcast-app-castro-now-owned-by-indie-developer-bluck-apps/) to [Bluck Apps](https://x.com/bluckapps) in January 2024.

I wish them the best of luck with their eventual rewrite. But, until it ships, I cannot recommend Castro.

Castro requires a Plus subscription for offline Watch playback ($4/month or $25/year).

### [Overcast](https://apps.apple.com/us/app/overcast/id888422857) | 1/5 - Barely usable

Developer Marco Arment [recently rewrote](https://mastodon.social/@overcastfm/114540464654803004) Overcast's Watch app, calling the new version is "faster and more reliable."

I tested it and appreciated the clean, simple new design. However, it does not reliably download new episodes while on power. I picked a playlist to add to the Watch, but just one of four episodes saved after several nights of charging.

Overcast does not require a subscription for offline Watch playback.

### [Apple Podcasts](https://www.apple.com/apple-podcasts/) | 4/5 - Amazing

Apple Podcasts shocked me with its offline Watch playback. According to their [documentation](https://support.apple.com/guide/watch/add-podcasts-apd14ab6460c/watchos), simply open the Watch app on your iPhone, go to Podcasts, select which episodes to download, and put the Watch on power. Then, you can watch a progress bar as content slowly downloads. Once the bar is full, everything's on your watch and plays perfectly.

Apple Podcasts consistently downloads content without being prompted. Best of all, when it doesn't, you can push content by putting the Watch on power. My only complaint is downloads are extremely slow.

This app also syncs your offline playback progress instantly when you hit the "X" icon on the Now Playing screen in the Watch app. Lovely user experience.

Offline Watch playback is free with Apple Podcasts.

### [Spotify](https://open.spotify.com) | 3/5 - Good

When I reviewed offline podcast apps for Watch in May 2021, I didn't even mention Spotify! Funny, given they now are the preferred podcast client of [17% of US podcast listeners](https://backlinko.com/podcast-stats).

Tap the ellipsis button next to any Spotify episode to download the episode to Apple Watch. Unfortunately, there is no progress indicator - just an indeterminate spinner.

![A hand holding an Apple Watch. The Spotify app is open and an indeterminate spinner is spinning](spin.webp)

There is also no way to automatically download episodes to the Watch. If a show drops at midnight, it won't be on your Watch in the morning. You have to tap "Download to Apple Watch", _then_ hope it syncs.

Episodes download reliably, if slowly. Anything I added to the Watch usually finished after a night of charging.

Spotify requires a [Premium subscription](https://www.spotify.com/us/premium/) for offline Watch playback.

### Winner: Apple Podcasts

Apple Podcasts, although slow, downloads and plays episodes flawlessly. I don't know how they did it. Maybe being the OS maker let them exempt their app from WatchOS's strict background limits. Maybe someone on the Podcasts team really cares about the feature. Regardless, my hat's off to them. I'm now an Apple Podcasts user.
