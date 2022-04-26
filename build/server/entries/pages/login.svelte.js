import { c as create_ssr_component, v as validate_component, f as add_attribute } from "../../chunks/index-b9650e14.js";
import { I as Input } from "../../chunks/Input-12df98b0.js";
import { i as isEmail, a as isPassword } from "../../chunks/Input.svelte_svelte_type_style_lang-a1af14f5.js";
import "../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import "js-cookie";
import "fetch-ponyfill";
import "../../chunks/variables-86731e6d.js";
var login_svelte_svelte_type_style_lang = "";
const css = {
  code: ".login.svelte-16lbl9s{width:25rem}.disabled.svelte-16lbl9s{pointer-events:none}",
  map: null
};
async function load({ session }) {
  if (session.user) {
    return { status: 302, redirect: "/" };
  }
  return {};
}
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let passwordValid;
  let formIsValid;
  let email = "";
  let password = "";
  $$result.css.add(css);
  emailValid = isEmail(email);
  passwordValid = isPassword(password);
  formIsValid = emailValid && passwordValid;
  return `

${$$result.head += `${$$result.title = `<title>Login Form</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-xu3re">`, ""}

<div class="${"container"}"><div class="${"d-flex justify-content-center mt-5"}"><div class="${"card login svelte-16lbl9s"}"><div class="${"card-body"}"><h4><strong>Sing In</strong></h4>
        <p>We are glad you are here.</p>
        <div>${validate_component(Input, "Input").$$render($$result, {
    id: "email",
    label: "Email",
    valid: emailValid,
    validityMessage: "Please enter a valid email.",
    value: email,
    className: "is-large"
  }, {}, {})}
          ${validate_component(Input, "Input").$$render($$result, {
    id: "password",
    label: "Password",
    help: "Password minimum length 8, must have one capital letter, 1 number, and one unique character.",
    type: "password",
    valid: passwordValid,
    validityMessage: "Please enter a valid password.",
    value: password,
    className: "is-large"
  }, {}, {})}</div>
        <div><a href="${"/forgot"}" class="${"text-black-50"}">Forgot Password?</a>
          <br>
          <br></div>
        <div class="${"d-grid gap-2"}"><button${add_attribute("aria-disabled", !formIsValid ? "true" : "false", 0)} class="${["btn btn-primary btn-lg svelte-16lbl9s", !formIsValid ? "disabled" : ""].join(" ").trim()}" ${!formIsValid ? "disabled" : ""}>Sing In
          </button></div></div>
      <div class="${"card-footer text-center bg-white"}"><a href="${"register"}" class="${"text-black-50"}">Don&#39;t have an account? </a></div></div></div>

  <div class="${"d-flex justify-content-center"}"><div class="${"card mt-5 login svelte-16lbl9s"}"><div class="${"card-header bg-light"}"><span>Test Users</span></div>
      <div class="${"card-body"}"><p>Admin: me@me.com Password#1</p>
        <p>User: me2@me.com Password#1</p></div></div></div>
</div>`;
});
export { Login as default, load };
