---
layout: post
title: Improving Svelte testing, one documentation PR at a time
date: 2023-11-12
keywords: svelte
image: dramatic-book-guy.png
caption: DALL-E 2 - "a person dramatically throwing a book on top of a pile of books, as a ring of hooded figures surrounds the pile and looks on approvingly. Neon colors, realistic, digital art"
description: How I'm trying to give back to the Svelte testing scene.
---

I [recently complained]({base}/blog/testing-in-sveltekit) about Svelte testing and highlighted things I'd change.

One issue I ran into was it appeared [Svelte Testing Library](https://github.com/testing-library/svelte-testing-library/) did not remove component instances from the virtual DOM between tests.

Well, after publishing my post, I spent some time digging into the code and it turns out there is a function, [cleanup()](https://testing-library.com/docs/svelte-testing-library/api#cleanup), and [it only runs after each test with `globals: true`](https://github.com/testing-library/testing-library-docs/issues/1331#issuecomment-1784744398) in your `vite.config.ts`. Basically, Svelte Testing Library checks if there's a globally available `afterEach()` function and calls `cleanup()` if there is.

If you read the [setup docs](https://testing-library.com/docs/svelte-testing-library/setup/#vitest), the example code has `globals: true` set, but it was easy to miss. So, I submitted a [pull request](https://github.com/testing-library/testing-library-docs/pull/1330) updating the Testing Library docs to call out this necessary step. As of two weeks ago, it's been merged!

The React, Preact and Vue libraries also require a globally available `afterEach()` to run `cleanup()`, so I updated their docs as well. Hopefully this will help people avoid this bug in the future.

So yeah, apologies to the good folks working on the Svelte Testing Library. It absolutely does clear the virtual DOM between tests - you just have to use it correctly 😄.

<script>
  import {base} from '$app/paths';
</script>
