import {
  Input,
  isEmail,
  isPassword
} from "./chunk-HIUBRZVB.js";
import {
  username
} from "./chunk-SXGBY5XQ.js";
import "./chunk-IP6NIPRT.js";
import "./chunk-5OT2S2JW.js";
import "./chunk-ZKIORBGS.js";
import {
  add_attribute,
  create_ssr_component,
  subscribe,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/login/_page.svelte.js
import "js-cookie";
var css = {
  code: ".login.svelte-1c7s2r4{width:25rem}.disabled.svelte-1c7s2r4{pointer-events:none}",
  map: null
};
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let passwordValid;
  let formIsValid;
  let $$unsubscribe_username;
  $$unsubscribe_username = subscribe(username, (value) => value);
  let email = "";
  let password = "";
  $$result.css.add(css);
  emailValid = isEmail(email);
  passwordValid = isPassword(password);
  formIsValid = emailValid && passwordValid;
  $$unsubscribe_username();
  return `

${$$result.head += `${$$result.title = `<title>Login Form</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-xu3re">`, ""}

<div class="${"container"}"><div class="${"d-flex justify-content-center mt-5"}"><div class="${"card login svelte-1c7s2r4"}"><div class="${"card-body"}"><h4><strong>Sing In</strong></h4>
        <p>We are glad you are here.</p>
        <div>${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "email",
      label: "Email",
      valid: emailValid,
      validityMessage: "Please enter a valid email.",
      value: email,
      className: "is-large"
    },
    {},
    {}
  )}
          ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "password",
      label: "Password",
      help: "Password minimum length 8, must have one capital letter, 1 number, and one unique character.",
      type: "password",
      valid: passwordValid,
      validityMessage: "Please enter a valid password.",
      value: password,
      className: "is-large"
    },
    {},
    {}
  )}</div>
        <div><a href="${"/forgot"}" class="${"text-black-50"}">Forgot Password?</a>
          <br>
          <br></div>
        <div class="${"d-grid gap-2"}"><button${add_attribute("aria-disabled", !formIsValid ? "true" : "false", 0)} class="${["btn btn-primary btn-lg svelte-1c7s2r4", !formIsValid ? "disabled" : ""].join(" ").trim()}" ${!formIsValid ? "disabled" : ""}>Sing In
          </button></div></div>
      <div class="${"card-footer text-center bg-white"}"><a href="${"register"}" class="${"text-black-50"}">Don&#39;t have an account? </a></div></div></div>

  <div class="${"d-flex justify-content-center"}"><div class="${"card mt-5 login svelte-1c7s2r4"}"><div class="${"card-header bg-light"}"><span>Test Users</span></div>
      <div class="${"card-body"}"><p>Admin: me@me.com Password#1</p>
        <p>User: me2@me.com Password#1</p></div></div></div>
</div>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-ZHRQWMUX.js.map
