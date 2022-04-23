import fetchPonyfill from "fetch-ponyfill"
import {variables} from "$lib/utils/variables.js";
import {handleSession} from "$lib/utils/auth.js";

const {fetch} = fetchPonyfill()
const apiPath = variables.env === 'development' ? variables.apiDevPath : variables.apiLivePath

export const api = (method, path, data, token) => {
  const noData = method === 'GET' || method === 'DELETE'

  return fetch(`${apiPath}/${path}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {})
    },
    ...(!noData ? {body: JSON.stringify(data)} : null)
  })
    .then(async res => {
      // if token expires log user out and remove cookies
      await handleSession(res)
      return await res.json()
    })
    .catch( () => {
      // no network connection so we send here a general error message
      return {
        status: 502,
        message: 'Oops! Something is wrong. Please try later.'
      }
    })
}