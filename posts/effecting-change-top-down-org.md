---
layout: post
title: Effecting change in a top-down organization
description: How to make suggestions when your boss's biggest worry is their boss.
date: 2024-07-03
keywords: tutorial, teams
---

<script>
  import {base} from '$app/paths';
</script>

You can separate most software companies into two general buckets: top-down and bottom-up. The tech career advice site [Merit](https://www.get-merit.com) has [a good breakdown](https://blog.get-merit.com/top-down-versus-bottom-up-management-in-tech/) of the differences:

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

As a consultant, I've worked in both. Personally, I prefer bottom-up teams operating in environments with high levels of trust. They:

- Encourage ownership and buy-in among the team
- Help junior team members develop faster, as they're encouraged to participate in technical discussions and make decisions
- Produce decisions closer aligned to the reality of the work (as opposed to a decision made by someone ten levels away, whose picture of the code is necessarily worse)

But, we do not live in that world. There are many, many organizations which operate in a strictly hierarchical, top-down fashion. They're a tough environment for a developer who wants to implement a new framework or get buy-in to pay off technical debt.

If you find yourself working in one of these companies and wanting to effect change, you will have to navigate a complex political environment. This environment may seem bizarre, but it is driven by certain forces. These forces are understandable, and even useful if you can harness them.

Here's one way I've found to effect change in a large, top-down, low-trust organization.

_Caveat: Obviously, your mileage may vary with this advice. Every company is different._

### Background: Power flows from the top

The first thing to understand about a top-down organization is at every level, success is measured by _the person above you_. Developers are rated by their tech leads. Tech leads are rated by their VPs. VPs are rated by executive VPs. This goes all the way to the CEO, who is rated by investors (public or private).

Power, influence, good reviews, promotions, raises, not being laid off and all the good things people want are controlled by the person above you. They are _not_ controlled by your reports or peers. This fact draws people's attention and effort upward in the org chart like a star draws objects into orbit. I'm not saying anyone is a bad person or doesn't care about their subordinates, but they pay attention to where the money and promotions come from. They'd be crazy not to.

If everyone's always looking up, your tech lead's top priority is _not_ your happiness. It's your VP's. Ditto for the VP - they just want to look good in front of their boss.

A [Hacker News comment](https://news.ycombinator.com/item?id=40751042) summed it up beautifully:

> Middle management isn't rewarded for implementing a grunt's idea, they are rewarded for delivering CEO initiatives. Anything that takes time away from that is seen as waste.

### Background: Low trust breeds top-down decision-making

A large organization with low trust in its developers will inevitably take decision-making power out of the developers' hands and centralize it in a small braintrust. This braintrust, usually people high up the org chart, will make technical Rules for everyone.

Implementing these Rules is a hard requirement. Remember, your team lead and VP want to look good for their boss, who is presumably in the braintrust. Success is _not_ whether your project is as good as it could be - it's how closely it hews to the Rules.

### How to effect change

This setup has its advantages. It can scale to large organizations and across many teams whose developers may vary widely in skill. Standardization becomes more valuable at scale.

However, even the best group of decision-makers cannot forsee every eventuality. You, a front-line developer, may run into an issue that requires you to break the Rules. Maybe you can't code a feature without importing a large external library. Maybe you need microservices, or microservices are terrible for you. Maybe you just want to [use Svelte]({base}/blog/svelte-from-angular-perspective-for-angular) instead of React or Angular.

The change doesn't matter. In a top-down organization, your manager or team lead will likely not be interested. Anything against the Rules that could take away time from delivering features requested by people above them is unwelcome.

If you want to convince your boss to implement your change, you must **make the change something _their_ boss wants**. Find the braintrust in your organization who make the Rules and convince them your change is a good idea. Make the case that your idea is fine as a one-off exception to the Rules, or that the Rules should include it.

You may not convince the braintrust. Which is fine! Not every change is a good idea, and even if it is, that's how it goes sometimes. The organization probably has different priorities than you.

But, if you _do_ convince them, the decision will then _flow down_ the org chart. Your manager and VP will suddenly be highly invested in implementing this change.

TL;DR: To effect change in a top-down organization, take your change to the top.
