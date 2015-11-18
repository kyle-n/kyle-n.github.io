---
layout: post
title: How Games Are Ported to Mac
org: Technorms
keywords: technorms, games on mac, ports, aspyr, mac os x, apple, macbook, imac
categories: gaming, mac, apple, tech, technorms, guide
---

As a [Mac user](http://www.technorms.com/34126/2013-macbook-air-review), I'm always interested in how software is made for Mac. That goes double for games. How does a computer game, one of the most complicated and intensive kinds of application you can run, get ported from Windows? 

<!--break-->

The answer is a lot of different things. There's a couple different ways to port games to Mac, all of which have varying degrees of effectiveness. It goes without saying that your best bet for playing games is still Windows. 

## How Games Are Ported to Mac

### Intel architecture

Porting games to Mac became much, much easier when Apple changed from PowerPC chips to Intel's x86 architecture in 2006. 

Windows had run on Intel chips for so long that the two even had their own cutesy couple's name, [Wintel](https://en.wikipedia.org/wiki/Wintel). Since Windows took the lion's share of the PC market and PC gaming, games were built for Intel processors. 

When Apple changed Mac hardware to use Intel instead of PowerPC, it made it possible to port games and reuse a good bit of the original Windows code instead of starting from scratch. 

However, there is still a great deal to change. Macs tend to use integrated graphics cards chosen for their battery life and not gaming performance. Designing for OS X also means taking into account a whole different set of quirks than Windows. 

One of the biggest changes from Windows to OS X is the graphics engine. A great deal of Windows games use [DirectX](https://en.wikipedia.org/wiki/DirectX) to interface with the graphics card. Since this is a proprietary Microsoft product, it does not run on OS X. 

Macs use [OpenGL](https://en.wikipedia.org/wiki/OpenGL), lesser-known cross-platform graphics library that runs on Windows, OS X and Linux. In theory it would be easier to develop originally with OpenGL, and some companies do. Most don't for reasons elaborated at length on [StackExchange](http://programmers.stackexchange.com/questions/60544/why-do-game-developers-prefer-windows). 

So, for a lot of companies, porting to Mac means swapping out DirectX calls for OpenGL. How's that work? 

### Porting companies rebuild them

The actual hard work of porting games is done by a small but thriving group of companies which specialize in porting games to OS X and Linux. The most famous examples are [Aspyr](https://en.wikipedia.org/wiki/Aspyr) and [Feral Interactive](https://en.wikipedia.org/wiki/Feral_Interactive). They ported the Civilization and Deux Ex: Human Revolution to OS X despite originally developing neither of the games. 

Games from these companies tend to show up several months after the game's original Windows release and are considered a way for the publisher to make a little extra money off of a product that has already made most of its cash. You usually see it done with major games like Civ that can make enough money to justify a port. 

### Wrappers

The other way Windows games run on Mac is through wrappers. [Wine](https://en.wikipedia.org/wiki/Wine_(software) is the base standard here. It's a free and open-source compatibility layer for running Windows programs on Unix-like systems such as OS X or Linux. 

Wine offers inconsistent and occasionally useful performance for games. It really depends on the title. There's a [database](https://appdb.winehq.org) of performance reports, but the whole thing is really a crapshoot. 

TransGaming Technologies built [Cider](http://www.macworld.com/article/1052176/cider.html), a version of Wine specifically for running Windows games on Intel Macs. Its reviews are decent, though it suffers from inconsistent performance like Wine. 

Two years ago, before [Rogue Legacy](http://roguelegacy.com) released a Mac port, I played the game through a Cider wrapper. It worked, though my Mac heated up like it was playing a game with twice the graphics.

There are other wrappers as well, including [Wineskin](http://wineskin.urgesoftware.com/tiki-index.php), anything on [Porting Team](http://portingteam.com/frontpage)'s website, [CrossOver](https://en.wikipedia.org/wiki/CrossOver) and [PlayOnMac](https://en.wikipedia.org/wiki/PlayOnMac).

The rise of free game engines has also fueled game development for Mac. Third-party tools such as [Unity](https://unity3d.com/unity/multiplatform), [Unreal Engine](https://www.unrealengine.com/what-is-unreal-engine-4) and [GameMaker Studio](http://www.yoyogames.com/studio) offer easy exporting to multiple platforms, including OS X. 

### Final Thoughts

Gaming on Mac is in a far better place than it ever has been in the past thanks to friendly developers, a flowering of indie games and a lower barrier to porting than ever before. 