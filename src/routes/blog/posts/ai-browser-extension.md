---
layout: post
title: How AI helped me write a browser extension
date: 2023-06-07
keywords: ai, javascript, typescript, extensions, showcase, frontend
image: ai.png
---

There’s a lot of AI hype. I understand if you are sick of it. I’m a little sick of it. However, I want to make the case that generative AI is not something that *will* be great, but something that is *already* useful. 

To demonstrate, I’ll explain how AI helped me on my [latest side project](https://www.nazariosoftware.com/2023/06/02/play-in-peace-with-mute-chat-for-boardgamearena.html), a web browser extension. AI did not magically write the whole thing or do all the work, but it helped.

## The extension, for context

I am an avid fan of [Euro-style board games](https://en.wikipedia.org/wiki/Eurogame) (think [Settlers of Catan](https://boardgamegeek.com/boardgame/152959/settlers-catan), [Wingspan](https://boardgamegeek.com/boardgame/266192/wingspan), [Terraforming Mars](https://boardgamegeek.com/boardgame/167791/terraforming-mars)). If I want to play a quick game on my lunch break, I use [BoardGameArena.com](https://boardgamearena.com). It's a great website that lets you play these games online against other people.

However, I’m not a fan of how BGA forces you into a chat room with your opponents when you play a game. I was into [Hearthstone](https://hearthstone.blizzard.com/en-us) for several years and received a surprising amount of racial slurs and abuse. That experience killed my enthusiasm for chatting with strangers in online gaming. 

So, I made a [browser extension](https://www.nazariosoftware.com/2023/06/02/play-in-peace-with-mute-chat-for-boardgamearena.html) to mute the chat on BGA. It doesn’t do anything fancy, it just adds a little CSS to remove the chat windows and notification noises. 

## How AI helped

### Copilot

Generative AI helped me build this browser extension in a few ways. The first was [GitHub Copilot](https://copilot.github.com). Copilot wasn't something I initially interested in, but it's free for maintainers of "popular" open source projects. I tried it and liked it.

Copilot is the best AI product I've used. It’s not life-changing or amazing, but it is *useful*. For years, IDEs have had autocomplete for things like variable names and object properties. Copilot is autocomplete for whole lines of text. It is especially good at recognizing patterns and offering to autocomplete the next thing. For example, after I wrote this function…

```typescript
function muteChat() {
  console.log('muting chat');
  const plopper = document.getElementById(
    'audiosrc_o_alt_Plop'
  ) as HTMLAudioElement | null;
  if (plopper) {
    plopper.muted = true;
    plopper.pause();
  }
}
```

…it offered to autocomplete this…

```typescript
function unmuteChat() {
  console.log('unmuting chat');
  const plopper = document.getElementById(
    'audiosrc_o_alt_Plop'
  ) as HTMLAudioElement | null;
  if (plopper) {
    plopper.muted = false;
  }
}
```

…which was correct. That was the next function I wanted to write. 

None of this code is complicated. Copilot isn’t solving the traveling salesman problem here. But it did save me time writing boilerplate.

### ChatGPT

The second way generative AI aided this project was when I used ChatGPT to help generate image assets. I needed dark and light versions of my extension’s toolbar icon, in five different sizes. I knew there was a command-line tool for image editing called [ImageMagick](https://imagemagick.org), but I'd never used it and didn't want to invest a lot of time learning its flags. 

So, I installed ImageMagick and had ChatGPT write me shell scripts downsizing a source image into multiple smaller sizes.

```shell
convert filled.png -resize 16x16 filled_16.png
convert filled.png -resize 19x19 filled_19.png
convert filled.png -resize 32x32 filled_32.png
convert filled.png -resize 38x38 filled_38.png
convert filled.png -resize 48x48 filled_48.png
convert filled.png -resize 72x72 filled_72.png
```

![image](/img/chatgpt-imagemagick-1.png)

I also had it make inverted versions of each size for dark mode. It tripped up on this one and inverted a transparent background to white. I had to google the problem to know what instructions to give ChatGPT. 

![image](/img/chatgpt-imagemagick-2.png)

ChatGPT didn’t get it all right, but it still saved me time looking up documentation and writing shell scripts.

### Stable Diffusion

When it came time to publish, I also needed an app icon. I tried [Diffusion Bee](https://diffusionbee.com) on my MacBook, but it was too slow. Instead, I ran [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) on my gaming PC. Much faster with an Nvidia 3070.

I chose Stable Diffusion because frankly the app icon didn’t need to be that good. It’s a small browser extension people will install once and interact with rarely. I could draw it myself, but I don't enjoy graphic design and [am not that good at it](https://www.nazariosoftware.com/2021/04/07/about-javasnipt.html).

Stable Diffusion has a long way to go. It generated a speech bubble icon eventually, but only after a lot of misfires. I initially wanted it to create a background with some dice, but that was far too complicated. Stable Diffusion has absolutely no idea what a six-sided die looks like 🤦‍♂️. 

![image](/img/mc-icon.png)

Side note: ChatGPT was super helpful here again. It flawlessly wrote a bunch of ImageMagick commands to round the icon’s corners and shrink it to 80% size while keeping the canvas the same. Love not having to pay for Photoshop. 

## AI: Not a magic bullet, but useful

At no point in this process did generative AI completely do my job or become sentient or go, “I’m sorry Kyle, I can’t do that.” It was just… helpful. It made a couple things I’m not good at easier (shell scripting and graphic design). I wish Stable Diffusion was better at drawing dice, but you can’t have everything. 

In June 2023, AI is not a magic bullet, but it is *useful*. I will happily keep using Copilot, ChatGPT and Stable Diffusion for future projects. 