---
layout: post
title: Using functions in Angular templates is fine, actually
description: Don't abandon one of the best tools in fighting code complexity.
date: 2024-09-08
keywords: angular, opinion, frontend
---

<script>
  import {base} from '$app/paths';
</script>

As a consultant, you encounter common beliefs about Angular and its best practices. One of the most common is that you shouldn't use functions in component templates. I disagree with this! Using computed variables or functions (which are the same thing) in the template prevents code complexity with no downsides... if done correctly.

### Functions in the template prevent complexity

I like using computed variables and functions in my Angular templates because they let me derive information from existing data without keeping duplicate state. To quote my [previous post]({base}/blog/computed-state-is-great) on the importance of computed state:

> Tracking state is like juggling flaming torches. Every piece you can derive is one fewer torch... Keep as little state as possible and derive the rest.

To demonstrate my point, I wrote a short Angular app called [color-library](https://github.com/kyle-n/color-library). In this app, the user types a number between 0 and 255 into a text field and clicks save. The app then displays information about the given color number, such as its hex value.

In this app, we have the following component:

```typescript
// color-data.component.ts
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-data',
  standalone: true,
  imports: [],
  templateUrl: './color-data.component.html',
  styleUrl: './color-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorDataComponent {
  @Input() colorNumber = 0;

  get numberFacts(): Array<{
    id: string;
    name: string;
    value: string;
  }> {
    return [
      {
        id: 'colorNumberHex',
        name: 'Hexadecimal',
        value: this.colorNumberHex
      },
      {
        id: 'colorNumberBinary',
        name: 'Binary',
        value: this.colorNumberBinary
      }
    ];
  }

  get colorNumberHex(): string {
    return this.colorNumber.toString(16).padStart(2, '0');
  }

  get colorNumberBinary(): string {
    return this.colorNumber.toString(2).padStart(8, '0');
  }
}
```

```html
<!-- color-data.component.html -->
<p>Your number is: {{ colorNumber }}</p>

<ul>
  @for (fact of numberFacts; track fact.id) {
  <li>{{ fact.name }}: {{ fact.value }}</li>
  }
</ul>
```

This component uses a [class getter](https://www.typescripttutorial.net/typescript-tutorial/typescript-getters-setters/) to derive `numberFacts`, an array of items which is rendered as a list. Because we use a getter in the template, we know `numberFacts` will always be up to date with the latest information from the input `colorNumber`. We don't have to call a function like `updateNumberFacts()` every time we change `colorNumber`. Angular does it all for us automatically.

Having `numberFacts` update automatically with zero code required is powerful. It allows removes whole genres of complexity and area for bugs. It lets us write simpler, more declarative code that's easy to understand and maintain.

This is how we should write code all the time. As frontend developers, **state is the enemy**. We should derive as much as humanly possible to avoid it.

### What about performance?

To cite the [previous post]({base}/blog/computed-state-is-great) again:

> Optimize what matters. If you have a page with 5 instances of a component, the performance impact of deriving some state every re-render is negligible.
>
> Now, things are different if there are 10,000 instances of a component on a page or [your audience uses low-end Android phones](https://danluu.com/slow-device/). A little optimization helps there.
>
> But my advice is to write simple code first and optimize as needed.

An operation like that of our example component (`return this.colorNumber.toString(2).padStart(8, '0');`) takes a modern chip fractions of a second. Keeping such an operation as a derived var offers reduces complexity while causing negligible performance changes.

#### Change detection

If performance _is_ a concern, I recommend splitting up your components and using [`OnPush` change detection](https://blog.angular-university.io/onpush-change-detection-how-it-works/). If you put a bunch of getters and template functions into a stateless display component, they will run only when an `@Input()` variable changes.

I added a ton of getters to the `ColorDataComponent` from my test project to confirm this.

```typescript
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-data',
  standalone: true,
  imports: [],
  templateUrl: './color-data.component.html',
  styleUrl: './color-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorDataComponent {
  @Input() colorNumber = 0;

  get numberFacts(): Array<{
    id: string;
    name: string;
    value: string;
  }> {
    console.log(
      '----------- re-running calculations -----------',
      this.colorNumber
    );
    return [
      {
        id: 'colorNumberHex',
        name: 'Hexadecimal',
        value: this.colorNumberHex
      },
      {
        id: 'colorNumberBinary',
        name: 'Binary',
        value: this.colorNumberBinary
      },
      {
        id: 'colorNumberOctal',
        name: 'Octal',
        value: this.colorNumberOctal
      },
      {
        id: 'isPureBlack',
        name: 'Is pure black',
        value: this.isPureBlack.toString()
      },
      {
        id: 'isPureWhite',
        name: 'Is pure white',
        value: this.isPureWhite.toString()
      },
      { id: 'isEven', name: 'Is even', value: this.isEven.toString() },
      { id: 'isOdd', name: 'Is odd', value: this.isOdd.toString() },
      {
        id: 'isPrime',
        name: 'Is prime',
        value: this.isPrime.toString()
      }
    ];
  }

  get colorNumberHex(): string {
    return this.colorNumber.toString(16).padStart(2, '0');
  }

  get colorNumberBinary(): string {
    return this.colorNumber.toString(2).padStart(8, '0');
  }

  get colorNumberOctal(): string {
    return this.colorNumber.toString(8);
  }

  get isPureBlack(): boolean {
    return this.colorNumber === 0;
  }

  get isPureWhite(): boolean {
    return this.colorNumber === 255;
  }

  get isEven(): boolean {
    return this.colorNumber % 2 === 0;
  }

  get isOdd(): boolean {
    return this.colorNumber % 2 !== 0;
  }

  get isPrime(): boolean {
    if (this.colorNumber < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(this.colorNumber); i++) {
      if (this.colorNumber % i === 0) {
        return false;
      }
    }
    return true;
  }
}
```

If you run the project, the `console.log()` in `get numberFacts()` will run only once when `colorNumber` changes. This is the best case scenario for performance and requires only computed state.

### A warning about state updates

The only catch with using lots of derived variables is that they will have to be re-calculated if a class variable changes.

For example, imagine we add a `renderCount` to `ColorDataComponent`:

```typescript
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-data',
  standalone: true,
  imports: [],
  templateUrl: './color-data.component.html',
  styleUrl: './color-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorDataComponent {
  @Input() colorNumber = 0;

  protected renders = 0;

  get numberFacts(): Array<{
    id: string;
    name: string;
    value: string;
  }> {
    console.log(
      '----------- re-running calculations -----------',
      this.colorNumber
    );

    // ...
  }

  // ...

  incrementRenderCount(): void {
    this.renders++;
  }
}
```

```html
<p>Your number is: {{ colorNumber }}</p>

<ul>
  @for (fact of numberFacts; track fact.id) {
  <li>{{ fact.name }}: {{ fact.value }}</li>
  }
</ul>

<p>This component has rendered {{ renders }} times</p>
<button (click)="incrementRenderCount()">Re-run change detection</button>
```

Every time you click the button to increment `this.renders`, `get numberFacts()` will run again, even with `OnPush` change detection.

This issue can be solved two ways. First, with sensible component design. Keep stateful logic away from components with lots of derived properties. Second, with [memoization](https://en.wikipedia.org/wiki/Memoization). There are useful [third-party libraries](https://www.npmjs.com/package/@ngx-rock/memoize-pipe) that cache results of heavy calculations.

Computed state is too useful a tool to be left behind as "bad for performance." It's fantastic, and we should use it.
