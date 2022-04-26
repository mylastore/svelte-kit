import { c as create_ssr_component, b as createEventDispatcher, e as escape, v as validate_component } from "./index-b9650e14.js";
var Message_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".notification.svelte-flpbc1.svelte-flpbc1{position:relative;padding:15px 40px 15px 15px;margin-bottom:20px;margin-top:20px}.close-button.svelte-flpbc1.svelte-flpbc1{position:absolute;right:0;top:0;padding:0;height:100%;border:none;background:orange;width:30px}.close-button.svelte-flpbc1.svelte-flpbc1:hover{cursor:pointer}.close-button.svelte-flpbc1 span.svelte-flpbc1{font-size:20px}",
  map: null
};
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message = "We are having issues with the network!" } = $$props;
  let { messageType = "warning" } = $$props;
  let { closeMessage = false } = $$props;
  createEventDispatcher();
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.messageType === void 0 && $$bindings.messageType && messageType !== void 0)
    $$bindings.messageType(messageType);
  if ($$props.closeMessage === void 0 && $$bindings.closeMessage && closeMessage !== void 0)
    $$bindings.closeMessage(closeMessage);
  $$result.css.add(css$2);
  return `<div class="${"alert mt-5 alert-" + escape(messageType) + " alert-dismissible svelte-flpbc1"}">${escape(message)}
	${closeMessage ? `<button type="${"button"}" class="${"close-button svelte-flpbc1"}"><span aria-hidden="${"true"}" class="${"svelte-flpbc1"}">\xD7</span></button>` : ``}
</div>`;
});
var LoadingPulse_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".loading.svelte-u5iifo{position:relative;margin:20px auto;display:block;z-index:10}",
  map: null
};
const LoadingPulse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"loading svelte-u5iifo"}"><div class="${"text-center mt-5"}"><div class="${"spinner-grow"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div></div>
</div>`;
});
var Loader_svelte_svelte_type_style_lang = "";
const css = {
  code: ".center.svelte-3lo8xx{max-width:500px;margin:0 auto}",
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { loaderStatus } = $$props;
  let networkError = false;
  if (loaderStatus >= 500) {
    networkError = true;
  }
  if ($$props.loaderStatus === void 0 && $$bindings.loaderStatus && loaderStatus !== void 0)
    $$bindings.loaderStatus(loaderStatus);
  $$result.css.add(css);
  return `<div class="${"top"}">${!loaderStatus ? `${validate_component(LoadingPulse, "Loading").$$render($$result, {}, {}, {})}` : `${networkError ? `<div class="${"center svelte-3lo8xx"}">${validate_component(Message, "Message").$$render($$result, {}, {}, {})}</div>` : `${slots.default ? slots.default({}) : ``}`}`}
</div>`;
});
export { Loader as L };
