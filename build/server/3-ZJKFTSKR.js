import {
  redirect
} from "./chunk-4H4B6YVH.js";
import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/admin/_page.js
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

// .svelte-kit/adapter-node/nodes/3.js
var index = 3;
var component = async () => (await import("./_page.svelte-PCOCR627.js")).default;
var file = "_app/immutable/components/pages/admin/_page.svelte-d0da20f7.js";
var imports = ["_app/immutable/components/pages/admin/_page.svelte-d0da20f7.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/Tabs-691fc758.js", "_app/immutable/chunks/stores-5f0165dd.js", "_app/immutable/chunks/singletons-a8397eab.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/Loader-cf2f2cb3.js", "_app/immutable/modules/pages/admin/_page.js-865cef08.js", "_app/immutable/chunks/index-de586565.js", "_app/immutable/chunks/control-03134885.js", "_app/immutable/chunks/_page-2a07d36d.js"];
var stylesheets = ["_app/immutable/assets/Tabs-4afc9f25.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=3-ZJKFTSKR.js.map
