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
var component = async () => (await import("./_layout.svelte-WXOPG6UO.js")).default;
var file = "_app/immutable/components/pages/_layout.svelte-434a4d27.js";
var imports = ["_app/immutable/components/pages/_layout.svelte-434a4d27.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/preload-helper-b21cceae.js", "_app/immutable/chunks/stores-e404ea90.js", "_app/immutable/chunks/singletons-a80fc073.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/api-fa0000df.js", "_app/immutable/chunks/variables-8bc12a28.js", "_app/immutable/chunks/themeStore-adddda37.js", "_app/immutable/chunks/username-f550a24c.js"];
var stylesheets = ["_app/immutable/assets/_layout-d52f4a44.css", "_app/immutable/assets/api-5ca8a06d.css"];
export {
  component,
  file,
  imports,
  index,
  layout_server_exports as server,
  stylesheets
};
//# sourceMappingURL=0-4M6D7SKS.js.map
