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
var component = async () => (await import("./_layout.svelte-YURVQVXR.js")).default;
var file = "_app/immutable/components/pages/_layout.svelte-5c58b0a8.js";
var imports = ["_app/immutable/components/pages/_layout.svelte-5c58b0a8.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/preload-helper-aa6bc0ce.js", "_app/immutable/chunks/stores-a9dfa682.js", "_app/immutable/chunks/singletons-e36e525c.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/api-c0e3e547.js", "_app/immutable/chunks/variables-5c3e082a.js", "_app/immutable/chunks/themeStore-adddda37.js", "_app/immutable/chunks/username-f550a24c.js"];
var stylesheets = ["_app/immutable/assets/_layout-d52f4a44.css", "_app/immutable/assets/api-5ca8a06d.css"];
export {
  component,
  file,
  imports,
  index,
  layout_server_exports as server,
  stylesheets
};
//# sourceMappingURL=0-6WH7P2BE.js.map
