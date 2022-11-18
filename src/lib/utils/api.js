import fetchPonyfill from "fetch-ponyfill"
import {variables} from "$lib/utils/variables.js"
import {handleSession} from "$lib/utils/auth.js"
import {notifications} from "$lib/Noti.svelte"
import {browser} from "$app/environment"
import {loaderStatus} from "$lib/loader/loaderStatus"

const {fetch} = fetchPonyfill()
const apiPath = variables.env === 'development' ? variables.apiDevPath : variables.apiLivePath

export const api = (method, path, data) => {
  const noData = method === 'GET' || method === 'DELETE'

  return fetch(`${apiPath}/${path}`, {
    method: method,
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...(!noData ? {body: JSON.stringify(data)} : null)
  })
    .then(async res => {
      const response = await res.json()
      browser && loaderStatus.update(() => 200)
      if (res.status === 440) return await handleSession(response)
      if (response.status >= 400) {
        return browser && notifications.push(response.message)
      }
      return response

    })
    .catch(() => {
      // no network connection so we send here a general error message
      browser && loaderStatus.update(() => 502)
      return browser && notifications.push('Oops! Something is wrong. Please try later.')
    })
}
