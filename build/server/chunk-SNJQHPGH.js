import {
  page
} from "./chunk-IPPZVKT5.js";
import {
  create_ssr_component,
  subscribe
} from "./chunk-INXCOC2Z.js";

// .svelte-kit/adapter-node/chunks/Tabs.js
var css = {
  code: "a.active.svelte-yd6ptw{color:gray;text-decoration:underline}",
  map: null
};
var Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<nav class="${"nav justify-content-center mt-3 mb-3"}"><a class="${["nav-link svelte-yd6ptw", $page.url.pathname === "/admin" ? "active" : ""].join(" ").trim()}" aria-current="${"page"}" href="${"/admin"}">Panel</a>
	<a class="${[
    "nav-link svelte-yd6ptw",
    $page.url.pathname === `/admin/users/${$page.params.p !== void 0 ? $page.params.p.toString() : ""}` ? "active" : ""
  ].join(" ").trim()}" href="${"/admin/users/1"}">Users</a>
</nav>`;
});

export {
  Tabs
};
//# sourceMappingURL=chunk-SNJQHPGH.js.map
