import { c as create_ssr_component, e as escape } from "./ssr.js";
import dayjs from "dayjs";
const postDate_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-1m8gdcp{color:#666}",
  map: null
};
const Post_date = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { date } = $$props;
  const dateWithTimezoneOffset = new Date(date);
  dateWithTimezoneOffset.setHours(dateWithTimezoneOffset.getHours() + 6);
  const formattedPostDate = dayjs(dateWithTimezoneOffset).format("MMMM D, YYYY");
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  $$result.css.add(css);
  return `<div class="svelte-1m8gdcp">${escape(formattedPostDate)}</div>`;
});
export {
  Post_date as P
};
