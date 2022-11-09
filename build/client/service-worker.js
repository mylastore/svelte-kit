const c = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
}, _ = [
  "/_app/immutable/start-40a1c8f7.js",
  "/_app/immutable/components/pages/_layout.svelte-116dc7e0.js",
  "/_app/immutable/assets/_layout-d52f4a44.css",
  "/_app/immutable/components/pages/_error.svelte-a5fed75f.js",
  "/_app/immutable/assets/_error-8522d49f.css",
  "/_app/immutable/components/pages/_page.svelte-a137eebc.js",
  "/_app/immutable/assets/_page-67add643.css",
  "/_app/immutable/components/pages/admin/_page.svelte-975c8044.js",
  "/_app/immutable/components/pages/admin/user/_id_/_page.svelte-6c78ea80.js",
  "/_app/immutable/assets/_page-0d880b0a.css",
  "/_app/immutable/components/pages/admin/users/_p_/_page.svelte-bbfcc8c2.js",
  "/_app/immutable/assets/_page-96200458.css",
  "/_app/immutable/components/pages/forgot/_page.svelte-4a6299a4.js",
  "/_app/immutable/assets/_page-c4d36e2d.css",
  "/_app/immutable/components/pages/login/_page.svelte-0a38d468.js",
  "/_app/immutable/assets/_page-4c3ae24a.css",
  "/_app/immutable/components/pages/register/_page.svelte-1a589c31.js",
  "/_app/immutable/assets/_page-8a10151f.css",
  "/_app/immutable/components/pages/user/activation/_token_/_page.svelte-bf257731.js",
  "/_app/immutable/components/pages/user/profile/_page.svelte-de7315d8.js",
  "/_app/immutable/assets/_page-e5b80638.css",
  "/_app/immutable/components/pages/user/reset/_token_/_page.svelte-e7017c6b.js",
  "/_app/immutable/modules/pages/admin/_page.js-865cef08.js",
  "/_app/immutable/modules/pages/admin/user/_id_/_page.js-9b63b04a.js",
  "/_app/immutable/modules/pages/admin/users/_p_/_page.js-76f42d3b.js",
  "/_app/immutable/modules/pages/login/_page.js-0aad6264.js",
  "/_app/immutable/modules/pages/register/_page.js-eca9c0bc.js",
  "/_app/immutable/modules/pages/user/profile/_page.js-ec67a82e.js",
  "/_app/immutable/chunks/singletons-99a2ae96.js",
  "/_app/immutable/chunks/index-5031b6ad.js",
  "/_app/immutable/chunks/control-03134885.js",
  "/_app/immutable/chunks/index-9ff150c3.js",
  "/_app/immutable/chunks/preload-helper-b21cceae.js",
  "/_app/immutable/chunks/variables-8bc12a28.js",
  "/_app/immutable/chunks/api-fa0000df.js",
  "/_app/immutable/assets/api-5ca8a06d.css",
  "/_app/immutable/chunks/themeStore-adddda37.js",
  "/_app/immutable/chunks/stores-b60a9a50.js",
  "/_app/immutable/chunks/username-f550a24c.js",
  "/_app/immutable/chunks/Tabs-d7606dba.js",
  "/_app/immutable/assets/Tabs-4afc9f25.css",
  "/_app/immutable/chunks/Loader-eb0cb2c0.js",
  "/_app/immutable/assets/Loader-930fdbc0.css",
  "/_app/immutable/chunks/_page-2a07d36d.js",
  "/_app/immutable/chunks/index-de586565.js",
  "/_app/immutable/chunks/timeAgo-a92d5063.js",
  "/_app/immutable/chunks/_page-9dcb80cf.js",
  "/_app/immutable/chunks/navigation-37d8c489.js",
  "/_app/immutable/chunks/_page-3f7723e1.js",
  "/_app/immutable/chunks/Input-7bc467ae.js",
  "/_app/immutable/assets/Input-c0648d51.css",
  "/_app/immutable/chunks/_page-31de1265.js",
  "/_app/immutable/chunks/_page-d6535f43.js",
  "/_app/immutable/chunks/_page-92bfcc5a.js",
  "/_app/immutable/chunks/0-bd490784.js",
  "/_app/immutable/chunks/1-29c5ac83.js",
  "/_app/immutable/chunks/2-89eab118.js",
  "/_app/immutable/chunks/3-f48e139a.js",
  "/_app/immutable/chunks/4-846bf248.js",
  "/_app/immutable/chunks/5-d99ef475.js",
  "/_app/immutable/chunks/6-256a8596.js",
  "/_app/immutable/chunks/7-9e0bb7ba.js",
  "/_app/immutable/chunks/8-962eac02.js",
  "/_app/immutable/chunks/9-06b97eb9.js",
  "/_app/immutable/chunks/10-57816f28.js",
  "/_app/immutable/chunks/11-2967701a.js",
  "/_app/immutable/chunks/dropdown-ddb1498d.js",
  "/_app/immutable/chunks/base-component-d7797465.js",
  "/_app/immutable/chunks/collapse-a0c50cb3.js"
], b = [
  "/favicon.ico",
  "/img/1.webp",
  "/img/404.gif",
  "/img/502.gif",
  "/img/github.svg",
  "/robots.txt"
], i = `cache-${c}`, n = _.concat(b);
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(i).then((a) => a.addAll(n)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (a) => {
      for (const s of a)
        s.includes(c) || caches.delete(s);
      self.clients.claim();
    })
  );
});
self.addEventListener("fetch", (e) => {
  const { request: a } = e;
  if (a.url.indexOf("http") !== 0 || a.method !== "GET" || a.headers.has("range") || a.cache === "only-if-cached" && a.mode !== "same-origin")
    return;
  const s = new URL(a.url), m = caches.match(a);
  if (s.origin === location.origin && n.includes(s.pathname))
    e.respondWith(m);
  else if (s.protocol === "https:" || location.hostname === "localhost") {
    const p = fetch(a);
    p.then((t) => {
      if (t.ok && t.type === "basic") {
        const u = t.clone();
        caches.open(i).then((l) => {
          l.put(a, u);
        });
      }
    }), e.respondWith(p.catch(() => m || p));
  }
});
