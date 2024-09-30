---
layout: post
title: How to create an async computed Signal in Angular
description: Signals can be asynchronous, actually.
date: 2024-09-28
keywords: angular, rxjs, tutorial
---

<script>
  import {base} from '$app/paths';
</script>

Angular has spent the last few major releases refining [Signals](https://angular.dev/guide/signal), their new solution for [fine-grained reactivity](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity) without using [RxJS](https://rxjs.dev/) ([RxJS is too complicated]({base}/blog/svelte-from-angular-perspective-for-angular#no-rxjs)).

One of the coolest features of Signals is [`computed()`](https://angular.dev/guide/signals#computed-signals), which lets you derive new Signals from existing ones. To use the simplest example:

```typescript
const name: WritableSignal<string> = signal('Reader');
const greeting: Signal<string> = computed(() => `Hello, ${name()}!`);
```

Computed Signals are an awesome tool in any developer's toolbox because they let you derive state, which [prevents bugs]({base}/blog/computed-state-is-great). However, one part of the `computed()` API confused me initially: How do you create a computed Signal that is **asynchronous**?

`computed()` will not accept an `async` callback. It also does not provide a `done()` function that can be called in a callback. You must synchronously return a value from your `computed()` callback.

After some experimentation, I figured out how to do it. You actually have to go back to RxJS and wrap it with [`toSignal()`](https://angular.dev/guide/signals/rxjs-interop#tosignal).

I've created an example project ([GitHub](https://github.com/kyle-n/dad-joker), [StackBlitz](https://stackblitz.com/github/kyle-n/dad-joker?file=README.md)). It allows the user to search the [Dad Joke API](https://icanhazdadjoke.com/api) for "jokes." I've made a component with a debounced text field that sends requests to the API and displays the results. This kind of asynchronous work would be complicated to do with Signals, but RxJS could it. The [`debounceTime()`](https://rxjs.dev/api/operators/debounceTime) and [`switchMap()`](https://rxjs.dev/api/index/function/switchMapTo) operators would be perfect for debouncing input and asynchronously loading search results.

So, let's just use RxJS. First, we'll change our service to return a Signal instead of an Observable.

```typescript
// dad-joke.service.ts

import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, Signal } from '@angular/core';
import { Joke, JokeSearchResponse } from './types';
import { debounceTime, filter, map, Observable, switchMap } from 'rxjs';
import {
  toObservable,
  toSignal,
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class DadJokeService {
  constructor(private readonly httpClient: HttpClient) {}

  search(query: string) {
    const url = new URL('https://icanhazdadjoke.com/search');
    url.searchParams.append('term', query);
    return this.httpClient
      .get<JokeSearchResponse>(url.toString(), {
        headers: {
          Accept: 'application/json'
        }
      })
      .pipe(map(response => response.results));
  }

  debouncedSearchResults(
    query: Signal<string>,
    destroyRef: DestroyRef
  ): Signal<Joke[] | undefined> {
    const queryValue: Observable<string> = toObservable(query);
    return toSignal(
      queryValue.pipe(
        takeUntilDestroyed(destroyRef),
        filter(query => query.length > 2),
        debounceTime(2 * 1000),
        switchMap(query => this.search(query))
      ),
      { initialValue: undefined }
    );
  }
}
```

`debouncedSearchResults()` does a couple things.

1. It accepts a `destroyRef` to know when to shut down this subscription. We'll pass it the component using `debouncedSearchResults()` so when that component is destroyed, RxJS unsubscribes from `queryValue`.
2. It accepts a Signal of the user's query as an input and turns that Signal into an Observable. This lets us use RxJS operators on the query.
3. It filters short queries (2 or fewer characters).
4. It debounces the user's input by 2 seconds.
5. It calls the API and returns a list of search results.
6. It turns all that Observable work into a Signal whose value is `Joke[]` or `undefined`.

We'll use `debouncedSearchResults()` in our search component, which looks like this:

```typescript
// joke-search.component.ts

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  model,
  Signal
} from '@angular/core';
import { DadJokeService } from '../dad-joke.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-joke-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './joke-search.component.html',
  styleUrl: './joke-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokeSearchComponent {
  protected query = model('');
  protected jokes: Signal<string[]>;

  constructor(dadJokeService: DadJokeService, destroyRef: DestroyRef) {
    const debouncedSearchResults: Signal<Joke[] | undefined> =
      dadJokeService.debouncedSearchResults(this.query, destroyRef);
    this.jokes = computed(() => {
      const results = debouncedSearchResults() ?? [];
      return results.map(result => result.joke);
    });
  }
}
```

`jokes` is our asynchronous computed Signal. It turns the Signal of search results, `debouncedSearchResults`, into an array of strings to display in the UI.

```html
<!-- joke-search.component.html -->

<input type="text" [(ngModel)]="query" />

@for (joke of jokes(); track joke) {
<p>{{ joke }}</p>
}
```

On startup, Angular will evaluate `debouncedSearchResults()` and get the `initialValue` we set in the service of `undefined`. When the user types something, then the `queryValue` Observable, currently masquerading as the Signal `debouncedSearchResults`, will fetch a list of search results. It will update its value, causing `computed()` to run again, and update the UI.

With a little `toObservable()`/`toSignal()` magic, you can have asynchronous requests in a `computed()` callback. Just like that.
