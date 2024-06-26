---
layout: post
title: How I use the keyboard for (almost) everything on my computer
description: Fighting RSI takes extraordinary measures.
date: 2024-06-24
image: kb-stylized.webp
keywords: personal
---

<script>
  import {base} from '$app/paths';
</script>

Using a mouse aggravates [my RSI]({base}/blog/fighting-rsi-injuries-developer). I avoid it. I've found with a [split keyboard](https://ergodox-ez.com) and a natural arm position, I can type for long periods of time with minimal stress. So, I do everything through the keyboard.

I use a few different tools to accomplish this. First, I have a dedicated button on my keyboard for activating [Homerow](https://www.homerow.app). Homerow lives in my menu bar and, when activated, highlights everything on screen that can be clicked. Type a one-to-three letter combination and Homerow will use the macOS Accessibility APIs to click that button / link / whatever. It sometimes chokes on my external monitor, unfortunately, but it is under active development and improving.

For writing code, I use [Visual Studio Code](https://code.visualstudio.com) or [WebStorm](https://www.jetbrains.com/webstorm/) with a [Vim](https://www.vim.org) extension. This allows me to rapidly navigate and edit text using just the keyboard.

For everything else, I try to use keyboard shortcuts. Nothing fancy, just Cmd-Tab, Ctrl-Tab, that kind of thing. Most well-made apps have keyboard shortcuts to do most things. Mostly. I just try to memorize them as they come up.

I also use [Alfred](https://alfred.app) extensively. Alfred is a wonderful little launcher for macOS. It's great for quickly opening apps and files, but the real gold is in [workflows](https://www.alfredapp.com/workflows/). Alfred lets you trigger complex automations with just a few keystrokes. For example, when I have to join a call, I use a workflow that pauses my music and launches Google Meet. Scripting these common, tedious actions saves significant time (and wear and tear on my wrists).

Lastly, I also try to use the command line. A good terminal window lets you do almost everything, provided you know the right incantation. It's not user-friendly or discoverable, but it is entirely keyboard-driven.

For anyone interested in this kind of thing, I recommend looking into macOS's [mouse control via head tracking](https://support.apple.com/guide/mac-help/move-the-pointer-using-head-pointer-mchlb2d4782b/mac). You can move the mouse by tilting your head and click by sticking out your tongue. One of the coolest accessibility features I've ever encountered.
