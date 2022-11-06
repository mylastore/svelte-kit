import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/chunks/hooks.server.js
import * as cookie from "cookie";
async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  event.locals.token = cookies.token ? cookies.token : null;
  event.locals.user = cookies.user ? JSON.parse(cookies.user) : null;
  return await resolve(event);
}
export {
  handle
};
//# sourceMappingURL=hooks.server-OA3BXNLM.js.map
