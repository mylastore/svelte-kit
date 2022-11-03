import {
  Loader
} from "./chunk-4RYA37SW.js";
import {
  Input,
  isEmail,
  isPassword,
  isRequire,
  isUrl
} from "./chunk-HIUBRZVB.js";
import {
  username
} from "./chunk-SXGBY5XQ.js";
import {
  page
} from "./chunk-IPPZVKT5.js";
import "./chunk-IP6NIPRT.js";
import "./chunk-5OT2S2JW.js";
import "./chunk-ZKIORBGS.js";
import {
  add_attribute,
  create_ssr_component,
  escape,
  subscribe,
  validate_component
} from "./chunk-INXCOC2Z.js";
import "./chunk-HUBM7RA2.js";

// .svelte-kit/adapter-node/entries/pages/user/profile/_page.svelte.js
import "js-cookie";
var AlertTriangleIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "100%" } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { class: customClass = "" } = $$props;
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.class === void 0 && $$bindings.class && customClass !== void 0)
    $$bindings.class(customClass);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-alert-triangle " + escape(customClass, true)}"><path d="${"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}"></path><line x1="${"12"}" y1="${"9"}" x2="${"12"}" y2="${"13"}"></line><line x1="${"12"}" y1="${"17"}" x2="${"12.01"}" y2="${"17"}"></line></svg>`;
});
var css = {
  code: ".profile.svelte-1bn9gst p.svelte-1bn9gst{margin-bottom:0.4em}",
  map: null
};
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let nameRequired;
  let passwordValid;
  let websiteValid;
  let passwordConfirmValid;
  let passwordFormIsValid;
  let formIsValid;
  let $$unsubscribe_username;
  let $page, $$unsubscribe_page;
  $$unsubscribe_username = subscribe(username, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let user = $page.data ? $page.data.user : null;
  let password = "";
  let passwordConfirmation = "";
  let about;
  let location;
  let website;
  let email;
  let name;
  let role;
  let createdAt;
  let avatar;
  $$result.css.add(css);
  emailValid = isEmail(email);
  nameRequired = isRequire(name);
  passwordValid = isPassword(password);
  websiteValid = isUrl(website);
  passwordConfirmValid = password === passwordConfirmation;
  passwordFormIsValid = passwordValid && passwordConfirmValid;
  formIsValid = emailValid && nameRequired;
  $$unsubscribe_username();
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Profile Page</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-3f98sr">`, ""}

${validate_component(Loader, "Loader").$$render($$result, {}, {}, {
    default: () => {
      return `<section class="${"mt-4"}"><div class="${"container"}">${user ? `<div class="${"row"}"><div class="${"col-md"}"><div class="${"card profile mb-3 mx-auto d-block svelte-1bn9gst"}" style="${"width: 18rem;"}"><div class="${"card-header clearfix"}"><div class="${"float-start"}">Profile Information</div>
                <div class="${"float-end"}">:::</div></div>
              <img class="${"mt-3 mx-auto d-block"}" style="${"border-radius: 50%; width: 100px; height: 100px"}"${add_attribute("src", avatar, 0)} alt="${"User Image"}">
              <div class="${"card-body"}">${``}
                <p class="${"svelte-1bn9gst"}"><strong>Email:</strong>
                  ${escape(email)}</p>
                ${``}
                ${``}
                ${``}
                ${``}
                <p class="${"svelte-1bn9gst"}"><strong>Role:</strong>
                  <span class="${"capitalize"}">${escape(role)}</span></p></div>
              <div class="${"card-footer"}"><small><strong>Member Since:</strong>
                  <time>${escape(createdAt)}</time></small></div></div></div>
          <div class="${"col-md"}"><div class="${"mx-auto d-block"}"><form class="${"card mb-4"}"><div class="${"card-body"}">${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "name",
          label: "Name*",
          value: name,
          valid: nameRequired,
          validityMessage: "Name is required"
        },
        {},
        {}
      )}
                  <div class="${"field"}"><label for="${"email"}">Email*</label>
                    <input class="${"form-control"}" id="${"email"}" type="${"email"}"${add_attribute("value", email, 0)} disabled>
                    <p class="${"help"}">Email can not be updated.</p></div>
                  ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "about",
          label: "About",
          value: about
        },
        {},
        {}
      )}
                  ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "website",
          label: "Website",
          valid: websiteValid,
          validityMessage: "Website URL is not valid",
          value: website
        },
        {},
        {}
      )}
                  ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "location",
          label: "Location",
          value: location
        },
        {},
        {}
      )}
                  <div class="${"field is-horizontal"}"><div class="${"field-label"}"><label class="${"label"}">Gender</label></div>
                    <div class="${"field-body"}"><div class="${"field is-narrow"}"><div class="${"control"}"><label class="${"radio"}"><input type="${"radio"}" value="${"Male"}"${""}>
                            Male
                          </label>
                          <label class="${"radio"}"><input type="${"radio"}" value="${"Female"}"${""}>
                            Female
                          </label>
                          <label class="${"radio"}"><input type="${"radio"}" value="${"Other"}"${""}>
                            Other
                          </label></div></div></div></div>
                  <button class="${"btn btn-primary float-end"}" ${!formIsValid ? "disabled" : ""}>Save
                  </button></div>
                <div class="${"badge text-dark"}">Fields with *asterisk are required.
                </div></form>


              <form class="${"card mb-4"}" id="${"password-reset-form"}"><div class="${"card-body"}">${validate_component(Input, "Input").$$render(
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
                  <button class="${"btn float-end btn-primary"}" ${!passwordFormIsValid ? "disabled" : ""}>Update Password
                  </button></div></form>

              <form class="${"mt-5 mb-5"}"><div class="${"clearfix"}"><button class="${"btn btn-danger float-end"}">Delete Account
                  </button></div>
                <br>
                <span class="${"badge bg-warning float-end text-black-50"}">${validate_component(AlertTriangleIcon, "AlertTriangleIcon").$$render($$result, { size: "2x" }, {}, {})}
								Warning! Deleting your account is irreversible.
							</span></form></div></div></div>` : ``}</div></section>`;
    }
  })}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-ZMOPRKEE.js.map
