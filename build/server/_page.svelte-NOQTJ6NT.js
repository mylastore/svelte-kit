import {
  Input,
  isPassword
} from "./chunk-HIUBRZVB.js";
import {
  page
} from "./chunk-IPPZVKT5.js";
import "./chunk-BC2MDNSB.js";
import "./chunk-DUR7N27I.js";
import {
  create_ssr_component,
  subscribe,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/user/reset/_token_/_page.svelte.js
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `${$$result.head += `${$$result.title = `<title>Password Reset</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-o8lz5l">`, ""}

<main class="${"container"}"><div class="${"d-flex justify-content-center mt-5"}"><div class="${"card"}" style="${"max-width: 50em;"}"><div class="${"card-body"}"><form id="${"password-reset-form"}"><h3>NEW PASSWORD</h3>
          ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "password",
      label: "Password",
      type: "password",
      valid: passwordValid,
      validityMessage: "Please enter a valid password.",
      value: password
    },
    {},
    {}
  )}
          ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "passwordConfirmation",
      label: "Password Confirmation",
      help: "Password minimum length 8, must have one capital letter, 1 number, and one unique character.",
      type: "password",
      valid: passwordConfirmValid,
      validityMessage: "Passwords did not match",
      value: passwordConfirmation
    },
    {},
    {}
  )}
          <button class="${"btn btn-primary float-end"}" ${!passwordFormIsValid ? "disabled" : ""}>Update Password
          </button></form></div></div></div></main>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-NOQTJ6NT.js.map
