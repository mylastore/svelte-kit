import {
  redirect
} from "./chunk-4H4B6YVH.js";
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
var file = "_app/immutable/components/pages/admin/users/_p_/_page.svelte-70ae6321.js";
var imports = ["_app/immutable/components/pages/admin/users/_p_/_page.svelte-70ae6321.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/timeAgo-a92d5063.js", "_app/immutable/chunks/themeStore-adddda37.js", "_app/immutable/chunks/Tabs-691fc758.js", "_app/immutable/chunks/stores-5f0165dd.js", "_app/immutable/chunks/singletons-a8397eab.js", "_app/immutable/chunks/navigation-ca2f2b74.js", "_app/immutable/chunks/Loader-cf2f2cb3.js", "_app/immutable/modules/pages/admin/users/_p_/_page.js-76f42d3b.js", "_app/immutable/chunks/index-de586565.js", "_app/immutable/chunks/control-03134885.js", "_app/immutable/chunks/_page-3f7723e1.js"];
var stylesheets = ["_app/immutable/assets/_page-96200458.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Tabs-4afc9f25.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=5-LZ2NNWBU.js.map