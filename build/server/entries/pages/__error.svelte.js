import { c as create_ssr_component, f as add_attribute, e as escape, v as validate_component } from "../../chunks/index-b9650e14.js";
const AlertTriangleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "100%" } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { class: customClass = "" } = $$props;
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.class === void 0 && $$bindings.class && customClass !== void 0)
    $$bindings.class(customClass);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-alert-triangle " + escape(customClass)}"><path d="${"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}"></path><line x1="${"12"}" y1="${"9"}" x2="${"12"}" y2="${"13"}"></line><line x1="${"12"}" y1="${"17"}" x2="${"12.01"}" y2="${"17"}"></line></svg>`;
});
var __error_svelte_svelte_type_style_lang = "";
const css = {
  code: ".alert-icon.svelte-12kctbe{margin-bottom:1rem;color:var(--bs-danger)}.alert-container.svelte-12kctbe{display:block;text-align:center;margin:5rem auto}",
  map: null
};
function load({ error, status }) {
  return { props: { status, error } };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  $$result.css.add(css);
  return `${error ? `<div class="${"container"}"><div class="${"alert-container svelte-12kctbe"}"><div class="${"alert-icon svelte-12kctbe"}">${validate_component(AlertTriangleIcon, "AlertTriangleIcon").$$render($$result, { size: "5x" }, {}, {})}</div>
      <h1>${escape(status)}</h1>
      <h4>${escape(error.message)}</h4></div></div>` : ``}`;
});
export { _error as default, load };
