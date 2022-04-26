import { c as create_ssr_component, a as subscribe, o as onDestroy, v as validate_component } from "../../../../chunks/index-b9650e14.js";
import "../../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import "luxon";
import { t as theme } from "../../../../chunks/themeStore-ec2129b8.js";
import { p as page } from "../../../../chunks/stores-dcfa43fa.js";
/* empty css                                                              */import { L as Loader } from "../../../../chunks/Loader-d38dea32.js";
import "fetch-ponyfill";
import "../../../../chunks/variables-86731e6d.js";
import "js-cookie";
import "../../../../chunks/index-fea78b38.js";
function paginate({ items, pageSize, currentPage }) {
  return items.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
}
var PaginationNav_svelte_svelte_type_style_lang = "";
var _p__svelte_svelte_type_style_lang = "";
const css = {
  code: ".svg-icon.svelte-2wuwt6 svg.svelte-2wuwt6{width:20px;height:20px}.default-img.svelte-2wuwt6.svelte-2wuwt6{display:inline-block;width:40px;height:40px;border-radius:50%;vertical-align:middle}.link.svelte-2wuwt6.svelte-2wuwt6{background:#fdac17;padding:12px;float:right;color:white}.link.svelte-2wuwt6.svelte-2wuwt6:hover{opacity:0.9}",
  map: null
};
async function load({ session }) {
  if (!session.user || session.user.role !== "admin") {
    return { status: 302, redirect: "/" };
  }
  return { props: { token: session.token } };
}
const U5Bpu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $$unsubscribe_theme;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_theme = subscribe(theme, (value) => value);
  let { token } = $$props;
  let pageSize;
  let items = [];
  let currentPage;
  $page.params.p;
  onDestroy(() => {
  });
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  $$result.css.add(css);
  paginate({ items, pageSize, currentPage });
  $$unsubscribe_page();
  $$unsubscribe_theme();
  return `${$$result.head += `${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1fufk22">`, ""}

${`${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}`;
});
export { U5Bpu5D as default, load };
