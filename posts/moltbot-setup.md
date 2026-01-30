---
layout: post
title: Notes on setting up Moltbot
description: Boy, those onboarding docs could use some work.
image: moltbot.webp
date: 2026-01-29
keywords: ai, tutorial
---

I run a Mac mini home server for [Plex streaming](/why-plex-music), so I had to try [Moltbot](https://www.molt.bot) ([neé Clawdbot](https://mashable.com/article/clawdbot-changes-name-to-moltbot)). [Major security issues notwithstanding](https://www.theregister.com/2026/01/27/clawdbot_moltbot_security_concerns/), it's a cool glimpse at the future of AI assistants.

However, setting up Moltbot took me most my morning. The setup docs mention features that don't work and skip required steps. Which is fine! The project's maintained by unpaid volunteers who suddenly have _way_ more users than they expected. They're doing their best.

I got Moltbot working via Claude Code and Telegram, with skills, using these steps.

1. [Install Moltbot](https://docs.molt.bot/start/getting-started#1-install-the-cli-recommended) using the setup script. `npm install -g` does not work.
2. [Install Claude Code](https://code.claude.com/docs/en/quickstart) on your machine and make sure it's signed in to your account.
3. Run `clawdbot onboard --install-daemon` to begin onboarding. The docs say the command name is `moltbot`, but the script still installs the alias `clawdbot` to your `$PATH`.
4. When it asks for a model, choose Anthropic.
5. In another terminal, run `claude setup-token` to get an authentication code.
6. In the Moltbot onboarding, pick the first option and enter your code.
7. Follow the onboarding steps to create a Telegram bot. I tried Discord and could not get it working.
8. Download Telegram and try to message your bot. It should give you an auth code to validate your session with Moltbot.

Moltbot should respond to queries in Telegram now. To make it really useful, add skills to the `~/.clawdbot/skills` directory. Tread carefully! A rogue skill can tell Moltbot to do anything. There is a command line option to add skills, but it did not work for me. Instead, I've been downloading the `.md` file and manually adding it. This prevents a malicious update to the skill, and lets me read each skill to make sure it has no unsafe content.

Moltbot is exciting! I could already remote into my server with [Screens](https://edovia.com/en/screens) and [Tailscale](https://tailscale.com), but I like having a natural-language interface to my computer. I've already added the [Plex skill](https://github.com/moltbot/skills/blob/main/skills/dbhurley/plex/SKILL.md), so now I can check my server over Telegram.
