const c = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
}, b = [
  "/_app/immutable/start-94cb0765.js",
  "/_app/immutable/components/pages/_layout.svelte-1bafb5c5.js",
  "/_app/immutable/assets/_layout-d52f4a44.css",
  "/_app/immutable/components/pages/_error.svelte-a5fed75f.js",
  "/_app/immutable/assets/_error-8522d49f.css",
  "/_app/immutable/components/pages/_page.svelte-a137eebc.js",
  "/_app/immutable/assets/_page-67add643.css",
  "/_app/immutable/components/pages/admin/_page.svelte-d9833cc1.js",
  "/_app/immutable/components/pages/admin/user/_id_/_page.svelte-2df1ae72.js",
  "/_app/immutable/assets/_page-0d880b0a.css",
  "/_app/immutable/components/pages/admin/users/_p_/_page.svelte-6689ccc9.js",
  "/_app/immutable/assets/_page-96200458.css",
  "/_app/immutable/components/pages/forgot/_page.svelte-4a6299a4.js",
  "/_app/immutable/assets/_page-c4d36e2d.css",
  "/_app/immutable/components/pages/login/_page.svelte-0a38d468.js",
  "/_app/immutable/assets/_page-4c3ae24a.css",
  "/_app/immutable/components/pages/register/_page.svelte-d987a448.js",
  "/_app/immutable/assets/_page-8a10151f.css",
  "/_app/immutable/components/pages/user/activation/_token_/_page.svelte-47b4cf58.js",
  "/_app/immutable/components/pages/user/profile/_page.svelte-7b603d78.js",
  "/_app/immutable/assets/_page-e5b80638.css",
  "/_app/immutable/components/pages/user/reset/_token_/_page.svelte-35c51b06.js",
  "/_app/immutable/modules/pages/admin/_page.js-865cef08.js",
  "/_app/immutable/modules/pages/admin/user/_id_/_page.js-9b63b04a.js",
  "/_app/immutable/modules/pages/admin/users/_p_/_page.js-76f42d3b.js",
  "/_app/immutable/modules/pages/login/_page.js-0aad6264.js",
  "/_app/immutable/modules/pages/register/_page.js-eca9c0bc.js",
  "/_app/immutable/modules/pages/user/profile/_page.js-ec67a82e.js",
  "/_app/immutable/chunks/singletons-b0b8963f.js",
  "/_app/immutable/chunks/index-5031b6ad.js",
  "/_app/immutable/chunks/control-03134885.js",
  "/_app/immutable/chunks/index-9ff150c3.js",
  "/_app/immutable/chunks/preload-helper-b21cceae.js",
  "/_app/immutable/chunks/variables-8bc12a28.js",
  "/_app/immutable/chunks/api-fa0000df.js",
  "/_app/immutable/assets/api-5ca8a06d.css",
  "/_app/immutable/chunks/themeStore-adddda37.js",
  "/_app/immutable/chunks/stores-1c3e9f80.js",
  "/_app/immutable/chunks/username-f550a24c.js",
  "/_app/immutable/chunks/Tabs-901332bf.js",
  "/_app/immutable/assets/Tabs-4afc9f25.css",
  "/_app/immutable/chunks/Loader-eb0cb2c0.js",
  "/_app/immutable/assets/Loader-930fdbc0.css",
  "/_app/immutable/chunks/_page-2a07d36d.js",
  "/_app/immutable/chunks/index-de586565.js",
  "/_app/immutable/chunks/timeAgo-a92d5063.js",
  "/_app/immutable/chunks/_page-9dcb80cf.js",
  "/_app/immutable/chunks/navigation-dcff9ac3.js",
  "/_app/immutable/chunks/_page-3f7723e1.js",
  "/_app/immutable/chunks/Input-7bc467ae.js",
  "/_app/immutable/assets/Input-c0648d51.css",
  "/_app/immutable/chunks/_page-31de1265.js",
  "/_app/immutable/chunks/_page-d6535f43.js",
  "/_app/immutable/chunks/_page-92bfcc5a.js",
  "/_app/immutable/chunks/0-47181e1e.js",
  "/_app/immutable/chunks/1-29c5ac83.js",
  "/_app/immutable/chunks/2-89eab118.js",
  "/_app/immutable/chunks/3-fb042009.js",
  "/_app/immutable/chunks/4-e83253ee.js",
  "/_app/immutable/chunks/5-3b9e59be.js",
  "/_app/immutable/chunks/6-256a8596.js",
  "/_app/immutable/chunks/7-9e0bb7ba.js",
  "/_app/immutable/chunks/8-c7a7fa6d.js",
  "/_app/immutable/chunks/9-df15efeb.js",
  "/_app/immutable/chunks/10-973368c2.js",
  "/_app/immutable/chunks/11-c5436b5b.js",
  "/_app/immutable/chunks/dropdown-ddb1498d.js",
  "/_app/immutable/chunks/base-component-d7797465.js",
  "/_app/immutable/chunks/collapse-a0c50cb3.js"
], _ = [
  "/favicon.ico",
  "/img/1.webp",
  "/img/404.gif",
  "/img/502.gif",
  "/img/github.svg",
  "/robots.txt"
], i = `cache-${c}`, n = b.concat(_);
self.addEventListener("install", (a) => {
  a.waitUntil(caches.open(i).then((e) => e.addAll(n)));
});
self.addEventListener("activate", (a) => {
  a.waitUntil(
    caches.keys().then(async (e) => {
      for (const s of e)
        s.includes(c) || caches.delete(s);
      self.clients.claim();
    })
  );
});
self.addEventListener("fetch", (a) => {
  const { request: e } = a;
  if (e.url.indexOf("http") !== 0 || e.method !== "GET" || e.headers.has("range") || e.cache === "only-if-cached" && e.mode !== "same-origin")
    return;
  const s = new URL(e.url), m = caches.match(e);
  if (s.origin === location.origin && n.includes(s.pathname))
    a.respondWith(m);
  else if (s.protocol === "https:" || location.hostname === "localhost") {
    const p = fetch(e);
    p.then((t) => {
      if (t.ok && t.type === "basic") {
        const u = t.clone();
        caches.open(i).then((l) => {
          l.put(e, u);
        });
      }
    }), a.respondWith(p.catch(() => m || p));
  }
});
