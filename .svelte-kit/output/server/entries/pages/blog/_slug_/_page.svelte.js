import { c as create_ssr_component, e as escape, v as validate_component, f as add_attribute, m as missing_component } from "../../../../chunks/ssr.js";
import { P as Post_date } from "../../../../chunks/post-date.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#title-and-date.svelte-1gdvj1q.svelte-1gdvj1q{margin-bottom:2rem}#title-and-date.svelte-1gdvj1q h2.svelte-1gdvj1q{margin-bottom:0.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<article><div id="title-and-date" class="svelte-1gdvj1q"><h2 class="svelte-1gdvj1q">${escape(data.metadata.title)}</h2> ${validate_component(Post_date, "PostDate").$$render($$result, { date: data.metadata.date }, {}, {})}</div> ${data.metadata.image ? `<img src="${"/img/" + escape(data.metadata.image, true)}"${add_attribute("alt", data.metadata.title, 0)}>` : ``} <div>${validate_component(data.content || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> </article>`;
});
export {
  Page as default
};
