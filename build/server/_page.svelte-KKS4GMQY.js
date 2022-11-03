import {
  Tabs
} from "./chunk-SNJQHPGH.js";
import {
  Loader
} from "./chunk-4RYA37SW.js";
import {
  page
} from "./chunk-IPPZVKT5.js";
import "./chunk-BC2MDNSB.js";
import "./chunk-DUR7N27I.js";
import "./chunk-ZKIORBGS.js";
import {
  add_attribute,
  create_ssr_component,
  escape,
  subscribe,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/admin/user/_id_/_page.svelte.js
var css = {
  code: ".avatar.svelte-sotv7e.svelte-sotv7e{border-radius:50%;width:150px;height:150px}.profile.svelte-sotv7e p.svelte-sotv7e{margin-bottom:5px}",
  map: null
};
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let userAvatar = "";
  let userRole = "";
  let memberSince;
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Admin User Profile</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-10jo1mu">`, ""}

${validate_component(Loader, "Loader").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
  <div class="${"container"}"><div class="${"mt-5 d-flex justify-content-center"}"><div class="${"card text-center"}" style="${"max-width: 30em; width: 30em;"}"><div class="${"card-header"}"><h1 class="${"card-header-title"}">User Profile</h1></div>
        <div class="${"card-body"}"><img class="${"center avatar svelte-sotv7e"}"${add_attribute("src", userAvatar, 0)} alt="${"username image"}">
          <br>
          <div class="${"profile svelte-sotv7e"}">${``}
            ${``}
            ${``}
            ${``}
            ${``}
            <p class="${"svelte-sotv7e"}"><b>Role: </b> <span class="${"capitalize"}">${escape(userRole)}</span></p>
            <p class="${"svelte-sotv7e"}"><b>Member Since:</b> ${escape(memberSince)}</p></div></div></div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-KKS4GMQY.js.map
