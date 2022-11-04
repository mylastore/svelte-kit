import {
  redirect
} from "./chunk-4H4B6YVH.js";
import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/login/_page.js
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

// .svelte-kit/adapter-node/nodes/7.js
var index = 7;
var component = async () => (await import("./_page.svelte-ZHRQWMUX.js")).default;
var file = "_app/immutable/components/pages/login/_page.svelte-018d8dc4.js";
var imports = ["_app/immutable/components/pages/login/_page.svelte-018d8dc4.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/Input-7bc467ae.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/username-f550a24c.js", "_app/immutable/modules/pages/login/_page.js-0aad6264.js", "_app/immutable/chunks/index-de586565.js", "_app/immutable/chunks/control-03134885.js", "_app/immutable/chunks/_page-31de1265.js"];
var stylesheets = ["_app/immutable/assets/_page-4c3ae24a.css", "_app/immutable/assets/Input-c0648d51.css", "_app/immutable/assets/api-5ca8a06d.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=7-FO2VGOO2.js.map
