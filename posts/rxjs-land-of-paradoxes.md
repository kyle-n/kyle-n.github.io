---
layout: post
title: Avoiding common pitfalls in RxJS
date: 2022-10-12
keywords: javascript, typescript, rxjs, tutorial
image: rxjs-logo.png
caption: Via rxjs.dev
description: Everything new developers should know.
---

As an [Angular consultant](https://www.bitovi.com/frontend-javascript-consulting/angular-consulting), I see people struggle with RxJS a lot. Which is understandable. Observables are a powerful tool for working with data streams, but they have quirks that can trip up developers new to the library.

In this blog post, we'll explore how to avoid three common pitfalls when using RxJS in your own projects.

### Quick, what's an Observable?

An [Observable](https://rxjs.dev/guide/observable) is a stream of values delivered over time. It's similar to a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). A Promise represents an asynchronous operation that completes or fails _once_, for all subscribers.

RxJS is mind-bending because, depending on the Observable, it may be synchronous or asynchronous, deliver one value or multiple, and share that value with one or multiple subscribers.

### Paradox 1: Observables are asynchronous, unless they are synchronous

Most Observables people deal with, especially in Angular, are asynchronous.

```typescript
this.apiService.getSomeApiDataById(123).subscribe(data => console.log(data));
```

This is probably why many believe _all_ Observables are asynchronous. However, consider the Observable `sequence$` in the following code:

```typescript
import { from } from 'rxjs';

const sequence$ = from([1, 2, 3]);
console.log('before');
sequence$.subscribe(val => console.log(val));
console.log('after');
```

If you run this code, you will see:

```
before
1
2
3
after
```

`sequence$` will emit its values _synchronously_ and complete before we get to the last line and log `after`.

It helps to know Observables can be synchronous when mocking them in unit tests. People substitute a network request with `of(someTestData)` and end up testing an imaginary version of their component where API calls run synchronously.

### Paradox 2: Observables do not run until subscribed to, unless they do

A fun thing about Observables is they work completely differently if they are [hot or cold](https://benlesh.medium.com/hot-vs-cold-observables-f8094ed53339).

Let's go back to our friend from the previous example, `sequence$`. This time, he'll log when emitting.

```typescript
import { from } from 'rxjs';

const sequence$ = from([1, 2, 3]).pipe(
  tap(val => console.log('emitting', val))
);
console.log('before');
sequence$.subscribe(val => console.log(val));
console.log('after');
```

Run that and you'll see:

```
before
emitting 1
1
emitting 2
2
emitting 3
3
done emitting
after
```

`sequence$` is a **cold** Observable. It won't run until we subscribe to it. That's why `before` is logged before `emitting 1`.

A **hot** Observable runs regardless of whether anything in your code is subscribed to it and listening for events.

```typescript
import { fromEvent } from 'rxjs';

const inputElement = document.getElementById(
  'inputElement'
) as HtmlInputElement;
const userInput$ = fromEvent(inputElement, 'change');
userInput$.subscribe(val => console.log(val));
```

In this case, we can subscribe or not subscribe to `userInput$`. Subscribing will not cause more or fewer values to be emitted. `userInput$` is a stream of values representing whatever the user writes in a text field. The user could be typing regardless of whether we've subscribed to their inputs.

### Paradox 3: Observables complete automatically, unless they don't

When an Observable is running, it can do one of three things:

1. Emit a value
2. Error, and never emit more values
3. Complete, and never emit more values

If it errors, it cannot complete, and vice versa.

It's important to think about completing Observables, because you don't want unneeded subscriptions hogging memory or causing unwanted behavior.

However, many developers don't realize some Observables complete themselves. Consider `sequence$`:

```typescript
import { from } from 'rxjs';

const sequence$ = from([1, 2, 3]);
sequence$.subscribe(val => console.log(val));
```

`sequence$` is the Observable representation of the array `[1, 2, 3]`. It converts that array into a stream and emits its values. Once it's emitted every value in the array, it completes itself. Which makes sense! It's emitted all the values.

That means for a lot of Observables, you don't actually have to worry about cleaning up their subscriptions. You can avoid a common mistake:

```typescript
this.apiService
  .doSomeNetworkRequest()
  .pipe(take(1))
  .subscribe(val => console.log(val));
```

`doSomeNetworkRequest()` returns an Observable that completes itself. You don't need a `take(1)`. Test it yourself by giving the Observable a callback that runs on completion:

```typescript
this.apiService.doSomeNetworkRequest()
  .subscribe(
    val => console.log(val),
    error => console.log(error),
    () => console.log('observable completed');
  );
```

Run a real version of this pseudocode and you'll see the response logged, then `observable completed`.

Again, this tracks when you think about what the Observable is modeling. It represents an HTTP request. That request will either complete and return a value, hang, or fail with an error. If the request succeeds, the Observable will emit one value, the response, and complete. It's not a web socket. There's no more data coming. Completing itself makes sense.

Now look at our hot Observable again.

```typescript
import { fromEvent } from 'rxjs';

const inputElement = document.getElementById(
  'inputElement'
) as HtmlInputElement;
const userInput$ = fromEvent(inputElement, 'change');
userInput$.subscribe(val => console.log(val));
```

`userInput$` will never complete by itself. Which makes sense. It represents the user's text input. We don't know when the user is done typing. That might be a while until they hit submit or just close the browser.

When working with Observables, ask _what thing an Observable models_. If it makes sense that thing would complete automatically, its representing Observable probably does.

### Conclusion

Observables' quirks may be challenging to learn, but the benefits make the effort worthwhile. Reactive programming makes complex async logic easier to read, write and debug.
