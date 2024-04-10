---
layout: post
title: A subject in a service cannot replace NgRx, actually
description: Correcting a common, annoying misconception that a service in a subject is all you need for state management
date: 2024-03-31
image: rxjs-ngrx.webp
keywords: opinion, frontend, javascript, typescript, angular
---

I've been researching state management software for a client at my day job. Browsing [several](https://www.reddit.com/r/Angular2/comments/17lff40/which_state_management_solution_to_use/) Reddit [threads](https://www.reddit.com/r/Angular2/comments/13bgl04/angular_state_management_best_practices/), there seems to be a trend of people flatly dismissing NgRx.

> [Modern frontend apps are massively over engineered. Angular has all you need out the box for 99% of cases.](https://www.reddit.com/r/Angular2/comments/13bgl04/comment/jjboizf/?utm_source=reddit&utm_medium=web2x&context=3)

> [Keep it simple. Use services with Subjects/Signals. No need for a third party solution.](https://www.reddit.com/r/Angular2/comments/17lff40/comment/k7dwcf6/?utm_source=reddit&utm_medium=web2x&context=3)

> [None. I simply lack to see the need to introduce another dependency for something that Angular can handle just fine on its own.](https://www.reddit.com/r/Angular2/comments/17lff40/comment/k7dw5ll/?utm_source=reddit&utm_medium=web2x&context=3)

> [Use angular services to manage state](https://www.reddit.com/r/Angular2/comments/17lff40/comment/k7f6ecg/?utm_source=reddit&utm_medium=web2x&context=3)

I strongly disagree with these attitudes. NgRx is a _tool_. It has _trade-offs_. It has downsides, but it also does things a Subject in a service can't.

### State, defined

Let's quickly define state in frontend applications. **State is everything your app needs to keep track of for the current user**.

Consider this screenshot of Spotify:

![A screenshot of Spotify for Mac. The left pane shows a list of downloaded albums. The middle pane shows the Trainspotting movie soundtrack. The right pane shows the album currently playing, The Fragile by Nine Inch Nails](spotify-desktop.webp)

The app is currently tracking of a couple things:

1. Which user is currently signed in (me)
2. Which list is selected in the left pane (my downloaded albums)
3. Which album I am currently viewing in the middle pane (the _Trainspotting_ soundtrack)
4. Which album is currently playing in the right pane (_The Fragile_ by Nine Inch Nails)
5. Which song is playing in the bottom "Now Playing" bar ("Even Deeper")

State comes in two flavors: true, or derived. Derived state is something your app has to keep track of for the current user, but can be calculated from some other piece of state. For example, the album cover of the current track, while state, can be derived from the song currently playing.

State management is a huge, _huge_ part of frontend development. Once your app grows above a certain size, managing state and data flow becomes half your battles.

There is a spectrum of state management solutions. For today, we will focus on just two - an Angular service with a Subject, and NgRx.

### Subject-in-a-Service (SIAS)

A common pattern in Angular is to have a service injected at the root of the application. This service keeps track of some piece of global state. If any part of the app needs to access this state, it injects the service and subscribes to a Subject provided by that service.

While I wrote this blog post to defend NgRx, I want to be clear - this is a great way to manage state. If your app is small- to medium-sized or just doesn't keep a lot of global state, you can and should use a Subject-in-a-Service (SIAS). It is a simple, effective way to maintain one piece of global state and have your app react to updates.

For example, I wrote a service for a previous employer's Ionic Angular app that tracked whether the phone was online or offline. If they were offline, we had to:

1. Disable certain buttons
2. Load data from the local SQLite database
3. Save data to the local SQLite database

The service looked like:

```typescript
@Service({
  providedIn: 'root'
})
export default OfflineService {
  readonly isOffline = new BehaviorSubject(false)

  constructor() {
    // ... a bunch of code using Ionic APIs to check if there was a network connection
    // If the user went online or offline, that change was published to isOffline
  }
}
```

Any component that needed to check whether it was offline could simply inject the `OfflineService`, e.x.:

```html
<!-- ... -->

<button
  [disabled]="offlineService.isOffline | async"
  (click)="openGoogleMaps()"
>
  Open Google Maps
</button>

<!-- ... -->
```

This setup can be good and useful, but it is not the same as NgRx.

### NgRx

NgRx is an industrial-grade state management solution. Explaining it would require far more room than would be reasonable for this blog post, so I will defer to [the official docs](https://ngrx.io/guide/store). But, briefly - NgRx separates your components and business logic. Your UI layer dispatches actions that describe what the user is doing, and NgRx updates a single global state. Then, your application updates in response to the state changing.

For example, imagine an app where the user has filled out several pages of forms and clicks save. With services, the code to send an API update, display a loader and navigate the user to a new page on success often lives in a component.

With NgRx, the UI code dispatches an action...

```typescript
// ...

  saveForm() {
    this.store.dispatch(SaveFormAction())
  }

// ...
```

...which triggers an effect...

```typescript
// ...

saveDoc = createEffect(() => {
  return this.actions$.pipe(
    ofType(SaveFormAction),
    switchMap(() => this.store$),
    switchmap(store =>
      this.formService.saveDoc(store.userInputs).pipe(
        map(savedDoc => SaveDocSuccess({ id: savedDoc.id })),
        catchError(error => of(SaveDocFail({ error })))
      )
    )
  );
});

// ...
```

...which updates the store, which updates the UI code. I have a full [example project using NgRx](https://github.com/kyle-n/catering-masters/tree/ngrx) from a previous post if you want to see more sample code.

NgRx has many benefits, but the greatest of them is that it moves business logic out of components. Your UI layer hands off messages to the store and reactively updates itself when the store changes. It doesn't know where or how those changes happen.

### A Subject-in-a-Service and NgRx are not the same

A SIAS and NgRx provide shared business logic and state across your application, above the UI layer.

To return to a previous example, the state stored in our `OfflineService` could be kept in a SIAS or NgRx. Both provide a single source of truth for use across the application.

The difference is a SIAS provides _one_ piece of truth, or a small slice of related truths. You wouldn't expect the `OfflineService` to tell you which user is logged in. NgRx, however, is the single source of truth for _all_ global state in the application. It knows whether the user is offline, which user is logged in and everything else.

NgRx also provides something vital a SIAS doesn't - **debuggable unidirectional data flow**. A user does something, which fires an action, which updates the store, which updates the UI, which lets the user do something else. Everything gets recorded in the Redux debugger. State and state changes are recorded and debuggable.

![A diagram demonstrating data flow from actions, to state, to view, to actions](https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

Compare this to a high-complexity Angular application relying on SIASes. Data might come in through a service, pass through several components, update another service, and change some item on the page. Debugging these applications forces you to become a detective, trying to figure out where data comes from and how it affects the UI's behavior. You can put logging into shared services, but the data is still not unidirectional.

### Use NgRx if you need it

Not every application needs unidirectional data flow and every state update logged. Some apps are fine with a couple services. If that is your application, by all means stick to Subjects in services. No need to complicate things.

But please understand that a SIAS is not a replacement for NgRx. It has no unidirectional data flow, worse debugging and higher complexity in a state-heavy application. SIASes are the _more_ complex choice for such projects.
