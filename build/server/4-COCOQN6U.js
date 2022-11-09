import {
  redirect
} from "./chunk-4H4B6YVH.js";
import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/admin/user/_id_/_page.js
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

// .svelte-kit/adapter-node/nodes/4.js
var index = 4;
var component = async () => (await import("./_page.svelte-WFVTEGTI.js")).default;
var file = "_app/immutable/components/pages/admin/user/_id_/_page.svelte-6c78ea80.js";
var imports = ["_app/immutable/components/pages/admin/user/_id_/_page.svelte-6c78ea80.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/api-fa0000df.js", "_app/immutable/chunks/variables-8bc12a28.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/timeAgo-a92d5063.js", "_app/immutable/chunks/stores-b60a9a50.js", "_app/immutable/chunks/singletons-99a2ae96.js", "_app/immutable/chunks/Tabs-d7606dba.js", "_app/immutable/chunks/Loader-eb0cb2c0.js", "_app/immutable/modules/pages/admin/user/_id_/_page.js-9b63b04a.js", "_app/immutable/chunks/index-de586565.js", "_app/immutable/chunks/control-03134885.js", "_app/immutable/chunks/_page-9dcb80cf.js"];
var stylesheets = ["_app/immutable/assets/_page-0d880b0a.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Tabs-4afc9f25.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=4-COCOQN6U.js.map
