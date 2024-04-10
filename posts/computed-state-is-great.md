---
layout: post
title: Computed state is great
description: Make your programs more reliable and easier to maintain with less state.
date: 2024-04-09
keywords: frontend, angular, svelte
---

<script>
  import {base} from '$app/paths';
</script>

Computed state is underrated in frontend development. It makes your code simpler, less buggy, and easier to maintain. All frontend developers should compute as much state as possible.

### Derived state, defined

To quote a [previous post]({base}/blog/state-management-can-be-good):

> State is everything your app needs to keep track of for the current user.

> State comes in two flavors: true, or derived. Derived state is something your app has to keep track of for the current user, but can be calculated from some other piece of state.

### Why it's great

Tracking state is like juggling flaming torches. Every piece you can derive is one fewer torch.

Imagine you were writing a Svelte component for a signup form, where users can input a username of at least eight characters.

```svelte
<!--bad-username-input.svelte -->
<script>
  let username = '';
  let usernameValid = false;

  function updateUsername(event) {
    username = event.target.value;
    usernameValid = username.length > 8;
  }
</script>

<input type="text" on:input={updateUsername} placeholder="Username" />
{#if usernameValid}
  <p>Username is valid</p>
{:else}
  <p>Username is invalid</p>
{/if}
```

This component keeps unnecessary state, `usernameValid`. The state is being updated in parallel with `username`, but it's duplicative and a possible source of bugs.

`usernameValid` should be derived from `username`, the component's true state.

```svelte
<!--good-username-input.svelte-->
<script>
  let username = '';
  let usernameValid = false;

  function updateUsername(event) {
    username = event.target.value;
  }

  $: usernameValid = username.length > 8;
</script>

<input type="text" on:input={updateUsername} placeholder="Username" />
{#if usernameValid}
  <p>Username is valid</p>
{:else}
  <p>Username is invalid</p>
{/if}
```

This is better. Now you don't need to keep `usernameValid` up-to-date. Svelte will do that with every re-render. It's more [declarative](https://programiz.pro/resources/imperative-vs-declarative-programming/#) and less imperative. It will never be out of sync with `username`. It's also easy to test, since our code is runs a pure function to derive `usernameValid`.

As frontend developers, we should always do this. For _everything_. Keep as little state as possible and derive the rest. It'll make your code so much easier to test and fix.

### But what about performance?

Optimize what matters. If you have a page with 5 instances of a component, the performance impact of deriving some state every re-render is negligible.

Now, things are different if there are 10,000 instances of a component on a page or [your audience uses low-end Android phones](https://danluu.com/slow-device/). A little optimization helps there.

But my advice is to write simple code first and optimize as needed. Pick the battles you need to win.
