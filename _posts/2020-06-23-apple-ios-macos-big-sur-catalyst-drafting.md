---
layout: post
title: Big Sur helps macOS draft behind iOS
image: big-sur-preview.png
keywords: macos, macos big sur, ios, catalyst, swiftui
---

MacOS Big Sur is shocking, but it makes sense when you consider two things. <!--break--> One, as Johnny Sruiji said, Apple's entire lineup will run off the same silicon. Two, this tweet from Marco Arment. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The entire OS looks like Catalyst apps now.<br><br>This is not a compliment.</p>&mdash; Marco Arment (@marcoarment) <a href="https://twitter.com/marcoarment/status/1275129517615599625?ref_src=twsrc%5Etfw">June 22, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

This is actually the point of Big Sur. Grafting iOS visual language onto macOS and the ARM transition are meant to help macOS is [draft](https://www.dictionary.com/browse/drafting) off iOS.

## Desktops are not the center of computing

A simple fact is driving these radical changes. For the vast majority of people, the phone is the center of their computing life. [^1] They might use desktops at work, or to write school papers, but most people do their computing on a phone. [The numbers don't lie](https://www.dictionary.com/browse/drafting).

[^1]: *Please* do not tweet at me about how you personally use your desktop way more than your phone. Anecdotal data is just that. 

Look at new desktop applications. So many are, to quote Satya Nadella, cloud-first and mobile-first. Lots have just a web app for desktop users. If they have a desktop application at all, it's probably Electron. 

This isn't an attack on the Mac. I love my Mac, and prefer native apps. But spawning a rich ecosystem of third-party developers is [one of the hardest challenges in technology](https://www.theverge.com/2017/10/10/16452162/windows-phone-history-glorious-failure). You have to create the conditions where it makes economic sense to develop for a platform. 

The Mac and other desktop platforms certainly still enjoy new native applications, because there are some apps that make the most sense or are only possible running natively on a desktop. However, that ecosystem pales in comparison to iOS.

## Catalyst at all costs

Apple's solution: bring iOS apps to the Mac in some way that makes sense. 

For apps being developed now, they gave us SwiftUI. For existing apps that care about giving users a good Mac experience, they gave us Catalyst. For everything else, Apple casually mentioned [those will run natively on ARM Macs](https://www.engadget.com/ios-apps-arm-powered-macs-192046502.html). 

But - iOS ports aren't "Mac-like." They [can be polished](https://twitter.com/stroughtonsmith/status/1273278521763418112?s=20), but a lot of developers won't bother. 

Hence, macOS Big Sur. If you Catalyst-ify the entire OS, iOS ports fit right in.

If developers won't make native, Mac-like Mac apps, change the definition of Mac-like and import millions of existing apps. It makes sense.