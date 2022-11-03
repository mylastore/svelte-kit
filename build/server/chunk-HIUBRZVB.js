import {
  add_attribute,
  create_ssr_component,
  escape
} from "./chunk-INXCOC2Z.js";

// .svelte-kit/adapter-node/chunks/Input.js
function isRequire(str) {
  if (str) {
    return str !== "";
  }
}
function isPassword(val) {
  return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,50})$").test(val);
}
function isEmail(val) {
  return new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$").test(val);
}
function isUrl(val) {
  return new RegExp(
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  ).test(val);
}
var css = {
  code: ".invalid.svelte-1yagpkh{border-color:#ffa8a8;background:#fde3e3}.error-message.svelte-1yagpkh{color:red;margin:0.25rem 0}",
  map: null
};
var Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { controlType = "input" } = $$props;
  let { id } = $$props;
  let { label } = $$props;
  let { rows = null } = $$props;
  let { value } = $$props;
  let { type = "text" } = $$props;
  let { valid = true } = $$props;
  let { className = "" } = $$props;
  let { validityMessage = "" } = $$props;
  let { help } = $$props;
  let touched = false;
  if ($$props.controlType === void 0 && $$bindings.controlType && controlType !== void 0)
    $$bindings.controlType(controlType);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.validityMessage === void 0 && $$bindings.validityMessage && validityMessage !== void 0)
    $$bindings.validityMessage(validityMessage);
  if ($$props.help === void 0 && $$bindings.help && help !== void 0)
    $$bindings.help(help);
  $$result.css.add(css);
  return `<div class="${"mb-3"}"><label class="${"form-label"}"${add_attribute("for", id, 0)}>${escape(label)}</label>
	${controlType === "textarea" ? `<textarea class="${[
    "form-control svelte-1yagpkh",
    "textarea " + (!valid && touched ? "invalid" : "")
  ].join(" ").trim()}"${add_attribute("rows", rows, 0)}${add_attribute("id", id, 0)}>${value || ""}</textarea>
		${help ? `<div class="${"form-text"}">${escape(help)}</div>` : ``}` : ``}
	${controlType === "input" ? `<input class="${"form-control " + escape(className, true) + " " + escape(!valid && touched ? "error" : "", true) + " svelte-1yagpkh"}"${add_attribute("type", type, 0)}${add_attribute("id", id, 0)}${add_attribute("value", value, 0)}>
		${help ? `<div class="${"form-text"}">${escape(help)}</div>` : ``}` : ``}
	${validityMessage && !valid && touched ? `<p class="${"error-message svelte-1yagpkh"}">${escape(validityMessage)}</p>` : ``}
</div>`;
});

export {
  isRequire,
  isPassword,
  isEmail,
  isUrl,
  Input
};
//# sourceMappingURL=chunk-HIUBRZVB.js.map
