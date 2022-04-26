import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../chunks/index-b9650e14.js";
import { p as page } from "../../../chunks/stores-dcfa43fa.js";
/* empty css                                                           */import { a as api } from "../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import { n as notifications } from "../../../chunks/Noti-a1c7b9e5.js";
import { L as Loader } from "../../../chunks/Loader-d38dea32.js";
import "fetch-ponyfill";
import "../../../chunks/variables-86731e6d.js";
import "js-cookie";
import "../../../chunks/index-fea78b38.js";
const css = {
  code: "a.active.svelte-yd6ptw{color:gray;text-decoration:underline}",
  map: null
};
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<nav class="${"nav justify-content-center mt-3 mb-3"}"><a class="${["nav-link svelte-yd6ptw", $page.url.pathname === "/admin" ? "active" : ""].join(" ").trim()}" aria-current="${"page"}" href="${"/admin"}">Panel</a>
	<a class="${[
    "nav-link svelte-yd6ptw",
    $page.url.pathname === `/admin/users/${$page.params.p !== void 0 ? $page.params.p.toString() : ""}` ? "active" : ""
  ].join(" ").trim()}" href="${"/admin/users/1"}">Users</a>
	<a class="${[
    "nav-link svelte-yd6ptw",
    $page.url.pathname === "/admin/settings" ? "active" : ""
  ].join(" ").trim()}" href="${"/admin/settings"}">Settings</a>
</nav>`;
});
async function load({ session }) {
  if (!session.user || session.user.role !== "admin") {
    return { status: 302, redirect: "/" };
  }
  return { props: { token: session.token } };
}
const Admin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let loaderStatus;
  let userCount;
  (async () => {
    try {
      const res = await api("GET", "admin/stats", {}, token);
      loaderStatus = res.status ? res.status : 200;
      if (res.status >= 400) {
        throw new Error(res.message);
      }
      return userCount = Number(res);
    } catch (err) {
      notifications.push(err.message);
    }
  })();
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  return `${$$result.head += `${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-pgtp5o">`, ""}

${!loaderStatus ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `${validate_component(Loader, "Loader").$$render($$result, { loaderStatus }, {}, {
    default: () => {
      return `${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
    <div class="${"container"}"><div class="${"container"}"><div class="${"row"}"><div class="${"col-sm"}"><div class="${"card"}"><div class="${"card-body"}"><div class="${"text-center"}"><h3>${escape(userCount)}</h3>
                  <label>Users</label></div></div></div></div></div></div></div>`;
    }
  })}`}`;
});
export { Admin as default, load };
