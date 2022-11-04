import {
  redirect
} from "./chunk-WQ5WAMOO.js";
import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/admin/users/_p_/_page.js
var page_exports = {};
__export(page_exports, {
  load: () => load
});
async function load({ parent }) {
  const session = await parent();
  if (!session.token || session.user && session.user.role !== "admin") {
    throw redirect(302, "/");
  }
}

// .svelte-kit/adapter-node/nodes/5.js
var index = 5;
var component = async () => (await import("./_page.svelte-7NTBJX7U.js")).default;
var file = "_app/immutable/components/pages/admin/users/_p_/_page.svelte-5212c46b.js";
var imports = ["_app/immutable/components/pages/admin/users/_p_/_page.svelte-5212c46b.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/timeAgo-a92d5063.js", "_app/immutable/chunks/themeStore-adddda37.js", "_app/immutable/chunks/Tabs-ec5edbb7.js", "_app/immutable/chunks/stores-a9dfa682.js", "_app/immutable/chunks/singletons-e36e525c.js", "_app/immutable/chunks/navigation-5c19e0d6.js", "_app/immutable/chunks/Loader-cf2f2cb3.js", "_app/immutable/modules/pages/admin/users/_p_/_page.js-5d743b5f.js", "_app/immutable/chunks/index-d9e95725.js", "_app/immutable/chunks/_page-b3762230.js"];
var stylesheets = ["_app/immutable/assets/_page-96200458.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Tabs-4afc9f25.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=5-VNANGU5S.js.map
