import {
  writable
} from "./chunk-ZKIORBGS.js";
import {
  create_ssr_component,
  subscribe,
  validate_component
} from "./chunk-INXCOC2Z.js";

// .svelte-kit/adapter-node/chunks/Loader.js
var loaderStatus = writable(0);
var css$2 = {
  code: ".loading.svelte-u5iifo{position:relative;margin:20px auto;display:block;z-index:10}",
  map: null
};
var LoadingPulse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="${"loading svelte-u5iifo"}"><div class="${"text-center mt-5"}"><div class="${"spinner-grow"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div></div>
</div>`;
});
var css$1 = {
  code: "img.svelte-139suwe{max-width:100%}.alert.svelte-139suwe{max-width:480px;margin:auto}",
  map: null
};
var NetworkError = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>Network Error!</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-irdajq">`, ""}

<div class="${"container"}"><div class="${"text-center mt-5"}"><h1 class="${"text-danger"}">Oops!</h1>
    <div class="${"alert alert-danger fl svelte-139suwe"}" role="${"alert"}">We are working to resolve this issue.
    </div>
    <img class="${"img-fluid mt-5 svelte-139suwe"}" src="${"/img/502.gif"}" width="${"500"}" height="${"372"}" alt="${"Network Error"}"></div>
</div>`;
});
var css = {
  code: ".center.svelte-1h20yap{max-width:500px;margin:0 auto}",
  map: null
};
var Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $loaderStatus, $$unsubscribe_loaderStatus;
  $$unsubscribe_loaderStatus = subscribe(loaderStatus, (value) => $loaderStatus = value);
  $$result.css.add(css);
  $$unsubscribe_loaderStatus();
  return `<div class="${"top"}">${!$loaderStatus ? `${validate_component(LoadingPulse, "Loading").$$render($$result, {}, {}, {})}` : `${$loaderStatus >= 500 ? `<div class="${"center svelte-1h20yap"}">${validate_component(NetworkError, "NetworkError").$$render($$result, {}, {}, {})}</div>` : `${slots.default ? slots.default({}) : ``}`}`}
</div>`;
});

export {
  Loader
};
//# sourceMappingURL=chunk-4RYA37SW.js.map
