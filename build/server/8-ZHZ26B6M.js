import {
  redirect
} from "./chunk-WQ5WAMOO.js";
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
var component = async () => (await import("./_page.svelte-DNKSCE64.js")).default;
var file = "_app/immutable/components/pages/register/_page.svelte-5232b574.js";
var imports = ["_app/immutable/components/pages/register/_page.svelte-5232b574.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/Input-7bc467ae.js", "_app/immutable/chunks/api-2eabfaba.js", "_app/immutable/chunks/variables-26eb9a07.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/navigation-f3ebcf78.js", "_app/immutable/chunks/singletons-bea58de7.js", "_app/immutable/modules/pages/register/_page.js-3e6c192c.js", "_app/immutable/chunks/index-d9e95725.js", "_app/immutable/chunks/_page-aadd4684.js"];
var stylesheets = ["_app/immutable/assets/_page-8a10151f.css", "_app/immutable/assets/Input-c0648d51.css", "_app/immutable/assets/api-5ca8a06d.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=8-ZHZ26B6M.js.map
