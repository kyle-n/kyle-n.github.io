import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "layout": "post",
  "title": "Using Angular reactive forms to build a huge feature for ServiceCore",
  "image": "rental-rates.png",
  "date": "2020-05-16T00:00:00.000Z",
  "caption": "And it looks so simple from the outside to use."
};
const Angular_reactive_forms_rental_rates_servicecore = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-m9okwt">At ServiceCore, we’re thrilled to ship <a href="https://support.servicecore.com/hc/en-us/articles/360041523411-Add-Rental-Rates" rel="nofollow">rental rates</a>! This was a months-long project that required massive collaboration between our product owner, frontend and backend engineers and QA.</p> <p data-svelte-h="svelte-lh4lp6">I wanted to highlight some work I did to make one small part of the system - the rental rate input table.</p>  <h2 data-svelte-h="svelte-1c47mae">Background</h2> <p data-svelte-h="svelte-1noq4pe">Without going too deep into the portable toilet business, here’s what we were trying to build.</p> <p data-svelte-h="svelte-rwr9bo">ServiceCore users are waste disposal businesses. A construction company might rent 10 portable toilets per day for the next three months from a user. That user would create a rental in ServiceCore to track their inventory and billing for that construction site.</p> <p data-svelte-h="svelte-1oy0ppe">ServiceCore users can create preset line item charges, like maintenance fees. Those line item charges can attach to a rental.</p> <p data-svelte-h="svelte-1wg13qr">The problem that necessitated rental rates was these line item charges were static. There was no way to give a customer a special deal for a specific rental, like $0 service charges. You’d have to override the line item on every single invoice created for that rental. Not fun for big companies doing thousands of invoices a day!</p> <p data-svelte-h="svelte-1hs9kbo">With rental rates, users would be able to select any service charge and set special per-rental pricing, notes and taxable status.</p> <p data-svelte-h="svelte-1iqna8n">In order to set rental rates, however, we needed a rate input table.</p> <h2 data-svelte-h="svelte-1djpdnr">Product requirements</h2> <p data-svelte-h="svelte-1n5j1rg">The rental rate input table should display every product attached to a rental. Beneath each product is a dropdown of line item charges that could be attached to a product. Selectinga charge would add it to a table, with the default price, name, description and taxable status editable.</p> <p data-svelte-h="svelte-r8ymae">So: rentals have products, products have line item charges, and rental rates are special per-rental instances of a line item charge. Make sense?</p> <p data-svelte-h="svelte-xsqfp8"><img src="https://i.imgur.com/nbEwLVI.png" alt="Overall view of the rate input table"></p> <p data-svelte-h="svelte-1gttssc">The last two options in the line item dropdown should be “Add Service” and “Assign Service”, which I’ll explain later.</p> <h2 data-svelte-h="svelte-1y7y6hs">Implementation</h2> <h3 data-svelte-h="svelte-17ftxjm">Goals</h3> <p data-svelte-h="svelte-jr8si8">As every frontend developer knows, forms are complicated. This form had a lot of moving parts, so the code could turn ugly quickly.</p> <p data-svelte-h="svelte-cvkad1">I built this with three things in mind:</p> <ol data-svelte-h="svelte-18r2mbh"><li>It needed to work well for rental rates</li> <li>It needed to be reusable in case future features need a similar UI</li> <li>It needed to keep the logic under control with reactive programming</li></ol> <p data-svelte-h="svelte-php1gy">Angular’s <a href="https://angular.io/guide/reactive-forms" rel="nofollow">Reactive Forms</a> made the logic more functional and less imperative. Reactive Forms store form state in FormControls, which can be grouped inside FormGroups or FormArrays. FormGroups, FormArrays and FormControls all have first-class RxJS APIs. You can subscribe to <code>valueChanges</code> or <code>statusChanges</code> (valid/invalid) on any of them and <em>react</em> to form state updates.</p> <h3 data-svelte-h="svelte-1diyj43">Overview</h3> <p data-svelte-h="svelte-q2e2ms">When the user opens the rental rate form, the <code>rental-rate-form</code> container component loads the rental’s data. It passes any existing rental rates into the <code>rate-input-table</code>, the actual UI. The <code>rental-rate-form</code> also <code>PATCH</code>es the rental with its new rates on submit.</p> <p data-svelte-h="svelte-1qps8sm">This component accomplishes goal #2, keeping the rental logic separate from the UI.</p> <p data-svelte-h="svelte-1y2ceb6">On instantiation, the <code>rate-input-table</code> transforms input rates into table rows using pure static functions. This keeps the instantiation logic testable.</p> <p data-svelte-h="svelte-5dz8qa">The <code>rate-input-table</code> stores its data as nested <code>AbstractControl</code>s (the base class of FormArray, FormGroup and FormControl). The structure goes: Products is a FormArray. Each product is a FormGroup that contains product name, quantity, and a FormArray of rates. Each rate is FormGroup that contains FormControls for line item name, description, price, and taxable status.</p> <p data-svelte-h="svelte-v17d0t">Each product FormGroup also has a FormControl for the line item dropdown. Any value change there reactively adds the selected rate to the table.</p> <h3 data-svelte-h="svelte-321qzr">Wins</h3> <h4 data-svelte-h="svelte-2a7m58">RxJS ♥</h4> <p data-svelte-h="svelte-j8dkhv">Reactive programming is a blast. It contained the logic for each part of the form as subscriptions to that AbstractControl’s <code>valueChanges</code>.</p> <p data-svelte-h="svelte-kwf6fl">It also simplified working with asynchronous requests. For example, the <code>pipe</code> from add service dropdown takes the <code>valueChange</code> (the <code>id</code> of the selected service) and <code>flatMap</code>s it into a <code>GET</code> req for the full service. The full service is transformed into a new FormControl, which is pushed into the FormArray for the given product.</p> <pre class="language-undefined"><!-- HTML_TAG_START -->${`<code class="language-undefined">      // add new service on select
      const newServiceSub = rateSelectChanges.pipe(
        filter(serviceIdOrOption =&gt; &#123;
          // service ids come through as &#39;11&#39;
          const serviceId = parseInt(serviceIdOrOption, 10);
          return !Number.isNaN(serviceId);
        &#125;),
        map((serviceId: string) =&gt; parseInt(serviceId, 10)),
        flatMap(serviceId =&gt; this._serviceService.getService(serviceId))
      ).subscribe((service: Service) =&gt; &#123;
          this.addServiceToRates(service, entityFormGroup.get(&#39;rates&#39;) as FormArray);
          entityFormGroup.get(&#39;rateSelect&#39;).patchValue(&#39;choose&#39;);
        &#125;, error =&gt; this._userAlertService.error(error, true)
      );
</code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-1l9xoar">No <code>async</code>/<code>await</code> weirdness, no race conditions, no confusing logic. Just functional transformations. First-class RxJS support is far and away the best part of Angular. Just look at when we have to do something <em>really</em> complicated:</p> <pre class="language-undefined"><!-- HTML_TAG_START -->${`<code class="language-undefined">      const assignServiceSub = rateSelectChanges.pipe(
        filter(selectVal =&gt; selectVal === &#39;assign&#39;),
        flatMap(() =&gt; &#123;
          const serviceIdsToExcludeFromAssociateDialog: number[] = entityFormGroup.value.entity.services
            .map(service =&gt; service.id);
          return this._serviceDialogService.openAssociateServiceDialog(
            entityFormGroup.value.entity.id,
            serviceIdsToExcludeFromAssociateDialog
          );
        &#125;),
        filter((updatedServices) =&gt; !!(updatedServices)),
        map((allServices: Service[]) =&gt; &#123;
          const previousServiceIds: number[] = entityFormGroup.value.entity?.services?.map(service =&gt; service.id) || [];
          return allServices.filter(serviceFromApi =&gt; !previousServiceIds.includes(serviceFromApi.id));
        &#125;),
        map(newServices =&gt; newServices.map(newService =&gt; this._serviceService.getService(newService.id))),
        flatMap(newServiceRequests =&gt; forkJoin(newServiceRequests))
      ).subscribe(fullNewServices =&gt; &#123;
        if (fullNewServices?.length) &#123;
          fullNewServices.forEach(service =&gt; &#123;
            this.addServiceToRates(service, entityFormGroup.get(&#39;rates&#39;) as FormArray);
          &#125;);
        &#125;
        this.reloadFullServices(entityFormGroup as FormGroup);
        entityFormGroup.get(&#39;rateSelect&#39;).patchValue(&#39;choose&#39;);
      &#125;);
</code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-lhs0p1">This block grabs services (line item charges) already associated to a product and passing them to a dialog. The dialog filters out these previously associated services. Then, if the user selects any services to add to a product in the dialog, these are passed out of the dialog’s Observable and transformed into requests for the full data for each newly associated service. When we’ve received all responses, the services are added to the table as rates. RxJS makes this kind of async work <em>easy</em>.</p> <h4 data-svelte-h="svelte-1hogjrx">Functional programming ♥</h4> <p data-svelte-h="svelte-1ct9rvy">The last code win was creating the select service dropdown. It transformed an array of services into <code>&lt;options&gt;</code>, sorting by billing period on the service.</p> <p data-svelte-h="svelte-bc975"><img src="http://i.imgur.com/sJthlnx.png" alt="The add service dropdown for ServiceCore rental rates"></p> <p data-svelte-h="svelte-1rljkqd">All that logic used a pure static class function, making it a breeze to unit test.</p> <h3 data-svelte-h="svelte-1nm1uzz">Losses</h3> <p data-svelte-h="svelte-1kx1o23"><code>rate-input-table</code> almost shipped without bugs, but for a hack I did.</p> <p data-svelte-h="svelte-yzrl5m">Our product owner wanted the users to be able to select the same service from the dropdown multiple times consecutively. But, choosing the same option twice in a <code>&lt;select&gt;</code> does not fire the standard <code>change</code> event.</p> <p data-svelte-h="svelte-15ie8r3">Instead of reading the <code>&lt;select&gt;</code> value on <code>change</code>, I tried reading it after the <code>click</code> event. On every browser I tested, <code>click</code> fired when you chose an option in the <code>&lt;select&gt;</code>.</p> <p data-svelte-h="svelte-grk0d3">However, Chrome on macOS fired the click event on open <code>&lt;select&gt;</code>. Thus, you’d have to choose an <code>&lt;option&gt;</code>, then re-open the dropdown to add a service.</p> <p data-svelte-h="svelte-f6721p">When we got the bug report, I fixed it so on <code>change</code> we would grab the <code>&lt;select&gt;</code> value, add a service, and reset the <code>&lt;select&gt;</code> value.</p> <p data-svelte-h="svelte-115hqvm">I tested this on Chrome for macOS and talked to our devops guy about fixing our company process to avoid mistakes like this. We shipped the fix the same day the bug was reported. No complaints since.</p> <h2 data-svelte-h="svelte-lmdog2">Conclusions</h2> <p data-svelte-h="svelte-ore47x">If the drop-down bug hadn’t happened the UI would have been perfect. Normally ServiceCore sticks to standard HTML elements and doesn’t go too far off the road. It’s a lesson that if we want to try stuff like that, we need a better process.</p> <p data-svelte-h="svelte-1cem0pp">Still, the rental rates input UI has worked like a charm. The real test will be down the road if we try to reuse this work :).</p>`;
});
export {
  Angular_reactive_forms_rental_rates_servicecore as default,
  metadata
};
