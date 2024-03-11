---
layout: post
title: Dependency injection in Svelte for fun and profit
description: How to instantiate dependencies in a way that makes testing easy.
date: 2024-03-11
image: flowing-code.jpg
caption: Gemini - "Create a comic book style panel of a bunch of ones and zeroes flowing into a computer"
keywords: frontend, tutorial, svelte, testing
---

As your Svelte app grows, you will need tests. Tests help you ship new features faster. They provide some assurance your code change hasn't broken anything. 

A good practice when unit testing is to test each component independent of its dependencies. However, this can be difficult with Svelte components.

Consider this component I recently wrote for my new browser extension [Replies for Hacker News](https://www.nazariosoftware.com/2024/02/23/never-miss-a-conversation-with-replies-for-hacker-news.html) [^1]. The code pings my website to display a list of my other apps.

[^1]: The extension adds a page to [Hacker News](https://news.ycombinator.com) with unread replies to your posts. Whole thing's written in Svelte. It's really good and [you should try it](https://www.nazariosoftware.com/2024/02/23/never-miss-a-conversation-with-replies-for-hacker-news.html).

```svelte
<!-- other-apps.svelte -->
<script>
  import ExternalConnector from './external-connector';
  const gettingAppLinks = ExternalConnector.getAppLinks();
</script>

<p>If you like this, you should try my other fine browser extensions:</p>
<ul>
  {#await gettingAppLinks then appLinks}
    {#each appLinks as { name, href, description }}
      <li>
        <strong><a {href} target="_blank">{name}</a></strong> - {description}
      </li>
    {/each}
  {/await}
</ul>
```

```typescript
// external-connector.ts
type AppLink = {
  name: string;
  href: string;
  description: string;
};

class ExternalConnector {
  async getAppLinks(): Promise<AppLink[]> {
    return fetch(
      'https://www.nazariosoftware.com/assets/json/app-list.json'
    ).then(res => res.json() as Promise<AppLink[]>);
  }
}

const singleton = new ExternalConnector();
export default singleton;
```

If I try to test `<OtherApps />` as is, the component will make a real network request to my website. That's bad! My website or internet could be down. Tests should never fail because of bad internet.

We could [stub `fetch()`](https://stackoverflow.com/questions/73597037/how-to-test-mock-a-fetch-api-in-a-react-component-using-jest), but that infects the `<OtherApps />` test with knowledge of `ExternalConnector`'s internals. The best thing to stub is `ExternalConnector`. If we make that class return fake data, then testing is easy.

There are ways to mock imports with Jest, but those are difficult and fiddly. We have a better option - dependency injection.

### Dependency injection, briefly explained

James Shore, author of [The Art of Agile Development](https://www.jamesshore.com/v2/books/aoad2), wrote the funniest explanation of [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection):

> "Dependency Injection" is a 25-dollar term for a 5-cent concept... [it] means giving an object its instance variables. Really. That’s it.

DI is a common programming pattern for providing instance variables to an object. Instead of hardcoding `ExternalConnector` into our component, we'll ask the DI system to give us a class capable of getting the app links.

### Svelte DI

For Svelte, we're going to use a specific flavor of dependency injection - the Composition Root pattern. I learned this from reading [Simon B. Støvring's writeup](https://simonbs.dev/posts/introducing-the-composition-root-pattern-in-a-swift-codebase/) of how to do it in Swift, which is based off [the same pattern in .NET](https://www.amazon.com/gp/product/1935182501).

We are going to create one class that provides all our app's dependencies. 

```typescript
// types.ts
export type AppLink = {
  name: string;
  href: string;
  description: string;
};

export interface ExternalConnectorClass {
  getAppLinks: () => Promise<AppLink>
}
```

```typescript
// external-connector.ts
import type { ExternalConnectorClass } from './types';

export class ExternalConnector implements ExternalConnectorClass {
  async getAppLinks() {
  return fetch(
      'https://www.nazariosoftware.com/assets/json/app-list.json'
    ).then(res => res.json());
  }
}
```

```typescript
// composition-root.ts
import type { ExternalConnectorClass } from './types';
import { ExternalConnector } from './external-connector';

class CompositionRoot {
  get ExternalConnector(): ExternalConnector {
    return this.externalConnector;
  }

  private externalConnector: ExternalConnectorClass;

  // Should be called in the app root as close to app initialization as possible
  initialize(classes: {externalConnectorClass: ExternalConnectorClass}) {
    this.externalConnector = new classes.externalConnectorClass();
  }
}

const singleton = new CompositionRoot();
export default singleton;
```

Now, in the component, we can use the composition root:

```svelte
<!-- other-apps.svelte -->
<script>
  import CompositionRoot from './composition-root';
  const ExternalConnector = CompositionRoot.ExternalConnector;
  const gettingAppLinks = ExternalConnector.getAppLinks();
</script>

<p>If you like this, you should try my other fine browser extensions:</p>
<ul>
  {#await gettingAppLinks then appLinks}
    {#each appLinks as { name, href, description }}
      <li>
        <strong><a {href} target="_blank">{name}</a></strong> - {description}
      </li>
    {/each}
  {/await}
</ul>
```

This approach, while requiring extra boilerplate, provides a few advantages. 

First and most importantly, it lets us stub `ExternalConnector` when testing `<OtherApps />`.

```typescript
// other-apps.test.ts
// ...
class MockExternalConnector implements ExternalConnectorClass {
  async getAppLinks() {
    return Promise.resolve([{name: 'test', href: '#', description: 'test link'}])
  }
}
beforeEach(() => {
  CompositionRoot.initialize({externalConnectorClass: MockExternalConnector})
})
// ...
```

`mockExternalConnector` makes no network requests. It always returns the same set of data, which we can test for [in the component template](https://kylenazario.com/blog/unit-test-your-templates).

Second, a Composition Root lets you do all sorts of exciting tricks. For example, notice how we use the [singleton pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to share one instance of `ExternalConnector` across the entire app:

```typescript
// composition-root.ts

class CompositionRoot {
  get ExternalConnector(): ExternalConnector {
    return this.externalConnector;
  }
// ...
```

Great for some light state management or memory savings!

This is where dependency injection shines. You can share one instance of a class across the whole app. You can even use the [factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) so each component that tries to access `ExternalConnector` gets its own unique instance of the class.

```typescript
// composition-root.ts
class CompositionRoot {
  get ExternalConnector(): ExternalConnector {
    return new this.externalConnectorClass();
  }
// ...
```

### Conclusion

This extra layer of indirection is, to be clear, not needed on most projects. If you're not super worried about testing, or you have a small app, you don't need a DI system. 

However, if you are worried about stubbing dependencies for tests, dependency injection is how you do it. 