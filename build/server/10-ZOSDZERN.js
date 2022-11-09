import {
  redirect
} from "./chunk-4H4B6YVH.js";
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
var component = async () => (await import("./_page.svelte-FTY2USFB.js")).default;
var file = "_app/immutable/components/pages/user/profile/_page.svelte-7b603d78.js";
var imports = ["_app/immutable/components/pages/user/profile/_page.svelte-7b603d78.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/timeAgo-a92d5063.js", "_app/immutable/chunks/Input-7bc467ae.js", "_app/immutable/chunks/api-fa0000df.js", "_app/immutable/chunks/variables-8bc12a28.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/Loader-eb0cb2c0.js", "_app/immutable/chunks/stores-1c3e9f80.js", "_app/immutable/chunks/singletons-b0b8963f.js", "_app/immutable/chunks/username-f550a24c.js", "_app/immutable/modules/pages/user/profile/_page.js-ec67a82e.js", "_app/immutable/chunks/index-de586565.js", "_app/immutable/chunks/control-03134885.js", "_app/immutable/chunks/_page-92bfcc5a.js"];
var stylesheets = ["_app/immutable/assets/_page-e5b80638.css", "_app/immutable/assets/Input-c0648d51.css", "_app/immutable/assets/api-5ca8a06d.css", "_app/immutable/assets/Loader-930fdbc0.css"];
export {
  component,
  file,
  imports,
  index,
  page_exports as shared,
  stylesheets
};
//# sourceMappingURL=10-ZOSDZERN.js.map
