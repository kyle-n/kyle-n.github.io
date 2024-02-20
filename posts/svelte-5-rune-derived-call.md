---
layout: post
title: Svelte 5 will have derived runes with callbacks
description: Great news for fans of computed state and short syntax.
keywords: svelte, news
date: 2024-02-20
image: dog-writer.png
caption: Google ImageFX - "Impressionist painting of a dog wearing an orange cape writing in the library. The dog looks happy."
relatedLinks:
  Pull request merging first version of derived.by: https://github.com/sveltejs/svelte/pull/10240
---

<script>
  import {base} from '$app/paths';
</script>

I previously wrote [runes in Svelte 5 needed improvement]({base}/blog/svelte-5-runes-impressions). One limitation I mentioned was that the `$derived()` rune accepted only [expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators) that evaluate to a value.

> This is fine for short pieces of logic, but painful for calculating derived state with multiple steps. There's no way to split it up without using more than one `$derived` variable.

Well, good news! The Svelte team agrees and has [added `$derived.by()`](https://github.com/sveltejs/svelte/pull/10240). It accepts a callback function and runs it whenever a rune inside changes.

```typescript
let someBitOfComplicatedDerivedState = $derived.by(() => {
  // ... imagine a 20-line anonymous callback here
});
```

I'm happy the Svelte team made this change. I think it'll make runes much easier to use for two reasons.

1. It lets users avoid writing [immediately invoked function expressions](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), which are ugly and verbose.

```typescript
let someBitOfComplicatedDerivedState = $derived(
  (() => {
    // ... imagine a 20-line anonymous callback here
  })()
);
```

2. It lets users avoid writing a separate named function to handle the `$derived()` logic, which is also unnecessarily verbose.

```typescript
function calculateDerivedState() {
  // ... imagine a 20-line anonymous callback here
}

let someBitOfComplicatedDerivedState = $derived(calculateDerivedState());
```

`$derived.by()` will help us write less code, which is whole reason I like Svelte. I appreciate the team listening to the community and adding this feature.
