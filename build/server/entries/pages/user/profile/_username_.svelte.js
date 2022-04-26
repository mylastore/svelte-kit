import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index-b9650e14.js";
import "luxon";
import { i as isEmail, a as isPassword, b as isUrl } from "../../../../chunks/Input.svelte_svelte_type_style_lang-a1af14f5.js";
import "js-cookie";
import { s as session } from "../../../../chunks/stores-dcfa43fa.js";
import "../../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import { L as Loader } from "../../../../chunks/Loader-d38dea32.js";
import "fetch-ponyfill";
import "../../../../chunks/variables-86731e6d.js";
var _username__svelte_svelte_type_style_lang = "";
const css = {
  code: ".profile.svelte-1bn9gst p.svelte-1bn9gst{margin-bottom:0.4em}",
  map: null
};
async function load({ session: session2 }) {
  if (!session2.user) {
    return { status: 302, redirect: "/" };
  }
  return {
    props: {
      token: session2.token,
      username: session2.user.username
    }
  };
}
const U5Busernameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => value);
  let { token } = $$props;
  let { username } = $$props;
  let password = "";
  let website;
  let email;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.username === void 0 && $$bindings.username && username !== void 0)
    $$bindings.username(username);
  $$result.css.add(css);
  isEmail(email);
  isPassword(password);
  isUrl(website);
  $$unsubscribe_session();
  return `${$$result.head += `${$$result.title = `<title>Profile Page</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-3f98sr">`, ""}


${`${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}`;
});
export { U5Busernameu5D as default, load };
