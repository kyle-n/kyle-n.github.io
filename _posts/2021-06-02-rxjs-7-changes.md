---
layout: post
title: What’s New in RxJS 7&#58; Small Bundles and Big Changes to share
image: rxjs-logo.png
---

RxJS 7 has shipped! For us Angular developers, it unfortunately did not ship in time for Angular 12.

I've summarized key takeaways from Ben Lesh’s talk from RxJS Live Asia and his slides below. Lesh is a member of the RxJS core team and formerly worked at Google on the Angular team.

## Big Feature: Smaller Bundle Sizes

Lesh said while RxJS 7 was "a bit faster," the big improvement for the new version is its bundle size. RxJS 7 is 53% the size of RxJS 6. If your app used every operator in version 6, that would require 52 KB, but the same thing in RxJS 7 requires just 19 KB.

"This was done via a refactor, a hundred-point improvement of going around and individually moving around code, keeping the same tests, keeping the same code, and moving things around slowly but surely until we got to a place where we could see daylight and we were able to refactor larger portions of the code," Lesh said in his talk.

See this chart of operator sizes in RxJS 6:

![A chart showing the size of different RxJS 6 operators](/static/img/rxjs6-size.png)

And this chart of the same operator sizes in RxJS 7:

![A chart showing the size of different RxJS 7 operators](/static/img/rxjs7-size.png)

## Consolidating Sharing operators

Lesh's talk includes a long discussion about how many ways RxJS lets you share a stream (`multicast`, `shareReplay`, `refCount`, etc).

RxJS 7 deprecates `multicast`, `publish`, `publishReplay`, `publishLast`, and `refCount`. `shareReplay` was too popular to deprecate in 7, but Lesh said it's next because it is "full of footguns." Long term, the only sharing operators will be `share`, `connect` and `connectable`. He recommends moving to `share` now.

`share` is picking up some new features as the single solution operator. It takes an optional config object as a parameter, where you can define custom behavior for the stream.

```typescript
share({
  connector: () => new ReplaySubject(),
  resetOnRefCountZero: true,
  resetOnComplete: true,
  resetOnError: true
})
```

## Better TypeScript Typings

RxJS 7 [requires TypeScript 4.2](https://github.com/ReactiveX/rxjs/blob/6bd1c5f3cf0e387973b44698c48bc933e8c528aa/package.json#L9), Lesh said, because it contains features that enable more accurate, stricter types. One example he gave in his slides involved `Subject`:

```typescript
// allowed in RxJS 6, errors in 7 because next() must be called with a number
const subject = new Subject<number>()
subject.next()
```

For teams that are unable to upgrade to TypeScript 4.2, Lesh recommended staying on RxJS 6, which the RxJS team will continue to support.

### `toPromise()` Deprecated

The problem with `toPromise()`, Lesh explained, was that it didn't make sense with Observables. Should a promise created by `toPromise()` resolve with the first or last value emitted from the source Observable?

So, `toPromise()` is deprecated in favor of `lastValueFrom()` and `firstValueFrom()`. These new functions still convert Observables to Promises, but in a way that clarifies that value the Promise will resolve with.

```typescript
const source = from([1, 2])

const firstVal = await firstValueFrom(source)

console.log(firstVal) // 1

const lastVal = await lastValueFrom(source)
console.log(lastVal) // 2
```

If an Observable completes without emitting a value, the Promise created by `lastValueFrom` or `firstValueFromrejects`. If that is not desired behavior, you can configure the new Promise to resolve with a defaultValue.

```typescript
const emptyVal = await firstValueFrom(source, { defaultValue: 'empty' })
console.log(emptyVal) // 'empty'
```

## AsyncIterable support

Anywhere you can pass an Observable, RxJS 7 also lets you pass an AsyncIterable.

```typescript
async function* ticket(delay: number) {
  let n = 0;
  while (true) {
    await sleep(delay);
    yield n;
  }
}
```

## Other Updates

- `finalize()` operators now run in the order in which they are written in `pipe()`. In contrast, RxJS 6 ran them in reverse.
- `subscription.add(someSubscription)` now returns void so people will stop writing `add()` chains, which Lesh says never worked.

```typescript
// add() returns void, cannot be chained

subscription
  .add(subOne)
  .add(subTwo) // errors
```

- `animationFrames()` creates Observables to do animation logic reactively
- `switchScan()` operator, aka `switchMap` with an accumulator
- `throwError()` requires a callback, not an error, as the error captures the current stack at the moment of its creation

### Your `with` Is My Command

- `combineLatest` operator renamed to `combineLatestWith`
- `merge` operator renamed to `mergeWith`
- `zip` operator renamed to `zipWith`
- `race` operator renamed to `raceWith`
- `concat` operator renamed to `concatWith`

## Bitovi Recommendations for Migrating to RxJS 7

If your project can be upgraded to RxJS 7, we would recommend doing so. The speed and bundle size improvements offer tangible, immediate benefits to end users.

Important points to remember:

- Replace your `toPromise` calls with `firstValueFrom` and `lastValueFrom`
- Replace your `shareReplay` calls with `share`
- Stop using `.add` chains to manage your subscriptions. Lesh [recommends `takeUntil`](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87)

If you need help upgrading to RxJS 7, [fill out our form](https://www.bitovi.com/contact). Bitovi has a team of Angular and RxJS experts who can help your team.