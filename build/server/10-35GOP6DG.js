import {
  redirect
} from "./chunk-WQ5WAMOO.js";
import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/user/profile/_page.js
var page_exports = {};
__export(page_exports, {
  load: () => load
});
async function load({ parent }) {
  const session = await parent();
  if (!session.token) {
    throw redirect(302, "/");
  }
}

// .svelte-kit/adapter-node/nodes/10.js
var index = 10;
var component = async () => (await import("./_page.svelte-WH5JDFV7.js")).default;
var file = "_app/immutable/components/pages/user/profile/_page.svelte-e72e3654.js";
var imports = ["_app/immutable/components/pages/user/profile/_page.svelte-e72e3654.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/timeAgo-a92d5063.js", "_app/immutable/chunks/Input-7bc467ae.js", "_app/immutable/chunks/api-2eabfaba.js", "_app/immutable/chunks/variables-26eb9a07.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/Loader-8fb6ae31.js", "_app/immutable/chunks/stores-9c46a411.js", "_app/immutable/chunks/singletons-bea58de7.js", "_app/immutable/chunks/username-f550a24c.js", "_app/immutable/modules/pages/user/profile/_page.js-d9576213.js", "_app/immutable/chunks/index-d9e95725.js", "_app/immutable/chunks/_page-181f312e.js"];
var stylesheets = ["_app/immutable/assets/_page-e5b80638.css", "_app/immutable/assets/Input-c0648d51.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=10-35GOP6DG.js.map
