---
layout: post
title: Software companies will be fine
description: AI generates code, not products.
date: 2026-02-10
keywords: ai, opinion
---

There's [angst](https://www.wsj.com/tech/ai/ai-wont-kill-the-software-business-just-its-growth-story-05673e07?st=dY58vx&reflink=desktopwebshare_permalink) that AI will limit software companies' market. The fear isn't unfounded. Claude Code and Codex make prototyping so fast, you can imagine vibe-coding replacements for every subscription.

But AI tools generate _code_, not _products_. They cannot replace most software companies, because most companies sell products.

### What is a product?

Code is code. A product is the sum of code, customer support, logistics and domain expertise. The product is the code and everything around it. It's how easy it is to buy. It's getting an answer from customer support when something breaks. It's thoughtful features designed for the business domain. It's uptime. It's regular patches and bug fixes.

My first tech job was in 2019 at [ServiceCore](https://servicecore.com), a startup selling SaaS to dumpster and portable toilet companies. [^1] I worked on the UI, an Angular app, but customers didn't pay for that. They paid for:

[^1]: We made a lot of jokes about writing "shit code."

- The code
- A team of developers, to maintain the code, add new features and fix the ones that broke over time
- Product owners with deep domain expertise
- Customer support staff, to answer questions and fix data errors
- Sales people, to analyze your business and help you onboard
- DevOps staff, to keep the servers online
- Countless features and bug fixes found only by real customers using the software for real use cases

The last point is crucial. Actively maintained software is not designed once. It's designed every day based on customer feedback and real-world experience. It's not just code, it's an iterative product based on years of research, feedback, fine-tuning and testing.

AI tools generate code quickly, but code is just one component of a product. Most customers want the whole thing.

### The money advantage

Software companies also have a financial advantage over customers who'd prefer to replace them with an AI tool: larger addressable markets.

Consider this formula for valuing any piece of software:

```
Tv: total value
v: value of the tool to 1 user
n: number of users

Tv = v * n
```

If a company vibecodes their own software, _n_ is bounded by the number of their employees who can use it, which is bounded by total company size. Some businesses, like FAANGs, are either sufficiently large or make sufficiently valuable internal tooling that building lots of it makes sense. Most businesses fit neither description.

Software companies, however, can sell to many customers. Their _n_ is bounded by their customers and customers' size. Their total possible value tends to be far larger.

Now consider this formula for estimating the value of adding one new feature to a piece of software:

```
Tf: total value of a new feature
c: cost to add the feature
v: value of the feature to 1 user
n: number of users

Tf = (v * n) - c
```

Software companies can spread the cost of improvements over a larger customer base, letting them invest more into the product.

It makes no sense to hire a full-time developer for $150k a year to build internal software worth $30k. Hiring the same dev to do that for 10 customers is a no-brainer.

AI hype has made some people forget the oldest and most important lesson of software: it replicates infinitely for free, so scale is everything. The more users, the more you can invest back into the product.

### A slight caveat

Some apps and services are so simple, they can be replaced by AI-coded equivalents. Sometimes you just need _one thing_, and a full product is actually overkill.

I recently [set up OpenClaw](/blog/moltbot-setup), and configured it to do a simple web search for me every morning and send an alert. [^2] There are existing apps I could have used to do this, but this was simpler. No ads, no popups, no subscriptions - just the data I want, sent to my phone.

[^2]: Forgive the vagueness, but given OpenClaw's security issues, I don't want to tell people how to best prompt inject me.

### SaaS will be fine

AI will obsolete some basic software, but most commercial software products will be fine. I don't see that changing. Even if tokens cost nothing, AI couldn't do the non-code parts of the product. And even if it could, it probably doesn't make financial sense to try.
