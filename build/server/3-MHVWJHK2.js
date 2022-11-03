import {
  redirect
} from "./chunk-WQ5WAMOO.js";
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
var file = "_app/immutable/components/pages/admin/_page.svelte-5b468725.js";
var imports = ["_app/immutable/components/pages/admin/_page.svelte-5b468725.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/Tabs-db6cad05.js", "_app/immutable/chunks/stores-aa70943c.js", "_app/immutable/chunks/singletons-f95bd5ab.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/Loader-cf2f2cb3.js", "_app/immutable/modules/pages/admin/_page.js-7ff08619.js", "_app/immutable/chunks/index-d9e95725.js", "_app/immutable/chunks/_page-31949a72.js"];
var stylesheets = ["_app/immutable/assets/Tabs-4afc9f25.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=3-MHVWJHK2.js.map
