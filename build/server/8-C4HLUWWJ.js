import {
  redirect
} from "./chunk-4H4B6YVH.js";
import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/register/_page.js
var page_exports = {};
__export(page_exports, {
  load: () => load
});
async function load({ parent }) {
  const session = await parent();
  if (session.token) {
    throw redirect(302, "/");
  }
}

// .svelte-kit/adapter-node/nodes/8.js
var index = 8;
var component = async () => (await import("./_page.svelte-4DGXL36P.js")).default;
var file = "_app/immutable/components/pages/register/_page.svelte-9a0cd0ee.js";
var imports = ["_app/immutable/components/pages/register/_page.svelte-9a0cd0ee.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/Input-7bc467ae.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/navigation-ca2f2b74.js", "_app/immutable/chunks/singletons-a8397eab.js", "_app/immutable/modules/pages/register/_page.js-eca9c0bc.js", "_app/immutable/chunks/index-de586565.js", "_app/immutable/chunks/control-03134885.js", "_app/immutable/chunks/_page-d6535f43.js"];
var stylesheets = ["_app/immutable/assets/_page-8a10151f.css", "_app/immutable/assets/Input-c0648d51.css", "_app/immutable/assets/api-5ca8a06d.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=8-C4HLUWWJ.js.map