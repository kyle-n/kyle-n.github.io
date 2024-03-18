---
layout: post
title: 2023 in review
description: Looking back on a busy year
date: 2023-12-31
keywords: personal, year-in-review
image: fireworks.webp
caption: DALL-E 2 - "a man sitting at a computer writing code. There is a city visible through his window with bright neon colors. There are fireworks going off outside the window for new year's eve. pixel art"
---

<script>
  import {base} from '$app/paths';
</script>

2023 draws to a close. As I sit here, my partner and I are planning our New Year's Eve dinner with friends. Before I can blink, it'll be January 2024. A new year bearing a number that sounds like the setting of some sci-fi story. [_Akira_](<https://en.wikipedia.org/wiki/Akira_(1988_film)>) set its futuristic dystopia in 2019.

But I digress. 2023 was an eventful year, filled with challenges and improvements.

### Coding

At work, I spent the year helping clients with their frontends. I solved one particularly thorny issue for a client whose Angular app needed to collect data from several different microservices. I'll have a long post about that one soon.

For my personal projects, I spent a fair bit of time rewriting this website in [SvelteKit](https://kit.svelte.dev). Svelte was a joy to learn and even more to write. I loved [building a full-content RSS feed]({base}/blog/full-content-rss-feed-with-sveltekit-part-two) for my posts and [contributing to Svelte open source]({base}/blog/svelte-testing-library-pr-globals). I also figured out a neat trick to write [even shorter Markdown image syntax]({base}/blog/markdown-images-for-sveltekit-blogs) using Remark.

I love the site. It's reinvigorated my love of blogging, which I am trying to do every week. Nothing improves your writing more than doing it as much as possible. It's been wonderful to reconnect to an old passion of mine.

I also built a browser extension! [Mute Chat for BoardGameArena](https://www.nazariosoftware.com/2023/06/02/play-in-peace-with-mute-chat-for-boardgamearena.html) hides the global and in-game chat on BGA. Perfect when you want to play a couple matches of [_Heat_](https://boardgamegeek.com/boardgame/366013/heat-pedal-metal) in peace.

Mute Chat required [substantial infrastucture](https://github.com/kyle-n/WebExtensionTemplate/tree/main/Extension/scripts). Compiling a modern browser extension is an odd process that most tools don't support out of the box. You have to compile four different pieces of the app, then bundle them in slightly different ways for each browser. I ended up open-sourcing most of what I wrote for Mute Chat as [WebExtensionTemplate](https://github.com/kyle-n/WebExtensionTemplate), a ready-to-fork template for modern browser extensions. It lets you quickly start writing an extension in [Svelte](https://github.com/kyle-n/WebExtensionTemplate/) or [React](https://github.com/kyle-n/WebExtensionTemplate/tree/react). It's decently popular - 27 forks and 73 stars as of writing. If nothing else, it'll help me next time I have to write an extension.

### Media

#### Video games

This year, I played:

- _The Witcher 3: Wild Hunt_
- _The Witcher 3: Hearts of Stone_
- _The Witcher 3: Blood & Wine_
- _Inscryption_
- _Elden Ring_ (again)
- _Advance Wars: Re-Boot Camp_
- _The Legend of Zelda: Tears of the Kingdom_
- _Mass Effect_ 1-3 (Legendary Edition)
- _Sea of Stars_
- _Resident Evil 4_ (2023)
- _Resident Evil 8: Shadows of Rose_
- _Super Mario Wonder_
- _Spider-Man 2_ (PS5)
- _Return of the Obra Dinn_
- _Resident Evil HD_
- _Final Fantasy VII Remake_

_Witcher 3_ was fantastic to revisit. A phenomenal piece of writing. The _RE4_ and _FF7_ renames did the impossible and improved on classics. _Return of the Obra Dinn_ was delightful, mobid and funny in all the best ways. The _Mass Effect_ trilogy held up great on revisit - especially the first, which excels in ways I never appreciated as a teenager. [^1] _Elden Ring_ remains one of the best video games ever created.

[^1]: My galaxy brain take on _Mass Effect 1_ is the bad combat makes the game better. It forces the story, worldbuilding and characters to carry the weight of entertaining the player. That's far more interesting than doing combat rolls in _ME3_.

Looking ahead to 2024, I can't wait to play _Persona 3: Reloaded_ and _Final Fantasy VII Rebirth_. Those two RPGs and a little something I got in the Steam Winter Sale called _Baldur's Gate 3_ should carry me into 2025.

#### Movies

I have too many thoughts about the movies I saw this year. That'll be a separate post. For now, see my [2023 Letterboxd list](https://letterboxd.com/kyle_nazario/list/2023/).

#### Books

After a long time not reading much, I started reading again. I used to be a huge reader as a kid. This year, I read [quite a bit](https://hachyderm.io/@kn/110741279907842284)! You can see everything at the linked Mastodon thread.

### Personal interests

This year, I ran my first half marathon! I completed the [AthHalf](https://athhalf.com) in 1 hour and 42 minutes. Would never have tried it without encouragement and training from my local run club. If you have ever thought about running, I highly encourage joining a group.

I also took up photography as a hobby, pictures posted to [Instagram](https://www.instagram.com/kyle.nazario/) and [Mastodon](https://hachyderm.io/@kn). Taking and editing photos is a great challenge precisely because I'm so bad at it.

Some friends and I also began [duckpin bowling](https://en.wikipedia.org/wiki/Duckpin_bowling) this year. It is silly and I love it.

### For next year

I don't usually set personal goals, but I hope next year will also be good. This year has had some promising parts, and I hope they'll continue.
