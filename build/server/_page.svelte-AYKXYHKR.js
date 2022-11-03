import {
  Input,
  isEmail
} from "./chunk-HIUBRZVB.js";
import "./chunk-BC2MDNSB.js";
import "./chunk-DUR7N27I.js";
import {
  create_ssr_component,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/forgot/_page.svelte.js
var css = {
  code: ".forgot.svelte-sxj2dt{max-width:25rem}",
  map: null
};
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let formIsValid;
  let email = "";
  $$result.css.add(css);
  emailValid = isEmail(email);
  formIsValid = emailValid;
  return `${$$result.head += `${$$result.title = `<title>Forgot Password</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1jnqi47">`, ""}

<main class="${"container mt-5"}"><div class="${"d-flex justify-content-center"}"><form class="${"card forgot svelte-sxj2dt"}" id="${"forgot-form"}"><div class="${"card-body"}"><h2>Password Reset</h2>
        ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "email",
      label: "Email",
      help: "Enter your email address below and we'll send you password reset instructions.",
      valid: emailValid,
      validityMessage: "Please enter a valid email.",
      value: email,
      className: "is-large"
    },
    {},
    {}
  )}
        <div class="${"d-grid gap-2"}"><button class="${"btn btn-danger btn-lg"}" ${!formIsValid ? "disabled" : ""}>Reset Password
          </button>
          <a class="${"btn btn-outline-secondary btn-lg"}" href="${"/login"}" role="${"button"}">Cancel</a></div></div></form></div>
</main>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-AYKXYHKR.js.map
