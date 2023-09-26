import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "layout": "post",
  "title": "Why smaller components are better",
  "date": "2022-05-23T00:00:00.000Z",
  "keywords": "javascript, typescript, angular, frontend",
  "image": "component-tree.png",
  "caption": "Via angular.io"
};
const Why_use_small_components = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-1h22a91">As an <a href="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" rel="nofollow">Angular consultant</a>, one of my favorite tricks to rapidly improve client code is to <strong>make the components smaller</strong>.</p> <p data-svelte-h="svelte-1otxs2k">On a recent client project, implementing best practices let me reduce calls to a complex function from 223,000 per render to 1,200. Smaller components make better, faster UIs.</p> <h2 data-svelte-h="svelte-1c47mae">Background</h2> <p data-svelte-h="svelte-zapfx4">A good component should:</p> <ol data-svelte-h="svelte-1tm4je2"><li>Make sense on its own</li> <li>Do <strong>one</strong> thing</li> <li>Be reusable where possible</li></ol> <p data-svelte-h="svelte-1j99ppi">Components should be like <strong>atoms</strong>. We all remember high school physics - an atom is a thing that is no longer an atom if you try to divide it. Components should be so small that dividing them further doesn’t make sense.</p> <p data-svelte-h="svelte-c2rtqi">This fits the <a href="https://en.wikipedia.org/wiki/Single-responsibility_principle" rel="nofollow">single-responsibility principle</a>, a fancy computer science version of point #2 above.</p> <blockquote data-svelte-h="svelte-u8aldx"><p>Every module, class or function in a computer program should have responsibility over a single part of that program’s functionality, and it should encapsulate that part. All of that module, class or function’s services should be narrowly aligned with that responsibility.</p></blockquote> <h2 data-svelte-h="svelte-14lpud">How small is small?</h2> <p data-svelte-h="svelte-bqbdkb">Here’s an example of how small components should be, pulled from the <a href="https://reactjs.org/docs/thinking-in-react.html" rel="nofollow">React documentation</a>.</p> <p data-svelte-h="svelte-gptt7r">Imagine we’re making a simple web app for our online store. We have a frontend calling an API to get a list of products, then displaying that list.</p> <div style="margin: 0 auto;" data-svelte-h="svelte-351ja4"><img src="/static/img/web-store-ui.png" alt="A basic UI listing products for sale"></div> <p data-svelte-h="svelte-i8n6u6">It is an easy mistake to look at this code and assume it should all be one component.</p> <p data-svelte-h="svelte-4bj3kw">Here’s the official recommendation on how granular the components should be to build this UI - and remember, this is the recommendation of a bunch of Meta engineers who spend all day building a component-based framework:</p> <div style="margin: 0 auto;" data-svelte-h="svelte-1wp9xy0"><img src="/static/img/web-store-ui-split.png" alt="A basic UI listing products for sale split into sub-components"></div> <p data-svelte-h="svelte-1gej3bu">They recommend splitting this UI into five components:</p> <ol data-svelte-h="svelte-1ckrlc3"><li><strong>FilterableProductTable</strong> (orange): contains the entirety of the example</li> <li><strong>SearchBar</strong> (blue): receives all user input</li> <li><strong>ProductTable</strong> (green): displays and filters the data collection based on user input</li> <li><strong>ProductCategoryRow</strong> (turquoise): displays a heading for each category</li> <li><strong>ProductRow</strong> (red): displays a row for each product</li></ol> <p data-svelte-h="svelte-18z9tw7">Could you split this into smaller components, like one for each cell? Sure, but to me that splits the atom. If your component directly displays one piece of data without even any logic around the rendering, that doesn’t make sense. The component is just template interpolation with extra complexity.</p> <p data-svelte-h="svelte-1xcrn32">Now, if each cell had complex currency formatting or a popover menu, that would be worth its own component. It’s always a judgement call for how granular you want to go.</p> <p data-svelte-h="svelte-itzehz">If you’re stuck, just look at everything the component does and ask if it does one thing. Does it collect data for an API to pass to presenters? Does it present exactly one piece of data?</p> <p data-svelte-h="svelte-1egjl97">Keeping components this small is useful for a couple reasons.</p> <ul data-svelte-h="svelte-11tc6uv"><li>Easier to read</li> <li>Easier to maintain</li> <li>Future development is faster, since you may be able to reuse some of your atoms</li> <li>Follows single-responsibility principle</li></ul> <h2 data-svelte-h="svelte-80tbqu">The alternative is worse</h2> <p data-svelte-h="svelte-1k2m4x8">Making granular components may seem like a pain at first, but believe me, the alternative is worse.</p> <p data-svelte-h="svelte-a0ptmx">I worked in an application where large chunks of the code were contained in just a handful of AngularJS components. These components were massive - each one was at least 5,000 lines long, not counting the templates.</p> <p data-svelte-h="svelte-1p77v83"><em>These files were impossible to edit</em>. Our scrum team tripled our time estimates when we had to touch these files. It was impossible to navigate them, impossible to reuse code, just impossible to ship features.</p> <p data-svelte-h="svelte-1nxwxfw">Small components don’t let that happen. They do exactly one thing and are so easy to understand and modify they don’t slow you down one bit.</p>`;
});
export {
  Why_use_small_components as default,
  metadata
};
