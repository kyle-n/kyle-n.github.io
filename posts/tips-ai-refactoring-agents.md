---
layout: post
title: 3 tips for refactoring code with AI agents
description: What Copilot and Claude get right, and what they do not.
date: 2025-08-12
keywords: tutorial, ai, bitovi
---

Bitovi consultants [like to stay on the cutting edge of new technologies](https://www.bitovi.com/blog/my-journey-into-ai-literacy). It helps us provide best-in-class solutions to clients.

As part of that learning and growing, I recently refactored some code for our client, [Strategic Wealth Preservation](https://swpcayman.com). We used [GitHub Copilot](https://github.com/copilot) [Agent mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode) with [Claude Sonnet 4](https://www.anthropic.com/news/claude-4) to adjust the code formatting and linting rules for SWP's codebase.

SWP uses a monorepo for several of their internal projects, as well their [public-facing website](https://swpcayman.com). These projects each have their own [Prettier](https://prettier.io) config. Only the public-facing website project had an [ESLint](https://eslint.org) config. They wanted one shared config for both Prettier and Eslint.

I could do this myself fairly quickly, but I wanted to take the opportunity to experiment with AI agents - to see what they can and can't do. Here's what I learned along the way.

### Tip 1: Write out the whole process

For refactoring the Prettier configs, I went step by step and simply told Copilot what I would do, but had it do the work for me.

For example, the first thing I would do, if I were hand-coding this, would be to read the Prettier config in each project in the monorepo and look for differences. Instead, I told Copilot to do that for me and list any differences. It found no major differences between the files. They were probably copied between projects at some point in the past. I then read the files myself to confirm this, because I wasn't sure how much to trust Copilot.

Then, I had Copilot create a new `.prettierrc.json` at the project root based on the existing config files. After that, I had Copilot remove the old configs and commit the changes.

Going step by step like this allowed me to check Copilot's work, but it also felt slow. For the second part of this project, I wrote out all the steps Copilot would need to perform to create one `.eslint.json` file for the whole monorepo. This [prompt chain](https://www.promptingguide.ai/techniques/prompt_chaining) was based on Bitovi's [prompt chain to load a JIRA ticket and fully implement it in code](https://github.com/bitovi/ai-enablement-prompts/blob/main/writing-code/generate-feature/generate-feature.md).

Although I had to fine-tune my prompt (see the next section), I appreciated the speed of performing all the steps at once. It was easier to just check Copilot's work at the end of the process using `git diff`.

### Tip 2: Label the steps of your prompt chain explicitly

When I first ran [my prompt chain](https://justpaste.it/gwk7z), I noticed Copilot performed the steps out of order, even though I'd written in the style of "First do this, then do this, then this."

Large language models are strange and require explicit instructions to perform steps in order. I found Copilot would follow my prompt chain correctly only with this at the top:

> You are a senior software engineer [^1] implementing code change to help your team. Please closely follow these instructions. Do not deviate from them. Follow them in exactly this order. Do not move on to the next step until the current one is finished.
>
> Step 1: Analyze this project for eslint config files...

[^1]: I don't believe this bit actually mattered for this workflow.

Once the model was told to follow the steps in order, and the steps were numbered, it performed them correctly.

### Tip 3: The command line is kind of MCP

[Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro), or MCP, is a red-hot frontier of AI development. MCP servers are essentially APIs so AIs can call, well, regular APIs. For example, [GitHub's MCP server](https://github.com/github/github-mcp-server) includes tools for AIs to create branches, open pull requests, monitor Action runs, and anything else you might like to automate.

MCP servers can be powerful - Bitovi's Mike Dane used them to have [Copilot complete his Jira ticket in two minutes](https://www.bitovi.com/ai-enablement-blog/how-github-copilot-completed-my-jira-ticket-in-2-minutes). But, you don't have to dive into that pool if you don't need those features yet. You can simply have Copilot access your command line and run commands.

For example, the last step of my prompt chain implementing a shared ESLint config was to commit the changes and push them to a remote branch. Copilot did not need the GitHub MCP server to do this - it simply ran `git commit` and `git push`.

This approach has some limitations. To return to Dane's example, it could not load a Jira ticket, or open a pull request. But, it can automate a lot of basic operations.

### Conclusion

Refactoring SWP's code with AI was fascinating. The potential of AI agents is obvious. But, writing prompts for them seems like its own skill, and one I personally will keep working on. Who knew you had to tell the AI to go in order?
