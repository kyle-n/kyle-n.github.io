---
layout: post
title: Effecting change in a top-down organization
description: How to make suggestions when your boss's biggest worry is their boss.
date: 2024-07-10
image: conference-room.webp
caption: The room where you'll convince people.
keywords: tutorial, teams
---

<script>
  import {base} from '$app/paths';
</script>

At some point in any career as a software developer, you will want to convince your coworkers of something. Maybe you want to pay off tech debt next sprint. Maybe you've been sharing a test environment with the QA team, and you really want to build them their own. Maybe you want to use [a cool new framework]({base}/blog/svelte-from-angular-perspective-for-svelte) for the frontend.

Doesn't matter. What matters is you lobby your coworkers in the way that _fits your organization_. If you don't, you are in for a world of hurt.

### The two kinds of organizations

You can separate most software companies into two buckets: top-down and bottom-up. According to career advice site [Merit](https://blog.get-merit.com/top-down-versus-bottom-up-management-in-tech/):

> In a **top-down team**, decision-making is typically centralized. Senior leaders or managers make key decisions with minimal input from lower-level employees. These decisions are then communicated down the hierarchy for implementation. Indicators might include:
>
> - Clear hierarchy where instruction flows from the top
> - Limited access to input on strategic decisions
> - Focus and adherence to established procedures and policies
>
> Conversely, a **bottom-up team** is characterized by a more inclusive approach to decision-making. In these teams, ideas and feedback are actively solicited from members at all levels. Look out for indicators such as:
>
> - Encouragement of innovation, and idea sharing from all team members - if you have to deal with the decision, you generally make it
> - Democratic decision-making processes where the input from various levels is valued and considered

As a consultant, I've worked with both. Personally, I prefer bottom-up teams because they:

- Encourage ownership and buy-in
- Help junior team members develop faster by encouraging them to participate in technical discussions
- Produce decisions better suited to the team and project

But, we do not live in a world where I get all my preferences. There are many, many organizations which operate in a hierarchical, top-down fashion. They can be tough environment for a developer who wants to effect change.

If you find yourself working in one of these companies and wanting to try a new framework or shift development priorities, you will have to navigate a complex political environment. This environment is like a large ocean with powerful currents. If you want to convince your coworkers of something in a top-down environment, know where the currents flow and don't swim against them.

Here's one way I've found to effect change in a large, top-down, low-trust organization.

_Caveat: Obviously, your mileage may vary with this advice. Every company is different._

### Background: Power flows from the top

The first thing to understand about a top-down organization is at every level, success is measured by _the person above you_. Developers are rated by tech leads. Tech leads are rated by VPs. VPs are rated by executive VPs, and all the way up to the CEO.

Power, influence, good reviews, promotions, raises, not being laid off and all the good things people want are controlled by the person above you. They are _not_ controlled by your reports or peers. This naturally draws everyone's attention and effort upward in the org chart. In a top-down organization, people pay attention to where the money and promotions come from. They'd be crazy not to.

If everyone's always looking up the org chart, your tech lead's top priority is _not_ your happiness. It's your VP's. Ditto for the VP - they want to ship a lot of features this quarter, so they look good in front of _their_ boss.

A [Hacker News comment](https://news.ycombinator.com/item?id=40751042) summed it up beautifully:

> Middle management isn't rewarded for implementing a grunt's idea, they are rewarded for delivering CEO initiatives. Anything that takes time away from that is seen as waste.

#### Low trust breeds top-down decision-making

A large organization with low trust in its developers will inevitably take decision-making power out of developers' hands. They'll probably centralize it in a small braintrust. This braintrust, usually people high up the org chart, will declare technical Rules for everyone.

Your boss will be extremely motivated to stick to these Rules, because they are rated by the person who made said Rules. Expect implementing them to be a requirement. Success is _not_ whether your project is as good as it could be - it's how closely it hews to the Rules.

This setup has advantages. It can scale to large organizations and across many teams whose developers may vary widely in skill. Standardization becomes more valuable at scale.

### How to effect change

However, even the best group of decision-makers cannot forsee every eventuality. You, a front-line developer, may run into an issue that requires you to break the Rules. Maybe you can't code a feature without importing a large external library. Maybe you need microservices, or microservices are terrible for you. Maybe you just want to [use Svelte]({base}/blog/svelte-from-angular-perspective-for-angular) instead of React or Angular.

The change doesn't matter. In a top-down organization, your manager or team lead will likely not be interested. Remember, grunt ideas take time away from delivering CEO ideas. This goes double for anything against the Rules.

If you want to convince your boss to implement your change, you must **make the change something _their_ boss wants**. Find the braintrust in your organization who makes the Rules and convince them your change is a good idea. Make the case your idea should be a one-off exception to the Rules, or that the Rules should include it.

You may not convince the braintrust. Which is fine! Not every change is a good idea, and even if it is, that's how it goes sometimes. The organization has different priorities than you. Nobody wins every argument.

But, if you _do_ convince them, the decision will then _flow down_ the org chart. Your manager and VP will suddenly be highly invested in implementing this change.

To effect change in a top-down organization, take your change to the top.
