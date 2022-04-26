const timestamp = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
};
const build = [
  "/_app/start-c5932678.js",
  "/_app/pages/__layout.svelte-fb8adec1.js",
  "/_app/assets/pages/__layout.svelte-e601a93d.css",
  "/_app/pages/__error.svelte-a5cd7e83.js",
  "/_app/assets/pages/__error.svelte-5c3e9ba5.css",
  "/_app/pages/admin/index.svelte-415a30da.js",
  "/_app/pages/admin/settings.svelte-8143b6f9.js",
  "/_app/assets/pages/admin/settings.svelte-bb299afb.css",
  "/_app/pages/admin/user/_id_.svelte-5d180a0e.js",
  "/_app/assets/pages/admin/user/_id_.svelte-9aad1b47.css",
  "/_app/pages/admin/users/_p_.svelte-0e2bc4a9.js",
  "/_app/assets/pages/admin/users/_p_.svelte-5483eaad.css",
  "/_app/pages/forgot.svelte-7ddeaa08.js",
  "/_app/assets/pages/forgot.svelte-6d795ff5.css",
  "/_app/pages/index.svelte-8c95e745.js",
  "/_app/assets/pages/index.svelte-efe6fd70.css",
  "/_app/pages/login.svelte-a046c4d5.js",
  "/_app/assets/pages/login.svelte-58d2e7a5.css",
  "/_app/pages/register.svelte-83da987e.js",
  "/_app/assets/pages/register.svelte-702f7eb4.css",
  "/_app/pages/user/activation/_token_.svelte-51d78851.js",
  "/_app/pages/user/profile/_username_.svelte-dabe3832.js",
  "/_app/assets/pages/user/profile/_username_.svelte-8157b0ca.css",
  "/_app/pages/user/reset/_token_.svelte-ad88c43c.js",
  "/_app/chunks/index-30349cbd.js",
  "/_app/chunks/index-dbf04213.js",
  "/_app/chunks/singletons-d1fb5791.js",
  "/_app/chunks/preload-helper-e4860ae8.js",
  "/_app/chunks/variables-86731e6d.js",
  "/_app/chunks/Noti-2cff4241.js",
  "/_app/assets/Noti-125f3179.css",
  "/_app/chunks/themeStore-82e15e77.js",
  "/_app/chunks/stores-96b8dbae.js",
  "/_app/chunks/AlertTriangleIcon-6201c8a0.js",
  "/_app/chunks/Tabs-dc3f734c.js",
  "/_app/assets/Tabs-c5c681d7.css",
  "/_app/chunks/Loader-4cfa1ebc.js",
  "/_app/assets/Loader-4f50ce73.css",
  "/_app/chunks/timeAgo-52fda032.js",
  "/_app/chunks/navigation-0e6511d1.js",
  "/_app/chunks/Input-047a673d.js",
  "/_app/assets/Input-1edb3b13.css",
  "/_app/chunks/dropdown-9fe94900.js",
  "/_app/chunks/base-component-0e5a31db.js",
  "/_app/chunks/collapse-5fe998b3.js"
];
const files = [
  "/favicon.ico",
  "/img/1.webp",
  "/img/github.svg",
  "/robots.txt"
];
const CACHED_ASSETS = `cache-${timestamp}`;
const TO_CACHE = build.concat(files);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHED_ASSETS).then((cache) => cache.addAll(TO_CACHE)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (!key.includes(timestamp))
        await caches.delete(key);
    }
    await self.clients.claim();
  }));
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (!(request.url.indexOf("http") === 0))
    return;
  if (request.method !== "GET" || request.headers.has("range") || request.cache === "only-if-cached" && request.mode !== "same-origin")
    return;
  const url = new URL(request.url);
  const cached = caches.match(request);
  if (url.origin === location.origin && TO_CACHE.includes(url.pathname)) {
    event.respondWith(cached);
  } else if (url.protocol === "https:" || location.hostname === "localhost") {
    const promise = fetch(request);
    promise.then((response) => {
      if (response.ok && response.type === "basic") {
        const clone = response.clone();
        caches.open(CACHED_ASSETS).then((cache) => {
          return cache.put(request, clone);
        });
      }
    });
    event.respondWith(promise.catch(() => cached || promise));
  }
});
