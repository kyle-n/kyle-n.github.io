---
layout: post
title: Svelte 5 is good, but runes need improvement
description: Begging for function callbacks.
date: 2023-12-14
keywords: opinion, svelte
image: nordic-runes.jpg
caption: Via Yuliya Pauliukevich on Vecteezy
---

I'm making an [Oscars fan website](https://github.com/nazariosoftwarellc/oscars.watch) using the [Svelte 5 beta](https://svelte-5-preview.vercel.app/docs/introduction). I figured it'd be the best way to try [runes][runeintro].

[runeintro]: https://svelte.dev/blog/runes

I was skeptical about runes, but on balance, they're an improvement.

### The good

#### Explicitness

Runes give variables clear roles. Updating a `$state()` variable updates the component. `$derived()` variables also update the component, but obviously you don't manage those.

#### Simplicity

Runes simplify Svelte syntax.

- `$: doubled = someVal * 2` ➡️ `$derived(someVal * 2)`
- `export let someInput;` ➡️ `let { someInput } = $props();`
- `let someComponentState = 0;` ➡️ `let someComponentState = $state(0)`

Experienced developers are used to `export let` and `$`, but spare a thought for future Svelte newbies. `$props` is more obvious.

#### Unified change detection

Any complex frontend has a _structure_ and a _superstructure_. The structure is UI components, what the user sees.

The superstructure is everything else. It's:

- The class that sends API requests
- The code sharing state among multiple components
- The class that caches app data to `localStorage`

...and so on.

As an app grows more complex, it accumulates superstructure. However, in Svelte 4, that superstructure has a different change detection system than the components upon which it rests. `let` variables are normal JavaScript, and updating them does not update your components. [Stores](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores) exist to solve this problem.

Runes bypass the problem by unifying change detection. There're only `$state` variables in the structure and superstructure.

```svelte
<script>
  // via https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
  import { alert } from '../stores.js';
  import { onDestroy } from 'svelte';

  // alertContent is redundant! Runes let me use alert directly
  let alertContent = '';
  const unsubscribe = alert.subscribe(value => (alertContent = value));

  onDestroy(unsubscribe);
</script>

{#if alertContent}
  <div on:click={() => (alertContent = '')}>
    <p>{alertContent}</p>
  </div>
{/if}
```

### The bad

#### No `$derived` callbacks

To create derived state in Svelte 5:

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

The bit inside `$derived()`, `count * 2`, is a JavaScript [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators). Expressions evaluate to a value.

This is fine for short pieces of logic, but painful for calculating derived state with multiple steps. There's no way to split it up without using more than one `$derived` variable. I would love to be wrong about this. Please [let me know]({base}/contact) if I am.

<script>
  import {base} from '$app/paths';
</script>

One workaround to use an [immediately invoked function expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (IIFE). Here's one I wrote for my Oscars fan site:

```svelte
let knownForCredits = $derived(
  (() => {
    let knownForJobTitle = 'Actor';
    switch (data.details.known_for_department) {
      case 'Acting':
        knownForJobTitle = 'Actor';
        break;
      case 'Directing':
        knownForJobTitle = 'Director';
        break;
      case 'Production':
        knownForJobTitle = 'Producer';
        break;
      case 'Writing':
        knownForJobTitle = 'Writer';
        break;
    }
    let jobs = data.credits.crew.filter(
      credit => credit.job === knownForJobTitle
    );
    if (knownForJobTitle === 'Actor') {
      jobs = jobs.concat(data.credits.cast);
    }
    return jobs
      .filter(credit => new Date(credit.release_date) < now)
      .sort((a, b) => {
        return b.vote_count - a.vote_count;
      })
      .filter(credit => credit.vote_average > 7)
      .slice(0, 5);
  })()
);
```

It would be nice to be able to provide `$derived()` an anonymous callback function. Then I could split the calculations multiple lines without `(() => { ... })()`.

I got this idea from Angular. Their version of `$derived()`, `computed()`, [accepts a callback](https://angular.io/guide/signals#computed-signals):

```typescript
// via angular.io
const showCount = signal(false);
const count = signal(0);
const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```

This is more flexible and less verbose than IIFEs. I always misplace a parenthesis writing those.

**Edit January 2024**: Please visit the [GitHub issue](https://github.com/sveltejs/svelte/issues/9968) discussing this issue if you wish to weigh in.

#### TypeScript syntax for `$props`

I wish the TypeScript syntax for passing props into a component were shorter.

```typescript
let { details, credits } = $props<{
  details: TMDBPersonDetails;
  credits: TMDBPersonCreditsResponse;
}>();
```

Writing `details` and `credits` twice feels duplicative. A huge part of Svelte's appeal to me is writing less code, so I hate to see stuff like this sneak in.

### Conclusion

Overall, I think runes are a good idea. They are simpler, more explicit, and reduce unnatural framework syntax. I just wish they didn't make me write IIFEs.
