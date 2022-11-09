import {
  page
} from "./chunk-IPPZVKT5.js";
import "./chunk-KHZRRB2F.js";
import "./chunk-JMKO23OJ.js";
import {
  create_ssr_component,
  escape,
  subscribe
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/user/activation/_token_/_page.svelte.js
import jwt_decode from "jwt-decode";
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { token } = $page.params;
  let email = "";
  if (token) {
    const decoded = jwt_decode(token);
    email = decoded.email;
  }
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Account Activation</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-r1h90o">`, ""}

<div class="${"container"}"><div class="${"d-flex mt-5 justify-content-center d-block"}"><div class="${"card"}" style="${"width: 50em; max-width: 50em"}"><div class="${"card-body text-center"}"><h5>Activate account for ${escape(email)}</h5>
        <hr>
        <button class="${"btn btn-primary btn-lg"}">Activate Account
        </button></div></div></div></div>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-HYC3676D.js.map
