import { c as create_ssr_component, v as validate_component } from "../../chunks/index-b9650e14.js";
import { I as Input } from "../../chunks/Input-12df98b0.js";
import "../../chunks/Noti.svelte_svelte_type_style_lang-f300181f.js";
import { i as isEmail, a as isPassword } from "../../chunks/Input.svelte_svelte_type_style_lang-a1af14f5.js";
import "fetch-ponyfill";
import "../../chunks/variables-86731e6d.js";
import "js-cookie";
var register_svelte_svelte_type_style_lang = "";
const css = {
  code: ".register.svelte-pm9bq0{width:25rem}",
  map: null
};
async function load({ session }) {
  if (session.user) {
    return { status: 302, redirect: "/" };
  }
  return {};
}
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let passwordValid;
  let passwordConfirmValid;
  let formIsValid;
  let name = "";
  let email = "";
  let password = "";
  let passwordConfirmation = "";
  $$result.css.add(css);
  emailValid = isEmail(email);
  passwordValid = isPassword(password);
  passwordConfirmValid = password === passwordConfirmation;
  formIsValid = emailValid && passwordValid && passwordConfirmValid;
  return `

${$$result.head += `${$$result.title = `<title>Register Form</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1lsaqtu">`, ""}

<div class="${"container"}"><div class="${"col"}"><div class="${"d-flex justify-content-center d-block"}"><div class="${"card mt-5 register svelte-pm9bq0"}"><div class="${"card-body"}"><div><h4><strong>Sing Up</strong></h4>
            <p>Please note that our services are only available in the United States.</p></div>
          <form>${validate_component(Input, "Input").$$render($$result, {
    id: "name",
    label: "Name",
    help: "Please, enter your complete legal name if you will be performing transactions.",
    valid: name,
    validityMessage: "Please enter a valid email.",
    value: name,
    className: "is-large"
  }, {}, {})}
            ${validate_component(Input, "Input").$$render($$result, {
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
    type: "password",
    valid: passwordValid,
    validityMessage: "Please enter a valid password.",
    value: password,
    className: "is-large"
  }, {}, {})}
            ${validate_component(Input, "Input").$$render($$result, {
    id: "passwordConfirmation",
    label: "Confirm Password",
    help: "Password minimum length 8, must have one capital letter, 1 number, and one unique character.",
    type: "password",
    valid: passwordConfirmValid,
    validityMessage: "Passwords did not match",
    value: passwordConfirmation,
    className: "is-large"
  }, {}, {})}
            <div class="${"d-grid gap-2"}"><button class="${"btn btn-primary btn-lg mt-2"}" ${!formIsValid ? "disabled" : ""}>Sing Up
              </button>
              <small>By signing up you accept our Privacy Policy.</small></div></form></div>
        <footer class="${"card-footer text-center pt-3 pb-3 bg-white"}"><a href="${"/login"}" class="${"text-black-50"}">Already have an account?</a></footer></div></div></div>
</div>`;
});
export { Register as default, load };
