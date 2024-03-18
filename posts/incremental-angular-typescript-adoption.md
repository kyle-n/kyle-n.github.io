---
layout: post
title: How to incrementally migrate an Angular project to TypeScript strict mode
date: 2022-06-22
keywords: javascript, typescript, angular, frontend, tutorial, bitovi
image: typescript.webp
description: Your team needs strict mode, and now there's no excuse.
relatedLinks:
  Original post on bitovi.com: https://www.bitovi.com/blog/how-to-incrementally-migrate-an-angular-project-to-typescript-strict-mode
---

Enabling [strict mode](https://www.typescriptlang.org/tsconfig#strict) for TypeScript is one of the best ways to ensure code quality on a project. It forces developers to handle edge cases and avoid risky type coercions. It also exposes hidden bugs.

However, it is daunting to add `"strict": true` to your `tsconfig.json` and see pages of build errors. As a developer, you never want to have to tell a product manager, "Sorry, new features are paused this week."

Experienced developers also know to avoid big rewrites that take weeks to get out the door. The longer your strict mode migration goes, the more likely it is to have a blocking bug or cause massive merge conflicts or just fail. It’s better to consistently ship small, well-tested increments of code.

And make no mistake, there will be build errors. Consider this example based on real code I’ve encountered before:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-menu',
  template: ` <button (click)="addDish()">Add Dish</button> `,
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  currentUser: User;

  constructor(
    private dishService: DishService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(
      currentUser => (this.currentUser = currentUser)
    );

    // fails because this.currentUser is undefined
    console.log('currentUser:', this.currentUser.id);
  }

  addDish() {
    this.dishService.addDish(this.currentUser.id);
  }
}
```

TypeScript throws a build error because `this.currentUser` is never assigned a value in the constructor or at declaration. This is correct! Until the `currentUser$.subscribe()` callback runs, `this.currentUser` _is_ undefined. Its type should be `User | undefined`. This lets other developers who edit this component know they can't always rely on `this.currentUser` existing.

Strict mode is great for catching errors like this. With third-party help and planning, you can adopt it.

### Background

As of TypeScript 4.7.3, the `strict` flag is shorthand for these compiler flags:

- `noImplicitAny`

- `noImplicitThis`

- `alwaysStrict`

- `strictBindCallApply`

- `strictNullChecks`

- `strictFunctionTypes`

- `strictPropertyInitialization`

- `useUnknownInCatchVariables`

#### [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny 'https://www.typescriptlang.org/tsconfig#noImplicitAny')

Throws an error if the automatic type inference ever infers the type is `any`.

```typescript
// TS7006: Parameter 'dishId' implicitly has an 'any' type.
addDish(dishId) {
  this.dishService.addDish(dishId);
}
```

#### [noImplicitThis](https://www.typescriptlang.org/tsconfig#noImplicitThis 'https://www.typescriptlang.org/tsconfig#noImplicitThis')

Throws an error if the automatic type inference ever infers the type of `this` in a block of code is `any`.

```typescript
getAddDishCallback() {
  return function(dishId: number) {
    // TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
    this.dishService.addDish(dishId);
  }
}
```

#### [alwaysStrict](https://www.typescriptlang.org/tsconfig#alwaysStrict 'https://www.typescriptlang.org/tsconfig#alwaysStrict')

Parses every TypeScript file using [ES5 strict JavaScript parsing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode'), which throws errors when trying to do something inadvisable. When not using ES5 strict parsing, these operations fail silently. As explained by MDN:

```javascript
'use strict';

// Assignment to a non-writable global
var undefined = 5; // throws a TypeError
var Infinity = 5; // throws a TypeError

// Assignment to a non-writable property
var obj1 = {};
Object.defineProperty(obj1, 'x', { value: 42, writable: false });
obj1.x = 9; // throws a TypeError

// Assignment to a getter-only property
var obj2 = {
  get x() {
    return 17;
  }
};
obj2.x = 5; // throws a TypeError

// Assignment to a new property on a non-extensible object
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = 'ohai'; // throws a TypeError
```

#### [strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply 'https://www.typescriptlang.org/tsconfig#strictBindCallApply')

Requires correct argument types when using `bind()`, `call()` and `apply()`.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-menu',
  template: ``,
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  currentUser: User | undefined;

  constructor(
    private dishService: DishService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(
      currentUser => (this.currentUser = currentUser)
    );
  }

  addDish(dishId: number) {
    this.dishService.addDish(dishId);
  }
}
```

#### [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks 'https://www.typescriptlang.org/tsconfig#strictNullChecks')

If an variable's type is `T | undefined`, TypeScript throws an error if you treat it as just `T`. It also treats `null` and `undefined` as separate values.

```typescript
addDish(dishId: number) {
  const existingDish = this.dishService.dishes.find(dish => dish.id === dishId);
  // object is possibly undefined
  this.dishService.addDish(existingDish.id);
}
```

#### [strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes 'https://www.typescriptlang.org/tsconfig#strictFunctionTypes')

Requires function parameters and returns to be compatible to treat two functions as the same type.

```typescript
export class MenuComponent implements OnInit {
  currentUser: User | undefined;

  getUser: (name: string) => User;

  constructor(
    private dishService: DishService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getCurrentUser = this.userService.getCurrentUser;
  }
}
/**
Type '(id: number) => User' is not assignable to type '(name: string) => User'.
  Types of parameters 'id' and 'name' are incompatible.
    Type 'number' is not assignable to type 'string'.
*/
```

#### [strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization 'https://www.typescriptlang.org/tsconfig#strictPropertyInitialization')

If a property is not `T | undefined`, it must be assigned a value of type `T` in the constructor or when it is declared.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-menu',
  template: ` Add Dish `,
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  // TS2564: Property 'currentUser' has no initializer and is not definitely assigned in the constructor.
  currentUser: User;

  constructor(
    private dishService: DishService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(
      currentUser => (this.currentUser = currentUser)
    );

    console.log('currentUser:', this.currentUser.id);
  }

  addDish() {
    this.dishService.addDish(this.currentUser.id);
  }
}
```

#### [useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables 'https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables')

Types the `err` variable in `catch()` blocks as `unknown`, not automatically `Error`. Technically you could `throw` anything in a `try` block.

```typescript
async addDish(dishId: number) {
  try {
    this.dishService.addDish(existingDish.id);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
```

### Options for incrementally adopting strict mode

#### Don't: Multiple `tsconfig` files

One piece of advice I see a lot online is to use multiple `tsconfig.json` files. This is inadvisable because you will have to run `tsc` once for each `tsconfig` file. There are other, easier options.

#### Do: Enable individual flags

As explained above, `"strict": true` is shorthand for several properties. One way to incrementally adopt strict mode is to run builds with individual `strict` properties enabled and see how many errors each flag generates. If a flag causes little to no build errors, these can be enabled immediately.

Over time, your team can enable each `strict` sub-flag. When all of them are active, you can replace them with `"strict": true`.

This approach gives your code some of the benefits of strict mode immediately. However, some sub-flags of strict mode are disproportionately difficult to enable. Even if you get `noImplicitThis` for free, `strictNullChecks` might require a large amount of work.

#### Do: Use `typescript-strict-plugin`

[typescript-strict-plugin](https://github.com/allegro/typescript-strict-plugin 'https://github.com/allegro/typescript-strict-plugin') is an NPM package that allows you apply strict mode to either:

- All files, with some exempted using `// @ts-strict-ignore`
- Any directory or file specified in your `tsconfig.json`

This plugin really breaks up the work of strict mode. You could, for example, incrementally add directories to be parsed strictly. You could also require strict mode for all code except the files at time of setup, so all new code is strict.

The biggest downside to this approach is it adds complexity to your build process by adding a third-party plugin.

#### Do: Use `ts-strictify`

[ts-strictify](https://www.npmjs.com/package/ts-strictify 'https://www.npmjs.com/package/ts-strictify') requires developers to implement strict mode in any file they edit. It can be added as a pre-commit hook using [husky](https://www.npmjs.com/package/husky 'https://www.npmjs.com/package/husky') or [lefthook](https://www.npmjs.com/package/@arkweid/lefthook 'https://www.npmjs.com/package/@arkweid/lefthook').

This package is a good way to require developers edit code moving forward, as opposed to relying on the product manager to prioritize stories to clean up old code. However, it sounds daunting to implement strict mode in giant old files.

### Final recommendation

The best way to adopt strict mode depends on your organization, team makeup, and story selection process. However, I would recommend a mix of three approaches:

- If a strict mode sub-flag like `strictBindCallApply` generates so few errors you could fix them in a day, enable it immediately. Do this for all the "easy" flags.
- Use [typescript-strict-plugin](https://github.com/allegro/typescript-strict-plugin 'https://github.com/allegro/typescript-strict-plugin') to exempt all existing code from strict mode, enable it for new code and periodically update the old code to be strict-compliant. That way you're not adding to the pile of strict mode updates.
