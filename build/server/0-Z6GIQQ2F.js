import {
  __export
} from "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/_layout.server.js
var layout_server_exports = {};
__export(layout_server_exports, {
  load: () => load
});
var load = ({ locals }) => {
  return {
    token: locals.token,
    user: locals.user
  };
};

// .svelte-kit/adapter-node/nodes/0.js
var index = 0;
var component = async () => (await import("./_layout.svelte-AABPLQJ7.js")).default;
var file = "_app/immutable/components/pages/_layout.svelte-e31b0015.js";
var imports = ["_app/immutable/components/pages/_layout.svelte-e31b0015.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/preload-helper-aa6bc0ce.js", "_app/immutable/chunks/stores-9c46a411.js", "_app/immutable/chunks/singletons-bea58de7.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/api-2eabfaba.js", "_app/immutable/chunks/variables-26eb9a07.js", "_app/immutable/chunks/themeStore-adddda37.js", "_app/immutable/chunks/username-f550a24c.js"];
var stylesheets = ["_app/immutable/assets/_layout-d52f4a44.css", "_app/immutable/assets/api-5ca8a06d.css"];
export {
  component,
  file,
  imports,
  index,
  layout_server_exports as server,
  stylesheets
};
//# sourceMappingURL=0-Z6GIQQ2F.js.map
