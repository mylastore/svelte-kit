import { c as create_ssr_component, a as subscribe, b as createEventDispatcher, e as escape } from "./index-b9650e14.js";
import { w as writable } from "./index-fea78b38.js";
import "./Noti.svelte_svelte_type_style_lang-f300181f.js";
const css = {
  code: ".notification.svelte-1n94sv8{min-width:400px;border-top-left-radius:.25rem;display:block;position:fixed;top:45px;right:0;padding:1rem;z-index:10}@media only screen and (max-width: 600px){.notification.svelte-1n94sv8{right:0;left:0;margin:auto}}",
  map: null
};
const notifications = (() => {
  const { update, subscribe: subscribe2 } = writable([]);
  const push = (message, messageType) => {
    messageType = messageType ? messageType : "danger";
    update((arr) => [...arr, { message, messageType }]);
  };
  const pop = () => update((arr) => (arr.shift(), arr));
  return { pop, push, subscribe: subscribe2 };
})();
const Noti = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let { duration = 3e3 } = $$props;
  const dispatch = createEventDispatcher();
  let timeout;
  notifications.subscribe(({ length }) => {
    if (timeout || !length)
      return;
    dispatch("notify", $notifications[0]);
    timeout = setTimeout(() => {
      timeout = false;
      notifications.pop();
    }, duration);
  });
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  $$result.css.add(css);
  $$unsubscribe_notifications();
  return `${$notifications[0] ? `<div class="${"notification svelte-1n94sv8"}"><div class="${"alert alert-" + escape($notifications[0].messageType) + " svelte-1n94sv8"}" role="${"alert"}"><span>${escape($notifications[0].message)}</span></div></div>` : ``}`;
});
export { Noti as N, notifications as n };
