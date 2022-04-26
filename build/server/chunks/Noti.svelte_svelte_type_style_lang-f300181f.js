import fetchPonyfill from "fetch-ponyfill";
import { v as variables } from "./variables-86731e6d.js";
import "js-cookie";
const handleSession = async (res) => {
  if (res.status === 440) {
    await logout();
  }
};
const logout = async () => {
  await removeCookie();
  await removeCookie();
};
const removeCookie = async (key) => {
};
const { fetch } = fetchPonyfill();
const apiPath = variables.apiLivePath;
const api = (method, path, data, token) => {
  const noData = method === "GET" || method === "DELETE";
  return fetch(`${apiPath}/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token ? { Authorization: `Bearer ${token}` } : {}
    },
    ...!noData ? { body: JSON.stringify(data) } : null
  }).then(async (res) => {
    await handleSession(res);
    return await res.json();
  }).catch(() => {
    return {
      status: 502,
      message: "Oops! Something is wrong. Please try later."
    };
  });
};
var Noti_svelte_svelte_type_style_lang = "";
export { api as a };
