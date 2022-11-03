import {
  variables
} from "./chunk-DUR7N27I.js";

// .svelte-kit/adapter-node/chunks/api.js
import fetchPonyfill from "fetch-ponyfill";
import "js-cookie";
var browser = false;
var handleSession = async (res) => {
  if (res.status === 440) {
    await logout();
  }
};
var logout = async () => {
  if (typeof window != "undefined") {
    await removeCookie();
    window.location.replace("/");
  }
};
var removeCookie = async (key) => {
};
var { fetch } = fetchPonyfill();
var apiPath = variables.apiDevPath;
var api = (method, path, data) => {
  const noData = method === "GET" || method === "DELETE";
  return fetch(`${apiPath}/${path}`, {
    method,
    "credentials": "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...!noData ? { body: JSON.stringify(data) } : null
  }).then(async (res) => {
    const response = await res.json();
    if (response) {
      if (response.status >= 400) {
        await handleSession(response);
        return true;
      }
      return await response;
    }
  }).catch(() => {
    return browser;
  });
};

export {
  browser,
  api
};
//# sourceMappingURL=chunk-BC2MDNSB.js.map
