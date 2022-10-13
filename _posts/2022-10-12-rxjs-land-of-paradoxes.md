---
layout: post
title: 3 RxJS Paradoxes
image: rxjs-logo.png
caption: Via rxjs.dev
---

RxJS is the most important thing about Angular that people misunderstand. RxJS is *everywhere* in Angular, and I still see developers struggle with it.

Which is understandable. RxJS is a land of paradoxes. I love it, because I [love reactive programming]({% post_url 2020-05-16-angular-reactive-forms-rental-rates-servicecore %}), but RxJS's implementation has some... oddities. 

### Quick, what's an Observable?

An [Observable](https://rxjs.dev/guide/observable) is a stream of values delivered over time. It's similar to a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). A Promise represents an asynchronous operation that completes or fails *once*, for all subscribers.

RxJS is mind-bending because, depending on the Observable, it may behave like that or completely differently. 

### Paradox 1: Observables are asynchronous, unless they are synchronous

Most Observables people deal with, especially in Angular, are asynchronous. 

```typescript
this.apiService.getSomeApiDataById(123)
  .subscribe(data => console.log(data));
```

This is probably why many believe *all* Observables are asynchronous. They are not.

Consider the Observable `sequence$` in the following code:

```typescript
import { from } from 'rxjs';

const sequence$ = from([1, 2, 3]);
console.log('before')
sequence$.subscribe(val => console.log(val));
console.log('after')
```

If you run this code, you will see:

```
before
1
2
3
after
```

`sequence$` will emit its values *synchronously*, block the main thread and complete before we get to the last line and log `after`. 

Given that most Observables are async, this is... not a huge deal? It can be an issue when mocking Observables in unit tests. People substitute a network request with `of(someTestData)` and end up testing an imaginary version of their component where API calls run synchronously. 

### Paradox 2: Observables do not run until subscribed to, unless they do

A fun thing about Observables is they work completely differently if they are [hot or cold](https://benlesh.medium.com/hot-vs-cold-observables-f8094ed53339).

Let's go back to our friend from the previous example, `sequence$`. This time, he'll log when emitting.

```typescript
import { from } from 'rxjs';

const sequence$ = from([1, 2, 3]).pipe(
  tap(val => console.log('emitting', val))
);
console.log('before')
sequence$.subscribe(val => console.log(val));
console.log('after')
```

Run that and see:

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

An Observable is just a stream of events. However, sometimes a stream of events is occurring regardless of whether we are listening to it. That's a **hot** Observable. 

```typescript
import { fromEvent } from 'rxjs';

const inputElement = document.getElementById('inputElement') as HtmlInputElement;
const userInput$ = fromEvent(inputElement, 'change');
userInput$.subscribe(val => console.log(val));
```

In this case, we can subscribe or not subscribe to `userInput$`. Subscribing will not cause more or fewer values to be emitted. `userInput$` is a stream of values representing whatever the user writes in a text field. The user could be typing regardless of whether we've subscribed to their inputs. 

### Paradox 3: Observables complete automatically, unless they don't

When an Observable is running, it can do one of three things:

1. Emit a value
2. Error, and never emit more values or complete
3. Complete, and never emit more values or error

It's important to think about completing Observables, because you don't want subscriptions to them hanging around. They can hog memory or cause unwanted behavior. 

However, many developers don't realize some Observables complete themselves. Consider `sequence$`:

```typescript
import { from } from 'rxjs';

const sequence$ = from([1, 2, 3]);
sequence$.subscribe(val => console.log(val));
```

`sequence$` is the Observable representation of the array `[1, 2, 3]`. It converts that array into a stream and emits its values. Once it's emitted every value in the array, it completes itself. Which makes sense! It's emitted all the values.

That means for a lot of Observables, you don't actually have to worry about cleaning up their subscriptions. You can avoid a common mistake:

```typescript
this.apiService.doSomeNetworkRequest()
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

const inputElement = document.getElementById('inputElement') as HtmlInputElement;
const userInput$ = fromEvent(inputElement, 'change');
userInput$.subscribe(val => console.log(val));
```

`userInput$` will never complete by itself. Which makes sense. It represents the user's text input. We don't know when the user is done typing. That might be a while until they hit submit or just close the browser. 

When working with Observables, ask *what thing an Observable models*. If it makes sense that thing would complete automatically, its representing Observable probably does.

### Conclusion

If all this sounds confusing... it is. Reactive programming can be hard to learn. It lets you write amazing, powerful code, though. Stick with it!