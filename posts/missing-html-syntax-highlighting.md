---
layout: post
title: The case of the missing HTML syntax highlighting
description: A funny story of CDNs.
date: 2024-07-01
keywords: javascript, frontend, coding-stories
---

<script>
  import {base} from '$app/paths';
</script>

You would not believe the bug I solved last week.

I've been working on [my employer's website](https://www.bitovi.com) while I'm between clients. Me and a couple other devs have been building new tools for marketing, fixing random CSS bugs, that kind of thing.

I was assigned a bug with our [company blog](https://www.bitovi.com/blog). The syntax highlighting in code blocks was not working, according to the ticket. There was a screenshot attached:

![A screenshot of a code snippet without syntax highlighting](html-sans-highlighting.webp)

Time to investigate. I opened up the blog, picked a [random article](https://www.bitovi.com/blog/your-next-ai-startup-should-be-built-on-temporal-part-3-automated-prompt-testing) and saw it *had* syntax highlighting. Interesting. I checked a couple other posts, and those had syntax highlighting too. The only code blocks without colors were HTML snippets.

Maybe [that specific blog post](https://www.bitovi.com/blog/3-ways-to-simplify-frontends-with-multiple-microservices) had bad HTML. Checked that, and nope. It included `class="language-html"`. 

Let's find out what syntax highlighting library we're using. I dug around the code and found this in the `<head>`:

```html
<script type="module" src="/files/calendar-events-component/calendar-events-component.js"></script>
<script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js"/>
```

OK, maybe this is the problem. Maybe [Prism](https://prismjs.com) doesn't include HTML syntax highlighting by default, and we have to load a different version. Let's check the [supported languages](https://prismjs.com/#supported-languages):

> Markup - `markup`, `html`, `xml`, `svg`, `mathml`, `ssml`, `atom`, `rss`

Well, crap. We should have HTML highlighting.

At this point, I take a second look at the `<script>` import and notice something odd. Is that a version number?

```html
<script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js"/>
```

That's *weird*. According to [NPM](https://www.npmjs.com/package/prismjs), the latest version of Prism is 1.29.0. That's a reasonable-sounding number for a project doing [semantic versioning](https://semver.org). `9000.0.1` is... not. I googled "Prism" and "9000.0.1" and found this extremely funny [GitHub issue](https://github.com/cdnjs/cdnjs/discussions/14145).

> Hello!
>
> I am one of Prism's maintainers (npm prismjs) and we recently noticed that version 9000.0.1 still available via cdnjs.com. This is a version we published by mistake and have removed from npm a while ago. Due to the extremely high version number, it is also the version cdnjs picks by default, which causes problems.
>
> Would it be possible to remove v9000.0.1?

Amazing. When you open the [cdnjs page for Prism](https://cdnjs.com/libraries/prism), it shows you v9000.0.1 by default. Which is old, published by mistake and doesn't support HTML syntax highlighting. Funniest of all, that issue was created two years ago and is still unresolved.

Anyway, I changed our website's `<script>` import to use 1.29.0 and Prism worked perfectly. 

![A screenshot of an HTML code snippet with syntax highlighting](html-with-highlighting.webp)

What a bug 😅.