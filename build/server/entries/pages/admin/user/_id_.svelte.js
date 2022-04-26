import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index-b9650e14.js";
import "../../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import "luxon";
import { p as page } from "../../../../chunks/stores-dcfa43fa.js";
/* empty css                                                              */import { L as Loader } from "../../../../chunks/Loader-d38dea32.js";
import "fetch-ponyfill";
import "../../../../chunks/variables-86731e6d.js";
import "js-cookie";
var _id__svelte_svelte_type_style_lang = "";
const css = {
  code: ".avatar.svelte-sotv7e.svelte-sotv7e{border-radius:50%;width:150px;height:150px}.profile.svelte-sotv7e p.svelte-sotv7e{margin-bottom:5px}",
  map: null
};
async function load({ session }) {
  if (session.user.role !== "admin") {
    return { status: 302, redirect: "/" };
  }
  return { props: { token: session.token } };
}
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { token } = $$props;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Admin User Profile</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-10jo1mu">`, ""}

${`${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}`;
});
export { U5Bidu5D as default, load };
