---
layout: post
title: A simple checkbox that I am proud of making
org: Personal
keywords: checkbox, example angular code, angular 6, front end frameworks, ngmodel
categories: angular, dev, personal, blog
---

I built a checkbox with a surprising amount of complexity behind it. This little guy had a lot of business rules inside him, and I'm proud of how he turned out. 

<!--break-->

### Background and business logic

[ServiceCore](https://www.servicecore.com/) has a form for creating invoices. It is one of the most complex pieces of code in the entire frontend. If you create an invoice from a rental, it has to autofill the customer, site and billing dates from that rental. Create an invoice from a job, and it autofills all that plus attachments and line items from the job. 

Line items are particularly complicated. ServiceCore users use them to charge their customers for services. For example, a ServiceCore user might schedule a emergency service job for one of their customers. They can add an emergency service line item to the invoice. 

Line items can have one class. ServiceCore users use these to categorize and track their line item charges. I heard at least one customer uses classes to track sales by salesperson. 

**TL;DR**: Invoices can have line items, line items can have one class.

### The table

Line items are displayed in a table when creating an invoice. 

![](/blog/assets/service-table.png)

Classes are displayed in a a `select` in one column of the table.

Our product requirements were to give users a simple way to apply a class to all of their line items. Here are the rules:

* If the invoice has at least two line items, one line item has a class, and the other line item(s) has/have no class, display a checkbox with the text "Apply to all" next to the "Class" header.
* On check, this should apply the class from the one element with a class to the other line items. 
* On uncheck, this should remove the class from all line items.
* If the user manually selects the same class on all line items and there are at least two line items, the checkbox should appear and be checked.
* Line items from rentals (`generated`) do not count and should not be editable.

### Implementation

As you can see, this is a surprising amount of business rules for one small checkbox! Implementing this could have turned into a state management nightmare. 

However, I took advantage of Angular's first-class support for RxJS, a wonderful technology that lets you program reactively, not imperatively. Here's what the checkbox component class looks like:

```typescript
import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {FormArray} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-apply-category-to-all-services',
  templateUrl: './apply-category-to-all-services.component.html'
})
export class ApplyCategoryToAllServicesComponent implements OnChanges, OnDestroy {
  @Input() parentFormArray: FormArray;

  public allChecked = false;

  public checkboxVisible: boolean;

  private subscriptions: Subscription = new Subscription();

  private static allUseSameClass(formArray: FormArray): boolean {
    const selectedCategory = ApplyCategoryToAllServicesComponent.getFirstCategory(formArray);
    return formArray.controls.filter(formControl => !formControl.get('category').disabled)
      .reduce((allUseSameClass, formControl) => {
        const fcValue = formControl.value;
        if (fcValue && fcValue.hasOwnProperty('category')) {
          return allUseSameClass && selectedCategory === fcValue.category;
        } else {
          return allUseSameClass;
        }
      }, true);
  }

  private static getCheckBoxVisible(formArray: FormArray): boolean {
    const enabledLineItemFormControls = formArray.controls.filter(formControl => !formControl.get('category').disabled);
    const hasMultipleServices = enabledLineItemFormControls.length > 1;
    const servicesWithCategories = enabledLineItemFormControls
      .reduce((withCategoriesTotal, formControl) => {
        const service = formControl.value;
        return withCategoriesTotal + (service && service.category && service.category.length > 0
          ? 1 : 0);
      }, 0);
    return hasMultipleServices && servicesWithCategories > 0 &&
      ApplyCategoryToAllServicesComponent.onlyOneCategoryUsed(formArray);
  }

  private static getFirstCategory(formArray: FormArray): string {
    let firstCategory = ''
    formArray.controls.filter(formControl => !formControl.get('category').disabled)
      .forEach(formControl => {
        const service = formControl.value;
        if (service && service.category && !firstCategory) {
          firstCategory = service.category;
        }
      });
    return firstCategory;
  }

  private static getFormArrayCategoryUpdate(formArray: FormArray, newCategory: string): any[] {
    return formArray.controls.map(formControl => {
      const fcValue = formControl.value;
      let category = newCategory;
      if (formControl.get('category').disabled) {
        category = formControl.get('category').value;
      }
      return Object.assign({}, fcValue, {category});
    });
  }

  private static onlyOneCategoryUsed(formArray: FormArray): boolean {
    const categorySelectTotals = formArray.controls.filter(formControl => !formControl.get('category').disabled)
      .reduce((categoriesSelected: any, formControl) => {
        const service = formControl.value;
        if (service && service.category) {
          if (categoriesSelected.hasOwnProperty(service.category)) {
            categoriesSelected[service.category]++;
          } else {
            categoriesSelected[service.category] = 1;
          }
        }
        return categoriesSelected;
      }, <any>{});

    return Object.keys(categorySelectTotals).length === 1;
  }

  constructor() { }

  public toggleAllChecked(event: MouseEvent): void {
    if ((<HTMLInputElement>event.target).checked) {
      const categoryToApply = ApplyCategoryToAllServicesComponent.getFirstCategory(this.parentFormArray);
      this.parentFormArray.patchValue(
        ApplyCategoryToAllServicesComponent.getFormArrayCategoryUpdate(this.parentFormArray, categoryToApply)
      );
    } else {
      this.parentFormArray.patchValue(
        ApplyCategoryToAllServicesComponent.getFormArrayCategoryUpdate(this.parentFormArray, '')
      );
    }
  }

  private initFormSubs(formArray: FormArray): void {
    const showApplyToAllSub = formArray.valueChanges.pipe(
      map(() => ApplyCategoryToAllServicesComponent.getCheckBoxVisible(formArray))
    ).subscribe(checkboxVisible => {
      this.checkboxVisible = checkboxVisible;
    });
    const allCheckedSub = formArray.valueChanges.pipe(
      map(() => ApplyCategoryToAllServicesComponent.allUseSameClass(formArray))
    ).subscribe(allChecked => this.allChecked = allChecked);

    this.subscriptions.add(showApplyToAllSub);
    this.subscriptions.add(allCheckedSub);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription();
    }
    this.checkboxVisible = ApplyCategoryToAllServicesComponent.getCheckBoxVisible(this.parentFormArray);
    this.initFormSubs(this.parentFormArray);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
```