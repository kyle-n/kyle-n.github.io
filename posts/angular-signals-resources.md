---
layout: post
title: resource is Angular Signals' missing piece
description: The RxJS replacement is here.
date: 2024-11-02
keywords: angular, rxjs, news
---

I recently did a presentation at work about [Angular Signals](https://angular.dev/guide/signals). One section comparing RxJS and Signals noted that RxJS remained better at asynchronous work. Consider, for example, an input that takes user input and maps it into API search results.

```typescript
const searchResults$ = queryValue.pipe(
  switchMap(query => this.apiService.search(query))
);
```

During the presentation, I said the best way to create an asynchronous computed Signal was to [use RxJS](http://localhost:5173/blog/angular-async-computed-signals).

> `computed()` will not accept an `async` callback. It also does not provide a `done()` function that can be called in a callback. You must synchronously return a value from your `computed()` callback.
>
> After some experimentation, I figured out how to do it. You actually have to go back to RxJS and wrap it with [`toSignal()`](https://angular.dev/guide/signals/rxjs-interop#tosignal).

Then a member of the audience raised his hand and asked if I knew about the `resource` api. It was a new feature coming to Angular that had been announced just a day or two before my presentation.

You can read the [pull request](https://github.com/angular/angular/pull/58255) yourself. It creates a new function, `resource()`, which is essentially `asyncComputed()`.

To return to our previous example, here's how you would use Signals to map user input into a list of search results with `resource()`:

```typescript
export class SearchComponent {
  protected query = model('');
  protected searchResults: Signal<string[]>;

  constructor(apiService: ApiService) {
    this.searchResults = resource({
      request: this.query,
      loader: async () => {
        const query = this.query();
        const response = await apiService.search(query);
        return response.json();
      }
    });
  }
}
```

This tells Angular, "if `this.query` ever changes, ping the API using this async method and return the results in `this.searchResults`, a Signal we can use anywhere in the class."

This API will arrive with Angular 19. There's [a bunch of other stuff](https://www.telerik.com/blogs/getting-started-resource-api-angular) you can do with it too. At the moment, the only downside I can see is that it can't easily do some things RxJS makes easy, like [debouncing](https://rxjs.dev/api/operators/debounceTime).

But you know what? It's a really promising start. I'm just excited we got an official way to make async computed Signals.
