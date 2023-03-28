import fetchPonyfill from "fetch-ponyfill"
import {variables} from "$lib/utils/variables.js"
import {logout} from "$lib/utils/auth.js"
import {notifications} from "$lib/Noti.svelte"
import {browser} from "$lib/utils/browser.js"

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
      if (res.status === 440) return await logout()
      if (response.status >= 400) {
        return browser && notifications.push(response.message)
      }
      return response
    })
    .catch((err) => {
      if (err && err instanceof Error) {
        return browser && notifications.push('Something went wrong. Please try later.')
      } else {
        throw err
      }
    })
}
