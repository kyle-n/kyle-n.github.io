---
layout: post
title: Using AI to speed up NPM and Angular upgrades
description: A little guidance takes a repo a long way.
date: 2026-08-05
keywords: ai, typescript, javascript, angular, showcase, bitovi, frontend
relatedLinks:
  Original post on bitovi.com: https://www.bitovi.com/blog/using-ai-to-speed-up-npm-package-upgrades
---

Bitovi recently helped a client, [Moody's](https://www.moodys.com/ 'https://www.moodys.com'), upgrade several frontends. We were able to quickly perform this work thanks to our frontend expertise and judicious use of AI.

We performed several upgrades, including updating Angular to v21 and NestJS to v11. We also updated Tailwind and Moody's internal component library. Before starting, we built [agent skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview') telling AI how to perform each upgrade. The skills included steps to complete, success criteria, and troubleshooting for common problems. When given to [Claude Code](https://www.anthropic.com/product/claude-code 'https://www.anthropic.com/product/claude-code') running [Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5 'https://www.anthropic.com/news/claude-sonnet-4-5'), the agents were able to perform almost all of the upgrade process.

## Background

Moody's uses the [backend for frontend pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends 'https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends'). Each of their frontends contains a NestJS backend that serves an Angular frontend. The backend provides caching, validation and a convenient place to gather data from other services.

Moody's had made several of these combo backend-frontend apps over time. They tended to use the version of Angular and Nest that was current at time of creation (Angular 17-18 and Nest 10).

The [first skill](https://gist.github.com/kyle-n/c3616de709f6f8a86265e47dea70caf8 'https://gist.github.com/kyle-n/c3616de709f6f8a86265e47dea70caf8') we made focused on updating Angular to 19 and Nest to 11. That put the apps on the latest major version of Nest, and a modern version of Angular. Updating Angular past 19 required upgrading their internal component library first, so this skill focused on just getting the apps to 19.

## Breaking down the skill

The skill begins by providing initial requirements to the agent:

> This skill upgrades a repository from its current Angular version (v17+) to Angular v19 and from its current NestJS version (v9+) to NestJS v11. This is the foundational upgrade — all subsequent goals depend on it completing successfully.
>
> **Prerequisites**
>
> - Repository is on Angular v17+ and NestJS v9+
>
> - Repository builds and tests pass on the default branch before starting

By verifying the apps build and pass tests before any changes, the agent can verify its upgrades still pass the tests.

Next, we ask the agent to familiarize itself with the repo's dependencies:

> **Execution Steps**
>
> **Step 1: Analyze Current State**
>
> 1.  Read `package.json` to identify current Angular and NestJS versions
>
> 2.  Read `angular.json` or `workspace.json` to understand the workspace configuration
>
> 3.  Identify all Angular-related packages (`@angular/*`, `@angular-devkit/*`, `zone.js`, `rxjs`, `typescript`)
>
> 4.  Identify all NestJS-related packages (`@nestjs/*`)
>
> 5.  Check for any version-pinned dependencies that might conflict
>
> 6.  Log the current state for traceability

Then, we begin the Angular upgrade:

> **Step 2: Angular Upgrade**
>
> 1.  Run `ng update @angular/core@19 @angular/cli@19` to perform the Angular upgrade
>
> 2.  If `ng update` is not available or fails, manually update all `@angular/*` packages to v19
>
> 3.  Update `typescript` to the version required by Angular v19 (check Angular's peer dependencies)
>
> 4.  Update `zone.js` to the version compatible with Angular v19
>
> 5.  Update `rxjs` if required by Angular v19's peer dependencies
>
> 6.  Run `npm install` to resolve the dependency tree

Claude Sonnet was smart enough to know for Angular 17 projects, it had to update to 18 first. It usually ran the updater, checked results and changed dependencies as necessary until `npm install` and the tests passed.

To upgrade Nest, we tell the agent which packages to update. Best of all, if we tell the agent to check the Nest migration guide, it will load that from the Nest website and reference breaking changes.

> **Step 3: NestJS Upgrade**
>
> 1.  Update all `@nestjs/*` packages to v11
>
> 2.  Update NestJS peer dependencies (`reflect-metadata`, `class-transformer`, `class-validator` if present)
>
> 3.  Check for breaking changes in NestJS v11 migration guide
>
> 4.  Update any NestJS configuration files if the schema has changed

For step 4 and 5, we begin cleaning up common errors.

> **Step 4: Breaking Change Resolution**
>
> 1.  Check for deprecated APIs removed in Angular v19:
>
> - `@angular/http` → `@angular/common/http` (if not already migrated)
>
> - Standalone components changes
>
> - Signal-based inputs/outputs changes
>
> - Router guard changes
>
> 2.  Check for deprecated APIs removed in NestJS v11
>
> 3.  Run the TypeScript compiler (`npx tsc --noEmit`) to identify type errors
>
> 4.  Fix all compilation errors
>
> 5.  Update any Angular schematics or builders if needed
>
> **Step 5: Configuration Updates**
>
> 1.  Update `tsconfig.json` if Angular v19 requires different compiler options
>
> 2.  Update `angular.json` build configuration if needed
>
> 3.  Update any webpack or esbuild configuration changes
>
> 4.  Update `.browserslistrc` if present

And finally, we have the agent build the project and fix any additional errors:

> **Step 6: Validate**
>
> 1.  Run `npm run build` (or the project's build command)
>
> 2.  Run `npm run test` (or the project's test command)
>
> 3.  Run `npm run lint` if available
>
> 4.  Confirm no new warnings that indicate deprecated patterns

## Results

This [skill](https://gist.github.com/kyle-n/c3616de709f6f8a86265e47dea70caf8 'https://gist.github.com/kyle-n/c3616de709f6f8a86265e47dea70caf8') successfully upgraded multiple projects on the first attempt. It simplified the update process tremendously.

We also got these great results using just Claude Sonnet 4.5 - not even Opus. The agents are good enough that even a non-frontier model can perform an upgrade, run a build, check the output and fix errors as needed.

For users who are willing to run Claude or Codex in zero-permissions mode, this skill doesn't even need a developer to babysit it. You can just let it run for about 10 minutes, come back and see the results. With permissions on, it requires constant attention to approve each command.

I would recommend running this skill without permissions, if your security needs allow it. Manually approving each command can be tedious. Additionally, if you download the Nest upgrade guide and point the agent at it in your prompt, the agent won't even go online.

The skill worked great across multiple frontend apps, but it had one major downside. AIs are non-deterministic. The same prompt might produce different results if run twice. This skill may produce slightly different results if run multiple times, or on multiple repos. It makes debugging tricky. When something goes wrong, you're not sure if the AI failed, the repo has some unique issue, or you just used it wrong.

Still, it and several other skills saved us a ton of time helping Moody's upgrade their frontends. We plan to keep developing and building new skills to help clients ship better code faster.
