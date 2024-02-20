---
layout: post
title: 3 Ways to simplify frontends with multiple microservices
description: How to use microservices without spaghetti UI code
date: 2024-01-25
image: 1950s-servers.png
caption: DALL-E 2 - "a web page connected to a constellation of servers. 1950s pop art"
keywords: angular, showcase, frontend, typescript, javascript, node, tutorial, bitovi, rxjs
relatedLinks:
  Original post on bitovi.com: https://www.bitovi.com/blog/3-ways-to-simplify-frontends-with-multiple-microservices
---

Six months ago, a Bitovi client needed help with their web app. The frontend was too complicated and hard to test. They weren't sure how to fix it. I presented three approaches and helped rewrite the frontend to be simpler and more testable. It was a fascinating problem to solve.

To protect the client's privacy, the [sample code](https://github.com/kyle-n/catering-masters) for this article will be a web app I wrote to demonstrate the problem. The [sample project](https://github.com/kyle-n/catering-masters) has separate branches for each possible solution. Like the real client's app, it's written in Angular. However, the problem it demonstrates can happen in any frontend framework.

### The problem

Imagine you're working a web app that let users create, view and edit invoices for their catering business. Your company has existing microservices: one for getting customer data, one for addresses, one for products, and so on. Other teams use these microservices, so you can't change them.

When users want to create an invoice with your app, it uses this component:

```typescript
// create-invoice-page.component.ts
// https://github.com/kyle-n/catering-masters/blob/main/src/app/containers/create-invoice-page/create-invoice-page.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { Address } from 'src/app/types/address';
import { Customer } from 'src/app/types/customer';
import { LineItem } from 'src/app/types/invoice';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-create-invoice-page',
  templateUrl: './create-invoice-page.component.html',
  styleUrls: ['./create-invoice-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvoicePageComponent {
  protected customer$: Observable<Customer>;
  protected address$: Observable<Address>;
  protected products$: Observable<Product[]>;
  protected lineItems$: Observable<LineItem[]>;

  private customerId$: Observable<number>;

  constructor(
    customerService: CustomerService,
    addressService: AddressService,
    productService: ProductService,
    activatedRoute: ActivatedRoute
  ) {
    this.customerId$ = activatedRoute.params.pipe(
      map(params => Number(params['customerId']))
    );

    this.customer$ = this.customerId$.pipe(
      mergeMap(customerId => customerService.getCustomer(customerId))
    );
    this.address$ = this.customerId$.pipe(
      mergeMap(customerId => addressService.getAddress(customerId))
    );
    this.products$ = this.address$.pipe(
      mergeMap(address =>
        productService.getProductsAvailableAtAddress(address.id)
      )
    );
    this.lineItems$ = this.products$.pipe(
      mergeMap(products => productService.getLineItemsForProducts(products))
    );
  }
}
```

That's a big `constructor()`! It:

1.  Gets the customer ID
2.  Uses the customer ID to load the customer
3.  Uses the customer ID to load the customer's address
4.  Uses the address ID to load products available at that location
5.  Uses the products to load the line items for those products

It loads this data for the template:

```html
<!-- create-invoice-page.component.html -->
<!-- https://github.com/kyle-n/catering-masters/blob/main/src/app/containers/create-invoice-page/create-invoice-page.component.html -->

<h1>Create invoice</h1>
<app-header
  [customerName]="(customer$ | async)?.name"
  [address]="address$ | async"
></app-header>
<section>
  <h3>New Line Items</h3>
  <app-line-item-table [lineItems]="lineItems$ | async"></app-line-item-table>
</section>
<section>
  <h3>Potential Products</h3>
  <app-product-list [products]="products$ | async"></app-product-list>
</section>
<app-submit-buttons
  [customerId]="(customer$ | async)?.id"
  [invoiceId]="1"
></app-submit-buttons>
```

- It needs `customer$` and `address$` to display the customer's name and address in the header
- It needs `address$` to get `products$` to display a list of possible products
- It needs `products$` to get `lineItems$` to display a table of line items

And yet, that `constructor()` is impossible to test.

```typescript
// create-invoice-page.component.ts
// https://github.com/kyle-n/catering-masters/blob/main/src/app/containers/create-invoice-page/create-invoice-page.component.ts

// ...

  constructor(
    customerService: CustomerService,
    addressService: AddressService,
    productService: ProductService,
    activatedRoute: ActivatedRoute
  ) {
    this.customerId$ = activatedRoute.params.pipe(
      map(params => Number(params['customerId']))
    );

    this.customer$ = this.customerId$.pipe(
      mergeMap(customerId => customerService.getCustomer(customerId))
    );
    this.address$ = this.customerId$.pipe(
      mergeMap(customerId => addressService.getAddress(customerId))
    );
    this.products$ = this.address$.pipe(
      mergeMap(address =>
        productService.getProductsAvailableAtAddress(address.id)
      )
    );
    this.lineItems$ = this.products$.pipe(
      mergeMap(products => productService.getLineItemsForProducts(products))
    );
  }

// ...
```

You'd have to stub so many functions to test this `constructor()` that the test wouldn't do any good. It would barely resemble the real code.

You could break up the code, but how? You shouldn't use private component methods to create the Observables. The methods would be one line long, adding indirection without encapsulating complexity.

You can't move this logic to a service, either. The service would have to return an object containing four Observables. A service function that returns four items is not a separate or reusable function. It's hiding the core functionality of a component inside a separate service, making it more complex and harder to find.

This is the problem Bitovi's client faced, only with more Observables. I tried three different ways to solve it.

### Solution #1: Resolvers

I first tried [Angular resolvers](https://www.digitalocean.com/community/tutorials/angular-route-resolvers). Resolvers encapsulate logic required to load some piece of data. For example:

```typescript
// customer.resolver.ts
// https://github.com/kyle-n/catering-masters/blob/resolvers/src/app/resolvers/customer.resolver.ts

import { inject } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../types/customer';

const resolveCustomer: ResolveFn<Observable<Customer>> = (
  route: ActivatedRouteSnapshot
): Observable<Customer> => {
  const customerId = Number(route.params['customerId']);
  return inject(CustomerService).getCustomer(customerId);
};

export default resolveCustomer;
```

You use resolvers by adding them to the routing module...

```typescript
// app-routing.module.ts
// https://github.com/kyle-n/catering-masters/blob/resolvers/src/app/app-routing.module.ts

// ...

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'customer/:customerId/invoice/new',
    component: CreateInvoicePageComponent,
    resolve: {
      customer: resolveCustomer
    }
  }
];

// ...
```

...and reading them in the component.

```typescript
// create-invoice-page.component.ts
// https://github.com/kyle-n/catering-masters/blob/resolvers/src/app/containers/create-invoice-page/create-invoice-page.component.ts

// ...

constructor(productService: ProductService, activatedRoute: ActivatedRoute) {
    this.customer$ = activatedRoute.data.pipe(map(data => data['customer']));

//...
```

The customer resolver simplifies the `CreateInvoicePageComponent`. It lets you load customer data into the component with one line, without injecting the `CustomerService`. You can also reuse the customer resolver for other components that need customer data.

However, resolvers are a poor solution for loading data that depends on other loaded data. On the [original create invoice page](https://github.com/kyle-n/catering-masters/blob/main/src/app/containers/create-invoice-page/create-invoice-page.component.ts), you had to load `address$` to load `products$` to load `lineItems$`. Resolvers run independently and simultaneously when the user opens the route they're attached to.

You could create a resolver for `lineItems$` that injects `ActivatedRoute` and waits for the `products$` resolver, but that would add tremendous complexity. We'd have recreated the big `constructor()`, but across multiple files. Dependent resolvers would be hard to debug or reuse.

### Solution #2: NgRx

I also tried solving the client's problem with [NgRx](https://ngrx.io), aka Redux with Observables. It and [@ngrx/effects](https://ngrx.io/guide/effects) are perfect for complex data management. Instead of loading data in the create invoice component, you can dispatch an `OpenedCreateInvoicePage` action, load the data into the global store, and display it in the component.

```typescript
// create-invoice-page.component.ts
// https://github.com/kyle-n/catering-masters/blob/ngrx/src/app/containers/create-invoice-page/create-invoice-page.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Address } from 'src/app/types/address';
import { Customer } from 'src/app/types/customer';
import { LineItem } from 'src/app/types/invoice';
import { Product } from 'src/app/types/product';
import { Store } from '@ngrx/store';
import { OpenedCreateInvoicePage } from 'src/app/store/actions';
import {
  selectAddress,
  selectCustomer,
  selectLineItems,
  selectProducts
} from 'src/app/store/selectors';
import { GlobalStore } from 'src/app/store/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-invoice-page',
  templateUrl: './create-invoice-page.component.html',
  styleUrls: ['./create-invoice-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvoicePageComponent {
  protected customer$: Observable<Customer>;
  protected address$: Observable<Address>;
  protected products$: Observable<Product[]>;
  protected lineItems$: Observable<LineItem[]>;

  constructor(
    activatedRoute: ActivatedRoute,
    private store: Store<{ globalState: GlobalStore }>
  ) {
    activatedRoute.params
      .pipe(
        map(params => ({
          customerId: Number(params['customerId']),
          invoiceId: Number(params['invoiceId'])
        })),
        takeUntilDestroyed()
      )
      .subscribe(ids => this.store.dispatch(OpenedEditInvoicePage(ids)));

    this.customer$ = this.store
      .select(selectCustomer)
      .pipe(filter((customer): customer is Customer => !!customer));
    this.address$ = this.store
      .select(selectAddress)
      .pipe(filter((address): address is Address => !!address));
    this.products$ = this.store
      .select(selectProducts)
      .pipe(filter((products): products is Product[] => !!products));
    this.lineItems$ = this.store
      .select(selectLineItems)
      .pipe(filter((lineItems): lineItems is LineItem[] => !!lineItems));
  }
}
```

This `constructor()` requires significant boilerplate, but is less complex than the [original](https://github.com/kyle-n/catering-masters/blob/main/src/app/containers/create-invoice-page/create-invoice-page.component.ts). It does just two things- dispatch an `OpenedCreateInvoicePage` action and read data from the store. It does not know anything about loads, subsequent loads, APIs, only which four parts of the store to expose to its template.

Each piece of loading logic is a separate NgRx effect.

```typescript
// effects.ts
// https://github.com/kyle-n/catering-masters/blob/ngrx/src/app/store/effects.ts

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {
  GetAddress,
  GetAddressFailure,
  GetAddressSuccess,
  GetCustomer,
  GetCustomerFailure,
  GetCustomerSuccess,
  GetLineItemsFailure,
  GetLineItemsOnCreateSuccess,
  GetLineItemsOnEditSuccess,
  GetProductsFailure,
  GetProductsSuccess,
  OpenedCreateInvoicePage
} from './actions';
import { CustomerService } from '../services/customer.service';
import { AddressService } from '../services/address.service';
import { ProductService } from '../services/product.service';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    private readonly productService: ProductService
  ) {}

  createPageOpened = createEffect(() => {
    return this.actions$.pipe(
      ofType(OpenedCreateInvoicePage),
      switchMap(action =>
        from([
          GetCustomer({ customerId: action.customerId }),
          GetAddress({ customerId: action.customerId })
        ])
      )
    );
  });

  getCustomer = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetCustomer),
      switchMap(action =>
        this.customerService.getCustomer(action.customerId).pipe(
          map(customer => GetCustomerSuccess({ customer })),
          catchError(error => of(GetCustomerFailure({ error })))
        )
      )
    );
  });

  getAddress = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetAddress),
      switchMap(action =>
        this.addressService.getAddress(action.customerId).pipe(
          map(address => GetAddressSuccess({ address })),
          catchError(error => of(GetAddressFailure({ error })))
        )
      )
    );
  });

  getProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetAddressSuccess),
      switchMap(action =>
        this.productService
          .getProductsAvailableAtAddress(action.address.id)
          .pipe(
            map(products => GetProductsSuccess({ products })),
            catchError(error => of(GetProductsFailure({ error })))
          )
      )
    );
  });

  getLineItemsForCreatePage = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetProductsSuccess),
      switchMap(action =>
        this.productService.getLineItemsForProducts(action.products).pipe(
          map(lineItems => GetLineItemsOnCreateSuccess({ lineItems })),
          catchError(error => of(GetLineItemsFailure({ error })))
        )
      )
    );
  });
}
```

It is straightforward to test effects. When one action comes in, something else should happen in response.

```typescript
// effects.spec.ts
// https://github.com/kyle-n/catering-masters/blob/ngrx/src/app/store/effects.spec.ts

// ...

it('should start loading customer and address when create page is opened', done => {
  service.createPageOpened
    .pipe(
      take(2),
      reduce((acc, action) => [...acc, action], [] as Action[])
    )
    .subscribe({
      next: actions => {
        expect(actions).toEqual([
          GetCustomer({ customerId: mockCustomer.id }),
          GetAddress({ customerId: mockCustomer.id })
        ]);
      },
      complete: done
    });

  mockActions$.next(OpenedCreateInvoicePage({ customerId: mockCustomer.id }));
});

// ...
```

NgRx also makes combining data simple. You can keep the customer, address, products and line items in the store and combine them using [selectors](https://ngrx.io/guide/store/selectors). Selectors, all pure functions, are testable.

NgRx, however, has three disadvantages.

One, NgRx adds a significant of code and complexity. Not every app needs industrial-grade state management.

Two, the chain of subsequent loads is hard to follow. You can mitigate this through comments or keeping related effects in one file, but it is undeniably less clear than putting all the logic in one `constructor()`.

Three, NgRx can be hard to learn. Your team may not want to spend time training on reducers and sub-reducers and pure functions and effects.

Overall, though, the separation of concerns and ease of testing make NgRx a great option for loading data from many microservices.

### Solution #3: Backend for frontend

One more potential solution is to create _another_ server. This server will sit between the frontend and existing microservices. It will talk to them for the frontend, process the data and return only what the client needs. This is the [backend for frontend pattern](https://samnewman.io/patterns/architectural/bff/).

> The BFF is tightly coupled to a specific user experience, and will typically be maintained by the same team as the user interface, thereby making it easier to define and adapt the API as the UI requires, while also simplifying process of lining up release of both the client and server components.

Since a BFF will be maintained by the frontend team, you should write it in TypeScript. Since it will be tightly coupled to the UI, you should include it in the frontend repository. Last, since the frontend is in Angular, your backend could use "Angular for the server" - [NestJS](https://nestjs.com).

_([Angular Universal](https://www.bitovi.com/blog/improve-angular-performance-and-seo-with-angular-universal) would also work, but Nest has more features. My client's app also relied on libraries incompatible with [server-side rendering](https://angular.io/guide/ssr), which Angular Universal requires)._

You'll create a Nest app doing two things: serving your Angular app and taking API requests from it. Angular will know nothing about any microservice. It will know only what Nest returns.

In the previous two solutions, you used different methods to load the same data. With a BFF, you need only load what is shown in the UI.

Consider the header component. At first, it used two pieces of data: `address` and `customerName`.

```typescript
// header.component.ts
// https://github.com/kyle-n/catering-masters/blob/main/src/app/components/header/header.component.ts

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from 'src/app/types/address';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() address: Address | null | undefined;
  @Input() customerName: string | null | undefined;
}
```

```html
<!-- header.component.html -->
<!-- https://github.com/kyle-n/catering-masters/blob/main/src/app/components/header/header.component.html -->

<h2>{{ customerName }}</h2>
<div *ngIf="address">{{ address.street }} {{ address.city }}</div>
```

To get this data, the app loaded `address$` and `customer$` in the parent component:

```typescript
// create-invoice-page.component.ts
// https://github.com/kyle-n/catering-masters/blob/main/src/app/containers/create-invoice-page/create-invoice-page.component.ts

//...

this.customer$ = this.customerId$.pipe(
  mergeMap(customerId => customerService.getCustomer(customerId))
);
this.address$ = this.customerId$.pipe(
  mergeMap(customerId => addressService.getAddress(customerId))
);

//...
```

The customer object returned from `getCustomer()` has these properties:

```typescript
// customer.ts
// https://github.com/kyle-n/catering-masters/blob/main/src/app/types/customer.ts

export type Customer = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastInvoiceId: number;
  lastInvoiceDate: string;
  ownerName: string;
  ownerEmail: string;
};
```

The header component, though, only requires the customer's name, street and city. You can use your NestJS application to return just this data.

First, make a top-level folder called shared containing `types.ts`.

```typescript
// types.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/shared/types.ts

export type InvoiceHeaderCustomerData = {
  name: string;
  street: string;
  city: string;
};
```

Next, replace your Angular services for loading customer, address and product data with Nest services. The customer microservice gets its own Nest service, the address gets its own, and so on.

Then, create a new Nest API endpoint specifically for loading header data.

```typescript
// app.controller.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/server/src/controllers/app.controller.ts

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InvoiceHeaderCustomerData } from '@shared/types';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapCustomerToInvoiceHeaderCustomerData } from 'src/mappers/invoice-header-customer-data.mapper';
import { AddressService } from 'src/services/address.service';
import { CustomerService } from 'src/services/customer.service';

@Controller()
export class AppController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService
  ) {}

  @Get('customers/:customerId/header-data')
  getCustomerHeaderData(
    @Param('customerId', ParseIntPipe) customerId: number
  ): Observable<InvoiceHeaderCustomerData> {
    const customer$ = this.customerService.getCustomer(customerId);
    const address$ = this.addressService.getAddress(customerId);
    return forkJoin(customer$, address$).pipe(
      map(([customer, address]) =>
        mapCustomerToInvoiceHeaderCustomerData(customer, address)
      )
    );
  }
}
```

`mapCustomerToInvoiceHeaderCustomerData` is a pure function that returns the header data:

```typescript
// invoice-header-customer-data.mapper.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/server/src/mappers/invoice-header-customer-data.mapper.ts

import { InvoiceHeaderCustomerData } from '@shared/types';
import { Address } from 'src/types/address';
import { Customer } from 'src/types/customer';

export function mapCustomerToInvoiceHeaderCustomerData(
  customer: Customer,
  address: Address
): InvoiceHeaderCustomerData {
  return {
    name: customer.name,
    street: address.street,
    city: address.city
  };
}
```

You can call this endpoint from Angular...

```typescript
// api.service.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/src/app/services/api.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceHeaderCustomerData } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = '/api';

  constructor(private readonly http: HttpClient) {}

  getCustomerHeaderData(
    customerId: number
  ): Observable<InvoiceHeaderCustomerData> {
    return this.http.get<InvoiceHeaderCustomerData>(
      `${this.baseUrl}/customers/${customerId}/header-data`
    );
  }
}
```

...and use it in CreateInvoicePageComponent...

```typescript
// create-invoice-page.component.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/src/app/containers/create-invoice-page/create-invoice-page.component.ts

//...

  constructor(apiService: ApiService, activatedRoute: ActivatedRoute) {
    this.customerId$ = activatedRoute.params.pipe(
      map(params => Number(params['customerId']))
    );

    this.headerData$ = this.customerId$.pipe(
      mergeMap(customerId => apiService.getCustomerHeaderData(customerId))
    );
  }

//...
```

...and the header component.

```typescript
// header.component.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/src/app/components/header/header.component.ts

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceHeaderCustomerData } from '@shared/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() customerData: InvoiceHeaderCustomerData | null | undefined;
}
```

```typescript
<!-- header.component.ts -->
<!-- https://github.com/kyle-n/catering-masters/blob/nestjs/src/app/components/header/header.component.ts -->

<ng-container *ngIf="customerData">
  <h2>{{ customerData.name }}</h2>
  <div>
    {{ customerData.street }}
    {{ customerData.city }}
  </div>
</ng-container>
```

You can repeat this process for every part of the page. Products, line items, everything is returned from Nest. The frontend doesn't know loading line items requires loading an address and products for that address.

```typescript
// app.controller.ts
// https://github.com/kyle-n/catering-masters/blob/nestjs/server/src/controllers/app.controller.ts

// ...

  @Get('invoices/line-items')
  getLineItemsForNewInvoice(
    @Query('customerId', ParseIntPipe) customerId: number
  ): Observable<LineItem[]> {
    const address$ = this.addressService.getAddress(customerId);
    return address$.pipe(
      mergeMap(address =>
        this.productService.getProductsAvailableAtAddress(address.id)
      ),
      mergeMap(products =>
        this.productService.getLineItemsForProducts(products)
      )
    );
  }

// ...
```

This approach has several advantages.

First, the UI code is dead simple. It strips whole categories of complexity out of the frontend. Every piece of content on the page is one network request.

Second, it allows the frontend to focus on pure UI matters. Forms, buttons, routing, navigation, things like that. No business logic.

Third, it allows code reuse. This is especially useful for sharing validators across client and server.

Fourth, this approach helps performance. NestJS automatically caches responses to incoming requests. If the user refreshes the create invoice page and does a second GET header data, Nest will return the cached response. This is useful for lightening the load on your existing APIs.

If your Nest app sends many outgoing requests to your microservices, Nest [can also cache responses](https://stackoverflow.com/a/63208893) from those microservices.

The downside of this approach is it adds more layers to the app. It may require infrastructure changes. It's also overkill most of the time. Most websites don't need an intermediary to collect data from multiple microservices.

But, since the catering app _does_ need that, it's a good call.

### The best solution: BFF

I presented the three prototypes and my recommendations to the client.

Reducers were the wrong choice. They work if all your data loads are independent. Unfortunately, the client's were not, and chained resolvers would be difficult to maintain.

NgRx, in my opinion, was a great option. It added complexity, but made testing _easy_. It is good at loading and combining data.

The BFF pattern, though, was my favorite. It was like one giant [adapter](https://en.wikipedia.org/wiki/Adapter_pattern), providing an ergonomic, UI-friendly API for the existing microservices. It also made testing easier.

After presenting all three options, the client decided to go with the BFF pattern.

These problems are tough!
