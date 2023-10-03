---
layout: post
title: Why smaller components are better
date: 2022-05-23
keywords: javascript, typescript, angular, frontend, tutorial, coding
image: component-tree.png
caption: Via angular.io
description: The single-responsibility principle didn't go away when we went to components.
---

As an [Angular consultant](https://www.bitovi.com/frontend-javascript-consulting/angular-consulting), one of my favorite tricks to rapidly improve client code is to **make the components smaller**.

On a recent client project, implementing best practices let me reduce calls to a complex function from 223,000 per render to 1,200. Smaller components make better, faster UIs.

### Background

A good component should:

1. Make sense on its own
2. Do **one** thing
3. Be reusable where possible

Components should be like **atoms**. We all remember high school physics - an atom is a thing that is no longer an atom if you try to divide it. Components should be so small that dividing them further doesn't make sense.

This fits the [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle), a fancy computer science version of point #2 above.

> Every module, class or function in a computer program should have responsibility over a single part of that program's functionality, and it should encapsulate that part. All of that module, class or function's services should be narrowly aligned with that responsibility.

### How small is small?

Here's an example of how small components should be, pulled from the [React documentation](https://reactjs.org/docs/thinking-in-react.html).

Imagine we're making a simple web app for our online store. We have a frontend calling an API to get a list of products, then displaying that list.

![A basic UI listing products for sale]({base}/img/web-store-ui.png)

It is an easy mistake to look at this code and assume it should all be one component.

Here's the official recommendation on how granular the components should be to build this UI - and remember, this is the recommendation of a bunch of Meta engineers who spend all day building a component-based framework:

![A basic UI listing products for sale split into sub-components]({base}/img/web-store-ui.png)

They recommend splitting this UI into five components:

1. **FilterableProductTable** (orange): contains the entirety of the example
2. **SearchBar** (blue): receives all user input
3. **ProductTable** (green): displays and filters the data collection based on user input
4. **ProductCategoryRow** (turquoise): displays a heading for each category
5. **ProductRow** (red): displays a row for each product

Could you split this into smaller components, like one for each cell? Sure, but to me that splits the atom. If your component directly displays one piece of data without even any logic around the rendering, that doesn't make sense. The component is just template interpolation with extra complexity.

Now, if each cell had complex currency formatting or a popover menu, that would be worth its own component. It's always a judgement call for how granular you want to go.

If you're stuck, just look at everything the component does and ask if it does one thing. Does it collect data for an API to pass to presenters? Does it present exactly one piece of data?

Keeping components this small is useful for a couple reasons.

- Easier to read
- Easier to maintain
- Future development is faster, since you may be able to reuse some of your atoms
- Follows single-responsibility principle

### The alternative is worse

Making granular components may seem like a pain at first, but believe me, the alternative is worse.

I worked in an application where large chunks of the code were contained in just a handful of AngularJS components. These components were massive - each one was at least 5,000 lines long, not counting the templates.

_These files were impossible to edit_. Our scrum team tripled our time estimates when we had to touch these files. It was impossible to navigate them, impossible to reuse code, just impossible to ship features.

Small components don't let that happen. They do exactly one thing and are so easy to understand and modify they don't slow you down one bit.

<script lang="ts">
  import { base } from '$app/paths';
</script>
