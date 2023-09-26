import { c as create_ssr_component, e as escape, v as validate_component } from "../../chunks/ssr.js";
const header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "nav.svelte-60lm3e.svelte-60lm3e{display:flex;justify-content:space-around}nav.svelte-60lm3e a.svelte-60lm3e{border-bottom:2px solid transparent}nav.svelte-60lm3e a.svelte-60lm3e:hover{border-bottom:2px solid #d9d8dc}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<header data-svelte-h="svelte-jaj4c8"><h1>Kyle Nazario</h1> <nav class="svelte-60lm3e"><a href="/" class="svelte-60lm3e">Home</a> <a href="/about" class="svelte-60lm3e">About</a> <a href="/blog" class="svelte-60lm3e">Blog</a> <a href="/contact" class="svelte-60lm3e">Contact</a></nav> </header>`;
});
const footer_svelte_svelte_type_style_lang = "";
const css = {
  code: "hr.svelte-y12ktw{margin:2rem 0}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const copyrightYear = (/* @__PURE__ */ new Date()).getFullYear();
  $$result.css.add(css);
  return `<hr class="svelte-y12ktw"> <footer><p>© ${escape(copyrightYear)} Kyle Nazario</p> </footer>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
