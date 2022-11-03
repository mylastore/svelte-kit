const c = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
}, _ = [
  "/_app/immutable/start-26620185.js",
  "/_app/immutable/components/pages/_layout.svelte-e31b0015.js",
  "/_app/immutable/assets/_layout-d52f4a44.css",
  "/_app/immutable/components/pages/_error.svelte-a5fed75f.js",
  "/_app/immutable/assets/_error-8522d49f.css",
  "/_app/immutable/components/pages/_page.svelte-6882e282.js",
  "/_app/immutable/assets/_page-67add643.css",
  "/_app/immutable/components/pages/admin/_page.svelte-f754b969.js",
  "/_app/immutable/components/pages/admin/user/_id_/_page.svelte-ab111d75.js",
  "/_app/immutable/assets/_page-0d880b0a.css",
  "/_app/immutable/components/pages/admin/users/_p_/_page.svelte-c5a6ae8e.js",
  "/_app/immutable/assets/_page-96200458.css",
  "/_app/immutable/components/pages/forgot/_page.svelte-94d87788.js",
  "/_app/immutable/assets/_page-c4d36e2d.css",
  "/_app/immutable/components/pages/login/_page.svelte-026df189.js",
  "/_app/immutable/assets/_page-4c3ae24a.css",
  "/_app/immutable/components/pages/register/_page.svelte-5232b574.js",
  "/_app/immutable/assets/_page-8a10151f.css",
  "/_app/immutable/components/pages/user/activation/_token_/_page.svelte-6af5a76e.js",
  "/_app/immutable/components/pages/user/profile/_page.svelte-e72e3654.js",
  "/_app/immutable/assets/_page-e5b80638.css",
  "/_app/immutable/components/pages/user/reset/_token_/_page.svelte-e89c7df3.js",
  "/_app/immutable/modules/pages/admin/_page.js-7ff08619.js",
  "/_app/immutable/modules/pages/admin/user/_id_/_page.js-60f743a5.js",
  "/_app/immutable/modules/pages/admin/users/_p_/_page.js-5d743b5f.js",
  "/_app/immutable/modules/pages/login/_page.js-9bef5d6f.js",
  "/_app/immutable/modules/pages/register/_page.js-3e6c192c.js",
  "/_app/immutable/modules/pages/user/profile/_page.js-d9576213.js",
  "/_app/immutable/chunks/singletons-bea58de7.js",
  "/_app/immutable/chunks/preload-helper-aa6bc0ce.js",
  "/_app/immutable/chunks/index-5031b6ad.js",
  "/_app/immutable/chunks/index-d9e95725.js",
  "/_app/immutable/chunks/index-9ff150c3.js",
  "/_app/immutable/chunks/variables-26eb9a07.js",
  "/_app/immutable/chunks/api-2eabfaba.js",
  "/_app/immutable/assets/api-5ca8a06d.css",
  "/_app/immutable/chunks/themeStore-adddda37.js",
  "/_app/immutable/chunks/stores-9c46a411.js",
  "/_app/immutable/chunks/username-f550a24c.js",
  "/_app/immutable/chunks/Tabs-8fc56f6d.js",
  "/_app/immutable/assets/Tabs-4afc9f25.css",
  "/_app/immutable/chunks/Loader-8fb6ae31.js",
  "/_app/immutable/assets/Loader-930fdbc0.css",
  "/_app/immutable/chunks/_page-31949a72.js",
  "/_app/immutable/chunks/timeAgo-a92d5063.js",
  "/_app/immutable/chunks/_page-f74dcc83.js",
  "/_app/immutable/chunks/navigation-f3ebcf78.js",
  "/_app/immutable/chunks/_page-b3762230.js",
  "/_app/immutable/chunks/Input-7bc467ae.js",
  "/_app/immutable/assets/Input-c0648d51.css",
  "/_app/immutable/chunks/_page-d5f4802c.js",
  "/_app/immutable/chunks/_page-aadd4684.js",
  "/_app/immutable/chunks/_page-181f312e.js",
  "/_app/immutable/chunks/0-630dd3aa.js",
  "/_app/immutable/chunks/1-29c5ac83.js",
  "/_app/immutable/chunks/2-3c2f7c9b.js",
  "/_app/immutable/chunks/3-be439fb2.js",
  "/_app/immutable/chunks/4-d4e26084.js",
  "/_app/immutable/chunks/5-63163617.js",
  "/_app/immutable/chunks/6-2b4e01b6.js",
  "/_app/immutable/chunks/7-8d82c4b3.js",
  "/_app/immutable/chunks/8-2c3c0145.js",
  "/_app/immutable/chunks/9-efec0b98.js",
  "/_app/immutable/chunks/10-aa9f32c4.js",
  "/_app/immutable/chunks/11-0114f980.js",
  "/_app/immutable/chunks/dropdown-10b16e51.js",
  "/_app/immutable/chunks/base-component-c176c18a.js",
  "/_app/immutable/chunks/collapse-5eda0843.js"
], b = [
  "/favicon.ico",
  "/img/1.webp",
  "/img/404.gif",
  "/img/502.gif",
  "/img/github.svg",
  "/robots.txt"
], i = `cache-${c}`, n = _.concat(b);
self.addEventListener("install", (a) => {
  a.waitUntil(caches.open(i).then((e) => e.addAll(n)));
});
self.addEventListener("activate", (a) => {
  a.waitUntil(
    caches.keys().then(async (e) => {
      for (const s of e)
        s.includes(c) || await caches.delete(s);
      await self.clients.claim();
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
        caches.open(i).then((l) => l.put(e, u));
      }
    }), a.respondWith(p.catch(() => m || p));
  }
});
