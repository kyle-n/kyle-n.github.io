---
layout: post
title: The Reddit iPhone app is bad
description: If you're going to kill third-party clients, at least be as good as them.
keywords: opinion
date: 2024-09-18
image: reddit-stylized.webp
---

<script>
import InlineVideo from '$lib/components/inline-video.svelte'
</script>

It's been over a year since Reddit [killed](https://www.theverge.com/2023/6/8/23754616/reddit-third-party-apps-api-shutdown-rif-reddplanet-sync) all but [a few](https://www.theverge.com/2023/6/7/23752804/reddit-exempt-accessibility-apps-api-pricing-changes) third-party client apps, most notably [Apollo](<https://en.wikipedia.org/wiki/Apollo_(app)>) for iOS. In the time since Apollo's demise, I bit the bullet and started using the [official Reddit app for iOS](https://apps.apple.com/us/app/reddit/id1064216828). The only problem is Reddit's app sucks, and I hate it.

The official Reddit app is crappy in a way you'd never expect from an ostensible major tech company. Here are just a few paper cuts I've run into:

1. The buttons on the bottom comment on some threads are cut off if you don't minimize the image or video at the top. You can't up- or downvote the bottom comment.

![A screenshot of the iOS Reddit app cutting off the bottom comment](reddit-ios-cut-off.webp)

1. When I get replies to my comments, I will see a red "1" badge next to the "Inbox" tab in the app. Reading this notification does not clear the badge until the app is force quit.
2. Once, my "Inbox" tab displayed a red "1" badge because I'd received a chat request from another user. This badge did not clear after multiple force restarts. Only reinstalling the app fixed the issue.
3. If you choose to grant Reddit access to only a limited subset of your photos and that subset includes a GIF, the GIF will not appear in their weird non-native photo picker. This is annoying because A) they should just use the native photo picker, and B) theirs is _worse_.
4. You can't save images from other users' comments. Did someone drop a great meme you want to add to your camera roll? Too bad!
5. Sharing a post with the standard iOS system share menu requires two taps. One opens Reddit's proprietary share menu. Scroll and you'll find an ellipsis (...) that triggers the system share menu. This was one tap on Apollo. Apollo understood custom share sheets are duplicative, wasteful and go against platform conventions.
6. Posts occasionally do not reflect downvotes. You have to tap the downvote arrow three times to see the vote reflected in the UI.
7. If someone cross-posts an image to a subreddit and you open the comments on the new cross-post, swiping back shows the list of posts you were just looking at (correct) for a moment before bouncing you to the image's original post in the original subreddit (wrong).

<InlineVideo filename="swipes.mp4" />

Honestly, the official Reddit app feels like enterprise software. The same way we all put up with crappy business apps so we can log onto our job's VPN, we put up with Reddit for iOS to participate in our communities. We don't the use it because the app itself is any good.

Apollo was good because it had to be. If if wasn't, no one would've used it. The official Reddit app doesn't have to be good, because they shut their competition.

And I get why they did that! They wanted to lock down their business and not give away so much free data. It's their website and their right. But my god, if you're going to take away Apollo, the least you could do is write something better.
