---
layout: post
title: How to Use iMessage on a Windows PC
original: http://www.technorms.com/44053/use-imessage-on-a-windows-pc
image: imessage-windows-title.png
org: TechNorms
keywords: technorms, windows pc, imessage, iphone, ios, jailbreak, hack, desktop messaging
categories: windows, jailbreak, apple, tech, guide, technorms
---

iMessage is both one of the most useful products I've used and proof that Apple does not understand how to provide online services. On one hand, I love that I can send texts through iMessage and SMS from my Mac and iPhone and that they sync between the platforms. On the other, I hate that my messages are only available on a Mac, and a Mac that I've signed in on. 

<!--break-->

iMessage is awesome, as long as you only use a Mac. If, like me, you find yourself on a Windows machine at work, it means no more quick access to a full keyboard for texting. Unless, of course, you're willing to make some creative changes to your iPhone. 

You can actually use iMessage on Windows, Linux, Android or any platform with a web browser thanks to some cool tweaks. You can even add all your notifications on top of that. Here's how. 

## How to Use iMessage on Windows

First, you'll need a jailbroken iPhone. There is no legal way to view your messages without Cydia and the packages there because Apple's trying to sell you on its whole ecosystem, not just an iPhone. 

If you haven't jailbroken, check out our guide explaining how to jailbreak or if you can. As of this writing, the latest firmware that can be jailbroken is iOS 8.1.2. If your phone is above that, you are out of luck. 

### Install Remote Messages

iMessage in a web browser relies on a third-party Cydia tweak called Remote Messages. It costs $4 from the BigBoss repo. The tweak comes with DRM that disables the remote messages if you get it from an unofficial repo, so trial pirates beware. 

Setup and usage is simple. Buy the tweak from Cydia, download and install, and open the Settings app. Under the Remote Messages tab, make sure the server is turned on. 

For security purposes, you may want to change the default password to something more secure. 

To log on, open a web browser and enter the string of numbers under "Current IP." After those numbers, add a colon and the server port number. The app doesn't really explain this well. 

For example, my server IP is 172.17.154.166 and server port 333. I'd enter this into the URL bar: 

> http://172.17.154.166:333

And that works fine in most web browsers. 

There are a couple different layouts and view styles, all of them ugly and poorly laid out. Such is the price of iMessaging on Windows. 

The process can be replicated without a wireless connection, though it only works on OS X and Windows. 

Download itunnel-mux. Extract the .zip. If on Windows, right-click itunnel-mux.exe and click "Create shortcut." Right-click the shortcut and select "Properties." In the target field, add this onto the end:

>  --lport XXX --iport XXX

Where there is a space at the start and XXX is your port number. Now if you visit the full address as explained above, it'll show the messages. 

On Mac, open Terminal and type in "cd " then drag in the extracted .zip folder. Now enter:

> ./itnl --lport XXX --iport XXX

Where XXX is your port number. Now, visit the address as explained above in a web browser and you can view your messages. 

If you find your messages losing connection, it's because the WiFi is disconnecting to save power. To prevent this, install KeepAwake or Insomnia from Cydia. 

You can also use something like Fluid or Synthese for OS X and Windows to create wrapper apps to mimic a native messaging app. 

### How to Get iOS Notifications on Any Platform

The easiest way to mirror your iOS notifications on any platform is to use Pushbullet. It's an incredibly useful cross-platform service for notifications and "pushing" files/links/notes/images. 

Just install the Pushbullet app on iOS and whatever other platform you want and it'll mirror your notifications with minimal fuss. 

### Final Thoughts

It would be nice if Apple made all this a little easier. A lightweight, cross-platform messaging app that almost everyone (at least in America) uses would be ideal. 

Good web services are cheap, easy to set up and available on every platform you need them. Apple's iMessage only meets some of those criteria. That's what Remote Messages is for, though. 