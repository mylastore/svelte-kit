import { c as create_ssr_component, v as validate_component } from "../../chunks/index-b9650e14.js";
import { i as isEmail } from "../../chunks/Input.svelte_svelte_type_style_lang-a1af14f5.js";
import { I as Input } from "../../chunks/Input-12df98b0.js";
import "../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import "fetch-ponyfill";
import "../../chunks/variables-86731e6d.js";
import "js-cookie";
var forgot_svelte_svelte_type_style_lang = "";
const css = {
  code: ".forgot.svelte-sxj2dt{max-width:25rem}",
  map: null
};
const Forgot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let formIsValid;
  let email = "";
  $$result.css.add(css);
  emailValid = isEmail(email);
  formIsValid = emailValid;
  return `${$$result.head += `${$$result.title = `<title>Forgot Password</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1jnqi47">`, ""}

<main class="${"container mt-5"}"><div class="${"d-flex justify-content-center"}"><form class="${"card forgot svelte-sxj2dt"}" id="${"forgot-form"}"><div class="${"card-body"}"><h2>Password Reset</h2>
        ${validate_component(Input, "Input").$$render($$result, {
    id: "email",
    label: "Email",
    help: "Enter your email address below and we'll send you password reset instructions.",
    valid: emailValid,
    validityMessage: "Please enter a valid email.",
    value: email,
    className: "is-large"
  }, {}, {})}
        <div class="${"d-grid gap-2"}"><button class="${"btn btn-danger btn-lg"}" ${!formIsValid ? "disabled" : ""}>Reset Password
          </button>
          <a class="${"btn btn-outline-secondary btn-lg"}" href="${"/login"}" role="${"button"}">Cancel</a></div></div></form></div>
</main>`;
});
export { Forgot as default };
