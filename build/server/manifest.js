import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.ico", "img/1.webp", "img/404.gif", "img/502.gif", "img/github.svg", "robots.txt"]),
  mimeTypes: { ".ico": "image/vnd.microsoft.icon", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".txt": "text/plain" },
  _: {
    entry: { "file": "_app/immutable/start-dfe8e1d0.js", "imports": ["_app/immutable/start-dfe8e1d0.js", "_app/immutable/chunks/preload-helper-aa6bc0ce.js", "_app/immutable/chunks/index-5031b6ad.js", "_app/immutable/chunks/singletons-9fa75235.js", "_app/immutable/chunks/index-9ff150c3.js", "_app/immutable/chunks/index-d9e95725.js"], "stylesheets": [] },
    nodes: [
      () => import("./0-EAZTS5LM.js"),
      () => import("./1-WVRZOD2L.js"),
      () => import("./2-TVPGEHXZ.js"),
      () => import("./3-QV4AM62V.js"),
      () => import("./4-ESDVKGPP.js"),
      () => import("./5-URR3R2B2.js"),
      () => import("./6-YJF3RCRY.js"),
      () => import("./7-TJL7QH4O.js"),
      () => import("./8-HZEVCCI3.js"),
      () => import("./9-NZDYKRCM.js"),
      () => import("./10-JQ7FB5A2.js"),
      () => import("./11-DKEBLKED.js")
    ],
    routes: [
      {
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "admin",
        pattern: /^\/admin\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "forgot",
        pattern: /^\/forgot\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 6 },
        endpoint: null
      },
      {
        id: "login",
        pattern: /^\/login\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 7 },
        endpoint: null
      },
      {
        id: "register",
        pattern: /^\/register\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 8 },
        endpoint: null
      },
      {
        id: "user/profile",
        pattern: /^\/user\/profile\/?$/,
        names: [],
        types: [],
        page: { layouts: [0], errors: [1], leaf: 10 },
        endpoint: null
      },
      {
        id: "admin/user/[id]",
        pattern: /^\/admin\/user\/([^/]+?)\/?$/,
        names: ["id"],
        types: [null],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      },
      {
        id: "admin/users/[p]",
        pattern: /^\/admin\/users\/([^/]+?)\/?$/,
        names: ["p"],
        types: [null],
        page: { layouts: [0], errors: [1], leaf: 5 },
        endpoint: null
      },
      {
        id: "user/activation/[token]",
        pattern: /^\/user\/activation\/([^/]+?)\/?$/,
        names: ["token"],
        types: [null],
        page: { layouts: [0], errors: [1], leaf: 9 },
        endpoint: null
      },
      {
        id: "user/reset/[token]",
        pattern: /^\/user\/reset\/([^/]+?)\/?$/,
        names: ["token"],
        types: [null],
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
