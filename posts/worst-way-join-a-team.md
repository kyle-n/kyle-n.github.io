---
layout: post
title: The worst way you can join a team
description: Or how not to make friends quickly
date: 2024-06-17
keywords: teams, coding
---

When you're a software engineer, joining a new team is hard. You've got to learn the product, infrastructure, personalities and process. It scares people, especially new engineers. To them, I say *don't worry*. Work hard, ask questions, write down the answers, and get help when you're stuck. Do those things and you'll be improve quickly.

Also, *be humble*. Never crap on some code you just found. If something seems insane or terribly architected, *ask why*. Asking why will not only endear you to your coworkers, who will respect your curiosity, it will make you a better engineer. 

Sometimes bad code has a fascinating backstory. You might ask a senior developer about this ugly network request on the frontend and get an answer like, "Oh, yeah, we wrote that because the microservice it calls is down half the time. Jim's team maintains it and they're too busy to fix it."

If you hear that answer as a new dev, that is *gold*. You just learned about your company's architecture, internal politics and priorities (which are ultimately the same, since [you ship your org chart](https://en.wikipedia.org/wiki/Conway%27s_law)). That is extremely useful information for building things in your organization.

But not all code is bad for good reasons. The senior might say, "Hahahaha that function absolutely sucks. We've got a story in the backlog to refactor it." That's good to know too.

You won't know the difference unless you ask. Never leap to judge any piece of code if you don't have the full context and history. You won't learn anything useful, and you'll irritate the crap out of your coworkers.

For example, I once worked on this frontend that had zero tests. It was a startup and they just didn't have time. But, the product was getting bigger, and we were shipping more breaking changes, so we needed tests. The team convinced management to let us write a couple tests every sprint. Over time, we added more and more until we had *a little* code coverage. Not a lot, but more than zero.

Then, this Unhelpful Senior Dev joined and just crapped all over the code. He thought everything was garbage, especially the tests. Didn't we realize we had barely any code coverage?

His comments burned a lot of goodwill. All I could think was, "Dude, compared to what we used to have? That 30% code coverage is a damn miracle." This guy had *no idea* what we'd been through just to get there.

Don't be like that guy. When you join a team, be humble and always ask why.