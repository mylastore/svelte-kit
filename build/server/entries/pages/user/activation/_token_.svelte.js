import { c as create_ssr_component, a as subscribe, e as escape } from "../../../../chunks/index-b9650e14.js";
import jwt_decode from "jwt-decode";
import "../../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import { p as page } from "../../../../chunks/stores-dcfa43fa.js";
import "fetch-ponyfill";
import "../../../../chunks/variables-86731e6d.js";
import "js-cookie";
const U5Btokenu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { token } = $page.params;
  let email = "";
  if (token) {
    const decoded = jwt_decode(token);
    email = decoded.email;
  }
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Account Activation</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-9z5ylk">`, ""}

<div class="${"container"}"><div class="${"d-flex mt-5 justify-content-center d-block"}"><div class="${"card"}" style="${"width: 50em; max-width: 50em"}"><div class="${"card-body text-center"}"><h5>Activate account for ${escape(email)}</h5>
                <hr>
                <button class="${"btn btn-primary btn-lg"}">Activate Account
                </button></div></div></div></div>`;
});
export { U5Btokenu5D as default };
