---
layout: post
title: 5 Rules All Apple Watch Apps Must Follow During Design and Development
original: http://www.technorms.com/43511/5-rules-apple-watch-apps-follow
image: rsz-1-copy.jpg
org: TechNorms
keywords: technorms, apple watch, apps, rules, development, xcode, run on phone
categories: apple watch, apple, tech, news, technorms
---

The Apple Watch will release April 24, 2015. Until that release date, third-party app developers are frantically working to be first in line and have a watch app for new buyers to download. I compiled a list of a few of the most notable Watch launch apps before (if you need a refresher on the Apple Watch itself, we have a recap for that too).

<!--break-->

However, all the Watch apps have to follow Apple's strict guidelines. We got a look at those with the release of the Apple Watch SDK a while back. With the release date approaching, these are some of the rules every Apple Watch app has to follow to deliver information on a device that is "both distinctly personal and unobtrusive."

## Put it all on the iPhone

Third-party apps don't work on the Apple Watch without an iPhone in part because of how Apple has set up the technical aspect of watch apps. 

Every Apple Watch app contains a WatchKit app that runs on the user's wrist. However, this app technically has only the resources (graphics, sound, text strings, etc) associated with the app.

The WatchKit app is really run from the iPhone through a WatchKit extension used by the developer's iPhone app. 

All that make sense? For example, Uber's iPhone app uses the WatchKit extension to talk to the Uber WatchKit app, which is really just an extension of the iPhone app. 

### Glances can only be one glance

The Apple Watch uses a design paradigm called a "glance" to provide quick bits of information. 

Third-party apps can create glances, but these must fit into a single screen with no scrolling and contain no buttons. 

### Don't do as much as a phone app

Apple has some guidelines that it says are not allowed and not recommended, though it does not mark which is which. 

Apple Watch apps should not ask for user permissions, like location. Imagine starting up Uber's watch app with your phone in your pocket - you wouldn't even see the location request prompt. 

Watch apps also cannot run in the background, as Apple envisions them working only while the app is in the foreground. Basically, don't run unless the user wants you to. 

This goes back to letting the iPhone app do the heavy lifting. Apple is dodging the battery/CPU troubles most wearables run into by offloading the hard work to its more-than-capable iPhone AX CPUs. 

### Put it in pages

With the Apple Watch showing little data on screen at any given time, Apple reminds developers in its documentation how important it is to paginate their app's information to make it easy to swipe through. 

"A page-based interface contains two or more independent interface controllers, only one of which is displayed at any given time. At runtime, the user navigates between interface controllers by swiping left or right on the screen."

### Use as little space as possible

Apple allows the app to cache image assets (the boxes used to display the interface, a user's profile picture) on the Apple Watch itself. 

However, it only allows each third-party app up to 5 MB of storage. This does not leave a ton of space, especially for the high-quality PNGs Apple recommends developers use. 

Basically, watch apps won't have a lot of room to sprawl out. Expect them to be fairly minimalistic. 

### Final Thoughts

The Apple Watch guidelines seem restrictive, and I'm curious to see which ones loosen over time. This is a first-generation Apple product, so some strictness is to be expected. Remember, the first iPhone didn't even have third-party apps. 

Until the rules change, app developers will have to work under 5 MB and system font-only restrictions.