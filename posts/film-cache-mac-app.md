---
layout: post
title: Building a native Mac app for movies in my hometown
description: Sometimes building the most uncommercial possible project is fun.
keywords: showcase, apple, swift, movies
date: 2025-10-10
image: fc1.webp
caption: A screenshot of Film Cache, my new side project.
---

It's been a while since I've made an app. I was also annoyed with having to Google "logan utah movies" every time I wanted to see what was in theaters. I knew I could do better than [the website of my local theater chain](https://megaplex.com).

So for the last month, I've been building the least commercial possible app - [**Film Cache**](https://github.com/kyle-n/Film-Cache), a native macOS app for displaying movie theater screenings only in northern Utah's Cache Valley.

The monetization potential for this app is zero. I may be the only person in my whole town who both A) cares this much about movies, and B) cares this much about native Mac apps. Everyone else just googles it.

This post runs down some technical choices and challenges I faced in developing the app.

### Problem context

[Logan, Utah](https://en.wikipedia.org/wiki/Logan,_Utah) is a small town of 52,000 people or so. It's the largest city in [Cache Valley](https://en.wikipedia.org/wiki/Cache_Valley), a large, flat depression situated in the Rocky Mountains at 4,500 feet of elevation that stretches from northern Utah to southern Idaho. The name allegedly comes from fur trappers hiding caches of goods in the region in the 1800s.

Logan and its immediately surrounding towns, sadly, have just three movie theaters. The two big ones are [Megaplex University](https://megaplex.com/university) (named for nearby Utah State University), and [Megaplex Providence](https://megaplex.com/providence) (named for the suburb it's in). There's also [The Utah Theatre](https://theutahtheatre.org), a community arts center that alternates between live theater and [repertory screenings](https://en.wikipedia.org/wiki/Revival_house).

Film Cache needs to display movies from just these three theaters. Anywhere else, like Ogden, is too far a drive and doesn't count.

### APIs

Megaplex proved the easiest to integrate. Their website displays data from `https://apiv2.megaplex.com`. "Reverse-engineering" that API is as simple as opening the network panel. Two simple GETs return everything I need for the Providence and University locations.

Loading movie screenings from The Utah Theatre, however, was more complicated. Not only do they have no API, their entire website is one image. Let me repeat that - _their website is an image_. Every month or so, they just replace it with a new JPG of their schedule. The "links" on page to follow them on social media? Those links are just clickable regions drawn on top of the schedule. Genuinely didn't even know you could do that.

![A screenshot of browser dev tools displaying the Utah Theatre website source code, which is just an image](utah-theatre-code.webp)

The Utah Theatre presents a difficult problem. A human has no trouble looking at a calendar and parsing it. Computers, however, struggle.

I first tried Apple's [Vision framework](https://developer.apple.com/documentation/vision). It successfully extracted almost all the text from the image, but the results looked like this:

```
OCTOBER (All shows/times subject to change)
MONDAY
TUESDAY
WEDNESDAY
THURSDAY
FRIDAY
29
30
2
7 PM
Gremlins
(Zack Galligan, Phoebe Cates)
7 PM
The Nightmare Before
Christmas
(Tim Burton, Danny Elfman)
13
7 PM
Night of the Living Dead
(1968 Classic Horror)
15
7 PM
E.T. the Extra-Terrestrial
(Henry Thomas,
Drew Barrymore)
14
7PM
E.T. the Extra-Terrestrial
(Henry Thomas,
Drew Barrymore)
```

There was no way to parse this correctly. Impossible to tell, for example, that _Gremlins_ was playing both Wednesday, Oct. 1, and Friday the 3rd. OCRing the text out of the image loses the text's position and surrounding items (like the date). The Vision framework does tell you the position of a piece of text, so I considered doing a lot of math to try to match movie titles to the correct date. That seemed fragile, though. Even if I make something that works now, will it work with next month's calendar?

I considered using a local LLM to parse the image. Reddit recommended [Z.ai's GLM-4.6](https://chat.z.ai) as the best option for understanding an image. I tested it on Z.ai's website and it couldn't understand the calendar.

I also tried ChatGPT. It _did_ correctly parse the calendar and return a list of showtimes. However, it took about 10 minutes to complete this. Maybe it's my fault for being on the free tier. But still, that's not an acceptable amount of time for this app.

### Solution

#### Data

In the end, I handled the problem of parsing The Utah Theatre's schedule by dodging it entirely. My app just displays the schedule JPG straight from their website.

![A screenshot of Film Cache showing the Utah Theatre schedule](fc2.webp)

The Megaplex data gets loaded, parsed and formatted into a nice [Mac-assed](https://daringfireball.net/linked/2020/03/20/mac-assed-mac-apps) table. The table supports sorting, resizing, you name it. Click on a movie, and it'll ping [The Movie Database](https://www.themoviedb.org) for the poster, tagline, description and more details. Showtimes are listed in tables beneath.

![A screenshot of Film Cache showing Megaplex movies](fc1.webp)

There's a [fair bit of parsing](https://github.com/kyle-n/Film-Cache/blob/ce5de408c0d006cba6c078a33ed3653c5739287c/Film%20Cache/Connectors/MegaplexConnector.swift#L27) to handle all the weird custom titles Megaplex uses. Their API puts out results like "Wicked (Re-release)", which I have to manually remove so I can find the matching movie in TMDB.

#### State management

For most of the app's development, I kept the app state in controllers and SwiftUI variables. However, when I began implementing a search field, I realized this app needed proper global state management. I'm a big fan of [Redux](https://redux.js.org) in web development, so I installed [ReSwift](https://github.com/ReSwift/ReSwift).

Redux turned out to be an excellent solution for a Mac app. Instead of passing state up and down SwiftUI views, I could load it straight from a single store. ReSwift also let any UI component update the central state easily. For example, the [refresh button](https://github.com/kyle-n/Film-Cache/blob/ce5de408c0d006cba6c078a33ed3653c5739287c/Film%20Cache/Buttons.swift#L15) in the app's menu bar simply dispatches a `.movieListRefreshed` action to the store, which handles the work of loading new movies and displaying them in the UI list. Coordinating state updates across widely separate parts of the app like this is far easier with centralized state. You could also do this with custom notifications, but then you lose the immutability, one-way data flow and debug-ability of Redux.

### Conclusion

Was there any point to this? Not really. It was just a fun little project to build. Really enjoyed ReSwift - Redux is even easier in a strongly typed language like Swift.
