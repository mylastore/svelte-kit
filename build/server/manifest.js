import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.ico", "img/1.webp", "img/404.gif", "img/502.gif", "img/github.svg", "robots.txt", "service-worker.js"]),
  mimeTypes: { ".ico": "image/vnd.microsoft.icon", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".txt": "text/plain" },
  _: {
    entry: { "file": "_app/immutable/start-d53fc165.js", "imports": ["_app/immutable/start-d53fc165.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/singletons-a80fc073.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/preload-helper-b21cceae.js", "_app/immutable/chunks/control-03134885.js"], "stylesheets": [] },
    nodes: [
      () => import("./0-4M6D7SKS.js"),
      () => import("./1-WVRZOD2L.js"),
      () => import("./2-TMFE4UBE.js"),
      () => import("./3-BQZFDFBY.js"),
      () => import("./4-TZUSPWAX.js"),
      () => import("./5-XQADKG6N.js"),
      () => import("./6-MSK3O76D.js"),
      () => import("./7-CTLQTUN3.js"),
      () => import("./8-HGK3KLXX.js"),
      () => import("./9-V22INGA2.js"),
      () => import("./10-ERZPEQBJ.js"),
      () => import("./11-62IW6VJI.js")
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "/admin",
        pattern: /^\/admin\/?$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/admin/users/[p]",
        pattern: /^\/admin\/users\/([^/]+?)\/?$/,
        names: ["p"],
        types: [null],
        optional: [false],
        page: { layouts: [0], errors: [1], leaf: 5 },
        endpoint: null
      },
      {
        id: "/admin/user/[id]",
        pattern: /^\/admin\/user\/([^/]+?)\/?$/,
        names: ["id"],
        types: [null],
        optional: [false],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      },
      {
        id: "/forgot",
        pattern: /^\/forgot\/?$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 6 },
        endpoint: null
      },
      {
        id: "/login",
        pattern: /^\/login\/?$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 7 },
        endpoint: null
      },
      {
        id: "/register",
        pattern: /^\/register\/?$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 8 },
        endpoint: null
      },
      {
        id: "/user/activation/[token]",
        pattern: /^\/user\/activation\/([^/]+?)\/?$/,
        names: ["token"],
        types: [null],
        optional: [false],
        page: { layouts: [0], errors: [1], leaf: 9 },
        endpoint: null
      },
      {
        id: "/user/profile",
        pattern: /^\/user\/profile\/?$/,
        names: [],
        types: [],
        optional: [],
        page: { layouts: [0], errors: [1], leaf: 10 },
        endpoint: null
      },
      {
        id: "/user/reset/[token]",
        pattern: /^\/user\/reset\/([^/]+?)\/?$/,
        names: ["token"],
        types: [null],
        optional: [false],
        page: { layouts: [0], errors: [1], leaf: 11 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
export {
  manifest
};
//# sourceMappingURL=manifest.js.map
