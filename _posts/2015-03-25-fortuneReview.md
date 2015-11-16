---
layout: post
title: Fortune- Finally A Quality 4chan App for iPhone is Here
original: http://www.technorms.com/43309/fortune-best-4chan-app-for-iphone
image: fortune-title.png
org: TechNorms
keywords: technorms, fortune, jailbreak, iphone, 4chan client iphone, hack, weeb
categories: 4chan, social media, jailbreak, apple, review, technorms
---

Finally, there's a good 4chan client on iPhone. Reddit user nin9tyfour posted the good news to jailbreaking hub /r/jailbreak last week. He finished months of work on Fortune, a Cydia-only app for browsing the worst place on the internet. 

<!--break-->

TechNorms caught up with nin9tyfour to talk about what made Fortune good, what went into development and why it's so hard to implement a captcha within the app. 

## The development process

Nin9tyfour said he used to visit 4chan from iPhone a few years ago until the old 4chan iPhone app, Chan Elite, was banned. 

Can't say I'm too surprised the old app got banned. Apple's puritan tendencies manifest in strange ways, including banning Kama Sutra apps. Such is life in the walled garden. 

Nin9tyfour said development was easier and harder than he expected at different times. 

"Getting a semi-working prototype took only a matter of hours," he said. "It was missing key features like media viewing, HTML decoding, etc, but it could pull data from the website and display it."

From there nin9tyfour kept working on parsing the HTML pulled from 4chan into readable text, a difficult task given a nasty JavaScript bug he said he spent a good bit of time chasing down. 

The way nin9tyfour described it, development was a lot of bugfixing and optimizations. He said he fixed one bit of HTML that caused the processing animation to take twice as long as it should to crunch through comments. 

"That was great because the application basically doubled in speed," he said. 

One unusually difficult nut to crack during development was the catchpa. Administrator Christopher Poole implemented it to keep away spammers and annoy people into buying a 4chan Pass. 

"I didn't understand how the [the captcha] worked, so I'd always get 'incorrect captcha' replies from the server," nin9tyfour said. "I actually contacted the developer of Chan Elite and asked for some tips on how it's done. He was really helpful and gave me the URL he was getting the captcha from."

One of the most impressive parts of Fortune that also took some serious development time was WebM support. WebM is a bastardized video container format popular on 4chan and nowhere else. It is not supported natively on iOS. 

"WebMs were actually not all that difficult," nin9tyfour told TechNorms.

He said he ended up using code from VLC with some code from a Facebook project, of all things, to make WebMs play automatically and silently, without interrupting background audio. 

### The Finished Product

Fortune is the nicest 4chan app I've ever used, and that includes the ones on Android. It shows a remarkable level of polish and professionalism by any standard, let alone that of a jailbreak-only app. 

You start from the boards screen. You can delete some of the presets and add NSFW ones like /b/. 

After picking some favorites, browsing threads is simple and enjoyable. Everything's listed there. Viewing, replying to comments and making new posts works fine. 

The app comes with its own media gallery for downloading photos so you can save a folder of appropriate reaction GIFs. 

This gallery is accessible when posting. Fortune even lets you browse the Camera Roll and Google Images within the app to find the right image. 

The app handles threads much the same way as Chan Elite. Tap the status bar to scroll to the top and hamburger menu to open up all the extra options. You can watch a thread, download all images, scroll to the bottom or share the link. 

The link watcher doesn't auto-refresh by default, so be sure to turn that on. 

There are a few other design oversights like this. When you open a single image, the save button pushes an image to the Camera Roll, not the in-app media gallery. 

Images go to the media gallery from the download button (separate from the save button) which doesn't let you download an individual image. For that, you need to press Select (in the top left, where the back button should be), then the checkmark in the upper right, then download. 

The most confusing part is browsing downloaded images in the gallery. Those put the back button in the upper left (where it should be), while images viewed on the boards call it the "Done" button and put it in the top right. This is needlessly confusing. 

Fortune is also missing 4chan Pass support, something nin9tyfour said he would work on. 

"I'll do it, it's just I don't actually have one and before I begin to put money into the app, not only time, I'd like to see what people's responses are," he said. 

### The Future

Nin9tyfour said he plans to change the iPad UI into a unique layout with a sidebar in the future, as well as add filename customization and saving comments. 

He's also considering adding a free, ad-driven version for anyone not interested in paying $3 for it on Cydia. 

"[I'll support the app] for as long as I can," he said. "Once it's stable and has the features people want I'll probably optimize it more, maybe refactor some code. There's always a point where bug fixes become the main focus, which isn't an issue but I'll try to always ensure it's in an operational state."

Right now nin9tyfour called sales "alright," saying there were usually around 10 users online, according to Crashlytics. 

"I didn't expect to make back the money equal to the time put into the app," nin9tyfour told TechNorms. "I learned a lot, though, which is great."

Fortune is $3 on the BigBoss Cydia repo. 