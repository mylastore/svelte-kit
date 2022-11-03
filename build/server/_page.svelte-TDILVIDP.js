import {
  Tabs
} from "./chunk-SNJQHPGH.js";
import {
  Loader
} from "./chunk-4RYA37SW.js";
import {
  notifications
} from "./chunk-4LG5OOAT.js";
import "./chunk-IPPZVKT5.js";
import {
  api
} from "./chunk-BC2MDNSB.js";
import "./chunk-DUR7N27I.js";
import "./chunk-ZKIORBGS.js";
import {
  create_ssr_component,
  escape,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/admin/_page.svelte.js
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userCount;
  (async () => {
    try {
      const res = await api("GET", "admin/stats", {});
      if (res) {
        return userCount = Number(res);
      }
    } catch (err) {
      notifications.push(err.message);
    }
  })();
  return `${$$result.head += `${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-pgtp5o">`, ""}

${validate_component(Loader, "Loader").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
  <div class="${"container"}"><div class="${"container"}"><div class="${"row"}"><div class="${"col-sm"}"><div class="${"card"}"><div class="${"card-body"}"><div class="${"text-center"}"><h3>${escape(userCount)}</h3>
                <label>Users</label></div></div></div></div></div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-TDILVIDP.js.map
