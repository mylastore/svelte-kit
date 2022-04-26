import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/index-b9650e14.js";
import "../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
/* empty css                                                           */import { L as Loader } from "../../../chunks/Loader-d38dea32.js";
import { t as theme } from "../../../chunks/themeStore-ec2129b8.js";
import "fetch-ponyfill";
import "../../../chunks/variables-86731e6d.js";
import "js-cookie";
import "../../../chunks/index-fea78b38.js";
var settings_svelte_svelte_type_style_lang = "";
const css = {
  code: `.input-group-dark.svelte-11n6uba.svelte-11n6uba.svelte-11n6uba{background-color:#2c2c2c !important;color:white !important}.input-group.input-group-dark.svelte-11n6uba label.svelte-11n6uba.svelte-11n6uba{color:#999}.input-group.svelte-11n6uba.svelte-11n6uba.svelte-11n6uba{background-color:#fff;display:block;margin:10px 0;position:relative}.input-group.svelte-11n6uba label.svelte-11n6uba.svelte-11n6uba{padding:12px 30px;width:100%;display:block;text-align:left;color:#3c454c;cursor:pointer;position:relative;z-index:2;transition:color 200ms ease-in;overflow:hidden}.input-group.svelte-11n6uba label.svelte-11n6uba.svelte-11n6uba:before{width:10px;height:10px;border-radius:50%;content:'';background-color:#5562eb;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%) scale3d(1, 1, 1);transition:all 300ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;z-index:-1}.input-group.svelte-11n6uba label.svelte-11n6uba.svelte-11n6uba:after{width:32px;height:32px;content:'';border:2px solid #d1d7dc;background-color:#fff;background-image:url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");background-repeat:no-repeat;background-position:2px 3px;border-radius:50%;z-index:2;position:absolute;right:30px;top:50%;transform:translateY(-50%);cursor:pointer;transition:all 200ms ease-in}.input-group.svelte-11n6uba input.svelte-11n6uba:checked~label.svelte-11n6uba:before{background:#F7F7F7;transform:translate(-50%, -50%) scale3d(56, 56, 1);opacity:1}.input-group.svelte-11n6uba input.svelte-11n6uba:checked~label.svelte-11n6uba:after{background-color:#0f8892;border-color:#0f8892}.input-group.svelte-11n6uba input.svelte-11n6uba.svelte-11n6uba{width:32px;height:32px;order:1;z-index:2;position:absolute;right:30px;top:50%;transform:translateY(-50%);cursor:pointer;visibility:hidden}.form.svelte-11n6uba.svelte-11n6uba.svelte-11n6uba{padding:0 16px;max-width:550px;margin:50px auto;font-size:18px;font-weight:600;line-height:36px}`,
  map: null
};
async function load({ session }) {
  if (!session.user || session.user.role !== "admin") {
    return { status: 302, redirect: "/" };
  }
  return {
    props: { token: session.token, user: session.user }
  };
}
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => value);
  let { token } = $$props;
  let { user } = $$props;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$result.css.add(css);
  $$unsubscribe_theme();
  return `${$$result.head += `${$$result.title = `<title>Admin Settings</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-pb4nrb">`, ""}

${`${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}`;
});
export { Settings as default, load };
