---
layout: post
title: Using Angular reactive forms to build a huge feature for ServiceCore
image: rental-rates.png
caption: And it looks so simple from the outside to use.
---

At ServiceCore, we're thrilled to ship [rental rates](https://support.servicecore.com/hc/en-us/articles/360041523411-Add-Rental-Rates)! This was a months-long project that required massive collaboration between our product owner, frontend and backend engineers and QA. 

I wanted to highlight some work I did to make one small part of the system - the rental rate input table.

<!--break-->

## Background

Without going too deep into the portable toilet business, here's what we were trying to build. 

ServiceCore users are waste disposal businesses. A construction company might rent 10 portable toilets per day for the next three months from a user. That user would create a rental in ServiceCore to track their inventory and billing for that construction site.

ServiceCore users can create preset line item charges, like maintenance fees. Those line item charges can attach to a rental. 

The problem that necessitated rental rates was these line item charges were static. There was no way to give a customer a special deal for a specific rental, like $0 service charges, there wasn't a way to do that. You'd have to override the line item on every single invoice created for that rental. Not fun for big companies doing thousands of invoices a day!

With rental rates, users would be able to select any service charge and set special per-rental pricing, notes and taxable status.

In order to set rental rates, however, we needed a rate input table.

## Product requirements

The rental rate input table should display every product attached to a rental. Beneath each product is a dropdown of line item charges that could be attached to a product. Selectinga charge would add it to a table, with the default price, name, description and taxable status editable.

So: rentals have products, products have line item charges, and rental rates are special per-rental instances of a line item charge. Make sense? 

![Overall view of the rate input table](https://i.imgur.com/nbEwLVI.png)

The last two options in the line item dropdown should be "Add Service" and "Assign Service", which I'll explain later. 

## Implementation

### Goals

As every frontend developer knows, forms are complicated. This form had a lot of moving parts, so the code could turn ugly quickly. 

I built this with three things in mind:

1. It needed to work well for rental rates
2. It needed to be reusable in case future features need a similar UI
3. It needed to keep the logic under control with reactive programming

Angular's [Reactive Forms](https://angular.io/guide/reactive-forms) made the logic more functional and less imperative. Reactive Forms store form state in FormControls, which can be grouped inside FormGroups or FormArrays. FormGroups, FormArrays and FormControls all have first-class RxJS APIs. You can subscribe to `valueChanges` or `statusChanges` (valid/invalid) on any of them and *react* to form state updates. 

### Overview

When the user opens the rental rate form, the `rental-rate-form` container component loads the rental's data. It passes any existing rental rates into the `rate-input-table`, the actual UI. The `rental-rate-form` also `PATCH`es the rental with its new rates on submit. 

This component accomplishes goal #2, keeping the rental logic separate from the UI.

On instantiation, the `rate-input-table` transforms input rates into table rows using pure static functions. This keeps the instantiation logic testable.

The `rate-input-table` stores its data as nested `AbstractControl`s (the base class of FormArray, FormGroup and FormControl). The structure goes: Products is a FormArray. Each product is a FormGroup that contains product name, quantity, and a FormArray of rates. Each rate is FormGroup that contains FormControls for line item name, description, price, and taxable status. 

Each product FormGroup also has a FormControl for the line item dropdown. Any value change there reactively adds the selected rate to the table. 

### Wins

#### RxJS &hearts;

Reactive programming is a blast. It contained the logic for each part of the form as subscriptions to that AbstractControl's `valueChanges`.

It also simplified working with asynchronous requests. For example, the `pipe` from add service dropdown takes the `valueChange` (the `id` of the selected service) and `flatMap`s it into a `GET` req for the full service. The full service is transformed into a new FormControl, which is pushed into the FormArray for the given product. 

```
      // add new service on select
      const newServiceSub = rateSelectChanges.pipe(
        filter(serviceIdOrOption => {
          // service ids come through as '11'
          const serviceId = parseInt(serviceIdOrOption, 10);
          return !Number.isNaN(serviceId);
        }),
        map((serviceId: string) => parseInt(serviceId, 10)),
        flatMap(serviceId => this._serviceService.getService(serviceId))
      ).subscribe((service: Service) => {
          this.addServiceToRates(service, entityFormGroup.get('rates') as FormArray);
          entityFormGroup.get('rateSelect').patchValue('choose');
        }, error => this._userAlertService.error(error, true)
      );

```

No `async`/`await` weirdness, no race conditions, no confusing logic. Just functional transformations. First-class RxJS support is far and away the best part of Angular. Just look at when we have to do something *really* complicated:

```
      const assignServiceSub = rateSelectChanges.pipe(
        filter(selectVal => selectVal === 'assign'),
        flatMap(() => {
          const serviceIdsToExcludeFromAssociateDialog: number[] = entityFormGroup.value.entity.services
            .map(service => service.id);
          return this._serviceDialogService.openAssociateServiceDialog(
            entityFormGroup.value.entity.id,
            serviceIdsToExcludeFromAssociateDialog
          );
        }),
        filter((updatedServices) => !!(updatedServices)),
        map((allServices: Service[]) => {
          const previousServiceIds: number[] = entityFormGroup.value.entity?.services?.map(service => service.id) || [];
          return allServices.filter(serviceFromApi => !previousServiceIds.includes(serviceFromApi.id));
        }),
        map(newServices => newServices.map(newService => this._serviceService.getService(newService.id))),
        flatMap(newServiceRequests => forkJoin(newServiceRequests))
      ).subscribe(fullNewServices => {
        if (fullNewServices?.length) {
          fullNewServices.forEach(service => {
            this.addServiceToRates(service, entityFormGroup.get('rates') as FormArray);
          });
        }
        this.reloadFullServices(entityFormGroup as FormGroup);
        entityFormGroup.get('rateSelect').patchValue('choose');
      });

```

This block grabs services (line item charges) already associated to a product and passing them to a dialog. The dialog filters out these previously associated services. Then, if the user selects any services to add to a product in the dialog, these are passed out of the dialog's Observable and transformed into requests for the full data for each newly associated service. When we've received all responses, the services are added to the table as rates. RxJS makes this kind of async work *easy*.

#### Functional programming &hearts;

The last code win was creating the select service dropdown. It transformed an array of services into `<options>`, sorting by billing period on the service. 

![The add service dropdown for ServiceCore rental rates](http://i.imgur.com/sJthlnx.png)

All that logic used a pure static class function, making it a breeze to unit test. 

### Losses

`rate-input-table` almost shipped without bugs, but for a hack I did.

Our product owner wanted the users to be able to select the same service from the dropdown multiple times consecutively. But, choosing the same option twice in a `<select>` does not fire the standard `change` event.

Instead of reading the `<select>` value on `change`, I tried reading it after the `click` event. On every browser I tested, `click` fired when you chose an option in the `<select>`. 

However, Chrome on macOS fired the click event on open `<select>`. Thus, you'd have to choose an `<option>`, then re-open the dropdown to add a service. 

When we got the bug report, I fixed it so on `change` we would grab the `<select>` value, add a service, and reset the `<select>` value. 

I tested this on Chrome for macOS and talked to our devops guy about fixing our company process to avoid mistakes like this. We shipped the fix the same day the bug was reported. No complaints since.

## Conclusions

If the drop-down bug hadn't happened the UI would have been perfect. Normally ServiceCore sticks to standard HTML elements and doesn't go too far off the road. It's a lesson that if we want to try stuff like that, we need a better process.

Still, the rental rates input UI has worked like a charm. The real test will be down the road if we try to reuse this thing :).