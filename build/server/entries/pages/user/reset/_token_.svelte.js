import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index-b9650e14.js";
import "../../../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import { I as Input } from "../../../../chunks/Input-12df98b0.js";
import { a as isPassword } from "../../../../chunks/Input.svelte_svelte_type_style_lang-a1af14f5.js";
import { p as page } from "../../../../chunks/stores-dcfa43fa.js";
import "fetch-ponyfill";
import "../../../../chunks/variables-86731e6d.js";
import "js-cookie";
const U5Btokenu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let passwordValid;
  let passwordConfirmValid;
  let passwordFormIsValid;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let password = "";
  let passwordConfirmation = "";
  passwordValid = isPassword(password);
  passwordConfirmValid = password === passwordConfirmation;
  passwordFormIsValid = passwordValid && passwordConfirmValid;
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Password Reset</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-akglfd">`, ""}

<main class="${"container"}"><div class="${"d-flex justify-content-center mt-5"}"><div class="${"card"}" style="${"max-width: 50em;"}"><div class="${"card-body"}"><form id="${"password-reset-form"}"><h3>NEW PASSWORD</h3>
                    ${validate_component(Input, "Input").$$render($$result, {
    id: "password",
    label: "Password",
    type: "password",
    valid: passwordValid,
    validityMessage: "Please enter a valid password.",
    value: password
  }, {}, {})}
                    ${validate_component(Input, "Input").$$render($$result, {
    id: "passwordConfirmation",
    label: "Password Confirmation",
    help: "Password minimum length 8, must have one capital letter, 1 number, and one unique character.",
    type: "password",
    valid: passwordConfirmValid,
    validityMessage: "Passwords did not match",
    value: passwordConfirmation
  }, {}, {})}
                    <button class="${"btn btn-primary float-end"}" ${!passwordFormIsValid ? "disabled" : ""}>Update Password
                    </button></form></div></div></div></main>`;
});
export { U5Btokenu5D as default };
