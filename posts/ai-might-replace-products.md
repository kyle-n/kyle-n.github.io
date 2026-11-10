---
layout: post
title: Software companies might not be fine
description: AI really did change the economics of software development.
date: 2026-11-10
keywords: ai, opinion
---

In February, I wrote ["Software companies will be fine."](/blog/ai-replaces-code-no-products) I poo-poo'd the stock market freakout over the effect of AI on software-as-a-service companies.

My argument boiled down to two points. First:

<blockquote>
<p>Consider this formula for estimating the value of adding one new feature to a piece of software:</p>

<pre>
Tf: total value of a new feature
c: cost to add the feature
v: value of the feature to 1 user
n: number of users

Tf = (v * n) - c
</pre>

<p>Software companies can spread the cost of improvements over a larger customer base, letting them invest more into the product.</p>
</blockquote>

I got the formula right for assessing the value of a piece of software. But, in the year since [the AI code inflection point](https://simonwillison.net/2026/Jan/4/inflection/), the size of the variables have changed. Vercel CTO Malte Ubl [wrote in January](https://www.linkedin.com/posts/malteubl_its-been-a-crazy-holiday-period-i-built-share-7413979797355393024-iO5_/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAIk0KwBsmE3oBadWSg2ettxmEyKbqZKG34):

> I don't want to be too dramatic, but y'all have to throw away your priors. The cost of software production is trending towards zero.

Writing your own internal tools is _far_ more economical when the price is 20 bucks a month and babysitting Claude for an hour.

I also didn't take into account `v` is higher when you write software precisely tailored to your use case. I should have known this from working at a SaaS business pre-AI. We constantly got feature requests from customers who wanted the product to match their precise needs. Sometimes we translated those requests into watered-down features that could help everyone, and sometimes we didn't do them at all. Too niche. Not worth the cost.

The second argument from my post was:

> Code is code. A product is the sum of code, customer support, logistics and domain expertise. The product is the code and everything around it. It's how easy it is to buy. It's getting an answer from customer support when something breaks. It's thoughtful features designed for the business domain. It's uptime. It's regular patches and bug fixes.

> AI tools generate code quickly, but code is just one component of a product. Most customers want the whole thing.

This was partially correct. Customers _do_ want wholistic products that are easy to use, up-to-date, reliable and supported. But they might not want you to thoughtfully design features for them. They might want to design the features their own damn selves, for their own damn business.

And regular patches and bug fixes? Those can and should be carried out by agents. [Only way to keep up](https://stratechery.com/2026/the-end-of-the-internet/) with the [flood of AI cyberattacks](https://www.wsj.com/pro/cybersecurity/black-october-shows-ai-advantage-goes-to-cybercriminals-68002bfb).

Managing a piece of software is still a pain. Customers want to focus on their businesses, not yell at Claude to fix a failing server. There's still room to sell something, probably. But maybe it'll all be done by agents.
