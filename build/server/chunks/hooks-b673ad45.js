import * as cookie from "cookie";
async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  event.locals.user = cookies.user;
  event.locals.token = cookies.token;
  return await resolve(event);
}
function getSession(request) {
  return {
    token: request.locals.token,
    user: request.locals.user ? JSON.parse(request.locals.user) : null
  };
}
export { getSession, handle };
