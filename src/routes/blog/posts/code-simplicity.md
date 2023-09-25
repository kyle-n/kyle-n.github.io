---
layout: post
title: Above all else, code should be simple
date: 2023-05-03
keywords: coding, books
image: ocean.jpg
caption: Via Stable Diffusion
---

Last year, I read a book that profoundly affected how I think about writing software. [“A Philosophy of Software Design”](https://www.amazon.com/Philosophy-Software-Design-2nd/dp/173210221X/ref=monarch_sidesheet) by John K. Ousterhout is a short volume with a radical thesis: The most important quality your code can have is to be *simple*. [^1] Ousterhout argues simplicity affects code quality than any specific pattern or language or design choice.

### Software engineering is in the mind

Ousterhout notes that other engineering disciplines face many constraints on their designs because they work in the physical world. There are only so many ways to build a bridge, because bridges have to deal with gravity.

Software engineers, however, have fewer limitations. For low-level programs, we must worry about memory and file size, but otherwise:

> The greatest limitation in writing software is our ability to understand the systems we are creating. (Ch. 1)

The best way to make an application understandable is to write simple code. Simple code is also easy to build and easy to maintain. Simple code can have more features added to it before becoming unwieldy.

### Complexity is the root of all software evil

Ousterhout argues the enemy of good code is **complexity**.

> Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system. (Ch. 2)

If simplicity makes apps easy and quick to update, complexity is the oppostive. It slows down new features. It demands extra rounds of QA. It leaves your customer waiting an extra week.

There are many kinds of complexity, but the three most common symptoms are when updating the application requires:

1. Modifying code in many different places
2. A disproportionately high knowledge of how the application works
3. Digging through a lot of code to figure out what to change

#### Symptom #1: Simple changes require modifications in many places

One symptom of complexity is when making an update requires changing many different parts of the code, which may not be connected. 

Good code uses classes and functions and components that do one thing, do it well, and ideally in a reusable way. If you're writing accounting software and need to check if an invoice is invalid, there should be *one* function that determines that. Don't repeat yourself. 

As a frontend developer, I see this problem most often with duplicate components. Any large frontend that rotates developers will naturally accumulate some duplicate functionality. Normally, it’s not the biggest deal in the world.

The problem is when you fix a bug and a user reports the bug is still on some old page, because that page uses a duplicate component somebody wrote four years ago.

#### Symptom #2: Simple changes require an inappropriately large knowledge of the application

Another frustrating symptom of too-complex code is when making basic changes requires disproportionately high knowledge of the app. 

For my first job, I worked on a hybrid Angular / AngularJS application that had some seriously complicated legacy code. Critical pages were 7,000- to 8,000-line AngularJS controllers. These controllers had almost no pure functions - every method modified a global state shared across *the entire controller*. 

Because everything updated the controller’s global state, you couldn’t make changes one function without knowing what every part of the controller was doing all of the time. Any time we had to touch that code, we tripled our estimates. 

#### Symptom #3: Updates require a lot digging to figure out what to update

This symptom is a corollary to symptom #1. If a good codebase has clearly delineated responsibilities, where each part of the code does one thing, then figuring out what to change is easy. To return to our example from before - want to change what makes an invoice invalid? Change the one function that checks that. 

But, if logic is spread across multiple parts of the application, then making a change becomes harder. It’s harder to find, test, and prevent regressions. 

### How to fight complexity

If keeping your code simple is the most important thing we can do as developers, then we should focus all our efforts on reducing complexity. Ousterhout recommends two things:

1. “Eliminate complexity by making code simpler and more obvious” (Ch. 1)
2. Encapsulate complex logic within a section of your code

#### Make code simpler

> “One of the most important goals of good design is for a system to be **obvious**… In an obvious system, a developer can quickly understand how the existing code works and what is required to make a change.<br><br>“An obvious system is one where a developer can make a quick guess about what to do, without thinking very hard, and yet be confident that the guess is correct.” (Ch. 2)

One of the most important things we can do as developers to fight code complexity is to make everything simpler. Give variables, components and methods clear, descriptive names. Use `.map()`s and `.filter()`s instead of complex `for` loops. Write pure functions that return a value and do only one thing. 

Ousterhout recommends code be **simple first, fast as needed**. Most parts of your application are not performance critical, and it is more important they be simple and readable than optimized for speed. As developers, we should write everything as simply as possible, benchmark, and optimize as needed. Premature optimization is bad, etc etc. 

If you are unsure whether the code you wrote is simple enough, the best way to check is to show it to a colleague. This could be informal or a PR review. If they do not understand what you wrote, then it is probably not simple enough. Be kind to future developers (including future you!) and simplify your code. 

> Complexity is more apparent to readers than writers. If you write a piece of code and it seems simple to you, but other people think it is complex, then it is complex. (Ch. 2)


#### Use comments

This is maybe Ousterhout’s most controversial take, but I like it. He says code should be simple and self-explanatory. However, sometimes our code relies on assumptions or realities that are *not* written in the code. When that happens, use comments.

Here’s a bad comment from a project I consulted on:

```typescript
// Add new exclusions
postData.shapes[shapeIdx].exclusions.push(...newExclusions)
```

This comment is duplicative and not useful. It tells me nothing I could not learn from reading the next line.

Now consider this good comment, from the same project:

```typescript
// Some STRs in Classic API are not formatted in
// ##-###(N/S)-###(E/W) format. Fix short STRs
// by filling in with 0's
export function fixBadStr(str: string) {
```

This comment is great because it explains *why* `fixBadStr()` exists. It tells me that the Classic API sometimes returns bad data, something not apparent in the frontend code, and a previous developer handled that. This comment provided me valuable context into the application as a whole.

Not everything needs a comment. Just things that are not immediately obvious from the code. 

#### Encapsulate logic

However, sometimes code is just complicated. Sometimes there are 25 different business rules to determine whether an invoice is invalid. In that case, Ousterhout says we should take that complexity and *encapsulate* it. 

To keep going with our example, we should write just one function that checks whether the invoice is invalid and keep all the validity logic inside it. Even if that function is a total dumpster fire, the complexity inside it will not spread to other parts of the application. Other developers won’t have to worry about it unless they are specifically updating that business logic. 

#### Pull complexity downward

If you think about your application in terms of layers, a great way to reduce complexity is to pull it downward, to the base layers. For example, consider the following network request I found on a client’s Angular project:

```typescript
getSamplingMapImage(samplingEventId: number, processedLayerId?: number, zoneLayerId?: number ) {
  const params = new HttpParams()
    .set('samplingid', samplingEventId.toString())
    .set('processedlayerid', isNil(processedLayerId) ? '' : processedLayerId.toString())
    .set('zonelayerid', isNil(zoneLayerId) ? '' : zoneLayerId.toString());
  return this.webApiService.get(SamplingApiConfig.getSamplingMapImage,params);
}
```

This method converts a few IDs to strings for a network request to the API. Putting the string conversions in this method makes the code simpler. If every caller of this method had to convert `processedLayerId` and `zoneLayerId` to strings, that would leave a lot of extra complexity all over our app. 

To return to our layers metaphor, the network request exists at a lower layer than the rest of the app. This is a method that many components could call. Better to pull down the complexity of converting those layers to strings. Now the complexity is in one place and can be shared across the app. 

#### Combine related pieces of code

Ousterhout says if two classes or functions only make sense when used together, you should just combine them. Make it easier on future developers and don’t even pretend they are separate sections. Just put them together and refactor later if you need to. 

#### Just a little bit of abstraction

A surprisingly effective way to reduce the complexity of your code is to make things *a little* abstracted. For example, imagine we have two Angular components. First, a bad one:

```typescript
// Bad
export class SavePageSubmitButtonComponent {
  dropdownOptions = ['Submit', 'Save as Draft', "Convert"];
  
  constructor() {}
 
}
```

This component adds complexity to its application because it only works in its parent component. It can only display save-related options. If we want another button component with different dropdown options, we will have to create a whole other component. 

Additionally, this component is hard for future developers to understand. Could a new developer look at the class name `SavePageSubmitButtonComponent` and know what it does without opening the file and digging through the code?

Now, imagine we refactor this component:

```typescript
// Good
export class SplitButtonComponent {
  @Input() dropdownOptions: string[];
  
  constructor() {}
 
}
```

With just a little bit of abstracting, we’ve made our code much easier to understand. A new developer can look at the name `SplitButtonComponent` and know, "OK, I know what that does.” 

**However**, it is important to not make your code *too* abstracted. Make things too abstract and you will end up increasing the complexity of your code. If `SplitButtonComponent` could also display a dropdown menu or radio buttons, that would be too complicated. 

### Conclusion

The most important thing we can do as developers is to write code that meets business requirements. If our code isn’t worth money to somebody, then it’s useless. The second-most important thing we can do, however, is to write code that is *simple*. Simple code lets us write more features, fix more bugs and deliver business value faster. 

[^1]: Obviously the *most* most important quality of code is that it delivers some business value. Otherwise it’s just academic or for fun.