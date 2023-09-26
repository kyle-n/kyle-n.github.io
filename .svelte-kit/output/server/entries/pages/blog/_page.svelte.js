import { c as create_ssr_component, d as each, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { P as Post_date } from "../../../chunks/post-date.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h2 data-svelte-h="svelte-mggmmu">Blog</h2> ${each(data.posts, (post) => {
    return `<div class="post-preview"><a href="${"/blog/" + escape(post.postPath, true)}"><h3>${escape(post.metadata.title)}</h3> ${validate_component(Post_date, "PostDate").$$render($$result, { date: post.metadata.date }, {}, {})}</a> </div>`;
  })}`;
});
export {
  Page as default
};
