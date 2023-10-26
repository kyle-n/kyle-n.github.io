---
layout: post
title: Testing makes it hard to recommend SvelteKit
date: 2023-10-26
keywords: svelte, testing, opinion
description: Why a good framework needs to do more before it's ready for everyone.
image: pixel-computer-man.png
caption: DALL-E 2 - "a computer being tested by a man wearing a lab coat. pixel art"
discussions:
  Mastodon: https://hachyderm.io/@kn/111301829286345500
---

I recently rebuilt this blog in [SvelteKit](https://kit.svelte.dev) and [had a blast doing it]({base}/blog/full-content-rss-feed-with-sveltekit). As someone who's spent the past four years working on Angular apps, I enjoyed a lot about Svelte and SvelteKit. It gets the big things right, with one major exception.

That’s right, folks. We need to talk about testing.

### My standard of comparison

I come to Svelte from Angular, which, despite its many faults, adroitly handles tests. If I use the Angular command line to generate a new component `email-input`. Angular will automatically add `email-input.component.spec.ts` alongside my new component files, with a lot of the boilerplate filled out for me.

```javascript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailInputComponent } from './email-input.component';

describe('EmailInputComponent', () => {
  let component: EmailInputComponent;
  let fixture: ComponentFixture<EmailInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailInputComponent],
    });
    fixture = TestBed.createComponent(EmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

This makes it easy to do the two most common types of frontend tests.

First are **unit tests**. Unit tests are useful for testing small, discrete pieces of functionality. For example, if a class exposes a public method, we should unit test it to make sure it returns the correct value in all situations.

Second, **component tests**. Component tests render your UI code into a virtual DOM. They click on and type into your UI code to make sure it accepts inputs and returns values correctly. Many people think these tests are bad practice, but [they are not](https://www.kylenazario.com/blog/unit-test-your-templates). The public, user-facing "API" for a component is its template, so you should test it through the template.

In Angular, component testing is built into the framework through a class called `TestBed`. `TestBed` renders your component into a tiny DOM. There, you can pass new inputs to it and watch the template update. You can also simulate clicks, key presses or other user inputs to make sure it responds correctly to user behavior. It also lets you quickly and easily stub other classes a component relies on through [dependency injection](https://angular.io/guide/dependency-injection). It is built into Angular and updated alongside it.

When I went looking for how to write unit and component tests in SvelteKit, I found [Svelte Testing Library](https://github.com/testing-library/svelte-testing-library), which has several things that are… concerning.

### Documentation

My first worry is documentation. SvelteKit is still relatively new, and its test documentation is sparse.

The [Svelte Testing Library docs](https://testing-library.com/docs/svelte-testing-library/intro) explain how to set it up, some of the API functions, and call it a day. This wouldn’t be as big a deal if the official Svelte documentation had more, but that site relegates testing to [an FAQ](https://svelte.dev/docs/faq#how-do-i-test-svelte-apps) halfway down the page.

The best documentation I found was this [blog post by Rob O'Leary](https://blog.logrocket.com/testing-svelte-app-vitest/), who explains how to set up a test pipeline in SvelteKit. Rob's guide is great and [got me most of the way there](https://github.com/kyle-n/kyle-n.github.io/commit/7e21802c5b68c8497d8d6c0aa69aba44ef5b46a5).

### Discord

My second concern is on the Svelte Testing Library’s [GitHub page](https://github.com/testing-library/svelte-testing-library/):

> For questions related to using the library, please visit a support community instead of filing an issue on GitHub.
>
> - [Discord](https://discord.gg/testing-library)
> - [Stack Overflow](https://stackoverflow.com/questions/tagged/svelte-testing-library)

I don't love this. Discord is terrible for support. It is hard to search, [inaccessible](https://drewdevault.com/2021/12/28/Dont-use-Discord-for-FOSS.html), [not private](https://sneak.berlin/20200220/discord-is-not-an-acceptable-choice-for-free-software-projects/) and [chaotic](https://kraktoos.com/posts/dont-use-discord-as-forum/). I get that it’s easier for small teams to just hang out on an app they already use and answer questions as they come in, but it's a mistake. [^1]

[^1]: I’m aware Discord has a new, opt-in [forum-like UI](https://support.discord.com/hc/en-us/articles/4403205878423-Threads-FAQ) ([screenshot]({base}/img/discord-threads.png)). The official Svelte Discord uses this, and it looks… fine. Svelte Testing Library doesn’t use it. Regardless, content in it doesn't show up on Google. 

Discord is a step backward from using a public forum. Forum pages show up on Google. Forums also don’t require you to download a gamer chat app. That can be awkward in corporate environments! One of my clients doesn’t even allow Discord on their network.

### Speed of updates

Look, I get it. I've left issues on my open source projects unresolved too. Nobody should be chained to their desk, especially for unpaid open source work. But development speed on Svelte Testing Library is worrying.

The [releases page](https://github.com/testing-library/svelte-testing-library/releases) shows sporadic, rare updates. The last one was two weeks ago, but before that there was a three-month gap. Before that, it went eight months without publishing an update.

The Discord and GitHub issues don’t have much activity. Plenty of people with problems, and lots left unfixed. Which is not great, because even basic functionality was broken for me.

#### Cleanup is off by default

For example, did you know Svelte Testing Library has a bug where it doesn’t remove your component from the virtual DOM after each test? The docs [claim](https://testing-library.com/docs/svelte-testing-library/api#cleanup) they do, but as of October 2023, this test file fails:

```javascript
// keyword-links.test.ts
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import KeywordLinks from './keyword-links.svelte';

describe('KeywordLinks', () => {
  test('displays keywords', () => {
    render(KeywordLinks, { keywords: 'foo, bar' });

    expect(screen.getByText('#foo')).toBeInTheDocument();
    expect(screen.getByText('#bar')).toBeInTheDocument();
  });

  test('hides component entirely with no keywords', () => {
    const { container } = render(KeywordLinks, { keywords: undefined });

    expect(container.querySelector('div')?.childElementCount).toBe(0);
  });
});
```

If you log the virtual DOM in the second test, you will see two copies of `<KeywordLinks />`. You have to run `cleanup()` in an `afterEach()` yourself. There's a [GitHub issue](https://github.com/testing-library/svelte-testing-library/issues/270).

Damned if I know why it’s happening. I poked around the Svelte Testing Library source code and [it looks like the library calls ](https://github.com/testing-library/svelte-testing-library/blob/800e33e1e9b816203e1a2105e5a9c7f415f56972/src/test-setup.js#L10)`cleanup()`. They even have [tests verifying it](https://github.com/testing-library/svelte-testing-library/blob/main/src/tests/auto-cleanup.test.js). I might have just done something wrong, but the bug happens with the create-svelte-app Wordle preset app too 🤷‍♂️.

It's probably just a bug, but boy, imagine a junior on your team running into this. It would be torture trying to figure out why tests that should be valid are failing. 

#### Async updates are difficult

I ran into this when I tried to test my related posts component. The component file looks like this:

```javascript
// src/lib/components/related-posts.svelte
<script lang="ts">
  import { base } from '$app/paths';
  import { getRelatedPosts } from '$lib/post-handlers';
  import type { PostLink } from '$lib/types';

  export let parentPostKeywords: string | undefined;
  export let parentPostTitle: string;
  export let parentPostHnLink: string | undefined;

  let relatedPosts: PostLink[] = [];
  getRelatedPosts(parentPostTitle, parentPostKeywords).then(posts => {
    relatedPosts = posts;
  });
</script>

// ...a bunch of unimportant HTML markup
```

This component uses `getRelatedPosts()` to asynchronously load related posts and link to them.

Here’s how I had to test it:

```javascript
// src/lib/components/related-posts.test.ts
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { act, render, screen } from '@testing-library/svelte';
import RelatedPosts from './related-posts.svelte';
import type { PostLink } from '$lib/types';

const { mockRelatedPosts } = vi.hoisted(() => ({
  mockRelatedPosts: [
    {
      metadata: {
        layout: 'post',
        title: 'foo title',
        description: 'foo',
        date: 'foo',
        image: 'foo',
        caption: 'foo',
        keywords: 'foo'
      },
      postPath: 'foo'
    }
  ] as PostLink[]
}));

describe('RelatedPosts', () => {
  beforeEach(() => {
    vi.mock('$lib/post-handlers');
  });

  test('renders related posts', async () => {
    vi.mock('$lib/post-handlers', () => {
      return {
        getRelatedPosts: vi.fn().mockResolvedValue(mockRelatedPosts)
      };
    });
    render(RelatedPosts, {
      parentPostTitle: 'foo',
      parentPostHnLink: undefined,
      parentPostKeywords: undefined
    });
    
    // ???
    await act(async () => await new Promise(resolve => setTimeout(resolve, 1)));

    expect(screen.getByText('foo title')).toBeInTheDocument();
  });
});
```

This may just be because of my unfamiliarity with Testing Library. However, the docs make it sound like calling `act()` will `tick()` and flush pending state changes. I found simply writing `await act()` will not cause the test to wait until the component is updated with the mocked values. Instead, I have to `await` a Promise that resolved after 1ms, which is like doing multiple `await`s.

After checking the Svelte Testing Library GitHub issues, I found others [reporting the same problem](https://github.com/testing-library/svelte-testing-library/issues/249). One user said, “I have to use `await tick();` multiple times (like 10x) for some of my tests.” Apparently the better workaround is to just use `waitFor()`.

Again, maybe this is because I don't have as much experience with Testing Library. It was confusing, though, for me at at least a few other people.

### It’s a tough situation

I really don’t want to be mean to Svelte Testing Library. Anybody doing open source work is a hero who deserves our love, support, and *money*. But as a consultant and someone who constantly pitches clients on technology, I would hesitate to suggest SvelteKit, because of testing. 

Which sucks! SvelteKit is great, and more people should use it.

<script lang="ts">
  import { base } from '$app/paths';
</script>