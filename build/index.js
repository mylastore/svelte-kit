var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// node_modules/@sveltejs/adapter-node/files/shims.js
import { createRequire } from "module";
import { Headers, Request, Response, fetch } from "@sveltejs/kit/install-fetch";
Object.defineProperty(globalThis, "require", {
  enumerable: true,
  value: createRequire(import.meta.url)
});

// .svelte-kit/output/server/app.js
import {
  parse
} from "cookie";
import fetch$1 from "isomorphic-fetch";
import "js-cookie";
import { DateTime } from "luxon";
import jwt_decode from "jwt-decode";
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function isContentTypeTextual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s22 = subscribers[i];
          s22[1]();
          subscriber_queue$1.push(s22, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  branch,
  page: page2
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (branch) {
    branch.forEach(({ node: node2, loaded, fetched, uses_credentials }) => {
      if (node2.css)
        node2.css.forEach((url) => css2.add(url));
      if (node2.js)
        node2.js.forEach((url) => js.add(url));
      if (node2.styles)
        node2.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session2 = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session: session2
      },
      page: page2,
      components: branch.map(({ node: node2 }) => node2.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session2.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node: node2 }) => `import(${s$1(node2.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2 && page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2 && page2.path)},
						query: new URLSearchParams(${page2 ? s$1(page2.query.toString()) : ""}),
						params: ${page2 && s$1(page2.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base, path) {
  const base_match = absolute.exec(base);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base}"`);
  }
  const baseparts = path_match ? [] : base.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page: page2,
  node: node2,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node2;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module.load) {
    const load_input = {
      page: page2,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d22) => d22.file === filename || d22.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? {
              "content-type": asset.type
            } : {}
          }) : await fetch(`http://${page2.host}/${asset.file}`, opts);
        } else if (resolved.startsWith(options2.paths.base || "/")) {
          const relative = resolved.replace(options2.paths.base, "");
          const headers = __spreadValues({}, opts.headers);
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body,
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = __spreadProps(__spreadValues({}, opts.headers), {
                cookie: request.headers.cookie
              });
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.serverFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: __spreadValues({}, context)
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node2.entry} - load must return a value except for page fall through`);
  }
  return {
    node: node2,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key in obj) {
    clone[key.toLowerCase()] = obj[key];
  }
  return clone;
}
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function resolve_option(opt, ctx) {
  if (typeof opt === "function") {
    return await opt(ctx);
  }
  return opt;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  const leaf_promise = async () => branch[branch.length - 1].node.module;
  const page_config = {
    ssr: await resolve_option(options2.ssr, { request, page: leaf_promise }),
    router: await resolve_option(options2.router, { request, page: leaf_promise }),
    hydrate: await resolve_option(options2.hydrate, { request, page: leaf_promise }),
    prerender: await resolve_option(options2.prerender, { request, page: leaf_promise })
  };
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch,
      page: page2
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const leaf_promise = options2.load_component(route.a[route.a.length - 1]).then((c) => c.module);
  const page_config = {
    ssr: await resolve_option(options2.ssr, { request, page: leaf_promise }),
    router: await resolve_option(options2.router, { request, page: leaf_promise }),
    hydrate: await resolve_option(options2.hydrate, { request, page: leaf_promise }),
    prerender: await resolve_option(options2.prerender, { request, page: leaf_promise })
  };
  if (state.prerender && !state.prerender.all && !page_config.prerender) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch;
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let nodes;
      try {
        nodes = await Promise.all(route.a.map((id) => options2.load_component(id)));
      } catch (err) {
        const error3 = coalesce_to_error(err);
        options2.handle_error(error3);
        return await respond_with_error({
          request,
          options: options2,
          state,
          $session,
          status: 500,
          error: error3
        });
      }
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node2 = nodes[i];
        let loaded;
        if (node2) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page: page2,
              node: node2,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            } else {
              branch.push(loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e);
            status = 500;
            error2 = e;
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page: page2,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = __spreadValues(__spreadValues({}, context), loaded.loaded.context);
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch: branch && branch.filter(Boolean),
      page: page2
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return error$1("no handler");
  }
  const match = route.pattern.exec(request.path);
  if (!match) {
    return error$1("could not parse parameters from request path");
  }
  const params = route.params(match);
  const response = await handler(__spreadProps(__spreadValues({}, request), { params }));
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return error$1("no response");
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = headers["content-type"];
  const is_type_textual = isContentTypeTextual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = __spreadProps(__spreadValues({}, headers), { "content-type": "application/json; charset=utf-8" });
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
function read_only_form_data() {
  const map2 = new Map();
  return {
    append(key, value) {
      if (map2.has(key)) {
        (map2.get(key) || []).push(value);
      } else {
        map2.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map2)
  };
}
var ReadOnlyFormData = class {
  constructor(map2) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map2);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  if (typeof raw === "string") {
    const [type, ...directives] = headers["content-type"].split(/;\s*/);
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append: append2 } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append2(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append: append2 } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append2(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: __spreadProps(__spreadValues({}, incoming), {
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: {},
        locals: {}
      }),
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true, prerender: true },
            status: 200,
            branch: []
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body || "")}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$h = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$h);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
function set_paths(paths2) {
}
function set_prerendering(value) {
}
async function handle({ request, resolve: resolve22 }) {
  const cookies = parse(request.headers.cookie || "");
  request.locals.user = cookies.user;
  request.locals.token = cookies.token;
  request.locals.authenticated = !!cookies.token;
  const response = await resolve22(request);
  return __spreadProps(__spreadValues({}, response), {
    headers: __spreadProps(__spreadValues({}, response.headers), {
      "x-custom-header": "potato"
    })
  });
}
function getSession(request) {
  return {
    authenticated: request.locals.authenticated,
    token: request.locals.token,
    user: request.locals.user ? JSON.parse(request.locals.user) : null
  };
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle,
  getSession
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "/." } };
function init(settings2 = default_settings) {
  set_paths(settings2.paths);
  set_prerendering(settings2.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-2c3ff9d9.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-2c3ff9d9.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/preload-helper-08cc8e69.js", "/./_app/chunks/singletons-12a22614.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      if (error2.frame) {
        console.error(error2.frame);
      }
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings2.paths,
    prerender: true,
    read: settings2.read,
    root: Root,
    service_worker: "/service-worker.js",
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "favicon.ico", "size": 1150, "type": "image/vnd.microsoft.icon" }, { "file": "img/1.webp", "size": 30320, "type": "image/webp" }, { "file": "img/github.svg", "size": 1626, "type": "image/svg+xml" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/register\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/register.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/forgot\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/forgot.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/admin\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/admin/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/admin\/settings\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/admin/settings.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/admin\/users\/([^/]+?)\/?$/,
      params: (m2) => ({ p: d(m2[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/admin/users/[p].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/admin\/user\/([^/]+?)\/?$/,
      params: (m2) => ({ id: d(m2[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/admin/user/[id].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/login\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/login.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/activation\/([^/]+?)\/?$/,
      params: (m2) => ({ token: d(m2[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/user/activation/[token].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/profile\/([^/]+?)\/?$/,
      params: (m2) => ({ username: d(m2[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/user/profile/[username].svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/reset\/([^/]+?)\/?$/,
      params: (m2) => ({ token: d(m2[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/user/reset/[token].svelte"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve22 }) => resolve22(request)),
  serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/register.svelte": () => Promise.resolve().then(function() {
    return register;
  }),
  "src/routes/forgot.svelte": () => Promise.resolve().then(function() {
    return forgot;
  }),
  "src/routes/admin/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/admin/settings.svelte": () => Promise.resolve().then(function() {
    return settings;
  }),
  "src/routes/admin/users/[p].svelte": () => Promise.resolve().then(function() {
    return _p_;
  }),
  "src/routes/admin/user/[id].svelte": () => Promise.resolve().then(function() {
    return _id_;
  }),
  "src/routes/login.svelte": () => Promise.resolve().then(function() {
    return login;
  }),
  "src/routes/user/activation/[token].svelte": () => Promise.resolve().then(function() {
    return _token_$1;
  }),
  "src/routes/user/profile/[username].svelte": () => Promise.resolve().then(function() {
    return _username_;
  }),
  "src/routes/user/reset/[token].svelte": () => Promise.resolve().then(function() {
    return _token_;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-6e007ce8.js", "css": ["/./_app/assets/pages/__layout.svelte-1e58b5ab.css", "/./_app/assets/Noti-daa08d5c.css"], "js": ["/./_app/pages/__layout.svelte-6e007ce8.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/preload-helper-08cc8e69.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js"], "styles": [] }, "src/routes/__error.svelte": { "entry": "/./_app/pages/__error.svelte-1eaac113.js", "css": ["/./_app/assets/pages/__error.svelte-b209fc9c.css"], "js": ["/./_app/pages/__error.svelte-1eaac113.js", "/./_app/chunks/vendor-23c8162e.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-237947cf.js", "css": ["/./_app/assets/pages/index.svelte-79901300.css"], "js": ["/./_app/pages/index.svelte-237947cf.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/variables-e34b2610.js"], "styles": [] }, "src/routes/register.svelte": { "entry": "/./_app/pages/register.svelte-01a0d59f.js", "css": ["/./_app/assets/pages/register.svelte-31e4e630.css", "/./_app/assets/validation-37230205.css", "/./_app/assets/Noti-daa08d5c.css"], "js": ["/./_app/pages/register.svelte-01a0d59f.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/validation-d3c71874.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js"], "styles": [] }, "src/routes/forgot.svelte": { "entry": "/./_app/pages/forgot.svelte-22eb1d68.js", "css": ["/./_app/assets/pages/forgot.svelte-57a74c4f.css", "/./_app/assets/validation-37230205.css", "/./_app/assets/Noti-daa08d5c.css"], "js": ["/./_app/pages/forgot.svelte-22eb1d68.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/validation-d3c71874.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js"], "styles": [] }, "src/routes/admin/index.svelte": { "entry": "/./_app/pages/admin/index.svelte-a8a5973c.js", "css": ["/./_app/assets/Tabs-6a048a2a.css", "/./_app/assets/Noti-daa08d5c.css", "/./_app/assets/LoadingSpinner-4fd162aa.css"], "js": ["/./_app/pages/admin/index.svelte-a8a5973c.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/Tabs-c7f83f7f.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/LoadingSpinner-fa8d942c.js"], "styles": [] }, "src/routes/admin/settings.svelte": { "entry": "/./_app/pages/admin/settings.svelte-fe72464c.js", "css": ["/./_app/assets/pages/admin/settings.svelte-00430a3c.css", "/./_app/assets/Noti-daa08d5c.css", "/./_app/assets/Tabs-6a048a2a.css", "/./_app/assets/LoadingSpinner-4fd162aa.css"], "js": ["/./_app/pages/admin/settings.svelte-fe72464c.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/Tabs-c7f83f7f.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/LoadingSpinner-fa8d942c.js"], "styles": [] }, "src/routes/admin/users/[p].svelte": { "entry": "/./_app/pages/admin/users/[p].svelte-35d46c91.js", "css": ["/./_app/assets/pages/admin/users/[p].svelte-51559c84.css", "/./_app/assets/Noti-daa08d5c.css", "/./_app/assets/Tabs-6a048a2a.css", "/./_app/assets/LoadingSpinner-4fd162aa.css"], "js": ["/./_app/pages/admin/users/[p].svelte-35d46c91.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/timeAgo-25ccc542.js", "/./_app/chunks/Tabs-c7f83f7f.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/LoadingSpinner-fa8d942c.js", "/./_app/chunks/navigation-2ffed81e.js", "/./_app/chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/admin/user/[id].svelte": { "entry": "/./_app/pages/admin/user/[id].svelte-25d78b4c.js", "css": ["/./_app/assets/pages/admin/user/[id].svelte-3fe69489.css", "/./_app/assets/Noti-daa08d5c.css", "/./_app/assets/Tabs-6a048a2a.css", "/./_app/assets/LoadingSpinner-4fd162aa.css"], "js": ["/./_app/pages/admin/user/[id].svelte-25d78b4c.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/timeAgo-25ccc542.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/Tabs-c7f83f7f.js", "/./_app/chunks/LoadingSpinner-fa8d942c.js"], "styles": [] }, "src/routes/login.svelte": { "entry": "/./_app/pages/login.svelte-a7200e9e.js", "css": ["/./_app/assets/pages/login.svelte-8438df88.css", "/./_app/assets/validation-37230205.css", "/./_app/assets/Noti-daa08d5c.css"], "js": ["/./_app/pages/login.svelte-a7200e9e.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/validation-d3c71874.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js"], "styles": [] }, "src/routes/user/activation/[token].svelte": { "entry": "/./_app/pages/user/activation/[token].svelte-e4d93c41.js", "css": ["/./_app/assets/Noti-daa08d5c.css"], "js": ["/./_app/pages/user/activation/[token].svelte-e4d93c41.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/navigation-2ffed81e.js", "/./_app/chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/user/profile/[username].svelte": { "entry": "/./_app/pages/user/profile/[username].svelte-c8a7bbef.js", "css": ["/./_app/assets/pages/user/profile/[username].svelte-c911583f.css", "/./_app/assets/validation-37230205.css", "/./_app/assets/LoadingSpinner-4fd162aa.css", "/./_app/assets/Noti-daa08d5c.css"], "js": ["/./_app/pages/user/profile/[username].svelte-c8a7bbef.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/timeAgo-25ccc542.js", "/./_app/chunks/validation-d3c71874.js", "/./_app/chunks/LoadingSpinner-fa8d942c.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/navigation-2ffed81e.js", "/./_app/chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/user/reset/[token].svelte": { "entry": "/./_app/pages/user/reset/[token].svelte-e4b14832.js", "css": ["/./_app/assets/Noti-daa08d5c.css", "/./_app/assets/validation-37230205.css"], "js": ["/./_app/pages/user/reset/[token].svelte-e4b14832.js", "/./_app/chunks/vendor-23c8162e.js", "/./_app/chunks/Noti-91c2ae11.js", "/./_app/chunks/variables-e34b2610.js", "/./_app/chunks/validation-d3c71874.js", "/./_app/chunks/stores-36a9b970.js", "/./_app/chunks/navigation-2ffed81e.js", "/./_app/chunks/singletons-12a22614.js"], "styles": [] } };
async function load_component(file) {
  return __spreadValues({
    module: await module_lookup[file]()
  }, metadata_lookup[file]);
}
function render(request, {
  prerender
} = {}) {
  const host2 = request.headers["host"];
  return respond(__spreadProps(__spreadValues({}, request), { host: host2 }), options, { prerender });
}
var ssr = typeof window === "undefined";
var getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
var page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var error = (verb) => {
  throw new Error(ssr ? `Can only ${verb} session store in browser` : `Cannot ${verb} session store before subscribing`);
};
var session = {
  subscribe(fn) {
    const store = getStores().session;
    if (!ssr) {
      session.set = store.set;
      session.update = store.update;
    }
    return store.subscribe(fn);
  },
  set: (value) => {
    error("set");
  },
  update: (updater) => {
    error("update");
  }
};
var handleSession = async (res) => {
  if (res.status === 440) {
    await logout();
  }
};
var logout = async () => {
  await removeCookie();
  await removeCookie();
};
var removeCookie = async (key) => {
};
var variables = {
  env: "production",
  apiDevPath: "http://localhost:8001/api",
  apiLivePath: "https://papaslive.com/api",
  appName: "SVELTE KIT",
  currencyLocation: { symbol: "$", code: "USA" },
  analyticsID: "UA-12345678-9"
};
var apiPath = variables.apiLivePath;
var api = (method, path, data, token) => {
  const noBodyData = method === "GET" || method === "DELETE";
  return fetch$1(`${apiPath}/${path}`, __spreadValues({
    method: `${method}`,
    headers: __spreadValues({
      Accept: "application/json",
      "Content-Type": "application/json"
    }, token ? { Authorization: `Bearer ${token}` } : {})
  }, !noBodyData ? { body: JSON.stringify(data) } : null)).then(async (res) => {
    await handleSession(res);
    return await res.json();
  }).catch(() => {
    setTimeout(async () => {
      await logout();
    }, 4e3);
    return {
      status: 502,
      message: "Oops! Something is wrong. Please try later."
    };
  });
};
var Gighub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg fill="${"none"}" width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z"}" fill="${"#999999"}"></path><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z"}" fill="${"#999999"}"></path></svg>`;
});
var css$g = {
  code: ".animated-icon.svelte-1dt9k7q.svelte-1dt9k7q{width:30px;height:22px;position:relative;margin:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.5s ease-in-out;-moz-transition:.5s ease-in-out;-o-transition:.5s ease-in-out;transition:.5s ease-in-out;cursor:pointer}.animated-icon.svelte-1dt9k7q span.svelte-1dt9k7q{display:block;position:absolute;height:3px;width:100%;border-radius:9px;opacity:1;left:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out}.animated-icon.svelte-1dt9k7q span.svelte-1dt9k7q{background:red}.animated-icon.svelte-1dt9k7q span.svelte-1dt9k7q:nth-child(1){top:1px;-webkit-transform-origin:left center;-moz-transform-origin:left center;-o-transform-origin:left center;transform-origin:left center}.animated-icon.svelte-1dt9k7q span.svelte-1dt9k7q:nth-child(2){top:10px;-webkit-transform-origin:left center;-moz-transform-origin:left center;-o-transform-origin:left center;transform-origin:left center}.animated-icon.svelte-1dt9k7q span.svelte-1dt9k7q:nth-child(3){top:19px;-webkit-transform-origin:left center;-moz-transform-origin:left center;-o-transform-origin:left center;transform-origin:left center}.animated-icon.open.svelte-1dt9k7q span.svelte-1dt9k7q:nth-child(1){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);top:0px;left:3px}.animated-icon.open.svelte-1dt9k7q span.svelte-1dt9k7q:nth-child(2){width:0%;opacity:0}.animated-icon.open.svelte-1dt9k7q span.svelte-1dt9k7q:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);top:21px;left:3px}",
  map: `{"version":3,"file":"Nav.svelte","sources":["Nav.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte'\\n  import { page } from '$app/stores'\\n  import { api } from '$lib/utils/api'\\n  import { logout } from '$lib/utils/auth'\\n  import { session } from '$app/stores'\\n  import 'bootstrap/dist/css/bootstrap.css'\\n  import '../../src/app.css'\\n  import {variables} from '$lib/utils/variables'\\n  import Github from '$lib/images/Gighub.svelte'\\n  let user = $session.user\\n\\n  let isActive = false\\n\\n  function toggleNav () {\\n    isActive = !isActive\\n  }\\n\\n  onMount(async () => {\\n    await import('bootstrap/js/dist/dropdown')\\n    await import('bootstrap/js/dist/collapse')\\n\\n    var elements = document.getElementsByClassName('a-link')\\n\\n    for (var i = 0; i < elements.length; i++) {\\n      elements[i].addEventListener('click', toggleNav, false)\\n    }\\n\\n  })\\n\\n  async function logOut () {\\n    const res = await api('POST', 'user/logout')\\n    if (res) {\\n      await logout()\\n    }\\n  }\\n<\/script>\\n\\n<nav class='navbar navbar-expand-lg navbar-light bg-light'>\\n    <div class='container'>\\n        <a class='navbar-brand a-link' href='/'>\\n            {variables.appName}\\n        </a>\\n        <button\\n                class='navbar-toggler third-button'\\n                on:click={toggleNav}\\n                type='button'\\n                data-bs-toggle='collapse'\\n                data-bs-target='#navbarSupportedContent'\\n                aria-controls='navbarSupportedContent'\\n                aria-expanded='false'\\n                aria-label='Toggle navigation'\\n        >\\n            <div class=\\"animated-icon {isActive ? 'open' : undefined}\\"><span></span><span></span><span></span></div>\\n        </button>\\n        <div class='collapse navbar-collapse' class:show={isActive} id='navbarSupportedContent'>\\n            <ul class='navbar-nav me-auto'>\\n                <li class='nav-item a-link'>\\n                    &nbsp;\\n                </li>\\n            </ul>\\n            <ul class=\\"navbar-nav me-auto\\">\\n                <li class=\\"nav-item\\">\\n                    <a class=\\"nav-link active git a-link\\" aria-current=\\"page\\" target='_blank' href=\\"https://github.com/mylastore/svelte-kit.git\\">\\n                        <Github />\\n                    </a>\\n                </li>\\n            </ul>\\n            <ul class='navbar-nav'>\\n                {#if !user}\\n                    <li class='nav-item'>\\n                        <a class='nav-link a-link' class:active={$page.path === '/login'} href='/login'>Sing In</a>\\n                    </li>\\n                    <li class='nav-item'>\\n                        <a class='a-link btn btn-outline-secondary' role=\\"button\\" class:active={$page.path === '/register'} href='/register'>Sing Up</a>\\n                    </li>\\n                {/if}\\n                {#if user}\\n                    <li class='nav-item dropdown'>\\n                        <a\\n                                class:active={$page.path === \`user/profile/\${user.username}\`}\\n                                class='nav-link dropdown-toggle'\\n                                href='#'\\n                                id='navbarDropdown'\\n                                role='button'\\n                                data-bs-toggle='dropdown'\\n                                aria-expanded='false'\\n                        >\\n                            {user.username}\\n                        </a>\\n                        <ul class='dropdown-menu dropdown-menu-end' aria-labelledby='navbarDropdown'>\\n                            <li>\\n                                <a\\n                                        class='dropdown-item a-link'\\n                                        class:active={$page.path === \`user/profile/\${user.username}\`}\\n                                        href='/user/profile/{user.username}'>Profile</a\\n                                >\\n                            </li>\\n                            {#if user.role === 'admin'}\\n                                <li>\\n                                    <a class='dropdown-item a-link' class:active={$page.path === '/admin'} href='/admin'\\n                                    >Admin</a\\n                                    >\\n                                </li>\\n                            {/if}\\n                            <li>\\n                                <hr class='dropdown-divider'/>\\n                            </li>\\n                            <li><a class='dropdown-item a-link' on:click|preventDefault={logOut} href='#'>Logout</a>\\n                            </li>\\n                        </ul>\\n                    </li>\\n                {/if}\\n            </ul>\\n        </div>\\n    </div>\\n</nav>\\n\\n<style>\\n    .animated-icon {\\n        width: 30px;\\n        height: 22px;\\n        position: relative;\\n        margin: 0;\\n        -webkit-transform: rotate(0deg);\\n        -moz-transform: rotate(0deg);\\n        -o-transform: rotate(0deg);\\n        transform: rotate(0deg);\\n        -webkit-transition: .5s ease-in-out;\\n        -moz-transition: .5s ease-in-out;\\n        -o-transition: .5s ease-in-out;\\n        transition: .5s ease-in-out;\\n        cursor: pointer;\\n    }\\n\\n    .animated-icon span {\\n        display: block;\\n        position: absolute;\\n        height: 3px;\\n        width: 100%;\\n        border-radius: 9px;\\n        opacity: 1;\\n        left: 0;\\n        -webkit-transform: rotate(0deg);\\n        -moz-transform: rotate(0deg);\\n        -o-transform: rotate(0deg);\\n        transform: rotate(0deg);\\n        -webkit-transition: .25s ease-in-out;\\n        -moz-transition: .25s ease-in-out;\\n        -o-transition: .25s ease-in-out;\\n        transition: .25s ease-in-out;\\n    }\\n\\n    .animated-icon span {\\n        background: red;\\n    }\\n\\n    .animated-icon span:nth-child(1) {\\n        top: 1px;\\n        -webkit-transform-origin: left center;\\n        -moz-transform-origin: left center;\\n        -o-transform-origin: left center;\\n        transform-origin: left center;\\n    }\\n\\n    .animated-icon span:nth-child(2) {\\n        top: 10px;\\n        -webkit-transform-origin: left center;\\n        -moz-transform-origin: left center;\\n        -o-transform-origin: left center;\\n        transform-origin: left center;\\n    }\\n\\n    .animated-icon span:nth-child(3) {\\n        top: 19px;\\n        -webkit-transform-origin: left center;\\n        -moz-transform-origin: left center;\\n        -o-transform-origin: left center;\\n        transform-origin: left center;\\n    }\\n\\n    .animated-icon.open span:nth-child(1) {\\n        -webkit-transform: rotate(45deg);\\n        -moz-transform: rotate(45deg);\\n        -o-transform: rotate(45deg);\\n        transform: rotate(45deg);\\n        top: 0px;\\n        left: 3px;\\n    }\\n\\n    .animated-icon.open span:nth-child(2) {\\n        width: 0%;\\n        opacity: 0;\\n    }\\n\\n    .animated-icon.open span:nth-child(3) {\\n        -webkit-transform: rotate(-45deg);\\n        -moz-transform: rotate(-45deg);\\n        -o-transform: rotate(-45deg);\\n        transform: rotate(-45deg);\\n        top: 21px;\\n        left: 3px;\\n    }\\n</style>"],"names":[],"mappings":"AAuHI,cAAc,8BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,iBAAiB,CAAE,OAAO,IAAI,CAAC,CAC/B,cAAc,CAAE,OAAO,IAAI,CAAC,CAC5B,YAAY,CAAE,OAAO,IAAI,CAAC,CAC1B,SAAS,CAAE,OAAO,IAAI,CAAC,CACvB,kBAAkB,CAAE,GAAG,CAAC,WAAW,CACnC,eAAe,CAAE,GAAG,CAAC,WAAW,CAChC,aAAa,CAAE,GAAG,CAAC,WAAW,CAC9B,UAAU,CAAE,GAAG,CAAC,WAAW,CAC3B,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,6BAAc,CAAC,IAAI,eAAC,CAAC,AACjB,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,CAAC,CACV,IAAI,CAAE,CAAC,CACP,iBAAiB,CAAE,OAAO,IAAI,CAAC,CAC/B,cAAc,CAAE,OAAO,IAAI,CAAC,CAC5B,YAAY,CAAE,OAAO,IAAI,CAAC,CAC1B,SAAS,CAAE,OAAO,IAAI,CAAC,CACvB,kBAAkB,CAAE,IAAI,CAAC,WAAW,CACpC,eAAe,CAAE,IAAI,CAAC,WAAW,CACjC,aAAa,CAAE,IAAI,CAAC,WAAW,CAC/B,UAAU,CAAE,IAAI,CAAC,WAAW,AAChC,CAAC,AAED,6BAAc,CAAC,IAAI,eAAC,CAAC,AACjB,UAAU,CAAE,GAAG,AACnB,CAAC,AAED,6BAAc,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AAC9B,GAAG,CAAE,GAAG,CACR,wBAAwB,CAAE,IAAI,CAAC,MAAM,CACrC,qBAAqB,CAAE,IAAI,CAAC,MAAM,CAClC,mBAAmB,CAAE,IAAI,CAAC,MAAM,CAChC,gBAAgB,CAAE,IAAI,CAAC,MAAM,AACjC,CAAC,AAED,6BAAc,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AAC9B,GAAG,CAAE,IAAI,CACT,wBAAwB,CAAE,IAAI,CAAC,MAAM,CACrC,qBAAqB,CAAE,IAAI,CAAC,MAAM,CAClC,mBAAmB,CAAE,IAAI,CAAC,MAAM,CAChC,gBAAgB,CAAE,IAAI,CAAC,MAAM,AACjC,CAAC,AAED,6BAAc,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AAC9B,GAAG,CAAE,IAAI,CACT,wBAAwB,CAAE,IAAI,CAAC,MAAM,CACrC,qBAAqB,CAAE,IAAI,CAAC,MAAM,CAClC,mBAAmB,CAAE,IAAI,CAAC,MAAM,CAChC,gBAAgB,CAAE,IAAI,CAAC,MAAM,AACjC,CAAC,AAED,cAAc,oBAAK,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AACnC,iBAAiB,CAAE,OAAO,KAAK,CAAC,CAChC,cAAc,CAAE,OAAO,KAAK,CAAC,CAC7B,YAAY,CAAE,OAAO,KAAK,CAAC,CAC3B,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,AACb,CAAC,AAED,cAAc,oBAAK,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AACnC,KAAK,CAAE,EAAE,CACT,OAAO,CAAE,CAAC,AACd,CAAC,AAED,cAAc,oBAAK,CAAC,mBAAI,WAAW,CAAC,CAAC,AAAC,CAAC,AACnC,iBAAiB,CAAE,OAAO,MAAM,CAAC,CACjC,cAAc,CAAE,OAAO,MAAM,CAAC,CAC9B,YAAY,CAAE,OAAO,MAAM,CAAC,CAC5B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,AACb,CAAC"}`
};
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  let $page, $$unsubscribe_page;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let user = $session.user;
  $$result.css.add(css$g);
  $$unsubscribe_session();
  $$unsubscribe_page();
  return `<nav class="${"navbar navbar-expand-lg navbar-light bg-light"}"><div class="${"container"}"><a class="${"navbar-brand a-link"}" href="${"/"}">${escape(variables.appName)}</a>
        <button class="${"navbar-toggler third-button"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${"#navbarSupportedContent"}" aria-controls="${"navbarSupportedContent"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><div class="${"animated-icon " + escape(void 0) + " svelte-1dt9k7q"}"><span class="${"svelte-1dt9k7q"}"></span><span class="${"svelte-1dt9k7q"}"></span><span class="${"svelte-1dt9k7q"}"></span></div></button>
        <div class="${["collapse navbar-collapse", ""].join(" ").trim()}" id="${"navbarSupportedContent"}"><ul class="${"navbar-nav me-auto"}"><li class="${"nav-item a-link"}">\xA0
                </li></ul>
            <ul class="${"navbar-nav me-auto"}"><li class="${"nav-item"}"><a class="${"nav-link active git a-link"}" aria-current="${"page"}" target="${"_blank"}" href="${"https://github.com/mylastore/svelte-kit.git"}">${validate_component(Gighub, "Github").$$render($$result, {}, {}, {})}</a></li></ul>
            <ul class="${"navbar-nav"}">${!user ? `<li class="${"nav-item"}"><a class="${["nav-link a-link", $page.path === "/login" ? "active" : ""].join(" ").trim()}" href="${"/login"}">Sing In</a></li>
                    <li class="${"nav-item"}"><a class="${[
    "a-link btn btn-outline-secondary",
    $page.path === "/register" ? "active" : ""
  ].join(" ").trim()}" role="${"button"}" href="${"/register"}">Sing Up</a></li>` : ``}
                ${user ? `<li class="${"nav-item dropdown"}"><a class="${[
    "nav-link dropdown-toggle",
    $page.path === `user/profile/${user.username}` ? "active" : ""
  ].join(" ").trim()}" href="${"#"}" id="${"navbarDropdown"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-expanded="${"false"}">${escape(user.username)}</a>
                        <ul class="${"dropdown-menu dropdown-menu-end"}" aria-labelledby="${"navbarDropdown"}"><li><a class="${[
    "dropdown-item a-link",
    $page.path === `user/profile/${user.username}` ? "active" : ""
  ].join(" ").trim()}" href="${"/user/profile/" + escape(user.username)}">Profile</a></li>
                            ${user.role === "admin" ? `<li><a class="${["dropdown-item a-link", $page.path === "/admin" ? "active" : ""].join(" ").trim()}" href="${"/admin"}">Admin</a></li>` : ``}
                            <li><hr class="${"dropdown-divider"}"></li>
                            <li><a class="${"dropdown-item a-link"}" href="${"#"}">Logout</a></li></ul></li>` : ``}</ul></div></div>
</nav>`;
});
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var css$f = {
  code: ".notification.svelte-5nrwzn{min-width:400px;border-top-left-radius:.25rem;display:block;position:fixed;top:0;right:0;padding:1rem;z-index:10}@media only screen and (max-width: 600px){.notification.svelte-5nrwzn{right:0;left:0;margin:auto}}",
  map: `{"version":3,"file":"Noti.svelte","sources":["Noti.svelte"],"sourcesContent":["<script context='module'>\\n  import { writable } from 'svelte/store'\\n\\n  export const notifications = (() => {\\n    const { update, subscribe } = writable([])\\n    const push = (message, messageType) => {\\n      messageType = messageType ? messageType : 'danger'\\n      update((arr) => [...arr, { message, messageType }])\\n    }\\n    const pop = () => update((arr) => (arr.shift(), arr))\\n    return {\\n      pop,\\n      push,\\n      subscribe\\n    }\\n  })()\\n<\/script>\\n\\n<script>\\n  import { createEventDispatcher } from 'svelte'\\n\\n  export let duration = 3000\\n  const dispatch = createEventDispatcher()\\n  let timeout\\n  notifications.subscribe(({ length }) => {\\n    if (timeout || !length) return\\n    dispatch('notify', $notifications[0])\\n    timeout = setTimeout(() => {\\n      timeout = false\\n      notifications.pop()\\n    }, duration)\\n  })\\n<\/script>\\n\\n{#if $notifications[0]}\\n  <div class='notification'>\\n    <div class='alert alert-{$notifications[0].messageType}' role='alert'>\\n      <span>{$notifications[0].message}</span>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  .notification {\\n    min-width: 400px;\\n    border-top-left-radius: .25rem;\\n    display: block;\\n    position: fixed;\\n    top: 0;\\n    right: 0;\\n    padding: 1rem;\\n    z-index: 10;\\n  }\\n\\n  @media only screen and (max-width: 600px) {\\n    .notification{\\n      right: 0;\\n      left: 0;\\n      margin: auto;\\n    }\\n  }\\n</style>"],"names":[],"mappings":"AA2CE,aAAa,cAAC,CAAC,AACb,SAAS,CAAE,KAAK,CAChB,sBAAsB,CAAE,MAAM,CAC9B,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,EAAE,AACb,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,2BAAa,CAAC,AACZ,KAAK,CAAE,CAAC,CACR,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,AACd,CAAC,AACH,CAAC"}`
};
var notifications = (() => {
  const { update, subscribe: subscribe2 } = writable([]);
  const push = (message, messageType) => {
    messageType = messageType ? messageType : "danger";
    update((arr) => [...arr, { message, messageType }]);
  };
  const pop = () => update((arr) => (arr.shift(), arr));
  return { pop, push, subscribe: subscribe2 };
})();
var Noti = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let { duration = 3e3 } = $$props;
  const dispatch = createEventDispatcher();
  let timeout;
  notifications.subscribe(({ length }) => {
    if (timeout || !length)
      return;
    dispatch("notify", $notifications[0]);
    timeout = setTimeout(() => {
      timeout = false;
      notifications.pop();
    }, duration);
  });
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  $$result.css.add(css$f);
  $$unsubscribe_notifications();
  return `${$notifications[0] ? `<div class="${"notification svelte-5nrwzn"}"><div class="${"alert alert-" + escape($notifications[0].messageType) + " svelte-5nrwzn"}" role="${"alert"}"><span>${escape($notifications[0].message)}</span></div></div>` : ``}`;
});
var css$e = {
  code: "footer.svelte-1pgz32s{margin:40px;overflow:hidden}",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\n\\timport Nav from '$lib/Nav.svelte'\\n\\timport { variables } from '$lib/utils/variables'\\n\\timport Notification from '$lib/Noti.svelte'\\n\\n\\tconst year = new Date().getFullYear()\\n\\n<\/script>\\n\\n<div class=\\"site\\">\\n\\t<Nav />\\n\\t<Notification duration='7000'/>\\n\\t<div class=\\"site-content\\">\\n\\t\\t<slot />\\n\\t</div>\\n\\t<footer class=\\"text-center\\">\\n\\t\\t<p>\\n\\t\\t\\t<a href=\\"/\\"><strong>&copy {year} {variables.appName}. All rights reserved</strong></a><br>\\n\\t\\t\\tThe source code is open source -  <a href=\\"https://mylastore.com\\">Author</a>\\n\\t\\t</p>\\n\\t</footer>\\n</div>\\n\\n<style>\\n\\tfooter {\\n\\t\\tmargin: 40px;\\n\\t\\toverflow: hidden;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwBC,MAAM,eAAC,CAAC,AACP,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,AACjB,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const year = new Date().getFullYear();
  $$result.css.add(css$e);
  return `<div class="${"site"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
	${validate_component(Noti, "Notification").$$render($$result, { duration: "7000" }, {}, {})}
	<div class="${"site-content"}">${slots.default ? slots.default({}) : ``}</div>
	<footer class="${"text-center svelte-1pgz32s"}"><p><a href="${"/"}"><strong>\xA9 ${escape(year)} ${escape(variables.appName)}. All rights reserved</strong></a><br>
			The source code is open source -  <a href="${"https://mylastore.com"}">Author</a></p></footer>
</div>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
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
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-alert-triangle " + escape(customClass)}"><path d="${"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}"></path><line x1="${"12"}" y1="${"9"}" x2="${"12"}" y2="${"13"}"></line><line x1="${"12"}" y1="${"17"}" x2="${"12.01"}" y2="${"17"}"></line></svg>`;
});
var ChevronLeftIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-chevron-left " + escape(customClass)}"><polyline points="${"15 18 9 12 15 6"}"></polyline></svg>`;
});
var ChevronRightIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"${add_attribute("stroke-width", strokeWidth, 0)} stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-chevron-right " + escape(customClass)}"><polyline points="${"9 18 15 12 9 6"}"></polyline></svg>`;
});
var css$d = {
  code: ".alert-icon.svelte-12kctbe{margin-bottom:1rem;color:var(--bs-danger)}.alert-container.svelte-12kctbe{display:block;text-align:center;margin:5rem auto}",
  map: `{"version":3,"file":"__error.svelte","sources":["__error.svelte"],"sourcesContent":["<script context=\\"module\\">\\n  export function load ({ error, status }) {\\n    return {\\n      props: {\\n        status: status,\\n        error: error\\n      }\\n    }\\n  }\\n<\/script>\\n\\n<script>\\n  import { AlertTriangleIcon } from 'svelte-feather-icons'\\n\\n  export let status\\n  export let error\\n<\/script>\\n\\n{#if error}\\n  <div class=\\"container\\">\\n    <div class=\\"alert-container\\">\\n      <div class=\\"alert-icon\\">\\n        <AlertTriangleIcon size=\\"5x\\"/>\\n      </div>\\n      <h1>{status}</h1>\\n      <h4>{error.message}</h4>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  .alert-icon {\\n    margin-bottom: 1rem;\\n    color: var(--bs-danger);\\n  }\\n\\n  .alert-container {\\n    display: block;\\n    text-align: center;\\n    margin: 5rem auto;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+BE,WAAW,eAAC,CAAC,AACX,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,IAAI,WAAW,CAAC,AACzB,CAAC,AAED,gBAAgB,eAAC,CAAC,AAChB,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC"}`
};
function load$7({ error: error2, status }) {
  return { props: { status, error: error2 } };
}
var _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  $$result.css.add(css$d);
  return `${error2 ? `<div class="${"container"}"><div class="${"alert-container svelte-12kctbe"}"><div class="${"alert-icon svelte-12kctbe"}">${validate_component(AlertTriangleIcon, "AlertTriangleIcon").$$render($$result, { size: "5x" }, {}, {})}</div>
      <h1>${escape(status)}</h1>
      <h4>${escape(error2.message)}</h4></div></div>` : ``}`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error,
  load: load$7
});
var css$c = {
  code: ".svelte-kit.svelte-8vqk29{max-width:400px}",
  map: `{"version":3,"file":"Logo.svelte","sources":["Logo.svelte"],"sourcesContent":["<div class=\\"svelte-kit\\">\\n  <svg viewBox='30 31 400 50' xmlns='http://www.w3.org/2000/svg'>\\n    <path\\n        d='M348.645 80.0599L335.205 55.1536L326.745 65.3616V80.0599H319.648V32.4241H326.745V55.4938L345.169 32.4241H353.356L339.986 49.1652L356.974 80.0599H348.645ZM372.319 80.0599V32.4241H379.416V80.0599H372.319ZM416.394 39.2295V80.0599H409.3V39.2295H395.789V32.4241H429.902V39.2295H416.394Z'\\n        fill='#FF3E00'/>\\n    <path\\n        d='M48.3359 80.876C44.4451 80.9736 40.6159 79.8942 37.3519 77.78C34.3023 75.7742 32.0378 72.7827 30.9387 69.3081L37.6241 66.8581C38.5518 68.991 40.066 70.8183 41.9916 72.1286C43.9468 73.4367 46.2574 74.1149 48.6113 74.0715C50.8732 74.1893 53.1053 73.5154 54.9219 72.1661C55.7123 71.5043 56.3367 70.6675 56.7454 69.7223C57.1541 68.7772 57.3357 67.7499 57.2758 66.7223C57.2852 65.7649 57.063 64.8193 56.6281 63.9657C56.2495 63.2023 55.7547 62.5019 55.1613 61.8894C54.4103 61.2078 53.5586 60.6454 52.6361 60.222C51.4981 59.6561 50.5542 59.2252 49.8042 58.9292C49.0543 58.6332 47.9513 58.2363 46.4952 57.7385C44.6761 57.1034 43.3118 56.6046 42.4023 56.242C41.1703 55.719 39.9737 55.1164 38.8202 54.4381C37.579 53.7813 36.4506 52.9313 35.4776 51.9202C34.6349 50.9339 33.9554 49.8197 33.4647 48.6198C32.5217 46.3326 32.3235 43.8075 32.8983 41.4018C33.473 38.9961 34.7915 36.8316 36.6673 35.2143C39.3991 32.8106 43.1066 31.6085 47.7898 31.608C51.7018 31.608 54.9201 32.4699 57.4448 34.1937C59.8955 35.819 61.695 38.2524 62.528 41.0678L55.9772 43.2446C55.3192 41.7704 54.2079 40.5431 52.8042 39.7406C51.1067 38.8008 49.184 38.3416 47.2438 38.4125C45.3411 38.3039 43.4564 38.8307 41.8875 39.9098C41.247 40.4053 40.7359 41.0476 40.3976 41.7822C40.0593 42.5168 39.9038 43.322 39.9443 44.1294C39.95 44.7485 40.0866 45.3594 40.3452 45.9222C40.6037 46.485 40.9784 46.987 41.4447 47.3956C42.3512 48.2863 43.4153 49.0016 44.5833 49.5054C45.6753 49.9589 47.3356 50.5712 49.5641 51.342C50.9278 51.8419 51.9396 52.2162 52.5993 52.4648C53.259 52.7134 54.2249 53.1332 55.4968 53.7242C56.5174 54.1744 57.4987 54.7086 58.4304 55.3213C59.2647 55.9196 60.0622 56.5673 60.8187 57.261C61.6416 57.9722 62.3444 58.8107 62.9003 59.7445C63.4302 60.7128 63.8425 61.7406 64.1285 62.8062C64.4763 64.0584 64.6485 65.3527 64.6401 66.6521C64.6401 71.0984 63.1162 74.5802 60.0685 77.0972C57.0207 79.6143 53.1098 80.8739 48.3359 80.876ZM92.0693 80.0599L75.6946 32.4241H83.3367L94.1846 65.6331C94.784 67.4193 95.2852 69.2369 95.6858 71.0777C96.085 69.2366 96.5861 67.4189 97.187 65.6331L107.899 32.4241H115.472L99.1646 80.0599H92.0693ZM129.935 80.0599V32.4241H159.546V39.0937H137.031V52.159H151.563V58.8286H137.031V73.3903H161.05V80.0599H129.935ZM179.126 80.0599V32.4241H186.223V73.2546H209.556V80.0599H179.126ZM236.301 39.2295V80.0599H229.204V39.2295H215.696V32.4241H249.813V39.2295H236.301ZM264.478 80.0599V32.4241H294.088V39.0937H271.574V52.159H286.106V58.8286H271.574V73.3903H295.593V80.0599H264.478Z'\\n        fill='#4A4A55'/>\\n  </svg>\\n</div>\\n\\n<style>\\n  .svelte-kit {\\n    max-width: 400px;\\n  }\\n</style>"],"names":[],"mappings":"AAYE,WAAW,cAAC,CAAC,AACX,SAAS,CAAE,KAAK,AAClB,CAAC"}`
};
var Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$c);
  return `<div class="${"svelte-kit svelte-8vqk29"}"><svg viewBox="${"30 31 400 50"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M348.645 80.0599L335.205 55.1536L326.745 65.3616V80.0599H319.648V32.4241H326.745V55.4938L345.169 32.4241H353.356L339.986 49.1652L356.974 80.0599H348.645ZM372.319 80.0599V32.4241H379.416V80.0599H372.319ZM416.394 39.2295V80.0599H409.3V39.2295H395.789V32.4241H429.902V39.2295H416.394Z"}" fill="${"#FF3E00"}"></path><path d="${"M48.3359 80.876C44.4451 80.9736 40.6159 79.8942 37.3519 77.78C34.3023 75.7742 32.0378 72.7827 30.9387 69.3081L37.6241 66.8581C38.5518 68.991 40.066 70.8183 41.9916 72.1286C43.9468 73.4367 46.2574 74.1149 48.6113 74.0715C50.8732 74.1893 53.1053 73.5154 54.9219 72.1661C55.7123 71.5043 56.3367 70.6675 56.7454 69.7223C57.1541 68.7772 57.3357 67.7499 57.2758 66.7223C57.2852 65.7649 57.063 64.8193 56.6281 63.9657C56.2495 63.2023 55.7547 62.5019 55.1613 61.8894C54.4103 61.2078 53.5586 60.6454 52.6361 60.222C51.4981 59.6561 50.5542 59.2252 49.8042 58.9292C49.0543 58.6332 47.9513 58.2363 46.4952 57.7385C44.6761 57.1034 43.3118 56.6046 42.4023 56.242C41.1703 55.719 39.9737 55.1164 38.8202 54.4381C37.579 53.7813 36.4506 52.9313 35.4776 51.9202C34.6349 50.9339 33.9554 49.8197 33.4647 48.6198C32.5217 46.3326 32.3235 43.8075 32.8983 41.4018C33.473 38.9961 34.7915 36.8316 36.6673 35.2143C39.3991 32.8106 43.1066 31.6085 47.7898 31.608C51.7018 31.608 54.9201 32.4699 57.4448 34.1937C59.8955 35.819 61.695 38.2524 62.528 41.0678L55.9772 43.2446C55.3192 41.7704 54.2079 40.5431 52.8042 39.7406C51.1067 38.8008 49.184 38.3416 47.2438 38.4125C45.3411 38.3039 43.4564 38.8307 41.8875 39.9098C41.247 40.4053 40.7359 41.0476 40.3976 41.7822C40.0593 42.5168 39.9038 43.322 39.9443 44.1294C39.95 44.7485 40.0866 45.3594 40.3452 45.9222C40.6037 46.485 40.9784 46.987 41.4447 47.3956C42.3512 48.2863 43.4153 49.0016 44.5833 49.5054C45.6753 49.9589 47.3356 50.5712 49.5641 51.342C50.9278 51.8419 51.9396 52.2162 52.5993 52.4648C53.259 52.7134 54.2249 53.1332 55.4968 53.7242C56.5174 54.1744 57.4987 54.7086 58.4304 55.3213C59.2647 55.9196 60.0622 56.5673 60.8187 57.261C61.6416 57.9722 62.3444 58.8107 62.9003 59.7445C63.4302 60.7128 63.8425 61.7406 64.1285 62.8062C64.4763 64.0584 64.6485 65.3527 64.6401 66.6521C64.6401 71.0984 63.1162 74.5802 60.0685 77.0972C57.0207 79.6143 53.1098 80.8739 48.3359 80.876ZM92.0693 80.0599L75.6946 32.4241H83.3367L94.1846 65.6331C94.784 67.4193 95.2852 69.2369 95.6858 71.0777C96.085 69.2366 96.5861 67.4189 97.187 65.6331L107.899 32.4241H115.472L99.1646 80.0599H92.0693ZM129.935 80.0599V32.4241H159.546V39.0937H137.031V52.159H151.563V58.8286H137.031V73.3903H161.05V80.0599H129.935ZM179.126 80.0599V32.4241H186.223V73.2546H209.556V80.0599H179.126ZM236.301 39.2295V80.0599H229.204V39.2295H215.696V32.4241H249.813V39.2295H236.301ZM264.478 80.0599V32.4241H294.088V39.0937H271.574V52.159H286.106V58.8286H271.574V73.3903H295.593V80.0599H264.478Z"}" fill="${"#4A4A55"}"></path></svg>
</div>`;
});
var css$b = {
  code: ".center.svelte-gt5vgq{padding:50px 0\n  }.tagline.svelte-gt5vgq{margin-top:5px}.hero-bg.svelte-gt5vgq{background:#d3d6d9;background:radial-gradient(34.14% 72.25% at 47.58% 31.75%, rgba(232, 244, 255, .52) 0, rgba(255, 255, 255, 0) 100%), linear-gradient(92.4deg, #d1d4d7 14.67%, rgba(238, 247, 255, .48) 54.37%, rgba(206, 216, 224, .62) 92.49%), linear-gradient(0deg, #dbe7ef, #dbe7ef);position:relative;height:200px}.blogs.svelte-gt5vgq{margin-top:20px}",
  map: `{"version":3,"file":"Home.svelte","sources":["Home.svelte"],"sourcesContent":["<script>\\n  import Logo from \\"$lib/images/Logo.svelte\\";\\n<\/script>\\n\\n<div class='hero-bg'>\\n  <div class=\\"container\\">\\n    <div class=\\"center\\">\\n      <Logo/>\\n      <div class='tagline'>Simple starter template to build svelte apps</div>\\n    </div>\\n  </div>\\n</div>\\n\\n<div class='container'>\\n  <div class='row blogs'>\\n    <div class='col-md'>\\n      <div class='card mb-3'>\\n        <img src='img/1.webp' class='card-img-top' alt='...'>\\n        <div class='card-body'>\\n          <h5 class='card-title'>Power by Svelte</h5>\\n          <p class='card-text'>SvelteKit is an application framework powered by Svelte \u2014 build bigger apps with a\\n            smaller footprint and no headaches</p>\\n          <a href='https://svelte.dev/' class='btn btn-primary'>Learn more</a>\\n        </div>\\n      </div>\\n    </div>\\n    <div class='col-md'>\\n      <div class='card mb-3'>\\n        <img src='img/1.webp' class='card-img-top' alt='...'>\\n        <div class='card-body'>\\n          <h5 class='card-title'>Sveltekit</h5>\\n          <p class='card-text'>A framework for building web applications, with a simple development experience and\\n            flexible filesystem-based routing</p>\\n          <a href='https://kit.svelte.dev' class='btn btn-primary'>Go somewhere</a>\\n        </div>\\n      </div>\\n    </div>\\n    <div class='col-md'>\\n      <div class='card mb-3'>\\n        <img src='img/1.webp' class='card-img-top' alt='...'>\\n        <div class='card-body'>\\n          <h5 class='card-title'>Build fast</h5>\\n          <p class='card-text'>Hit the ground running with advanced routing, server-side rendering, code-splitting,\\n            offline support and more</p>\\n          <a href='https://kit.svelte.dev/docs' class='btn btn-primary'>Read docs</a>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  .center{\\n    padding: 50px 0\\n  }\\n  .tagline {\\n    margin-top: 5px;\\n  }\\n\\n  .hero-bg {\\n    background: #d3d6d9;\\n    background: radial-gradient(34.14% 72.25% at 47.58% 31.75%, rgba(232, 244, 255, .52) 0, rgba(255, 255, 255, 0) 100%), linear-gradient(92.4deg, #d1d4d7 14.67%, rgba(238, 247, 255, .48) 54.37%, rgba(206, 216, 224, .62) 92.49%), linear-gradient(0deg, #dbe7ef, #dbe7ef);\\n    position: relative;\\n    height: 200px;\\n  }\\n\\n  .blogs {\\n    margin-top: 20px;\\n  }\\n</style>"],"names":[],"mappings":"AAoDE,qBAAO,CAAC,AACN,OAAO,CAAE,IAAI,CAAC,CAAC;EACjB,CAAC,AACD,QAAQ,cAAC,CAAC,AACR,UAAU,CAAE,GAAG,AACjB,CAAC,AAED,QAAQ,cAAC,CAAC,AACR,UAAU,CAAE,OAAO,CACnB,UAAU,CAAE,gBAAgB,MAAM,CAAC,MAAM,CAAC,EAAE,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,gBAAgB,OAAO,CAAC,CAAC,OAAO,CAAC,MAAM,CAAC,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,gBAAgB,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CACzQ,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,AACf,CAAC,AAED,MAAM,cAAC,CAAC,AACN,UAAU,CAAE,IAAI,AAClB,CAAC"}`
};
var Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `<div class="${"hero-bg svelte-gt5vgq"}"><div class="${"container"}"><div class="${"center svelte-gt5vgq"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}
      <div class="${"tagline svelte-gt5vgq"}">Simple starter template to build svelte apps</div></div></div></div>

<div class="${"container"}"><div class="${"row blogs svelte-gt5vgq"}"><div class="${"col-md"}"><div class="${"card mb-3"}"><img src="${"img/1.webp"}" class="${"card-img-top"}" alt="${"..."}">
        <div class="${"card-body"}"><h5 class="${"card-title"}">Power by Svelte</h5>
          <p class="${"card-text"}">SvelteKit is an application framework powered by Svelte \u2014 build bigger apps with a
            smaller footprint and no headaches</p>
          <a href="${"https://svelte.dev/"}" class="${"btn btn-primary"}">Learn more</a></div></div></div>
    <div class="${"col-md"}"><div class="${"card mb-3"}"><img src="${"img/1.webp"}" class="${"card-img-top"}" alt="${"..."}">
        <div class="${"card-body"}"><h5 class="${"card-title"}">Sveltekit</h5>
          <p class="${"card-text"}">A framework for building web applications, with a simple development experience and
            flexible filesystem-based routing</p>
          <a href="${"https://kit.svelte.dev"}" class="${"btn btn-primary"}">Go somewhere</a></div></div></div>
    <div class="${"col-md"}"><div class="${"card mb-3"}"><img src="${"img/1.webp"}" class="${"card-img-top"}" alt="${"..."}">
        <div class="${"card-body"}"><h5 class="${"card-title"}">Build fast</h5>
          <p class="${"card-text"}">Hit the ground running with advanced routing, server-side rendering, code-splitting,
            offline support and more</p>
          <a href="${"https://kit.svelte.dev/docs"}" class="${"btn btn-primary"}">Read docs</a></div></div></div></div>
</div>`;
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>${escape(variables.appName)} | Marketplace for the new generation</title>`, ""}`, ""}

${validate_component(Home, "Home").$$render($$result, {}, {}, {})}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$a = {
  code: ".invalid.svelte-1yagpkh{border-color:#ffa8a8;background:#fde3e3}.error-message.svelte-1yagpkh{color:red;margin:0.25rem 0}",
  map: `{"version":3,"file":"Input.svelte","sources":["Input.svelte"],"sourcesContent":["<script>\\n\\texport let controlType = 'input'\\n\\texport let id\\n\\texport let label\\n\\texport let rows = null\\n\\texport let value\\n\\texport let type = 'text'\\n\\texport let valid = true\\n\\texport let className = ''\\n\\texport let validityMessage = ''\\n\\texport let help\\n\\n\\tlet touched = false\\n<\/script>\\n\\n<div class=\\"mb-3\\">\\n\\t<label class=\\"form-label\\" for={id}>{label}</label>\\n\\t{#if controlType === 'textarea'}\\n\\t\\t<textarea\\n\\t\\t\\tclass=\\"form-control\\"\\n\\t\\t\\tclass:textarea={true}\\n\\t\\t\\tclass:invalid={!valid && touched}\\n\\t\\t\\t{rows}\\n\\t\\t\\t{id}\\n\\t\\t\\tbind:value\\n\\t\\t\\ton:blur={() => (touched = true)}></textarea>\\n\\t\\t{#if help}\\n\\t\\t\\t<div class=\\"form-text\\">{help}</div>\\n\\t\\t{/if}\\n\\t{/if}\\n\\t{#if controlType === 'input'}\\n\\t\\t<input\\n\\t\\t\\tclass=\\"form-control {className} {!valid && touched ? 'error' : ''}\\"\\n\\t\\t\\t{type}\\n\\t\\t\\t{id}\\n\\t\\t\\t{value}\\n\\t\\t\\ton:input\\n\\t\\t\\ton:blur={() => (touched = true)}\\n\\t\\t/>\\n\\t\\t{#if help}\\n\\t\\t\\t<div class=\\"form-text\\">{help}</div>\\n\\t\\t{/if}\\n\\t{/if}\\n\\t{#if validityMessage && !valid && touched}\\n\\t\\t<p class=\\"error-message\\">{validityMessage}</p>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.invalid {\\n\\t\\tborder-color: #ffa8a8;\\n\\t\\tbackground: #fde3e3;\\n\\t}\\n\\n\\t.error-message {\\n\\t\\tcolor: red;\\n\\t\\tmargin: 0.25rem 0;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiDC,QAAQ,eAAC,CAAC,AACT,YAAY,CAAE,OAAO,CACrB,UAAU,CAAE,OAAO,AACpB,CAAC,AAED,cAAc,eAAC,CAAC,AACf,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,OAAO,CAAC,CAAC,AAClB,CAAC"}`
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
  $$result.css.add(css$a);
  return `<div class="${"mb-3"}"><label class="${"form-label"}"${add_attribute("for", id, 0)}>${escape(label)}</label>
	${controlType === "textarea" ? `<textarea class="${[
    "form-control svelte-1yagpkh",
    "textarea " + (!valid && touched ? "invalid" : "")
  ].join(" ").trim()}"${add_attribute("rows", rows, 0)}${add_attribute("id", id, 0)}>${value || ""}</textarea>
		${help ? `<div class="${"form-text"}">${escape(help)}</div>` : ``}` : ``}
	${controlType === "input" ? `<input class="${"form-control " + escape(className) + " " + escape(!valid && touched ? "error" : "") + " svelte-1yagpkh"}"${add_attribute("type", type, 0)}${add_attribute("id", id, 0)}${add_attribute("value", value, 0)}>
		${help ? `<div class="${"form-text"}">${escape(help)}</div>` : ``}` : ``}
	${validityMessage && !valid && touched ? `<p class="${"error-message svelte-1yagpkh"}">${escape(validityMessage)}</p>` : ``}
</div>`;
});
function isPassword(val) {
  return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,50})$").test(val);
}
function isEmail(val) {
  return new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$").test(val);
}
function isUrl(val) {
  return new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/).test(val);
}
var css$9 = {
  code: ".register.svelte-pm9bq0{width:25rem}",
  map: `{"version":3,"file":"register.svelte","sources":["register.svelte"],"sourcesContent":["<script context=\\"module\\">\\n  export async function load ({ session }) {\\n    if (session.authenticated) {\\n      return {\\n        status: 302,\\n        redirect: '/'\\n      }\\n    }\\n    return {}\\n  }\\n<\/script>\\n\\n<script>\\n  import Input from '$lib/Input.svelte'\\n  import { api } from '$lib/utils/api'\\n  import { isEmail, isPassword } from '$lib/utils/validation'\\n  import { notifications } from '$lib/Noti.svelte'\\n\\n  let name = ''\\n  let email = ''\\n  let password = ''\\n  let passwordConfirmation = ''\\n\\n  $: emailValid = isEmail(email)\\n  $: passwordValid = isPassword(password)\\n  $: passwordConfirmValid = password === passwordConfirmation\\n  $: formIsValid = emailValid && passwordValid && passwordConfirmValid\\n\\n  async function submitForm () {\\n    try {\\n      const res = await api('POST', 'user/account-activation', { name, email, password })\\n      if (res && res.status >= 400) {\\n        throw new Error(res.message)\\n      }\\n      email = ''\\n      password = ''\\n      name = ''\\n      return notifications.success(res.message)\\n    } catch (err) {\\n      return notifications.push(err.message)\\n    }\\n  }\\n\\n  function handleKeyDown (event) {\\n    if (formIsValid && event.keyCode === 13) {\\n      submitForm()\\n    }\\n  }\\n<\/script>\\n\\n<svelte:window on:keydown={handleKeyDown}/>\\n\\n<svelte:head>\\n  <title>Register Form</title>\\n  <meta name=\\"robots\\" content=\\"noindex, nofollow\\"/>\\n</svelte:head>\\n\\n<div class=\\"container\\">\\n  <div class=\\"col\\">\\n    <div class=\\"d-flex justify-content-center d-block\\">\\n      <div class=\\"card mt-5 register\\">\\n        <div class=\\"card-body\\">\\n          <div>\\n            <h4><strong>Sing Up</strong></h4>\\n            <p>Please note that our services are only available in the United States.</p>\\n          </div>\\n          <form>\\n            <Input\\n              id=\\"name\\"\\n              label=\\"Name\\"\\n              help=\\"Please, enter your complete legal name if you will be performing transactions.\\"\\n              valid={name}\\n              validityMessage=\\"Please enter a valid email.\\"\\n              value={name}\\n              className=\\"is-large\\"\\n              on:input={(event) => (name = event.target.value)}\\n            />\\n            <Input\\n              id=\\"email\\"\\n              label=\\"Email\\"\\n              valid={emailValid}\\n              validityMessage=\\"Please enter a valid email.\\"\\n              value={email}\\n              className=\\"is-large\\"\\n              on:input={(event) => (email = event.target.value)}\\n            />\\n            <Input\\n              id=\\"password\\"\\n              label=\\"Password\\"\\n              type=\\"password\\"\\n              valid={passwordValid}\\n              validityMessage=\\"Please enter a valid password.\\"\\n              value={password}\\n              className=\\"is-large\\"\\n              on:input={(event) => (password = event.target.value)}\\n            />\\n            <Input\\n              id=\\"passwordConfirmation\\"\\n              label=\\"Confirm Password\\"\\n              help=\\"Password minimum length 8, must have one capital letter, 1 number, and one unique character.\\"\\n              type=\\"password\\"\\n              valid={passwordConfirmValid}\\n              validityMessage=\\"Passwords did not match\\"\\n              value={passwordConfirmation}\\n              className=\\"is-large\\"\\n              on:input={(event) => (passwordConfirmation = event.target.value)}\\n            />\\n            <div class=\\"d-grid gap-2\\">\\n              <button\\n                class=\\"btn btn-primary btn-lg mt-2\\"\\n                on:click|preventDefault={submitForm}\\n                disabled={!formIsValid}\\n              >\\n                Sing Up\\n              </button>\\n              <small>By signing up you accept our Privacy Policy.</small>\\n            </div>\\n          </form>\\n        </div>\\n        <footer class=\\"card-footer text-center pt-3 pb-3 bg-white\\">\\n          <a href=\\"/login\\" class=\\"text-black-50\\">Already have an account?</a>\\n        </footer>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n    .register {\\n        width: 25rem;\\n    }\\n</style>"],"names":[],"mappings":"AAgII,SAAS,cAAC,CAAC,AACP,KAAK,CAAE,KAAK,AAChB,CAAC"}`
};
async function load$6({ session: session2 }) {
  if (session2.authenticated) {
    return { status: 302, redirect: "/" };
  }
  return {};
}
var Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let passwordValid;
  let passwordConfirmValid;
  let formIsValid;
  let name = "";
  let email = "";
  let password = "";
  let passwordConfirmation = "";
  $$result.css.add(css$9);
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
var register = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Register,
  load: load$6
});
var css$8 = {
  code: ".forgot.svelte-1qrdx9{max-width:25rem}",
  map: `{"version":3,"file":"forgot.svelte","sources":["forgot.svelte"],"sourcesContent":["<script>\\n\\timport { isEmail } from '$lib/utils/validation'\\n\\timport Input from '$lib/Input.svelte'\\n\\timport { api } from '$lib/utils/api'\\n\\timport {notifications} from '$lib/Noti.svelte'\\n\\n\\tlet email = ''\\n\\n\\t$: emailValid = isEmail(email)\\n\\t$: formIsValid = emailValid\\n\\n\\tasync function submitForm() {\\n\\t\\tconst forgotForm = document.getElementById('forgot-form')\\n\\t\\ttry {\\n\\t\\t\\tconst res = await api('POST', 'user/forgot', { email })\\n\\t\\t\\tif (res && res.status >= 400) {\\n\\t\\t\\t\\tthrow new Error(res.message)\\n\\t\\t\\t}\\n\\t\\t\\tnotifications.push(res.message, 'success')\\n\\t\\t\\treturn forgotForm.reset()\\n\\t\\t} catch (err) {\\n\\t\\t\\tnotifications.push(err.message)\\n\\t\\t}\\n\\t}\\n\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Forgot Password</title>\\n\\t<meta name=\\"robots\\" content=\\"noindex, nofollow\\" />\\n</svelte:head>\\n\\n<main class=\\"container mt-5\\">\\n\\t<div class=\\"d-flex justify-content-center\\">\\n\\t\\t<form class=\\"card forgot\\" id=\\"forgot-form\\">\\n\\t\\t\\t<div class=\\"card-body\\">\\n\\t\\t\\t\\t<h2>Password Reset</h2>\\n\\t\\t\\t\\t<Input\\n\\t\\t\\t\\t\\tid=\\"email\\"\\n\\t\\t\\t\\t\\tlabel=\\"Email\\"\\n\\t\\t\\t\\t\\thelp=\\"Enter your email address below and we'll send you password reset instructions.\\"\\n\\t\\t\\t\\t\\tvalid={emailValid}\\n\\t\\t\\t\\t\\tvalidityMessage=\\"Please enter a valid email.\\"\\n\\t\\t\\t\\t\\tvalue={email}\\n\\t\\t\\t\\t\\tclassName=\\"is-large\\"\\n\\t\\t\\t\\t\\ton:input={(event) => (email = event.target.value)}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<div class=\\"d-grid gap-2\\">\\n\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\tclass=\\"btn btn-danger btn-lg\\"\\n\\t\\t\\t\\t\\t\\ton:click|preventDefault={submitForm}\\n\\t\\t\\t\\t\\t\\tdisabled={!formIsValid}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\tReset Password\\n\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t<a class=\\"btn btn-outline-secondary btn-lg\\" href=\\"/login\\" role=\\"button\\">Cancel</a>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</form>\\n\\t</div>\\n</main>\\n\\n<style>\\n\\t.forgot{\\n\\t\\tmax-width: 25rem;\\n\\t}\\n</style>"],"names":[],"mappings":"AA+DC,qBAAO,CAAC,AACP,SAAS,CAAE,KAAK,AACjB,CAAC"}`
};
var Forgot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let formIsValid;
  let email = "";
  $$result.css.add(css$8);
  emailValid = isEmail(email);
  formIsValid = emailValid;
  return `${$$result.head += `${$$result.title = `<title>Forgot Password</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-kx7r2l">`, ""}

<main class="${"container mt-5"}"><div class="${"d-flex justify-content-center"}"><form class="${"card forgot svelte-1qrdx9"}" id="${"forgot-form"}"><div class="${"card-body"}"><h2>Password Reset</h2>
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
var forgot = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Forgot
});
var css$7 = {
  code: "a.active.svelte-yd6ptw{color:gray;text-decoration:underline}",
  map: `{"version":3,"file":"Tabs.svelte","sources":["Tabs.svelte"],"sourcesContent":["<script>\\n\\timport { page } from '$app/stores'\\n<\/script>\\n\\n<nav class=\\"nav justify-content-center mt-3 mb-3\\">\\n\\t<a class=\\"nav-link\\" class:active={$page.path === '/admin'} aria-current=\\"page\\" href=\\"/admin\\"\\n\\t\\t>Panel</a\\n\\t>\\n\\t<a\\n\\t\\tclass=\\"nav-link\\"\\n\\t\\tclass:active={$page.path ===\\n\\t\\t\\t\`/admin/users/\${$page.params.p !== undefined ? $page.params.p.toString() : ''}\`}\\n\\t\\thref=\\"/admin/users/1\\">Users</a\\n\\t>\\n\\t<a class=\\"nav-link\\" class:active={$page.path === '/admin/settings'} href=\\"/admin/settings\\"\\n\\t\\t>Settings</a\\n\\t>\\n</nav>\\n\\n<style>\\n\\ta.active {\\n\\t\\tcolor: gray;\\n\\t\\ttext-decoration: underline;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoBC,CAAC,OAAO,cAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,SAAS,AAC3B,CAAC"}`
};
var Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$7);
  $$unsubscribe_page();
  return `<nav class="${"nav justify-content-center mt-3 mb-3"}"><a class="${["nav-link svelte-yd6ptw", $page.path === "/admin" ? "active" : ""].join(" ").trim()}" aria-current="${"page"}" href="${"/admin"}">Panel</a>
	<a class="${[
    "nav-link svelte-yd6ptw",
    $page.path === `/admin/users/${$page.params.p !== void 0 ? $page.params.p.toString() : ""}` ? "active" : ""
  ].join(" ").trim()}" href="${"/admin/users/1"}">Users</a>
	<a class="${["nav-link svelte-yd6ptw", $page.path === "/admin/settings" ? "active" : ""].join(" ").trim()}" href="${"/admin/settings"}">Settings</a>
</nav>`;
});
var css$6 = {
  code: ".loader.svelte-lzka65{border:16px solid #f3f3f3;border-radius:50%;border-top:16px solid #3498db;width:80px;height:80px;-webkit-animation:svelte-lzka65-spin 1s linear infinite;animation:svelte-lzka65-spin 1s linear infinite;margin:2em auto}@-webkit-keyframes svelte-lzka65-spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes svelte-lzka65-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"LoadingSpinner.svelte","sources":["LoadingSpinner.svelte"],"sourcesContent":["<section class=\\"section\\">\\n\\t<div class=\\"container\\">\\n\\t\\t<div class=\\"loader\\" />\\n\\t</div>\\n</section>\\n\\n<style>\\n\\t.loader {\\n\\t\\tborder: 16px solid #f3f3f3;\\n\\t\\tborder-radius: 50%;\\n\\t\\tborder-top: 16px solid #3498db;\\n\\t\\twidth: 80px;\\n\\t\\theight: 80px;\\n\\t\\t-webkit-animation: spin 1s linear infinite; /* Safari */\\n\\t\\tanimation: spin 1s linear infinite;\\n\\t\\tmargin: 2em auto;\\n\\t}\\n\\n\\t/* Safari */\\n\\t@-webkit-keyframes spin {\\n\\t\\t0% {\\n\\t\\t\\t-webkit-transform: rotate(0deg);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\t-webkit-transform: rotate(360deg);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes spin {\\n\\t\\t0% {\\n\\t\\t\\ttransform: rotate(0deg);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\ttransform: rotate(360deg);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAOC,OAAO,cAAC,CAAC,AACR,MAAM,CAAE,IAAI,CAAC,KAAK,CAAC,OAAO,CAC1B,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAAC,KAAK,CAAC,OAAO,CAC9B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,iBAAiB,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAAQ,CAC1C,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAAQ,CAClC,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAGD,mBAAmB,kBAAK,CAAC,AACxB,EAAE,AAAC,CAAC,AACH,iBAAiB,CAAE,OAAO,IAAI,CAAC,AAChC,CAAC,AACD,IAAI,AAAC,CAAC,AACL,iBAAiB,CAAE,OAAO,MAAM,CAAC,AAClC,CAAC,AACF,CAAC,AAED,WAAW,kBAAK,CAAC,AAChB,EAAE,AAAC,CAAC,AACH,SAAS,CAAE,OAAO,IAAI,CAAC,AACxB,CAAC,AACD,IAAI,AAAC,CAAC,AACL,SAAS,CAAE,OAAO,MAAM,CAAC,AAC1B,CAAC,AACF,CAAC"}'
};
var LoadingSpinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<section class="${"section"}"><div class="${"container"}"><div class="${"loader svelte-lzka65"}"></div></div>
</section>`;
});
async function load$5({ session: session2 }) {
  if (!session2.user || session2.user.role !== "admin" || !session2.authenticated) {
    return { status: 302, redirect: "/" };
  }
  return { props: { token: session2.token } };
}
var Admin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let isLoading = true;
  let userCount;
  (async () => {
    try {
      const res = await api("GET", "admin/stats", {}, token);
      if (res.status >= 400) {
        isLoading = false;
        throw new Error(res.message);
      }
      isLoading = false;
      return userCount = Number(res);
    } catch (err) {
      isLoading = false;
      notifications.push(err.message);
    }
  })();
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  return `${$$result.head += `${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-s8heis">`, ""}

${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}
${isLoading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `<div class="${"container"}"><div class="${"container"}"><div class="${"row"}"><div class="${"col-sm"}"><div class="${"card"}"><div class="${"card-body"}"><div class="${"text-center"}"><h3>${escape(userCount)}</h3>
								<label>Users</label></div></div></div></div></div></div></div>`}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Admin,
  load: load$5
});
var css$5 = {
  code: `.inputGroup.svelte-1wwt7fj.svelte-1wwt7fj.svelte-1wwt7fj{background-color:#fff;display:block;margin:10px 0;position:relative}.inputGroup.svelte-1wwt7fj label.svelte-1wwt7fj.svelte-1wwt7fj{padding:12px 30px;width:100%;display:block;text-align:left;color:#3c454c;cursor:pointer;position:relative;z-index:2;transition:color 200ms ease-in;overflow:hidden}.inputGroup.svelte-1wwt7fj label.svelte-1wwt7fj.svelte-1wwt7fj:before{width:10px;height:10px;border-radius:50%;content:'';background-color:#5562eb;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%) scale3d(1, 1, 1);transition:all 300ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;z-index:-1}.inputGroup.svelte-1wwt7fj label.svelte-1wwt7fj.svelte-1wwt7fj:after{width:32px;height:32px;content:'';border:2px solid #d1d7dc;background-color:#fff;background-image:url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");background-repeat:no-repeat;background-position:2px 3px;border-radius:50%;z-index:2;position:absolute;right:30px;top:50%;transform:translateY(-50%);cursor:pointer;transition:all 200ms ease-in}.inputGroup.svelte-1wwt7fj input.svelte-1wwt7fj:checked~label.svelte-1wwt7fj:before{background:#f9f9f9;transform:translate(-50%, -50%) scale3d(56, 56, 1);opacity:1}.inputGroup.svelte-1wwt7fj input.svelte-1wwt7fj:checked~label.svelte-1wwt7fj:after{background-color:#0f8892;border-color:#0f8892}.inputGroup.svelte-1wwt7fj input.svelte-1wwt7fj.svelte-1wwt7fj{width:32px;height:32px;order:1;z-index:2;position:absolute;right:30px;top:50%;transform:translateY(-50%);cursor:pointer;visibility:hidden}.form.svelte-1wwt7fj.svelte-1wwt7fj.svelte-1wwt7fj{padding:0 16px;max-width:550px;margin:50px auto;font-size:18px;font-weight:600;line-height:36px}`,
  map: `{"version":3,"file":"settings.svelte","sources":["settings.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\texport async function load({ session }) {\\n\\t\\tif (!session.user || session.user.role !== 'admin' || !session.authenticated) {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tstatus: 302,\\n\\t\\t\\t\\tredirect: '/'\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn {\\n\\t\\t\\tprops: {\\n\\t\\t\\t\\ttoken: session.token,\\n\\t\\t\\t\\tuser: session.user\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n<\/script>\\n\\n<script>\\n\\timport { api } from '$lib/utils/api'\\n\\timport Tabs from '$lib/Tabs.svelte'\\n\\timport LoadingSpinner from '$lib/LoadingSpinner.svelte'\\n\\timport {notifications} from '$lib/Noti.svelte'\\n\\n\\texport let token\\n\\texport let user\\n\\n\\tlet isLoading = true\\n\\tlet newUser\\n\\tlet userId\\n\\n\\t(async () => {\\n\\t\\tconst res = await api('POST', \`user/settings/\${user.username}\`, {}, token)\\n\\t\\tif (res.status >= 400) {\\n\\t\\t\\tisLoading = false\\n\\t\\t\\tthrow new Error(res.message)\\n\\t\\t}\\n\\t\\tisLoading = false\\n\\t\\tuserId = res._id\\n\\t\\treturn (newUser = res.settings.newUser)\\n\\t})().catch(err => {\\n\\t\\tisLoading = false\\n\\t\\tnotifications.push(err.message)\\n\\t})\\n\\n\\tasync function updateSettings(e) {\\n\\t\\tif (e.target.value === 'user') {\\n\\t\\t\\tnewUser = !newUser\\n\\t\\t}\\n\\t\\tconst userObject = {\\n\\t\\t\\tnewUser: newUser,\\n\\t\\t\\tuserId: userId\\n\\t\\t}\\n\\n\\t\\ttry {\\n\\t\\t\\tconst res = await api('PATCH', 'admin/update-settings', userObject, token)\\n\\t\\t\\tif (res.status >= 400) {\\n\\t\\t\\t\\tthrow new Error(res.message)\\n\\t\\t\\t}\\n\\t\\t} catch (err) {\\n\\t\\t\\tnotifications.push(err.message)\\n\\t\\t}\\n\\t}\\n\\n<\/script>\\n\\n<Tabs />\\n\\n{#if isLoading}\\n\\t<LoadingSpinner />\\n{/if}\\n\\n<svelte:head>\\n\\t<title>Admin Settings</title>\\n\\t<meta name=\\"robots\\" content=\\"noindex, nofollow\\" />\\n</svelte:head>\\n\\n<div class=\\"container\\">\\n\\t<div class=\\"columns is-centered\\">\\n\\t\\t<div class=\\"card is-6\\">\\n\\t\\t\\t<header class=\\"card-header\\">\\n\\t\\t\\t\\t<h3>Email Notifications</h3>\\n\\t\\t\\t\\t<small>Select notification settings below, all optional</small>\\n\\t\\t\\t</header>\\n\\t\\t\\t<div class=\\"card-body\\">\\n\\t\\t\\t\\t<form class=\\"form\\">\\n\\t\\t\\t\\t\\t<div class=\\"inputGroup\\">\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tid=\\"option1\\"\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"checkbox\\"\\n\\t\\t\\t\\t\\t\\t\\tvalue={'user'}\\n\\t\\t\\t\\t\\t\\t\\ton:change={updateSettings}\\n\\t\\t\\t\\t\\t\\t\\tchecked={newUser}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t<label for=\\"option1\\">New User</label>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</form>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.no-margin label {\\n\\t\\tmargin-bottom: 0;\\n\\t\\tline-height: 1;\\n\\t}\\n\\n\\t.no-margin .help {\\n\\t\\tmargin-top: 0;\\n\\t}\\n\\n\\t.inputGroup {\\n\\t\\tbackground-color: #fff;\\n\\t\\tdisplay: block;\\n\\t\\tmargin: 10px 0;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.inputGroup label {\\n\\t\\tpadding: 12px 30px;\\n\\t\\twidth: 100%;\\n\\t\\tdisplay: block;\\n\\t\\ttext-align: left;\\n\\t\\tcolor: #3c454c;\\n\\t\\tcursor: pointer;\\n\\t\\tposition: relative;\\n\\t\\tz-index: 2;\\n\\t\\ttransition: color 200ms ease-in;\\n\\t\\toverflow: hidden;\\n\\t}\\n\\n\\t.inputGroup label:before {\\n\\t\\twidth: 10px;\\n\\t\\theight: 10px;\\n\\t\\tborder-radius: 50%;\\n\\t\\tcontent: '';\\n\\t\\tbackground-color: #5562eb;\\n\\t\\tposition: absolute;\\n\\t\\tleft: 50%;\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translate(-50%, -50%) scale3d(1, 1, 1);\\n\\t\\ttransition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\\n\\t\\topacity: 0;\\n\\t\\tz-index: -1;\\n\\t}\\n\\n\\t.inputGroup label:after {\\n\\t\\twidth: 32px;\\n\\t\\theight: 32px;\\n\\t\\tcontent: '';\\n\\t\\tborder: 2px solid #d1d7dc;\\n\\t\\tbackground-color: #fff;\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E \\");\\n\\t\\tbackground-repeat: no-repeat;\\n\\t\\tbackground-position: 2px 3px;\\n\\t\\tborder-radius: 50%;\\n\\t\\tz-index: 2;\\n\\t\\tposition: absolute;\\n\\t\\tright: 30px;\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translateY(-50%);\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all 200ms ease-in;\\n\\t}\\n\\n\\t.inputGroup input:checked ~ label:before {\\n\\t\\tbackground: #f9f9f9;\\n\\t\\ttransform: translate(-50%, -50%) scale3d(56, 56, 1);\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t.inputGroup input:checked ~ label:after {\\n\\t\\tbackground-color: #0f8892;\\n\\t\\tborder-color: #0f8892;\\n\\t}\\n\\n\\t.inputGroup input {\\n\\t\\twidth: 32px;\\n\\t\\theight: 32px;\\n\\t\\torder: 1;\\n\\t\\tz-index: 2;\\n\\t\\tposition: absolute;\\n\\t\\tright: 30px;\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translateY(-50%);\\n\\t\\tcursor: pointer;\\n\\t\\tvisibility: hidden;\\n\\t}\\n\\n\\t.form {\\n\\t\\tpadding: 0 16px;\\n\\t\\tmax-width: 550px;\\n\\t\\tmargin: 50px auto;\\n\\t\\tfont-size: 18px;\\n\\t\\tfont-weight: 600;\\n\\t\\tline-height: 36px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+GC,WAAW,6CAAC,CAAC,AACZ,gBAAgB,CAAE,IAAI,CACtB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,QAAQ,CAAE,QAAQ,AACnB,CAAC,AAED,0BAAW,CAAC,KAAK,8BAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,OAAO,CACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,OAAO,CAC/B,QAAQ,CAAE,MAAM,AACjB,CAAC,AAED,0BAAW,CAAC,mCAAK,OAAO,AAAC,CAAC,AACzB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,EAAE,CACX,gBAAgB,CAAE,OAAO,CACzB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACjD,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAClD,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,EAAE,AACZ,CAAC,AAED,0BAAW,CAAC,mCAAK,MAAM,AAAC,CAAC,AACxB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,gBAAgB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,qOAAqO,CAAC,CAC5P,iBAAiB,CAAE,SAAS,CAC5B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAC9B,CAAC,AAED,0BAAW,CAAC,oBAAK,QAAQ,CAAG,oBAAK,OAAO,AAAC,CAAC,AACzC,UAAU,CAAE,OAAO,CACnB,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,QAAQ,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACnD,OAAO,CAAE,CAAC,AACX,CAAC,AAED,0BAAW,CAAC,oBAAK,QAAQ,CAAG,oBAAK,MAAM,AAAC,CAAC,AACxC,gBAAgB,CAAE,OAAO,CACzB,YAAY,CAAE,OAAO,AACtB,CAAC,AAED,0BAAW,CAAC,KAAK,8BAAC,CAAC,AAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,MAAM,AACnB,CAAC,AAED,KAAK,6CAAC,CAAC,AACN,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,AAClB,CAAC"}`
};
async function load$4({ session: session2 }) {
  if (!session2.user || session2.user.role !== "admin" || !session2.authenticated) {
    return { status: 302, redirect: "/" };
  }
  return {
    props: { token: session2.token, user: session2.user }
  };
}
var Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { token } = $$props;
  let { user } = $$props;
  let isLoading = true;
  let newUser;
  (async () => {
    const res = await api("POST", `user/settings/${user.username}`, {}, token);
    if (res.status >= 400) {
      isLoading = false;
      throw new Error(res.message);
    }
    isLoading = false;
    return newUser = res.settings.newUser;
  })().catch((err) => {
    isLoading = false;
    notifications.push(err.message);
  });
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$result.css.add(css$5);
  return `${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}

${isLoading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : ``}

${$$result.head += `${$$result.title = `<title>Admin Settings</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-183ffmf">`, ""}

<div class="${"container"}"><div class="${"columns is-centered"}"><div class="${"card is-6"}"><header class="${"card-header"}"><h3>Email Notifications</h3>
				<small>Select notification settings below, all optional</small></header>
			<div class="${"card-body"}"><form class="${"form svelte-1wwt7fj"}"><div class="${"inputGroup svelte-1wwt7fj"}"><input id="${"option1"}" type="${"checkbox"}"${add_attribute("value", "user", 0)} ${newUser ? "checked" : ""} class="${"svelte-1wwt7fj"}">
						<label for="${"option1"}" class="${"svelte-1wwt7fj"}">New User</label></div></form></div></div></div>
</div>`;
});
var settings = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Settings,
  load: load$4
});
var units = ["year", "month", "week", "day", "hour", "minute", "second"];
var timeAgo = (date) => {
  if (!date)
    return "invalid date";
  let dateTime = DateTime.fromISO(date);
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit2) => diff.get(unit2) !== 0) || "second";
  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto"
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};
function paginate({ items, pageSize, currentPage }) {
  return items.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
}
var PREVIOUS_PAGE = "PREVIOUS_PAGE";
var NEXT_PAGE = "NEXT_PAGE";
var ELLIPSIS = "ELLIPSIS";
function generateNavigationOptions({
  totalItems,
  pageSize,
  currentPage,
  limit = null,
  showStepOptions = false
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const limitThreshold = getLimitThreshold({ limit });
  const limited = limit && totalPages > limitThreshold;
  let options2 = limited ? generateLimitedOptions({ totalPages, limit, currentPage }) : generateUnlimitedOptions({ totalPages });
  return showStepOptions ? addStepOptions({ options: options2, currentPage, totalPages }) : options2;
}
function generateUnlimitedOptions({ totalPages }) {
  return new Array(totalPages).fill(null).map((value, index2) => ({
    type: "number",
    value: index2 + 1
  }));
}
function generateLimitedOptions({ totalPages, limit, currentPage }) {
  const boundarySize = limit * 2 + 2;
  const firstBoundary = 1 + boundarySize;
  const lastBoundary = totalPages - boundarySize;
  const totalShownPages = firstBoundary + 2;
  if (currentPage <= firstBoundary - limit) {
    return Array(totalShownPages).fill(null).map((value, index2) => {
      if (index2 === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index2 === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: firstBoundary + 1
        };
      }
      return {
        type: "number",
        value: index2 + 1
      };
    });
  } else if (currentPage >= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index2) => {
      if (index2 === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index2 === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: lastBoundary - 1
        };
      }
      return {
        type: "number",
        value: lastBoundary + index2 - 2
      };
    });
  } else if (currentPage >= firstBoundary - limit && currentPage <= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index2) => {
      if (index2 === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index2 === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage - limit + (index2 - 2)
        };
      } else if (index2 === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index2 === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage + limit + 1
        };
      }
      return {
        type: "number",
        value: currentPage - limit + (index2 - 2)
      };
    });
  }
}
function addStepOptions({ options: options2, currentPage, totalPages }) {
  return [
    {
      type: "symbol",
      symbol: PREVIOUS_PAGE,
      value: currentPage <= 1 ? 1 : currentPage - 1
    },
    ...options2,
    {
      type: "symbol",
      symbol: NEXT_PAGE,
      value: currentPage >= totalPages ? totalPages : currentPage + 1
    }
  ];
}
function getLimitThreshold({ limit }) {
  const maximumUnlimitedPages = 3;
  const numberOfBoundaryPages = 2;
  return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages;
}
var css$4 = {
  code: ".page-link.svelte-17jxbj:hover{cursor:pointer}.ellipsis.svelte-17jxbj{cursor:not-allowed;pointer-events:none}.disabled.svelte-17jxbj{cursor:not-allowed}.pagination.svelte-17jxbj{padding:40px 0;width:100%}",
  map: `{"version":3,"file":"PaginationNav.svelte","sources":["PaginationNav.svelte"],"sourcesContent":["<script>\\n\\timport generateNavigationOptions from './generateNavigationOptions'\\n\\timport { createEventDispatcher } from 'svelte'\\n\\timport { PREVIOUS_PAGE, NEXT_PAGE, ELLIPSIS } from './symbolTypes'\\n\\timport {ChevronLeftIcon, ChevronRightIcon} from 'svelte-feather-icons'\\n\\n\\tconst dispatch = createEventDispatcher()\\n\\n\\texport let totalItems = 0\\n\\texport let pageSize = 1\\n\\texport let currentPage = 1\\n\\texport let limit = null\\n\\texport let showStepOptions = false\\n\\n\\texport const setPage = (page) => {\\n\\t\\tcurrentPage = page\\n\\t}\\n\\n\\t$: options = generateNavigationOptions({\\n\\t\\ttotalItems,\\n\\t\\tpageSize,\\n\\t\\tcurrentPage,\\n\\t\\tlimit,\\n\\t\\tshowStepOptions\\n\\t})\\n\\n\\t$: totalPages = Math.ceil(totalItems / pageSize)\\n\\n\\tfunction handleOptionClick(option) {\\n\\t\\tdispatch('setPage', { page: option.value })\\n\\t}\\n<\/script>\\n\\n<nav aria-label=\\"pagination\\">\\n\\t<ul class=\\"pagination\\">\\n\\t\\t{#each options as option}\\n\\t\\t\\t{#if option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}\\n\\t\\t\\t\\t<slot name=\\"prev\\">\\n\\t\\t\\t\\t\\t<li\\n\\t\\t\\t\\t\\t\\tclass=\\"page-item\\"\\n\\t\\t\\t\\t\\t\\tclass:pageNumber={option.type === 'number'}\\n\\t\\t\\t\\t\\t\\tclass:disabled={(option.type === 'symbol' &&\\n\\t\\t\\t\\t\\t\\t\\toption.symbol === NEXT_PAGE &&\\n\\t\\t\\t\\t\\t\\t\\tcurrentPage >= totalPages) ||\\n\\t\\t\\t\\t\\t\\t\\t(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}\\n\\t\\t\\t\\t\\t\\tclass:prev={option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}\\n\\t\\t\\t\\t\\t\\ton:click|preventDefault={() => handleOptionClick(option)}\\n\\t\\t\\t\\t\\t\\tdisabled={(option.type === 'symbol' &&\\n\\t\\t\\t\\t\\t\\t\\toption.symbol === NEXT_PAGE &&\\n\\t\\t\\t\\t\\t\\t\\tcurrentPage >= totalPages) ||\\n\\t\\t\\t\\t\\t\\t\\t(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<span class=\\"page-link\\"><ChevronLeftIcon size=\\"1x\\" /></span>\\n\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t</slot>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<li class=\\"page-item\\" class:active={option.type === 'number' && option.value === currentPage}>\\n\\t\\t\\t\\t{#if option.type === 'number'}\\n\\t\\t\\t\\t\\t<slot name=\\"number\\" value={option.value}>\\n\\t\\t\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\t\\t\\thref=\\"/{option.value}\\"\\n\\t\\t\\t\\t\\t\\t\\tid={option.value}\\n\\t\\t\\t\\t\\t\\t\\tdata-id={option.value}\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"page-link\\"\\n\\t\\t\\t\\t\\t\\t\\ton:click|preventDefault={() => handleOptionClick(option)}\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t{option.value}\\n\\t\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t{:else if option.type === 'symbol' && option.symbol === ELLIPSIS}\\n\\t\\t\\t\\t\\t<slot name=\\"ellipsis\\">\\n\\t\\t\\t\\t\\t\\t<span class=\\"ellipsis page-link\\">&hellip;</span>\\n\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</li>\\n\\t\\t\\t{#if option.type === 'symbol' && option.symbol === NEXT_PAGE}\\n\\t\\t\\t\\t<slot name=\\"next\\">\\n\\t\\t\\t\\t\\t<li\\n\\t\\t\\t\\t\\t\\tclass=\\"page-item\\"\\n\\t\\t\\t\\t\\t\\tclass:pageNumber={option.type === 'number'}\\n\\t\\t\\t\\t\\t\\tclass:disabled={(option.type === 'symbol' &&\\n\\t\\t\\t\\t\\t\\t\\toption.symbol === NEXT_PAGE &&\\n\\t\\t\\t\\t\\t\\t\\tcurrentPage >= totalPages) ||\\n\\t\\t\\t\\t\\t\\t\\t(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}\\n\\t\\t\\t\\t\\t\\tclass:next={option.type === 'symbol' && option.symbol === NEXT_PAGE}\\n\\t\\t\\t\\t\\t\\tdisabled={(option.type === 'symbol' &&\\n\\t\\t\\t\\t\\t\\t\\toption.symbol === NEXT_PAGE &&\\n\\t\\t\\t\\t\\t\\t\\tcurrentPage >= totalPages) ||\\n\\t\\t\\t\\t\\t\\t\\t(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}\\n\\t\\t\\t\\t\\t\\ton:click|preventDefault={() => handleOptionClick(option)}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<span class=\\"page-link\\"><ChevronRightIcon size=\\"1x\\"/></span>\\n\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t</slot>\\n\\t\\t\\t{/if}\\n\\t\\t{/each}\\n\\t</ul>\\n</nav>\\n\\n<style>\\n\\t.page-link:hover {\\n\\t\\tcursor: pointer;\\n\\t}\\n\\t.ellipsis {\\n\\t\\tcursor: not-allowed;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\t.disabled {\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\n\\t.pagination {\\n\\t\\tpadding: 40px 0;\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoGC,wBAAU,MAAM,AAAC,CAAC,AACjB,MAAM,CAAE,OAAO,AAChB,CAAC,AACD,SAAS,cAAC,CAAC,AACV,MAAM,CAAE,WAAW,CACnB,cAAc,CAAE,IAAI,AACrB,CAAC,AACD,SAAS,cAAC,CAAC,AACV,MAAM,CAAE,WAAW,AACpB,CAAC,AAED,WAAW,cAAC,CAAC,AACZ,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,KAAK,CAAE,IAAI,AACZ,CAAC"}`
};
var PaginationNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let options2;
  let totalPages;
  createEventDispatcher();
  let { totalItems = 0 } = $$props;
  let { pageSize = 1 } = $$props;
  let { currentPage = 1 } = $$props;
  let { limit = null } = $$props;
  let { showStepOptions = false } = $$props;
  const setPage = (page2) => {
    currentPage = page2;
  };
  if ($$props.totalItems === void 0 && $$bindings.totalItems && totalItems !== void 0)
    $$bindings.totalItems(totalItems);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0)
    $$bindings.pageSize(pageSize);
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0)
    $$bindings.limit(limit);
  if ($$props.showStepOptions === void 0 && $$bindings.showStepOptions && showStepOptions !== void 0)
    $$bindings.showStepOptions(showStepOptions);
  if ($$props.setPage === void 0 && $$bindings.setPage && setPage !== void 0)
    $$bindings.setPage(setPage);
  $$result.css.add(css$4);
  options2 = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions
  });
  totalPages = Math.ceil(totalItems / pageSize);
  return `<nav aria-label="${"pagination"}"><ul class="${"pagination svelte-17jxbj"}">${each(options2, (option) => `${option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? `${slots.prev ? slots.prev({}) : `
					<li class="${[
    "page-item svelte-17jxbj",
    (option.type === "number" ? "pageNumber" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : "") + " " + (option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? "prev" : "")
  ].join(" ").trim()}" ${option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : ""}><span class="${"page-link svelte-17jxbj"}">${validate_component(ChevronLeftIcon, "ChevronLeftIcon").$$render($$result, { size: "1x" }, {}, {})}</span></li>
				`}` : ``}
			<li class="${[
    "page-item",
    option.type === "number" && option.value === currentPage ? "active" : ""
  ].join(" ").trim()}">${option.type === "number" ? `${slots.number ? slots.number({ value: option.value }) : `
						<a href="${"/" + escape(option.value)}"${add_attribute("id", option.value, 0)}${add_attribute("data-id", option.value, 0)} class="${"page-link svelte-17jxbj"}">${escape(option.value)}</a>
					`}` : `${option.type === "symbol" && option.symbol === ELLIPSIS ? `${slots.ellipsis ? slots.ellipsis({}) : `
						<span class="${"ellipsis page-link svelte-17jxbj"}">\u2026</span>
					`}` : ``}`}</li>
			${option.type === "symbol" && option.symbol === NEXT_PAGE ? `${slots.next ? slots.next({}) : `
					<li class="${[
    "page-item svelte-17jxbj",
    (option.type === "number" ? "pageNumber" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE ? "next" : "")
  ].join(" ").trim()}" ${option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : ""}><span class="${"page-link svelte-17jxbj"}">${validate_component(ChevronRightIcon, "ChevronRightIcon").$$render($$result, { size: "1x" }, {}, {})}</span></li>
				`}` : ``}`)}</ul>
</nav>`;
});
var css$3 = {
  code: ".svg-icon.svelte-1msj1jq svg.svelte-1msj1jq{width:20px;height:20px}.default-img.svelte-1msj1jq.svelte-1msj1jq{display:inline-block;width:40px;height:40px;border-radius:50%;vertical-align:middle}.link.svelte-1msj1jq.svelte-1msj1jq{background:#fdac17;padding:12px;float:right;color:white}.link.svelte-1msj1jq.svelte-1msj1jq:hover{opacity:0.9}",
  map: `{"version":3,"file":"[p].svelte","sources":["[p].svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\texport async function load({ session }) {\\n\\t\\tif (!session.user || session.user.role !== 'admin' || !session.authenticated) {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tstatus: 302,\\n\\t\\t\\t\\tredirect: '/'\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn {\\n\\t\\t\\tprops: {\\n\\t\\t\\t\\ttoken: session.token\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n<\/script>\\n\\n<script>\\n\\timport { api } from '$lib/utils/api'\\n\\timport timeAgo from '$lib/utils/timeAgo'\\n\\timport { paginate, PaginationNav } from '$lib/paginate'\\n\\timport Tabs from '$lib/Tabs.svelte'\\n\\timport { onDestroy } from 'svelte'\\n\\timport LoadingSpinner from '$lib/LoadingSpinner.svelte'\\n\\timport { goto } from '$app/navigation'\\n\\timport { page } from '$app/stores'\\n\\timport {notifications} from '$lib/Noti.svelte'\\n\\n\\texport let token\\n\\n\\tlet isLoading = true\\n\\tlet pageSize\\n\\tlet totalItems\\n\\tlet items = []\\n\\tlet users = []\\n\\tlet currentPage\\n\\tlet urlPage\\n\\tlet unsubscribe\\n\\tlet pageNumber = $page.params.p\\n\\n\\tasync function getAllUsers(pageNumber) {\\n\\t\\ttry {\\n\\t\\t\\tconst res = await api('GET', \`admin/users/\${pageNumber}\`, {}, token)\\n\\t\\t\\tif (res.status >= 400) {\\n\\t\\t\\t\\tisLoading = false\\n\\t\\t\\t\\tthrow new Error(res.message)\\n\\t\\t\\t}\\n\\t\\t\\tisLoading = false\\n\\t\\t\\tpageSize = res.perPage\\n\\t\\t\\titems = res.users\\n\\t\\t\\ttotalItems = res.totalItems\\n\\t\\t\\treturn (users = res.users)\\n\\t\\t} catch (err) {\\n\\t\\t\\tisLoading = false\\n\\t\\t\\tnotifications.push(err.message)\\n\\t\\t}\\n\\t}\\n\\n\\tif (typeof window !== 'undefined' && typeof document !== 'undefined') {\\n\\t\\tunsubscribe = page.subscribe(async ({ path }) => {\\n\\t\\t\\turlPage = path.split('/').pop()\\n\\t\\t\\tcurrentPage = parseInt(urlPage)\\n\\t\\t\\tawait getAllUsers(urlPage)\\n\\t\\t})\\n\\t}\\n\\n\\t$: paginatedItem = paginate({ items, pageSize, currentPage })\\n\\n\\tfunction handleSetPage(e) {\\n\\t\\tcurrentPage = e.detail.page\\n\\t\\tgoto(\`/admin/users/\${e.detail.page}\`)\\n\\t}\\n\\n\\tonDestroy(() => {\\n\\t\\tif (unsubscribe) {\\n\\t\\t\\tunsubscribe()\\n\\t\\t}\\n\\t})\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Admin Panel</title>\\n\\t<meta name=\\"robots\\" content=\\"noindex, nofollow\\" />\\n</svelte:head>\\n\\n<Tabs />\\n\\n<div class=\\"container\\">\\n\\t{#if isLoading}\\n\\t\\t<LoadingSpinner />\\n\\t{/if}\\n\\t<div class=\\"card\\">\\n\\t\\t<div class=\\"card-body\\">\\n\\t\\t\\t<div class=\\"table-responsive\\">\\n\\t\\t\\t\\t<table class=\\"table\\">\\n\\t\\t\\t\\t\\t<thead>\\n\\t\\t\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Role\\">Role</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"User profile image\\">Image</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Email\\">Email</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"User Name\\">Name</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Gender\\">Gender</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Website\\">Website</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Location\\">Location</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Customer Since\\">Member Since</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t\\t<th scope=\\"col\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<abbr title=\\"Action Button\\">Action</abbr>\\n\\t\\t\\t\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t</thead>\\n\\t\\t\\t\\t\\t<tbody>\\n\\t\\t\\t\\t\\t\\t{#each users as user, i}\\n\\t\\t\\t\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td scope=\\"row\\">{user.role}</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if user.avatar}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\"default-img\\" src={user.avatar} alt=\\"User Image\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\"default-img\\" src=\\"img/default-image.jpg\\" alt=\\"User Image\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<span data-id={user._id}>{user.email}</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>{user.name}</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>{user.gender}</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>{user.website}</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>{user.location}</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>{timeAgo(user.createdAt)}</td>\\n\\t\\t\\t\\t\\t\\t\\t\\t<td>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<a class=\\"link\\" href=\\"/admin/user/{user._id}\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<i class=\\"svg-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"svg-inline--fa fa-link fa-w-16\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\taria-hidden=\\"true\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfocusable=\\"false\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata-prefix=\\"fas\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata-icon=\\"link\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\trole=\\"img\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 512 512\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata-fa-i2svg=\\"\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</i>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</tbody>\\n\\t\\t\\t\\t</table>\\n\\t\\t\\t</div>\\n\\t\\t\\t<PaginationNav\\n\\t\\t\\t\\t{totalItems}\\n\\t\\t\\t\\t{pageSize}\\n\\t\\t\\t\\t{currentPage}\\n\\t\\t\\t\\tlimit={1}\\n\\t\\t\\t\\tshowStepOptions={true}\\n\\t\\t\\t\\ton:setPage={(e) => handleSetPage(e)}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.svg-icon svg {\\n\\t\\twidth: 20px;\\n\\t\\theight: 20px;\\n\\t}\\n\\n\\tli.active a {\\n\\t\\tcolor: #00818b;\\n\\t}\\n\\n\\t.default-img {\\n\\t\\tdisplay: inline-block;\\n\\t\\twidth: 40px;\\n\\t\\theight: 40px;\\n\\t\\tborder-radius: 50%;\\n\\t\\tvertical-align: middle;\\n\\t}\\n\\n\\t.link {\\n\\t\\tbackground: #fdac17;\\n\\t\\tpadding: 12px;\\n\\t\\tfloat: right;\\n\\t\\tcolor: white;\\n\\t}\\n\\n\\t.link:hover {\\n\\t\\topacity: 0.9;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwLC,wBAAS,CAAC,GAAG,eAAC,CAAC,AACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AAMD,YAAY,8BAAC,CAAC,AACb,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,cAAc,CAAE,MAAM,AACvB,CAAC,AAED,KAAK,8BAAC,CAAC,AACN,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,KAAK,AACb,CAAC,AAED,mCAAK,MAAM,AAAC,CAAC,AACZ,OAAO,CAAE,GAAG,AACb,CAAC"}`
};
async function load$3({ session: session2 }) {
  if (!session2.user || session2.user.role !== "admin" || !session2.authenticated) {
    return { status: 302, redirect: "/" };
  }
  return { props: { token: session2.token } };
}
var U5Bpu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { token } = $$props;
  let isLoading = true;
  let pageSize;
  let totalItems;
  let items = [];
  let users = [];
  let currentPage;
  let urlPage;
  $page.params.p;
  async function getAllUsers(pageNumber) {
    try {
      const res = await api("GET", `admin/users/${pageNumber}`, {}, token);
      if (res.status >= 400) {
        isLoading = false;
        throw new Error(res.message);
      }
      isLoading = false;
      pageSize = res.perPage;
      items = res.users;
      totalItems = res.totalItems;
      return users = res.users;
    } catch (err) {
      isLoading = false;
      notifications.push(err.message);
    }
  }
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    page.subscribe(async ({ path }) => {
      urlPage = path.split("/").pop();
      currentPage = parseInt(urlPage);
      await getAllUsers(urlPage);
    });
  }
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  $$result.css.add(css$3);
  paginate({ items, pageSize, currentPage });
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1xeopve">`, ""}

${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}

<div class="${"container"}">${isLoading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : ``}
	<div class="${"card"}"><div class="${"card-body"}"><div class="${"table-responsive"}"><table class="${"table"}"><thead><tr><th scope="${"col"}"><abbr title="${"Role"}">Role</abbr></th>
							<th scope="${"col"}"><abbr title="${"User profile image"}">Image</abbr></th>
							<th scope="${"col"}"><abbr title="${"Email"}">Email</abbr></th>
							<th scope="${"col"}"><abbr title="${"User Name"}">Name</abbr></th>
							<th scope="${"col"}"><abbr title="${"Gender"}">Gender</abbr></th>
							<th scope="${"col"}"><abbr title="${"Website"}">Website</abbr></th>
							<th scope="${"col"}"><abbr title="${"Location"}">Location</abbr></th>
							<th scope="${"col"}"><abbr title="${"Customer Since"}">Member Since</abbr></th>
							<th scope="${"col"}"><abbr title="${"Action Button"}">Action</abbr></th></tr></thead>
					<tbody>${each(users, (user, i) => `<tr><td scope="${"row"}">${escape(user.role)}</td>
								<td>${user.avatar ? `<img class="${"default-img svelte-1msj1jq"}"${add_attribute("src", user.avatar, 0)} alt="${"User Image"}">` : `<img class="${"default-img svelte-1msj1jq"}" src="${"img/default-image.jpg"}" alt="${"User Image"}">`}</td>
								<td><span${add_attribute("data-id", user._id, 0)}>${escape(user.email)}</span></td>
								<td>${escape(user.name)}</td>
								<td>${escape(user.gender)}</td>
								<td>${escape(user.website)}</td>
								<td>${escape(user.location)}</td>
								<td>${escape(timeAgo(user.createdAt))}</td>
								<td><a class="${"link svelte-1msj1jq"}" href="${"/admin/user/" + escape(user._id)}"><i class="${"svg-icon svelte-1msj1jq"}"><svg class="${"svg-inline--fa fa-link fa-w-16 svelte-1msj1jq"}" aria-hidden="${"true"}" focusable="${"false"}" data-prefix="${"fas"}" data-icon="${"link"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 512 512"}" data-fa-i2svg="${""}"><path fill="${"currentColor"}" d="${"M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"}"></path></svg></i>
									</a></td>
							</tr>`)}</tbody></table></div>
			${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems,
    pageSize,
    currentPage,
    limit: 1,
    showStepOptions: true
  }, {}, {})}</div></div>
</div>`;
});
var _p_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bpu5D,
  load: load$3
});
var css$2 = {
  code: ".avatar.svelte-kiszy8.svelte-kiszy8{border-radius:50%;width:150px;height:150px}.profile.svelte-kiszy8 p.svelte-kiszy8{margin-bottom:5px}",
  map: `{"version":3,"file":"[id].svelte","sources":["[id].svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\texport async function load({ session }) {\\n\\t\\tif (session.user.role !== 'admin') {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tstatus: 302,\\n\\t\\t\\t\\tredirect: '/'\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn {\\n\\t\\t\\tprops: {\\n\\t\\t\\t\\ttoken: session.token\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n<\/script>\\n\\n<script>\\n\\timport { api } from '$lib/utils/api'\\n\\timport { onMount } from 'svelte'\\n\\timport timeAgo from '$lib/utils/timeAgo'\\n\\timport { page } from '$app/stores'\\n\\timport Tabs from '$lib/Tabs.svelte'\\n\\timport LoadingSpinner from '$lib/LoadingSpinner.svelte'\\n\\timport { notifications } from '$lib/Noti.svelte'\\n\\n\\texport let token\\n\\n\\tlet userAbout = ''\\n\\tlet userEmail = ''\\n\\tlet userAvatar = ''\\n\\tlet userName = ''\\n\\tlet name = ''\\n\\tlet userRole = ''\\n\\tlet userWebsite = ''\\n\\tlet userLocation = ''\\n\\tlet userGender = ''\\n\\tlet memberSince\\n\\tlet isLoading = true\\n\\n\\tasync function getUser() {\\n\\t\\ttry {\\n\\t\\t\\tconst res = await api('GET', \`admin/user/\${$page.params.id}\`, {}, token)\\n\\t\\t\\tif (res.status >= 400) {\\n\\t\\t\\t\\tisLoading = false\\n\\t\\t\\t\\tthrow new Error(res.message)\\n\\t\\t\\t}\\n\\t\\t\\tisLoading = false\\n\\t\\t\\tuserEmail = res.email\\n\\t\\t\\tuserAvatar = res.avatar\\n\\t\\t\\tuserRole = res.role\\n\\t\\t\\tname = res.name\\n\\t\\t\\tuserName = res.username\\n\\t\\t\\tuserWebsite = res.website\\n\\t\\t\\tuserLocation = res.location\\n\\t\\t\\tuserAbout = res.about\\n\\t\\t\\tuserGender = res.gender\\n\\t\\t\\tmemberSince = timeAgo(res.createdAt)\\n\\t\\t} catch (err) {\\n\\t\\t\\tisLoading = false\\n\\t\\t\\tnotifications.push(err.message)\\n\\t\\t}\\n\\t}\\n\\n\\tonMount(() => {\\n\\t\\tgetUser()\\n\\t})\\n\\n<\/script>\\n\\n<Tabs />\\n\\n<svelte:head>\\n\\t<title>Admin User Profile</title>\\n\\t<meta name=\\"robots\\" content=\\"noindex, nofollow\\" />\\n</svelte:head>\\n\\n<div class=\\"container\\">\\n\\t{#if isLoading}\\n\\t\\t<LoadingSpinner />\\n\\t{/if}\\n\\t<div class=\\"mt-5 d-flex justify-content-center\\">\\n\\t\\t<div class=\\"card text-center\\" style=\\"max-width: 30em; width: 30em;\\">\\n\\t\\t\\t<div class=\\"card-header\\">\\n\\t\\t\\t\\t<h1 class=\\"card-header-title\\">User Profile</h1>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"card-body\\">\\n\\t\\t\\t\\t<img class=\\"center avatar\\" src={userAvatar} alt=\\"user image\\" />\\n\\t\\t\\t\\t<br />\\n\\t\\t\\t\\t<div class=\\"profile\\">\\n\\t\\t\\t\\t\\t<p>@{userName}</p>\\n\\t\\t\\t\\t\\t{#if name}<p><b>Name: </b> <span>{name}</span></p>{/if}\\n\\t\\t\\t\\t\\t<p><b>Email: </b> <span>{userEmail}</span></p>\\n\\t\\t\\t\\t\\t{#if userGender}<p><b>Gender: </b> <span>{userGender}</span></p>{/if}\\n\\t\\t\\t\\t\\t{#if userLocation}<p><b>Location: </b> <span>{userLocation}</span></p>{/if}\\n\\t\\t\\t\\t\\t{#if userWebsite}<p><b>Website: </b> <span>{userWebsite}</span></p>{/if}\\n\\t\\t\\t\\t\\t{#if userAbout}<p><b>About: </b> <span>{userAbout}</span></p>{/if}\\n\\t\\t\\t\\t\\t<p><b>Role: </b> <span class=\\"capitalize\\">{userRole}</span></p>\\n\\t\\t\\t\\t\\t<p><b>Member Since:</b> {memberSince}</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.avatar {\\n\\t\\tborder-radius: 50%;\\n\\t\\twidth: 150px;\\n\\t\\theight: 150px;\\n\\t}\\n\\n\\t.profile p {\\n\\t\\tmargin-bottom: 5px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyGC,OAAO,4BAAC,CAAC,AACR,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACd,CAAC,AAED,sBAAQ,CAAC,CAAC,cAAC,CAAC,AACX,aAAa,CAAE,GAAG,AACnB,CAAC"}`
};
async function load$2({ session: session2 }) {
  if (session2.user.role !== "admin") {
    return { status: 302, redirect: "/" };
  }
  return { props: { token: session2.token } };
}
var U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { token } = $$props;
  let userEmail = "";
  let userAvatar = "";
  let userName = "";
  let userRole = "";
  let memberSince;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  $$result.css.add(css$2);
  $$unsubscribe_page();
  return `${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {})}

${$$result.head += `${$$result.title = `<title>Admin User Profile</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-184fk2s">`, ""}

<div class="${"container"}">${`${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}`}
	<div class="${"mt-5 d-flex justify-content-center"}"><div class="${"card text-center"}" style="${"max-width: 30em; width: 30em;"}"><div class="${"card-header"}"><h1 class="${"card-header-title"}">User Profile</h1></div>
			<div class="${"card-body"}"><img class="${"center avatar svelte-kiszy8"}"${add_attribute("src", userAvatar, 0)} alt="${"user image"}">
				<br>
				<div class="${"profile svelte-kiszy8"}"><p class="${"svelte-kiszy8"}">@${escape(userName)}</p>
					${``}
					<p class="${"svelte-kiszy8"}"><b>Email: </b> <span>${escape(userEmail)}</span></p>
					${``}
					${``}
					${``}
					${``}
					<p class="${"svelte-kiszy8"}"><b>Role: </b> <span class="${"capitalize"}">${escape(userRole)}</span></p>
					<p class="${"svelte-kiszy8"}"><b>Member Since:</b> ${escape(memberSince)}</p></div></div></div></div>
</div>`;
});
var _id_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D,
  load: load$2
});
var css$1 = {
  code: ".login.svelte-16lbl9s{width:25rem}.disabled.svelte-16lbl9s{pointer-events:none}",
  map: `{"version":3,"file":"login.svelte","sources":["login.svelte"],"sourcesContent":["<script context='module'>\\n  export async function load({session}) {\\n    if (session.authenticated) {\\n      return {\\n        status: 302,\\n        redirect: '/'\\n      }\\n    }\\n    return {}\\n  }\\n<\/script>\\n\\n<script>\\n  import Input from '$lib/Input.svelte'\\n  import {isEmail, isPassword} from '$lib/utils/validation'\\n  import {api} from '$lib/utils/api'\\n  import {authenticate} from '$lib/utils/auth'\\n  import {notifications} from '$lib/Noti.svelte'\\n\\n\\n  let email = ''\\n  let password = ''\\n\\n  $: emailValid = isEmail(email)\\n  $: passwordValid = isPassword(password)\\n  $: formIsValid = emailValid && passwordValid\\n\\n  async function submitForm(e) {\\n    e.preventDefault()\\n    const data = {\\n      email,\\n      password\\n    }\\n    try {\\n      const res = await api('POST', 'user/login', data)\\n      if (res.status >= 400) {\\n        throw Error(res.message)\\n      }\\n      await authenticate(res)\\n      email = ''\\n      password = ''\\n      return location.href = \`/user/profile/\${res.user.username}\`\\n    } catch (err) {\\n      notifications.push(err.message)\\n    }\\n  }\\n\\n  function handleKeyDown(e) {\\n    if (formIsValid) {\\n      if (e.keyCode === 13) {\\n        submitForm(e)\\n      }\\n    }\\n    return null\\n  }\\n<\/script>\\n\\n<svelte:window on:keydown={handleKeyDown}/>\\n\\n<svelte:head>\\n  <title>Login Form</title>\\n  <meta name='robots' content='noindex, nofollow'/>\\n</svelte:head>\\n\\n<main>\\n  <div class='container'>\\n    <div class='d-flex justify-content-center mt-5'>\\n      <div class='card login'>\\n        <div class='card-body'>\\n          <h4><strong>Sing In</strong></h4>\\n          <p>We are glad you are here.</p>\\n          <div>\\n            <Input\\n                id='email'\\n                label='Email'\\n                valid={emailValid}\\n                validityMessage='Please enter a valid email.'\\n                value={email}\\n                className='is-large'\\n                on:input={(event) => (email = event.target.value)}\\n            />\\n            <Input\\n                id='password'\\n                label='Password'\\n                help=\\"Password minimum length 8, must have one capital letter, 1 number, and one unique character.\\"\\n                type='password'\\n                valid={passwordValid}\\n                validityMessage='Please enter a valid password.'\\n                value={password}\\n                className='is-large'\\n                on:input={(event) => (password = event.target.value)}\\n            />\\n          </div>\\n          <div>\\n            <a href='/forgot' class=\\"text-black-50\\">Forgot Password?</a>\\n            <br/>\\n            <br/>\\n          </div>\\n          <div class=\\"d-grid gap-2\\">\\n            <button\\n                aria-disabled={!formIsValid ? 'true' : 'false'}\\n                class='btn btn-primary btn-lg'\\n                on:click={submitForm}\\n                class:disabled={!formIsValid}\\n                disabled={!formIsValid}>\\n              Sing In\\n            </button>\\n          </div>\\n        </div>\\n        <div class='card-footer text-center bg-white'>\\n          <a href='register' class='text-black-50'> Don't have an account? </a>\\n        </div>\\n      </div>\\n\\n    </div>\\n\\n    <div class='d-flex justify-content-center'>\\n      <div class='card mt-5 login'>\\n        <div class='card-header bg-light'>\\n          <span>Test users</span>\\n        </div>\\n        <div class='card-body text-primary'>\\n          <p>Admin: me@me.com Password#1</p>\\n          <p>User: me2@me.com Password#1</p>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</main>\\n\\n<style>\\n  .login {\\n    width: 25rem;\\n  }\\n\\n  .disabled {\\n    pointer-events: none;\\n  }\\n\\n</style>\\n"],"names":[],"mappings":"AAmIE,MAAM,eAAC,CAAC,AACN,KAAK,CAAE,KAAK,AACd,CAAC,AAED,SAAS,eAAC,CAAC,AACT,cAAc,CAAE,IAAI,AACtB,CAAC"}`
};
async function load$1({ session: session2 }) {
  if (session2.authenticated) {
    return { status: 302, redirect: "/" };
  }
  return {};
}
var Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let emailValid;
  let passwordValid;
  let formIsValid;
  let email = "";
  let password = "";
  $$result.css.add(css$1);
  emailValid = isEmail(email);
  passwordValid = isPassword(password);
  formIsValid = emailValid && passwordValid;
  return `

${$$result.head += `${$$result.title = `<title>Login Form</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-xu3re">`, ""}

<main><div class="${"container"}"><div class="${"d-flex justify-content-center mt-5"}"><div class="${"card login svelte-16lbl9s"}"><div class="${"card-body"}"><h4><strong>Sing In</strong></h4>
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

    <div class="${"d-flex justify-content-center"}"><div class="${"card mt-5 login svelte-16lbl9s"}"><div class="${"card-header bg-light"}"><span>Test users</span></div>
        <div class="${"card-body text-primary"}"><p>Admin: me@me.com Password#1</p>
          <p>User: me2@me.com Password#1</p></div></div></div></div>
</main>`;
});
var login = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Login,
  load: load$1
});
var U5Btokenu5D$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { token } = $page.params;
  let email = "";
  if (token) {
    const decoded = jwt_decode(token);
    email = decoded.email;
  }
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Account Activation</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-si1qee">`, ""}

<div class="${"container"}"><div class="${"d-flex mt-5 justify-content-center d-block"}"><div class="${"card"}" style="${"width: 50em; max-width: 50em"}"><div class="${"card-body text-center"}"><h5>Activate account for ${escape(email)}</h5>
					<hr>
					<button class="${"btn btn-primary btn-lg"}">Activate Account</button></div></div></div></div>`;
});
var _token_$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Btokenu5D$1
});
var css = {
  code: ".profile.svelte-1bn9gst p.svelte-1bn9gst{margin-bottom:0.4em}",
  map: `{"version":3,"file":"[username].svelte","sources":["[username].svelte"],"sourcesContent":["<script context=\\"module\\">\\n  export async function load ({ session }) {\\n    if (!session.authenticated) {\\n      return {\\n        status: 302,\\n        redirect: '/'\\n      }\\n    }\\n    return {\\n      props: {\\n        token: session.token,\\n        username: session.user.username\\n      }\\n    }\\n  }\\n<\/script>\\n\\n<script>\\n  import timeAgo from '$lib/utils/timeAgo'\\n  import { isEmail, isPassword, isUrl, isRequire } from '$lib/utils/validation'\\n  import Input from '$lib/Input.svelte'\\n  import LoadingSpinner from '$lib/LoadingSpinner.svelte'\\n  import { authenticate, logout } from '$lib/utils/auth'\\n  import { onMount } from 'svelte'\\n  import { api } from '$lib/utils/api'\\n  import { session } from '$app/stores'\\n  import { goto } from '$app/navigation'\\n  import { notifications } from '$lib/Noti.svelte'\\n  import { AlertTriangleIcon } from 'svelte-feather-icons'\\n\\n  export let token\\n  export let username\\n\\n  let isLoading = true\\n  let user\\n  let password = ''\\n  let passwordConfirmation = ''\\n  let about\\n  let location\\n  let website\\n  let gender\\n  let email\\n  let _id\\n  let name\\n  let role\\n  let createdAt\\n  let avatar\\n  let newUsername = null\\n\\n  async function getUser () {\\n    try {\\n      const res = await api('GET', \`user/profile/\${username}\`, {}, token)\\n      if (res.status >= 400) {\\n        throw new Error(res.message)\\n      }\\n      isLoading = false\\n      user = res\\n\\n      about = user.about || ''\\n      location = user.location || ''\\n      website = user.website || ''\\n      gender = user.gender || ''\\n      email = user.email || ''\\n      _id = user._id || ''\\n      name = user.name || ''\\n      role = user.role\\n      createdAt = timeAgo(user.createdAt)\\n      avatar = user.avatar\\n      username = user.username\\n    } catch (err) {\\n      isLoading = false\\n      notifications.push(err.message)\\n    }\\n  }\\n\\n  onMount(async () => {\\n    await getUser()\\n  })\\n\\n  $: emailValid = isEmail(email)\\n  $: usernameRequired = isRequire(username)\\n  $: nameRequired = isRequire(name)\\n  $: passwordValid = isPassword(password)\\n  $: websiteValid = isUrl(website)\\n  $: passwordConfirmValid = password === passwordConfirmation\\n  $: passwordFormIsValid = passwordValid && passwordConfirmValid\\n  $: formIsValid = emailValid && usernameRequired && nameRequired\\n\\n  async function updateUser () {\\n    let userObject = {}\\n    try {\\n      isLoading = true\\n      if (user.username !== username) {\\n        newUsername = username\\n      }\\n      if (newUsername) {\\n        userObject = {\\n          name,\\n          website,\\n          location,\\n          gender,\\n          username: newUsername,\\n          about\\n        }\\n      } else {\\n        userObject = {\\n          name,\\n          website,\\n          location,\\n          gender,\\n          about\\n        }\\n      }\\n      const res = await api('PATCH', \`user/account/\${user.username}\`, userObject, token)\\n      if (res.status >= 400) {\\n        throw new Error(res.message)\\n      }\\n      user = res.user\\n      await authenticate(res)\\n      isLoading = false\\n      if (newUsername) {\\n        $session.user.username = newUsername\\n        window.location.reload(\`/user/profile/\${newUsername}\`)\\n      } else {\\n        await goto(\`/user/profile/\${newUsername}\`)\\n        notifications.push('User profile was updated!', 'success')\\n      }\\n    } catch (err) {\\n      isLoading = false\\n      notifications.push(err.message)\\n    }\\n  }\\n\\n  async function deleteUser () {\\n    const result = confirm('Are you sure you want to delete your account?')\\n    if (result) {\\n      try {\\n        const res = await api('POST', 'user/delete', { _id: _id }, token)\\n        if (res.status >= 400) {\\n          throw new Error(res.message)\\n        }\\n        await logout()\\n      } catch (err) {\\n        isLoading = false\\n        notifications.push(err.message)\\n      }\\n    }\\n  }\\n\\n  async function updatePassword () {\\n    try {\\n      const passwordForm = document.getElementById('password-reset-form')\\n      const userObject = {\\n        _id,\\n        password\\n      }\\n      const res = await api('POST', 'user/update-password', userObject, token)\\n      if (res.status >= 400) {\\n        throw new Error(res.message)\\n      }\\n      passwordForm.reset()\\n      notifications.push('Password was updated!', 'success')\\n    } catch (err) {\\n      isLoading = 'false'\\n      notifications.push(err.message)\\n    }\\n  }\\n<\/script>\\n\\n<svelte:head>\\n  <title>Profile Page</title>\\n  <meta name=\\"robots\\" content=\\"noindex, nofollow\\"/>\\n</svelte:head>\\n\\n<section class=\\"mt-4\\">\\n  <div class=\\"container\\">\\n    {#if isLoading}\\n      <LoadingSpinner/>\\n    {/if}\\n    {#if user}\\n      <div class=\\"row\\">\\n        <div class=\\"col-md\\">\\n          <div class=\\"card profile mb-3 mx-auto d-block\\" style=\\"width: 18rem;\\">\\n            <div class=\\"card-header clearfix\\">\\n              <div class=\\"float-start\\">Profile Information</div>\\n              <div class=\\"float-end\\">:::</div>\\n            </div>\\n            <img\\n              class=\\"mt-3 mx-auto d-block\\"\\n              style=\\"border-radius: 50%; width: 100px; height: 100px\\"\\n              src={avatar}\\n              alt=\\"User Image\\"\\n            />\\n            <div class=\\"text-center\\">@{username}</div>\\n            <div class=\\"card-body\\">\\n              {#if name}\\n                <p>\\n                  <strong>Name:</strong>\\n                  {name}\\n                </p>\\n              {/if}\\n              <p>\\n                <strong>Email:</strong>\\n                {email}\\n              </p>\\n              {#if website}\\n                <p>\\n                  <strong>Website:</strong>\\n                  {website}\\n                </p>\\n              {/if}\\n              {#if location}\\n                <p>\\n                  <strong>Location:</strong>\\n                  {location}\\n                </p>\\n              {/if}\\n              {#if gender}\\n                <p>\\n                  <strong>Gender:</strong>\\n                  {gender}\\n                </p>\\n              {/if}\\n              {#if about}\\n                <p>\\n                  <strong>About:</strong>\\n                  {about}\\n                </p>\\n              {/if}\\n              <p>\\n                <strong>Role:</strong>\\n                <span class=\\"capitalize\\">{role}</span>\\n              </p>\\n            </div>\\n            <div class=\\"card-footer\\">\\n              <small>\\n                <strong>Member Since:</strong>\\n                <time>{createdAt}</time>\\n              </small>\\n            </div>\\n          </div>\\n        </div>\\n        <div class=\\"col-md\\">\\n          <div class=\\"mx-auto d-block\\">\\n            <form class=\\"card mb-4\\">\\n              <div class=\\"card-body\\">\\n                <Input\\n                  id=\\"username\\"\\n                  label=\\"Username*\\"\\n                  valid={usernameRequired}\\n                  validityMessage=\\"Username is required\\"\\n                  value={username}\\n                  on:input={(event) => (username = event.target.value)}\\n                />\\n                <Input\\n                  id=\\"name\\"\\n                  label=\\"Name*\\"\\n                  value={name}\\n                  valid={nameRequired}\\n                  validityMessage=\\"Name is required\\"\\n                  on:input={(event) => (name = event.target.value)}\\n                />\\n                <div class=\\"field\\">\\n                  <label for=\\"email\\">Email*</label>\\n                  <input class=\\"form-control\\" id=\\"email\\" type=\\"email\\" value={email} disabled/>\\n                  <p class=\\"help\\">Email can not be updated.</p>\\n                </div>\\n                <Input\\n                  id=\\"about\\"\\n                  label=\\"About\\"\\n                  value={about}\\n                  on:input={(event) => (about = event.target.value)}\\n                />\\n                <Input\\n                  id=\\"website\\"\\n                  label=\\"Website\\"\\n                  valid={websiteValid}\\n                  validityMessage=\\"Website URL is not valid\\"\\n                  value={website}\\n                  on:input={(event) => (website = event.target.value)}\\n                />\\n                <Input\\n                  id=\\"location\\"\\n                  label=\\"Location\\"\\n                  value={location}\\n                  on:input={(event) => (location = event.target.value)}\\n                />\\n                <div class=\\"field is-horizontal\\">\\n                  <div class=\\"field-label\\">\\n                    <label class=\\"label\\">Gender</label>\\n                  </div>\\n                  <div class=\\"field-body\\">\\n                    <div class=\\"field is-narrow\\">\\n                      <div class=\\"control\\">\\n                        <label class=\\"radio\\">\\n                          <input type=\\"radio\\" bind:group={gender} value=\\"Male\\"/>\\n                          Male\\n                        </label>\\n                        <label class=\\"radio\\">\\n                          <input type=\\"radio\\" bind:group={gender} value=\\"Female\\"/>\\n                          Female\\n                        </label>\\n                        <label class=\\"radio\\">\\n                          <input type=\\"radio\\" bind:group={gender} value=\\"Other\\"/>\\n                          Other\\n                        </label>\\n                      </div>\\n                    </div>\\n                  </div>\\n                </div>\\n                <button\\n                  class=\\"btn btn-primary float-end\\"\\n                  on:click|preventDefault={updateUser}\\n                  disabled={!formIsValid}\\n                >\\n                  Save\\n                </button>\\n              </div>\\n              <div class=\\"badge text-dark\\">\\n                Fields with *asterisk are required.\\n              </div>\\n            </form>\\n\\n\\n            <form class=\\"card mb-4\\" id=\\"password-reset-form\\">\\n              <div class=\\"card-body\\">\\n                <Input\\n                  id=\\"password\\"\\n                  label=\\"Password\\"\\n                  type=\\"password\\"\\n                  valid={passwordValid}\\n                  validityMessage=\\"Please enter a valid password.\\"\\n                  value={password}\\n                  on:input={(event) => (password = event.target.value)}\\n                />\\n                <Input\\n                  id=\\"passwordConfirmation\\"\\n                  label=\\"Password Confirmation\\"\\n                  help=\\"Password minimum length 8, must have one capital letter, 1 number, and one unique character.\\"\\n                  type=\\"password\\"\\n                  valid={passwordConfirmValid}\\n                  validityMessage=\\"Passwords did not match\\"\\n                  value={passwordConfirmation}\\n                  on:input={(event) => (passwordConfirmation = event.target.value)}\\n                />\\n                <button\\n                  class=\\"btn float-end btn-primary\\"\\n                  on:click|preventDefault={updatePassword}\\n                  disabled={!passwordFormIsValid}\\n                >\\n                  Update Password\\n                </button>\\n              </div>\\n            </form>\\n\\n            <form class=\\"mt-5 mb-5\\">\\n              <div class=\\"clearfix\\">\\n                <button class=\\"btn btn-danger float-end\\" on:click|preventDefault={deleteUser}>\\n                  Delete Account\\n                </button>\\n              </div>\\n              <br/>\\n              <span class=\\"badge bg-warning float-end text-black-50\\">\\n                <AlertTriangleIcon size=\\"2x\\"/>\\n\\t\\t\\t\\t\\t\\t\\t\\tWarning! Deleting your account is irreversible.\\n\\t\\t\\t\\t\\t\\t\\t</span>\\n            </form>\\n          </div>\\n        </div>\\n      </div>\\n    {/if}\\n  </div>\\n</section>\\n\\n<style>\\n  .profile p {\\n    margin-bottom: 0.4em;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuXE,uBAAQ,CAAC,CAAC,eAAC,CAAC,AACV,aAAa,CAAE,KAAK,AACtB,CAAC"}`
};
async function load({ session: session2 }) {
  if (!session2.authenticated) {
    return { status: 302, redirect: "/" };
  }
  return {
    props: {
      token: session2.token,
      username: session2.user.username
    }
  };
}
var U5Busernameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => value);
  let { token } = $$props;
  let { username } = $$props;
  let password = "";
  let website;
  let email;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.username === void 0 && $$bindings.username && username !== void 0)
    $$bindings.username(username);
  $$result.css.add(css);
  isEmail(email);
  isPassword(password);
  isUrl(website);
  $$unsubscribe_session();
  return `${$$result.head += `${$$result.title = `<title>Profile Page</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-3f98sr">`, ""}

<section class="${"mt-4"}"><div class="${"container"}">${`${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}`}
    ${``}</div>
</section>`;
});
var _username_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Busernameu5D,
  load
});
var U5Btokenu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `${$$result.head += `${$$result.title = `<title>Password Reset</title>`, ""}<meta name="${"robots"}" content="${"noindex, nofollow"}" data-svelte="svelte-1vtjl5">`, ""}

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
var _token_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Btokenu5D
});

// .svelte-kit/node/env.js
var host = process.env["HOST"] || "0.0.0.0";
var port = process.env["PORT"] || 3e3;

// .svelte-kit/node/index.js
import require$$0$1, { resolve as resolve2, join, normalize as normalize2, dirname } from "path";
import buffer from "buffer";
import tty from "tty";
import util from "util";
import {
  createReadStream,
  existsSync,
  statSync
} from "fs";
import fs__default, { readdirSync, statSync as statSync2 } from "fs";
import require$$2 from "net";
import zlib from "zlib";
import http from "http";
import {
  parse as parse2
} from "querystring";
import { fileURLToPath } from "url";
function isContentTypeTextual2(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h2["content-type"].split(/;\s*/);
      if (isContentTypeTextual2(type)) {
        const encoding3 = h2["content-encoding"] || "utf-8";
        return fulfil(new TextDecoder(encoding3).decode(data));
      }
      fulfil(data);
    });
  });
}
var charset = preferredCharsets;
var preferredCharsets_1 = preferredCharsets;
var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function parseAcceptCharset(accept) {
  var accepts2 = accept.split(",");
  for (var i = 0, j = 0; i < accepts2.length; i++) {
    var charset3 = parseCharset(accepts2[i].trim(), i);
    if (charset3) {
      accepts2[j++] = charset3;
    }
  }
  accepts2.length = j;
  return accepts2;
}
function parseCharset(str, i) {
  var match = simpleCharsetRegExp.exec(str);
  if (!match)
    return null;
  var charset3 = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(";");
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split("=");
      if (p[0] === "q") {
        q = parseFloat(p[1]);
        break;
      }
    }
  }
  return {
    charset: charset3,
    q,
    i
  };
}
function getCharsetPriority(charset3, accepted, index2) {
  var priority = { o: -1, q: 0, s: 0 };
  for (var i = 0; i < accepted.length; i++) {
    var spec = specify$3(charset3, accepted[i], index2);
    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }
  return priority;
}
function specify$3(charset3, spec, index2) {
  var s3 = 0;
  if (spec.charset.toLowerCase() === charset3.toLowerCase()) {
    s3 |= 1;
  } else if (spec.charset !== "*") {
    return null;
  }
  return {
    i: index2,
    o: spec.i,
    q: spec.q,
    s: s3
  };
}
function preferredCharsets(accept, provided) {
  var accepts2 = parseAcceptCharset(accept === void 0 ? "*" : accept || "");
  if (!provided) {
    return accepts2.filter(isQuality$3).sort(compareSpecs$3).map(getFullCharset);
  }
  var priorities = provided.map(function getPriority(type, index2) {
    return getCharsetPriority(type, accepts2, index2);
  });
  return priorities.filter(isQuality$3).sort(compareSpecs$3).map(function getCharset(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
function compareSpecs$3(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
function getFullCharset(spec) {
  return spec.charset;
}
function isQuality$3(spec) {
  return spec.q > 0;
}
charset.preferredCharsets = preferredCharsets_1;
var encoding = preferredEncodings;
var preferredEncodings_1 = preferredEncodings;
var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function parseAcceptEncoding(accept) {
  var accepts2 = accept.split(",");
  var hasIdentity = false;
  var minQuality = 1;
  for (var i = 0, j = 0; i < accepts2.length; i++) {
    var encoding3 = parseEncoding(accepts2[i].trim(), i);
    if (encoding3) {
      accepts2[j++] = encoding3;
      hasIdentity = hasIdentity || specify$2("identity", encoding3);
      minQuality = Math.min(minQuality, encoding3.q || 1);
    }
  }
  if (!hasIdentity) {
    accepts2[j++] = {
      encoding: "identity",
      q: minQuality,
      i
    };
  }
  accepts2.length = j;
  return accepts2;
}
function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match)
    return null;
  var encoding3 = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(";");
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split("=");
      if (p[0] === "q") {
        q = parseFloat(p[1]);
        break;
      }
    }
  }
  return {
    encoding: encoding3,
    q,
    i
  };
}
function getEncodingPriority(encoding3, accepted, index2) {
  var priority = { o: -1, q: 0, s: 0 };
  for (var i = 0; i < accepted.length; i++) {
    var spec = specify$2(encoding3, accepted[i], index2);
    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }
  return priority;
}
function specify$2(encoding3, spec, index2) {
  var s3 = 0;
  if (spec.encoding.toLowerCase() === encoding3.toLowerCase()) {
    s3 |= 1;
  } else if (spec.encoding !== "*") {
    return null;
  }
  return {
    i: index2,
    o: spec.i,
    q: spec.q,
    s: s3
  };
}
function preferredEncodings(accept, provided) {
  var accepts2 = parseAcceptEncoding(accept || "");
  if (!provided) {
    return accepts2.filter(isQuality$2).sort(compareSpecs$2).map(getFullEncoding);
  }
  var priorities = provided.map(function getPriority(type, index2) {
    return getEncodingPriority(type, accepts2, index2);
  });
  return priorities.filter(isQuality$2).sort(compareSpecs$2).map(function getEncoding(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
function compareSpecs$2(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
function getFullEncoding(spec) {
  return spec.encoding;
}
function isQuality$2(spec) {
  return spec.q > 0;
}
encoding.preferredEncodings = preferredEncodings_1;
var language = preferredLanguages;
var preferredLanguages_1 = preferredLanguages;
var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function parseAcceptLanguage(accept) {
  var accepts2 = accept.split(",");
  for (var i = 0, j = 0; i < accepts2.length; i++) {
    var language3 = parseLanguage(accepts2[i].trim(), i);
    if (language3) {
      accepts2[j++] = language3;
    }
  }
  accepts2.length = j;
  return accepts2;
}
function parseLanguage(str, i) {
  var match = simpleLanguageRegExp.exec(str);
  if (!match)
    return null;
  var prefix = match[1], suffix = match[2], full = prefix;
  if (suffix)
    full += "-" + suffix;
  var q = 1;
  if (match[3]) {
    var params = match[3].split(";");
    for (var j = 0; j < params.length; j++) {
      var p = params[j].split("=");
      if (p[0] === "q")
        q = parseFloat(p[1]);
    }
  }
  return {
    prefix,
    suffix,
    q,
    i,
    full
  };
}
function getLanguagePriority(language3, accepted, index2) {
  var priority = { o: -1, q: 0, s: 0 };
  for (var i = 0; i < accepted.length; i++) {
    var spec = specify$1(language3, accepted[i], index2);
    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }
  return priority;
}
function specify$1(language3, spec, index2) {
  var p = parseLanguage(language3);
  if (!p)
    return null;
  var s3 = 0;
  if (spec.full.toLowerCase() === p.full.toLowerCase()) {
    s3 |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s3 |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s3 |= 1;
  } else if (spec.full !== "*") {
    return null;
  }
  return {
    i: index2,
    o: spec.i,
    q: spec.q,
    s: s3
  };
}
function preferredLanguages(accept, provided) {
  var accepts2 = parseAcceptLanguage(accept === void 0 ? "*" : accept || "");
  if (!provided) {
    return accepts2.filter(isQuality$1).sort(compareSpecs$1).map(getFullLanguage);
  }
  var priorities = provided.map(function getPriority(type, index2) {
    return getLanguagePriority(type, accepts2, index2);
  });
  return priorities.filter(isQuality$1).sort(compareSpecs$1).map(function getLanguage(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
function compareSpecs$1(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
function getFullLanguage(spec) {
  return spec.full;
}
function isQuality$1(spec) {
  return spec.q > 0;
}
language.preferredLanguages = preferredLanguages_1;
var mediaType = preferredMediaTypes;
var preferredMediaTypes_1 = preferredMediaTypes;
var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function parseAccept(accept) {
  var accepts2 = splitMediaTypes(accept);
  for (var i = 0, j = 0; i < accepts2.length; i++) {
    var mediaType3 = parseMediaType(accepts2[i].trim(), i);
    if (mediaType3) {
      accepts2[j++] = mediaType3;
    }
  }
  accepts2.length = j;
  return accepts2;
}
function parseMediaType(str, i) {
  var match = simpleMediaTypeRegExp.exec(str);
  if (!match)
    return null;
  var params = Object.create(null);
  var q = 1;
  var subtype = match[2];
  var type = match[1];
  if (match[3]) {
    var kvps = splitParameters(match[3]).map(splitKeyValuePair);
    for (var j = 0; j < kvps.length; j++) {
      var pair = kvps[j];
      var key = pair[0].toLowerCase();
      var val = pair[1];
      var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;
      if (key === "q") {
        q = parseFloat(value);
        break;
      }
      params[key] = value;
    }
  }
  return {
    type,
    subtype,
    params,
    q,
    i
  };
}
function getMediaTypePriority(type, accepted, index2) {
  var priority = { o: -1, q: 0, s: 0 };
  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(type, accepted[i], index2);
    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }
  return priority;
}
function specify(type, spec, index2) {
  var p = parseMediaType(type);
  var s3 = 0;
  if (!p) {
    return null;
  }
  if (spec.type.toLowerCase() == p.type.toLowerCase()) {
    s3 |= 4;
  } else if (spec.type != "*") {
    return null;
  }
  if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s3 |= 2;
  } else if (spec.subtype != "*") {
    return null;
  }
  var keys = Object.keys(spec.params);
  if (keys.length > 0) {
    if (keys.every(function(k) {
      return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
    })) {
      s3 |= 1;
    } else {
      return null;
    }
  }
  return {
    i: index2,
    o: spec.i,
    q: spec.q,
    s: s3
  };
}
function preferredMediaTypes(accept, provided) {
  var accepts2 = parseAccept(accept === void 0 ? "*/*" : accept || "");
  if (!provided) {
    return accepts2.filter(isQuality).sort(compareSpecs).map(getFullType);
  }
  var priorities = provided.map(function getPriority(type, index2) {
    return getMediaTypePriority(type, accepts2, index2);
  });
  return priorities.filter(isQuality).sort(compareSpecs).map(function getType2(priority) {
    return provided[priorities.indexOf(priority)];
  });
}
function compareSpecs(a, b) {
  return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
function getFullType(spec) {
  return spec.type + "/" + spec.subtype;
}
function isQuality(spec) {
  return spec.q > 0;
}
function quoteCount(string) {
  var count = 0;
  var index2 = 0;
  while ((index2 = string.indexOf('"', index2)) !== -1) {
    count++;
    index2++;
  }
  return count;
}
function splitKeyValuePair(str) {
  var index2 = str.indexOf("=");
  var key;
  var val;
  if (index2 === -1) {
    key = str;
  } else {
    key = str.substr(0, index2);
    val = str.substr(index2 + 1);
  }
  return [key, val];
}
function splitMediaTypes(accept) {
  var accepts2 = accept.split(",");
  for (var i = 1, j = 0; i < accepts2.length; i++) {
    if (quoteCount(accepts2[j]) % 2 == 0) {
      accepts2[++j] = accepts2[i];
    } else {
      accepts2[j] += "," + accepts2[i];
    }
  }
  accepts2.length = j + 1;
  return accepts2;
}
function splitParameters(str) {
  var parameters = str.split(";");
  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ";" + parameters[i];
    }
  }
  parameters.length = j + 1;
  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }
  return parameters;
}
mediaType.preferredMediaTypes = preferredMediaTypes_1;
var modules = Object.create(null);
var negotiator = Negotiator;
var Negotiator_1 = Negotiator;
function Negotiator(request) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }
  this.request = request;
}
Negotiator.prototype.charset = function charset2(available) {
  var set = this.charsets(available);
  return set && set[0];
};
Negotiator.prototype.charsets = function charsets(available) {
  var preferredCharsets2 = loadModule("charset").preferredCharsets;
  return preferredCharsets2(this.request.headers["accept-charset"], available);
};
Negotiator.prototype.encoding = function encoding2(available) {
  var set = this.encodings(available);
  return set && set[0];
};
Negotiator.prototype.encodings = function encodings(available) {
  var preferredEncodings2 = loadModule("encoding").preferredEncodings;
  return preferredEncodings2(this.request.headers["accept-encoding"], available);
};
Negotiator.prototype.language = function language2(available) {
  var set = this.languages(available);
  return set && set[0];
};
Negotiator.prototype.languages = function languages(available) {
  var preferredLanguages2 = loadModule("language").preferredLanguages;
  return preferredLanguages2(this.request.headers["accept-language"], available);
};
Negotiator.prototype.mediaType = function mediaType2(available) {
  var set = this.mediaTypes(available);
  return set && set[0];
};
Negotiator.prototype.mediaTypes = function mediaTypes(available) {
  var preferredMediaTypes2 = loadModule("mediaType").preferredMediaTypes;
  return preferredMediaTypes2(this.request.headers.accept, available);
};
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
function loadModule(moduleName) {
  var module = modules[moduleName];
  if (module !== void 0) {
    return module;
  }
  switch (moduleName) {
    case "charset":
      module = charset;
      break;
    case "encoding":
      module = encoding;
      break;
    case "language":
      module = language;
      break;
    case "mediaType":
      module = mediaType;
      break;
    default:
      throw new Error("Cannot find module '" + moduleName + "'");
  }
  modules[moduleName] = module;
  return module;
}
negotiator.Negotiator = Negotiator_1;
function createCommonjsModule(fn) {
  var module = { exports: {} };
  return fn(module, module.exports), module.exports;
}
var require$$0 = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: true
  },
  "application/a2l": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: true
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: true
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: true
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: false
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: false,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/calendar+json": {
    source: "iana",
    compressible: true
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: true
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: true
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: true
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: true
  },
  "application/cfw": {
    source: "iana"
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: true
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: true
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: true
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: true
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: true
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: true
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: true
  },
  "application/csvm+json": {
    source: "iana",
    compressible: true
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: true
  },
  "application/dash+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mpd"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: true
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: true
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: true
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: true
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: true,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: false
  },
  "application/edifact": {
    source: "iana",
    compressible: false
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/elm+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: true
  },
  "application/emma+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: true
  },
  "application/epub+zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: true
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/fido.trusted-apps+json": {
    compressible: true
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: false
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: true
  },
  "application/geo+json": {
    source: "iana",
    compressible: true,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: true
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: false,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: true
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: true
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: false,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: false,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: false,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: true
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: true
  },
  "application/jrd+json": {
    source: "iana",
    compressible: true
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: true
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: true
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: true,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: true
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: true
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/ld+json": {
    source: "iana",
    compressible: true,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: true
  },
  "application/lost+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: true
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: false
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: true
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: true
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: true
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: true
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: true
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: true
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/msword": {
    source: "iana",
    compressible: false,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: true
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: true
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: false,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: true
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: false,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: true
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: false,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: false,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana"
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/postscript": {
    source: "iana",
    compressible: true,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: true
  },
  "application/problem+json": {
    source: "iana",
    compressible: true
  },
  "application/problem+xml": {
    source: "iana",
    compressible: true
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: false
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: true
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: true
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: true,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: true
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: true
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: true
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: true
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: true,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: true
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: true
  },
  "application/sarif+json": {
    source: "iana",
    compressible: true
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: true
  },
  "application/scim+json": {
    source: "iana",
    compressible: true
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: true
  },
  "application/senml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: true
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: true
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: true
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: true
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: true
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "srx"
    ]
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: true
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: true
  },
  "application/swid+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: true
  },
  "application/taxii+json": {
    source: "iana",
    compressible: true
  },
  "application/td+json": {
    source: "iana",
    compressible: true
  },
  "application/tei+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: true
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/toml": {
    compressible: true,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana"
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: false,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vcard+json": {
    source: "iana",
    compressible: true
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: true
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: false,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: false,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: false,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: true,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: false,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: false,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: false,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: false,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana"
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: false,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: true,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: true
  },
  "application/vnd.ms-outlook": {
    compressible: false,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: false,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: true
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: false,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: false,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: false,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: false,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: false,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: false,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: false,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: false,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: true
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    compressible: true,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: true
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: false,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: false,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: false,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: false,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: false,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: false
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: false,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: true,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: false,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: true
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: false,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: false
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: true,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: false,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: false,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: true,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: false,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: false,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: true,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: true,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: true,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: true,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: true,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: false,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: true,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: true,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: true,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: true,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: true
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: false,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: true
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: true
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: true
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: true
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: true,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: true
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: true
  },
  "application/xop+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: true
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: true
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: true
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: true
  },
  "application/yin+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: false,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: false,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: false
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: false,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: false,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: false,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: false,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: false
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: false
  },
  "audio/vorbis": {
    source: "iana",
    compressible: false
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: false,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: false,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: false,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: false,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: false,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: true,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: true,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: false,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana"
  },
  "image/avcs": {
    source: "iana"
  },
  "image/avif": {
    source: "iana",
    compressible: false,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: true,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: false,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: false,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: false,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: false,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: false,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: false
  },
  "image/png": {
    source: "iana",
    compressible: false,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: false,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: true,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: true,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: true,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: false
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: false
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: true
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: false
  },
  "message/rfc822": {
    source: "iana",
    compressible: true,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: true,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: true,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: false,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: false,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: true
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: false,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: false,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: false,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: false
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: false
  },
  "multipart/form-data": {
    source: "iana",
    compressible: false
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: false
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: false
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: true,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: true
  },
  "text/cmd": {
    compressible: true
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: true,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: true,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: true
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: true,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: true,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: true,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: true,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: true,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: true,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: true,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: true,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: true,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: true,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: true
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: true
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: true,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: true,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: true,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: true,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: false,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: false,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: false,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: false,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: false,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: false,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: false,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: false,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: true
  },
  "x-shader/x-vertex": {
    compressible: true
  }
};
var mimeDb = require$$0;
var mimeTypes = createCommonjsModule(function(module, exports) {
  var extname = require$$0$1.extname;
  var EXTRACT_TYPE_REGEXP2 = /^\s*([^;\s]*)(?:;|\s|$)/;
  var TEXT_TYPE_REGEXP = /^text\//i;
  exports.charset = charset3;
  exports.charsets = { lookup: charset3 };
  exports.contentType = contentType;
  exports.extension = extension;
  exports.extensions = Object.create(null);
  exports.lookup = lookup;
  exports.types = Object.create(null);
  populateMaps(exports.extensions, exports.types);
  function charset3(type) {
    if (!type || typeof type !== "string") {
      return false;
    }
    var match = EXTRACT_TYPE_REGEXP2.exec(type);
    var mime = match && mimeDb[match[1].toLowerCase()];
    if (mime && mime.charset) {
      return mime.charset;
    }
    if (match && TEXT_TYPE_REGEXP.test(match[1])) {
      return "UTF-8";
    }
    return false;
  }
  function contentType(str) {
    if (!str || typeof str !== "string") {
      return false;
    }
    var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
    if (!mime) {
      return false;
    }
    if (mime.indexOf("charset") === -1) {
      var charset4 = exports.charset(mime);
      if (charset4)
        mime += "; charset=" + charset4.toLowerCase();
    }
    return mime;
  }
  function extension(type) {
    if (!type || typeof type !== "string") {
      return false;
    }
    var match = EXTRACT_TYPE_REGEXP2.exec(type);
    var exts = match && exports.extensions[match[1].toLowerCase()];
    if (!exts || !exts.length) {
      return false;
    }
    return exts[0];
  }
  function lookup(path) {
    if (!path || typeof path !== "string") {
      return false;
    }
    var extension2 = extname("x." + path).toLowerCase().substr(1);
    if (!extension2) {
      return false;
    }
    return exports.types[extension2] || false;
  }
  function populateMaps(extensions, types) {
    var preference = ["nginx", "apache", void 0, "iana"];
    Object.keys(mimeDb).forEach(function forEachMimeType(type) {
      var mime = mimeDb[type];
      var exts = mime.extensions;
      if (!exts || !exts.length) {
        return;
      }
      extensions[type] = exts;
      for (var i = 0; i < exts.length; i++) {
        var extension2 = exts[i];
        if (types[extension2]) {
          var from = preference.indexOf(mimeDb[types[extension2]].source);
          var to = preference.indexOf(mime.source);
          if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
            continue;
          }
        }
        types[extension2] = type;
      }
    });
  }
});
var accepts = Accepts;
function Accepts(req) {
  if (!(this instanceof Accepts)) {
    return new Accepts(req);
  }
  this.headers = req.headers;
  this.negotiator = new negotiator(req);
}
Accepts.prototype.type = Accepts.prototype.types = function(types_) {
  var types = types_;
  if (types && !Array.isArray(types)) {
    types = new Array(arguments.length);
    for (var i = 0; i < types.length; i++) {
      types[i] = arguments[i];
    }
  }
  if (!types || types.length === 0) {
    return this.negotiator.mediaTypes();
  }
  if (!this.headers.accept) {
    return types[0];
  }
  var mimes = types.map(extToMime);
  var accepts2 = this.negotiator.mediaTypes(mimes.filter(validMime));
  var first = accepts2[0];
  return first ? types[mimes.indexOf(first)] : false;
};
Accepts.prototype.encoding = Accepts.prototype.encodings = function(encodings_) {
  var encodings2 = encodings_;
  if (encodings2 && !Array.isArray(encodings2)) {
    encodings2 = new Array(arguments.length);
    for (var i = 0; i < encodings2.length; i++) {
      encodings2[i] = arguments[i];
    }
  }
  if (!encodings2 || encodings2.length === 0) {
    return this.negotiator.encodings();
  }
  return this.negotiator.encodings(encodings2)[0] || false;
};
Accepts.prototype.charset = Accepts.prototype.charsets = function(charsets_) {
  var charsets2 = charsets_;
  if (charsets2 && !Array.isArray(charsets2)) {
    charsets2 = new Array(arguments.length);
    for (var i = 0; i < charsets2.length; i++) {
      charsets2[i] = arguments[i];
    }
  }
  if (!charsets2 || charsets2.length === 0) {
    return this.negotiator.charsets();
  }
  return this.negotiator.charsets(charsets2)[0] || false;
};
Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function(languages_) {
  var languages2 = languages_;
  if (languages2 && !Array.isArray(languages2)) {
    languages2 = new Array(arguments.length);
    for (var i = 0; i < languages2.length; i++) {
      languages2[i] = arguments[i];
    }
  }
  if (!languages2 || languages2.length === 0) {
    return this.negotiator.languages();
  }
  return this.negotiator.languages(languages2)[0] || false;
};
function extToMime(type) {
  return type.indexOf("/") === -1 ? mimeTypes.lookup(type) : type;
}
function validMime(type) {
  return typeof type === "string";
}
var safeBuffer = createCommonjsModule(function(module, exports) {
  var Buffer2 = buffer.Buffer;
  function copyProps(src2, dst) {
    for (var key in src2) {
      dst[key] = src2[key];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding3) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== void 0) {
      if (typeof encoding3 === "string") {
        buf.fill(fill, encoding3);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
});
var bytes_1 = bytes;
var format_1 = format;
var parse_1 = parse$4;
var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;
var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;
var map = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: (1 << 30) * 1024
};
var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i;
function bytes(value, options2) {
  if (typeof value === "string") {
    return parse$4(value);
  }
  if (typeof value === "number") {
    return format(value, options2);
  }
  return null;
}
function format(value, options2) {
  if (!Number.isFinite(value)) {
    return null;
  }
  var mag = Math.abs(value);
  var thousandsSeparator = options2 && options2.thousandsSeparator || "";
  var unitSeparator = options2 && options2.unitSeparator || "";
  var decimalPlaces = options2 && options2.decimalPlaces !== void 0 ? options2.decimalPlaces : 2;
  var fixedDecimals = Boolean(options2 && options2.fixedDecimals);
  var unit = options2 && options2.unit || "";
  if (!unit || !map[unit.toLowerCase()]) {
    if (mag >= map.tb) {
      unit = "TB";
    } else if (mag >= map.gb) {
      unit = "GB";
    } else if (mag >= map.mb) {
      unit = "MB";
    } else if (mag >= map.kb) {
      unit = "KB";
    } else {
      unit = "B";
    }
  }
  var val = value / map[unit.toLowerCase()];
  var str = val.toFixed(decimalPlaces);
  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, "$1");
  }
  if (thousandsSeparator) {
    str = str.replace(formatThousandsRegExp, thousandsSeparator);
  }
  return str + unitSeparator + unit;
}
function parse$4(val) {
  if (typeof val === "number" && !isNaN(val)) {
    return val;
  }
  if (typeof val !== "string") {
    return null;
  }
  var results = parseRegExp.exec(val);
  var floatValue;
  var unit = "b";
  if (!results) {
    floatValue = parseInt(val, 10);
    unit = "b";
  } else {
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }
  return Math.floor(map[unit] * floatValue);
}
bytes_1.format = format_1;
bytes_1.parse = parse_1;
var COMPRESSIBLE_TYPE_REGEXP = /^text\/|\+(?:json|text|xml)$/i;
var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
var compressible_1 = compressible;
function compressible(type) {
  if (!type || typeof type !== "string") {
    return false;
  }
  var match = EXTRACT_TYPE_REGEXP.exec(type);
  var mime = match && match[1].toLowerCase();
  var data = mimeDb[mime];
  if (data && data.compressible !== void 0) {
    return data.compressible;
  }
  return COMPRESSIBLE_TYPE_REGEXP.test(mime) || void 0;
}
var s2 = 1e3;
var m = s2 * 60;
var h = m * 60;
var d2 = h * 24;
var y = d2 * 365.25;
var ms = function(val, options2) {
  options2 = options2 || {};
  var type = typeof val;
  if (type === "string" && val.length > 0) {
    return parse$3(val);
  } else if (type === "number" && isNaN(val) === false) {
    return options2.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
function parse$3(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || "ms").toLowerCase();
  switch (type) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "days":
    case "day":
    case "d":
      return n * d2;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s2;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      return void 0;
  }
}
function fmtShort(ms2) {
  if (ms2 >= d2) {
    return Math.round(ms2 / d2) + "d";
  }
  if (ms2 >= h) {
    return Math.round(ms2 / h) + "h";
  }
  if (ms2 >= m) {
    return Math.round(ms2 / m) + "m";
  }
  if (ms2 >= s2) {
    return Math.round(ms2 / s2) + "s";
  }
  return ms2 + "ms";
}
function fmtLong(ms2) {
  return plural(ms2, d2, "day") || plural(ms2, h, "hour") || plural(ms2, m, "minute") || plural(ms2, s2, "second") || ms2 + " ms";
}
function plural(ms2, n, name) {
  if (ms2 < n) {
    return;
  }
  if (ms2 < n * 1.5) {
    return Math.floor(ms2 / n) + " " + name;
  }
  return Math.ceil(ms2 / n) + " " + name + "s";
}
var debug$1 = createCommonjsModule(function(module, exports) {
  exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;
  exports.names = [];
  exports.skips = [];
  exports.formatters = {};
  var prevTime;
  function selectColor(namespace) {
    var hash2 = 0, i;
    for (i in namespace) {
      hash2 = (hash2 << 5) - hash2 + namespace.charCodeAt(i);
      hash2 |= 0;
    }
    return exports.colors[Math.abs(hash2) % exports.colors.length];
  }
  function createDebug(namespace) {
    function debug2() {
      if (!debug2.enabled)
        return;
      var self = debug2;
      var curr = +new Date();
      var ms2 = curr - (prevTime || curr);
      self.diff = ms2;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      args[0] = exports.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      var index2 = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format2) {
        if (match === "%%")
          return match;
        index2++;
        var formatter = exports.formatters[format2];
        if (typeof formatter === "function") {
          var val = args[index2];
          match = formatter.call(self, val);
          args.splice(index2, 1);
          index2--;
        }
        return match;
      });
      exports.formatArgs.call(self, args);
      var logFn = debug2.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    debug2.namespace = namespace;
    debug2.enabled = exports.enabled(namespace);
    debug2.useColors = exports.useColors();
    debug2.color = selectColor(namespace);
    if (typeof exports.init === "function") {
      exports.init(debug2);
    }
    return debug2;
  }
  function enable(namespaces) {
    exports.save(namespaces);
    exports.names = [];
    exports.skips = [];
    var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    var len = split.length;
    for (var i = 0; i < len; i++) {
      if (!split[i])
        continue;
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        exports.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    exports.enable("");
  }
  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  function coerce(val) {
    if (val instanceof Error)
      return val.stack || val.message;
    return val;
  }
});
var browser = createCommonjsModule(function(module, exports) {
  exports = module.exports = debug$1;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load2;
  exports.useColors = useColors;
  exports.storage = typeof chrome != "undefined" && typeof chrome.storage != "undefined" ? chrome.storage.local : localstorage();
  exports.colors = [
    "lightseagreen",
    "forestgreen",
    "goldenrod",
    "dodgerblue",
    "darkorchid",
    "crimson"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return "[UnexpectedJSONParseError]: " + err.message;
    }
  };
  function formatArgs(args) {
    var useColors2 = this.useColors;
    args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
    if (!useColors2)
      return;
    var c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    var index2 = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if (match === "%%")
        return;
      index2++;
      if (match === "%c") {
        lastC = index2;
      }
    });
    args.splice(lastC, 0, c);
  }
  function log() {
    return typeof console === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function save(namespaces) {
    try {
      if (namespaces == null) {
        exports.storage.removeItem("debug");
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {
    }
  }
  function load2() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  exports.enable(load2());
  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {
    }
  }
});
var node = createCommonjsModule(function(module, exports) {
  exports = module.exports = debug$1;
  exports.init = init2;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load2;
  exports.useColors = useColors;
  exports.colors = [6, 2, 3, 4, 5, 1];
  exports.inspectOpts = Object.keys(process.env).filter(function(key) {
    return /^debug_/i.test(key);
  }).reduce(function(obj, key) {
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
      return k.toUpperCase();
    });
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val))
      val = true;
    else if (/^(no|off|false|disabled)$/i.test(val))
      val = false;
    else if (val === "null")
      val = null;
    else
      val = Number(val);
    obj[prop] = val;
    return obj;
  }, {});
  var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
  if (fd !== 1 && fd !== 2) {
    util.deprecate(function() {
    }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
  }
  var stream = fd === 1 ? process.stdout : fd === 2 ? process.stderr : createWritableStdioStream(fd);
  function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
  }
  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
      return str.trim();
    }).join(" ");
  };
  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
  function formatArgs(args) {
    var name = this.namespace;
    var useColors2 = this.useColors;
    if (useColors2) {
      var c = this.color;
      var prefix = "  [3" + c + ";1m" + name + " [0m";
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push("[3" + c + "m+" + exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = new Date().toUTCString() + " " + name + " " + args[0];
    }
  }
  function log() {
    return stream.write(util.format.apply(util, arguments) + "\n");
  }
  function save(namespaces) {
    if (namespaces == null) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }
  function load2() {
    return process.env.DEBUG;
  }
  function createWritableStdioStream(fd2) {
    var stream2;
    var tty_wrap = process.binding("tty_wrap");
    switch (tty_wrap.guessHandleType(fd2)) {
      case "TTY":
        stream2 = new tty.WriteStream(fd2);
        stream2._type = "tty";
        if (stream2._handle && stream2._handle.unref) {
          stream2._handle.unref();
        }
        break;
      case "FILE":
        var fs2 = fs__default;
        stream2 = new fs2.SyncWriteStream(fd2, { autoClose: false });
        stream2._type = "fs";
        break;
      case "PIPE":
      case "TCP":
        var net = require$$2;
        stream2 = new net.Socket({
          fd: fd2,
          readable: false,
          writable: true
        });
        stream2.readable = false;
        stream2.read = null;
        stream2._type = "pipe";
        if (stream2._handle && stream2._handle.unref) {
          stream2._handle.unref();
        }
        break;
      default:
        throw new Error("Implement me. Unknown stream file type!");
    }
    stream2.fd = fd2;
    stream2._isStdio = true;
    return stream2;
  }
  function init2(debug2) {
    debug2.inspectOpts = {};
    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug2.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }
  exports.enable(load2());
});
var src = createCommonjsModule(function(module) {
  if (typeof process !== "undefined" && process.type === "renderer") {
    module.exports = browser;
  } else {
    module.exports = node;
  }
});
var onHeaders_1 = onHeaders;
function createWriteHead(prevWriteHead, listener) {
  var fired = false;
  return function writeHead(statusCode) {
    var args = setWriteHeadHeaders.apply(this, arguments);
    if (!fired) {
      fired = true;
      listener.call(this);
      if (typeof args[0] === "number" && this.statusCode !== args[0]) {
        args[0] = this.statusCode;
        args.length = 1;
      }
    }
    return prevWriteHead.apply(this, args);
  };
}
function onHeaders(res, listener) {
  if (!res) {
    throw new TypeError("argument res is required");
  }
  if (typeof listener !== "function") {
    throw new TypeError("argument listener must be a function");
  }
  res.writeHead = createWriteHead(res.writeHead, listener);
}
function setHeadersFromArray(res, headers) {
  for (var i = 0; i < headers.length; i++) {
    res.setHeader(headers[i][0], headers[i][1]);
  }
}
function setHeadersFromObject(res, headers) {
  var keys = Object.keys(headers);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (k)
      res.setHeader(k, headers[k]);
  }
}
function setWriteHeadHeaders(statusCode) {
  var length = arguments.length;
  var headerIndex = length > 1 && typeof arguments[1] === "string" ? 2 : 1;
  var headers = length >= headerIndex + 1 ? arguments[headerIndex] : void 0;
  this.statusCode = statusCode;
  if (Array.isArray(headers)) {
    setHeadersFromArray(this, headers);
  } else if (headers) {
    setHeadersFromObject(this, headers);
  }
  var args = new Array(Math.min(length, headerIndex));
  for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i];
  }
  return args;
}
var vary_1 = vary;
var append_1 = append;
var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function append(header, field) {
  if (typeof header !== "string") {
    throw new TypeError("header argument is required");
  }
  if (!field) {
    throw new TypeError("field argument is required");
  }
  var fields = !Array.isArray(field) ? parse$2(String(field)) : field;
  for (var j = 0; j < fields.length; j++) {
    if (!FIELD_NAME_REGEXP.test(fields[j])) {
      throw new TypeError("field argument contains an invalid header name");
    }
  }
  if (header === "*") {
    return header;
  }
  var val = header;
  var vals = parse$2(header.toLowerCase());
  if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
    return "*";
  }
  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase();
    if (vals.indexOf(fld) === -1) {
      vals.push(fld);
      val = val ? val + ", " + fields[i] : fields[i];
    }
  }
  return val;
}
function parse$2(header) {
  var end = 0;
  var list2 = [];
  var start = 0;
  for (var i = 0, len = header.length; i < len; i++) {
    switch (header.charCodeAt(i)) {
      case 32:
        if (start === end) {
          start = end = i + 1;
        }
        break;
      case 44:
        list2.push(header.substring(start, end));
        start = end = i + 1;
        break;
      default:
        end = i + 1;
        break;
    }
  }
  list2.push(header.substring(start, end));
  return list2;
}
function vary(res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    throw new TypeError("res argument is required");
  }
  var val = res.getHeader("Vary") || "";
  var header = Array.isArray(val) ? val.join(", ") : String(val);
  if (val = append(header, field)) {
    res.setHeader("Vary", val);
  }
}
vary_1.append = append_1;
var Buffer$1 = safeBuffer.Buffer;
var debug = src("compression");
var compression_1 = compression;
var filter = shouldCompress;
var cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/;
function compression(options2) {
  var opts = options2 || {};
  var filter2 = opts.filter || shouldCompress;
  var threshold = bytes_1.parse(opts.threshold);
  if (threshold == null) {
    threshold = 1024;
  }
  return function compression2(req, res, next) {
    var ended = false;
    var length;
    var listeners = [];
    var stream;
    var _end = res.end;
    var _on = res.on;
    var _write = res.write;
    res.flush = function flush() {
      if (stream) {
        stream.flush();
      }
    };
    res.write = function write(chunk, encoding3) {
      if (ended) {
        return false;
      }
      if (!this._header) {
        this._implicitHeader();
      }
      return stream ? stream.write(toBuffer(chunk, encoding3)) : _write.call(this, chunk, encoding3);
    };
    res.end = function end(chunk, encoding3) {
      if (ended) {
        return false;
      }
      if (!this._header) {
        if (!this.getHeader("Content-Length")) {
          length = chunkLength(chunk, encoding3);
        }
        this._implicitHeader();
      }
      if (!stream) {
        return _end.call(this, chunk, encoding3);
      }
      ended = true;
      return chunk ? stream.end(toBuffer(chunk, encoding3)) : stream.end();
    };
    res.on = function on(type, listener) {
      if (!listeners || type !== "drain") {
        return _on.call(this, type, listener);
      }
      if (stream) {
        return stream.on(type, listener);
      }
      listeners.push([type, listener]);
      return this;
    };
    function nocompress(msg) {
      debug("no compression: %s", msg);
      addListeners(res, _on, listeners);
      listeners = null;
    }
    onHeaders_1(res, function onResponseHeaders() {
      if (!filter2(req, res)) {
        nocompress("filtered");
        return;
      }
      if (!shouldTransform(req, res)) {
        nocompress("no transform");
        return;
      }
      vary_1(res, "Accept-Encoding");
      if (Number(res.getHeader("Content-Length")) < threshold || length < threshold) {
        nocompress("size below threshold");
        return;
      }
      var encoding3 = res.getHeader("Content-Encoding") || "identity";
      if (encoding3 !== "identity") {
        nocompress("already encoded");
        return;
      }
      if (req.method === "HEAD") {
        nocompress("HEAD request");
        return;
      }
      var accept = accepts(req);
      var method = accept.encoding(["gzip", "deflate", "identity"]);
      if (method === "deflate" && accept.encoding(["gzip"])) {
        method = accept.encoding(["gzip", "identity"]);
      }
      if (!method || method === "identity") {
        nocompress("not acceptable");
        return;
      }
      debug("%s compression", method);
      stream = method === "gzip" ? zlib.createGzip(opts) : zlib.createDeflate(opts);
      addListeners(stream, stream.on, listeners);
      res.setHeader("Content-Encoding", method);
      res.removeHeader("Content-Length");
      stream.on("data", function onStreamData(chunk) {
        if (_write.call(res, chunk) === false) {
          stream.pause();
        }
      });
      stream.on("end", function onStreamEnd() {
        _end.call(res);
      });
      _on.call(res, "drain", function onResponseDrain() {
        stream.resume();
      });
    });
    next();
  };
}
function addListeners(stream, on, listeners) {
  for (var i = 0; i < listeners.length; i++) {
    on.apply(stream, listeners[i]);
  }
}
function chunkLength(chunk, encoding3) {
  if (!chunk) {
    return 0;
  }
  return !Buffer$1.isBuffer(chunk) ? Buffer$1.byteLength(chunk, encoding3) : chunk.length;
}
function shouldCompress(req, res) {
  var type = res.getHeader("Content-Type");
  if (type === void 0 || !compressible_1(type)) {
    debug("%s not compressible", type);
    return false;
  }
  return true;
}
function shouldTransform(req, res) {
  var cacheControl = res.getHeader("Cache-Control");
  return !cacheControl || !cacheControlNoTransformRegExp.test(cacheControl);
}
function toBuffer(chunk, encoding3) {
  return !Buffer$1.isBuffer(chunk) ? Buffer$1.from(chunk, encoding3) : chunk;
}
compression_1.filter = filter;
function parse$1(str, loose) {
  if (str instanceof RegExp)
    return { keys: false, pattern: str };
  var c, o, tmp, ext, keys = [], pattern = "", arr = str.split("/");
  arr[0] || arr.shift();
  while (tmp = arr.shift()) {
    c = tmp[0];
    if (c === "*") {
      keys.push("wild");
      pattern += "/(.*)";
    } else if (c === ":") {
      o = tmp.indexOf("?", 1);
      ext = tmp.indexOf(".", 1);
      keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
      pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
      if (!!~ext)
        pattern += (!!~o ? "?" : "") + "\\" + tmp.substring(ext);
    } else {
      pattern += "/" + tmp;
    }
  }
  return {
    keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
  };
}
var Trouter = class {
  constructor() {
    this.routes = [];
    this.all = this.add.bind(this, "");
    this.get = this.add.bind(this, "GET");
    this.head = this.add.bind(this, "HEAD");
    this.patch = this.add.bind(this, "PATCH");
    this.options = this.add.bind(this, "OPTIONS");
    this.connect = this.add.bind(this, "CONNECT");
    this.delete = this.add.bind(this, "DELETE");
    this.trace = this.add.bind(this, "TRACE");
    this.post = this.add.bind(this, "POST");
    this.put = this.add.bind(this, "PUT");
  }
  use(route, ...fns) {
    let handlers = [].concat.apply([], fns);
    let { keys, pattern } = parse$1(route, true);
    this.routes.push({ keys, pattern, method: "", handlers });
    return this;
  }
  add(method, route, ...fns) {
    let { keys, pattern } = parse$1(route);
    let handlers = [].concat.apply([], fns);
    this.routes.push({ keys, pattern, method, handlers });
    return this;
  }
  find(method, url) {
    let isHEAD = method === "HEAD";
    let i = 0, j = 0, k, tmp, arr = this.routes;
    let matches = [], params = {}, handlers = [];
    for (; i < arr.length; i++) {
      tmp = arr[i];
      if (tmp.method.length === 0 || tmp.method === method || isHEAD && tmp.method === "GET") {
        if (tmp.keys === false) {
          matches = tmp.pattern.exec(url);
          if (matches === null)
            continue;
          if (matches.groups !== void 0)
            for (k in matches.groups)
              params[k] = matches.groups[k];
          tmp.handlers.length > 1 ? handlers = handlers.concat(tmp.handlers) : handlers.push(tmp.handlers[0]);
        } else if (tmp.keys.length > 0) {
          matches = tmp.pattern.exec(url);
          if (matches === null)
            continue;
          for (j = 0; j < tmp.keys.length; )
            params[tmp.keys[j]] = matches[++j];
          tmp.handlers.length > 1 ? handlers = handlers.concat(tmp.handlers) : handlers.push(tmp.handlers[0]);
        } else if (tmp.pattern.test(url)) {
          tmp.handlers.length > 1 ? handlers = handlers.concat(tmp.handlers) : handlers.push(tmp.handlers[0]);
        }
      }
    }
    return { params, handlers };
  }
};
function parse3(req, toDecode) {
  let raw = req.url;
  if (raw == null)
    return;
  let prev = req._parsedUrl;
  if (prev && prev.raw === raw)
    return prev;
  let pathname = raw, search = "", query;
  if (raw.length > 1) {
    let idx = raw.indexOf("?", 1);
    if (idx !== -1) {
      search = raw.substring(idx);
      pathname = raw.substring(0, idx);
      if (search.length > 1) {
        query = parse2(search.substring(1));
      }
    }
    if (!!toDecode && !req._decoded) {
      req._decoded = true;
      if (pathname.indexOf("%") !== -1) {
        try {
          pathname = decodeURIComponent(pathname);
        } catch (e) {
        }
      }
    }
  }
  return req._parsedUrl = { pathname, search, query, raw };
}
function onError(err, req, res) {
  let code = res.statusCode = err.code || err.status || 500;
  if (typeof err === "string" || Buffer.isBuffer(err))
    res.end(err);
  else
    res.end(err.message || http.STATUS_CODES[code]);
}
var mount = (fn) => fn instanceof Polka ? fn.attach : fn;
var Polka = class extends Trouter {
  constructor(opts = {}) {
    super();
    this.parse = parse3;
    this.server = opts.server;
    this.handler = this.handler.bind(this);
    this.onError = opts.onError || onError;
    this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { code: 404 });
    this.attach = (req, res) => setImmediate(this.handler, req, res);
  }
  use(base, ...fns) {
    if (base === "/") {
      super.use(base, fns.map(mount));
    } else if (typeof base === "function" || base instanceof Polka) {
      super.use("/", [base, ...fns].map(mount));
    } else {
      super.use(base, (req, _, next) => {
        if (typeof base === "string") {
          let len = base.length;
          base.startsWith("/") || len++;
          req.url = req.url.substring(len) || "/";
          req.path = req.path.substring(len) || "/";
        } else {
          req.url = req.url.replace(base, "") || "/";
          req.path = req.path.replace(base, "") || "/";
        }
        if (req.url.charAt(0) !== "/") {
          req.url = "/" + req.url;
        }
        next();
      }, fns.map(mount), (req, _, next) => {
        req.path = req._parsedUrl.pathname;
        req.url = req.path + req._parsedUrl.search;
        next();
      });
    }
    return this;
  }
  listen() {
    (this.server = this.server || http.createServer()).on("request", this.attach);
    this.server.listen.apply(this.server, arguments);
    return this;
  }
  handler(req, res, next) {
    let info = this.parse(req, true);
    let obj = this.find(req.method, req.path = info.pathname);
    req.params = obj.params;
    req.originalUrl = req.originalUrl || req.url;
    req.url = info.pathname + info.search;
    req.query = info.query || {};
    req.search = info.search;
    let i = 0, arr = obj.handlers.concat(this.onNoMatch), len = arr.length;
    let loop = async () => res.finished || i < len && arr[i++](req, res, next);
    (next = next || ((err) => err ? this.onError(err, req, res, next) : loop().catch(next)))();
  }
};
function polka(opts) {
  return new Polka(opts);
}
function list(dir, callback, pre = "") {
  dir = resolve2(".", dir);
  let arr = readdirSync(dir);
  let i = 0, abs, stats;
  for (; i < arr.length; i++) {
    abs = join(dir, arr[i]);
    stats = statSync2(abs);
    stats.isDirectory() ? list(abs, callback, join(pre, arr[i])) : callback(join(pre, arr[i]), abs, stats);
  }
}
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);
  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }
  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
Mime.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext[0] === "*") {
        continue;
      }
      if (!force && ext in this._types) {
        throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
      }
      this._types[ext] = type;
    }
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
    }
  }
};
Mime.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, "").toLowerCase();
  let ext = last.replace(/^.*\./, "").toLowerCase();
  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;
  return (hasDot || !hasPath) && this._types[ext] || null;
};
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};
var Mime_1 = Mime;
var standard = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
var lite = new Mime_1(standard);
var noop2 = () => {
};
function isMatch(uri, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].test(uri))
      return true;
  }
}
function toAssume(uri, extns) {
  let i = 0, x, len = uri.length - 1;
  if (uri.charCodeAt(len) === 47) {
    uri = uri.substring(0, len);
  }
  let arr = [], tmp = `${uri}/index`;
  for (; i < extns.length; i++) {
    x = extns[i] ? `.${extns[i]}` : "";
    if (uri)
      arr.push(uri + x);
    arr.push(tmp + x);
  }
  return arr;
}
function viaCache(cache, uri, extns) {
  let i = 0, data, arr = toAssume(uri, extns);
  for (; i < arr.length; i++) {
    if (data = cache[arr[i]])
      return data;
  }
}
function viaLocal(dir, isEtag, uri, extns) {
  let i = 0, arr = toAssume(uri, extns);
  let abs, stats, name, headers;
  for (; i < arr.length; i++) {
    abs = normalize2(join(dir, name = arr[i]));
    if (abs.startsWith(dir) && existsSync(abs)) {
      stats = statSync(abs);
      if (stats.isDirectory())
        continue;
      headers = toHeaders(name, stats, isEtag);
      headers["Cache-Control"] = isEtag ? "no-cache" : "no-store";
      return { abs, stats, headers };
    }
  }
}
function is404(req, res) {
  return res.statusCode = 404, res.end();
}
function send(req, res, file, stats, headers) {
  let code = 200, tmp, opts = {};
  headers = __spreadValues({}, headers);
  for (let key in headers) {
    tmp = res.getHeader(key);
    if (tmp)
      headers[key] = tmp;
  }
  if (tmp = res.getHeader("content-type")) {
    headers["Content-Type"] = tmp;
  }
  if (req.headers.range) {
    code = 206;
    let [x, y2] = req.headers.range.replace("bytes=", "").split("-");
    let end = opts.end = parseInt(y2, 10) || stats.size - 1;
    let start = opts.start = parseInt(x, 10) || 0;
    if (start >= stats.size || end >= stats.size) {
      res.setHeader("Content-Range", `bytes */${stats.size}`);
      res.statusCode = 416;
      return res.end();
    }
    headers["Content-Range"] = `bytes ${start}-${end}/${stats.size}`;
    headers["Content-Length"] = end - start + 1;
    headers["Accept-Ranges"] = "bytes";
  }
  res.writeHead(code, headers);
  createReadStream(file, opts).pipe(res);
}
function isEncoding(name, type, headers) {
  headers["Content-Encoding"] = type;
  headers["Content-Type"] = lite.getType(name.replace(/\.([^.]*)$/, "")) || "";
}
function toHeaders(name, stats, isEtag) {
  let headers = {
    "Content-Length": stats.size,
    "Content-Type": lite.getType(name) || "",
    "Last-Modified": stats.mtime.toUTCString()
  };
  if (isEtag)
    headers["ETag"] = `W/"${stats.size}-${stats.mtime.getTime()}"`;
  if (/\.br$/.test(name))
    isEncoding(name, "br", headers);
  if (/\.gz$/.test(name))
    isEncoding(name, "gzip", headers);
  return headers;
}
function sirv(dir, opts = {}) {
  dir = resolve2(dir || ".");
  let isNotFound = opts.onNoMatch || is404;
  let setHeaders = opts.setHeaders || noop2;
  let extensions = opts.extensions || ["html", "htm"];
  let gzips = opts.gzip && extensions.map((x) => `${x}.gz`).concat("gz");
  let brots = opts.brotli && extensions.map((x) => `${x}.br`).concat("br");
  const FILES = {};
  let fallback = "/";
  let isEtag = !!opts.etag;
  let isSPA = !!opts.single;
  if (typeof opts.single === "string") {
    let idx = opts.single.lastIndexOf(".");
    fallback += !!~idx ? opts.single.substring(0, idx) : opts.single;
  }
  let ignores = [];
  if (opts.ignores !== false) {
    ignores.push(/[/]([A-Za-z\s\d~$._-]+\.\w+){1,}$/);
    if (opts.dotfiles)
      ignores.push(/\/\.\w/);
    else
      ignores.push(/\/\.well-known/);
    [].concat(opts.ignores || []).forEach((x) => {
      ignores.push(new RegExp(x, "i"));
    });
  }
  let cc = opts.maxAge != null && `public,max-age=${opts.maxAge}`;
  if (cc && opts.immutable)
    cc += ",immutable";
  else if (cc && opts.maxAge === 0)
    cc += ",must-revalidate";
  if (!opts.dev) {
    list(dir, (name, abs, stats) => {
      if (/\.well-known[\\+\/]/.test(name))
        ;
      else if (!opts.dotfiles && /(^\.|[\\+|\/+]\.)/.test(name))
        return;
      let headers = toHeaders(name, stats, isEtag);
      if (cc)
        headers["Cache-Control"] = cc;
      FILES["/" + name.normalize().replace(/\\+/g, "/")] = { abs, stats, headers };
    });
  }
  let lookup = opts.dev ? viaLocal.bind(0, dir, isEtag) : viaCache.bind(0, FILES);
  return function(req, res, next) {
    let extns = [""];
    let val = req.headers["accept-encoding"] || "";
    if (gzips && val.includes("gzip"))
      extns.unshift(...gzips);
    if (brots && /(br|brotli)/i.test(val))
      extns.unshift(...brots);
    extns.push(...extensions);
    let pathname = req.path || parse3(req, true).pathname;
    let data = lookup(pathname, extns) || isSPA && !isMatch(pathname, ignores) && lookup(fallback, extns);
    if (!data)
      return next ? next() : isNotFound(req, res);
    if (isEtag && req.headers["if-none-match"] === data.headers["ETag"]) {
      res.writeHead(304);
      return res.end();
    }
    if (gzips || brots) {
      res.setHeader("Vary", "Accept-Encoding");
    }
    setHeaders(res, pathname, data.stats);
    send(req, res, data.abs, data.stats, data.headers);
  };
}
var __dirname = dirname(fileURLToPath(import.meta.url));
var noop_handler = (_req, _res, next) => next();
var paths = {
  assets: join(__dirname, "/assets"),
  prerendered: join(__dirname, "/prerendered")
};
function createServer({ render: render2 }) {
  const immutable_path = (pathname) => {
    let app_dir = "_app";
    if (app_dir === "/") {
      return false;
    }
    if (app_dir.startsWith("/")) {
      app_dir = app_dir.slice(1);
    }
    if (app_dir.endsWith("/")) {
      app_dir = app_dir.slice(0, -1);
    }
    return pathname.startsWith(`/${app_dir}/`);
  };
  const prerendered_handler = fs__default.existsSync(paths.prerendered) ? sirv(paths.prerendered, {
    etag: true,
    maxAge: 0,
    gzip: true,
    brotli: true
  }) : noop_handler;
  const assets_handler = fs__default.existsSync(paths.assets) ? sirv(paths.assets, {
    setHeaders: (res, pathname, stats) => {
      if (immutable_path(pathname)) {
        res.setHeader("cache-control", "public, max-age=31536000, immutable");
      }
    },
    gzip: true,
    brotli: true
  }) : noop_handler;
  const server = polka().use(compression_1({ threshold: 0 }), assets_handler, prerendered_handler, async (req, res) => {
    const parsed = new URL(req.url || "", "http://localhost");
    let body;
    try {
      body = await getRawBody(req);
    } catch (err) {
      res.statusCode = err.status || 400;
      return res.end(err.reason || "Invalid request body");
    }
    const rendered = await render2({
      method: req.method,
      headers: req.headers,
      path: parsed.pathname,
      query: parsed.searchParams,
      rawBody: body
    });
    if (rendered) {
      res.writeHead(rendered.status, rendered.headers);
      if (rendered.body)
        res.write(rendered.body);
      res.end();
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
  });
  return server;
}
init();
var instance = createServer({ render }).listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`);
});
export {
  instance
};
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */
/*!
 * compressible
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Jeremiah Senkpiel
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * compression
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * on-headers
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
