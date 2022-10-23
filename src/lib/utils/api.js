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
      if(response){
        browser && loaderStatus.update(()=> 200)
        if (response.status >= 400) {
          browser && notifications.push(response.message)
          await handleSession(response)
          return true
        }
        return await response
      }
    })
    .catch( () => {
      // no network connection so we send here a general error message
      browser && loaderStatus.update(()=> 502)
      return browser && notifications.push('Oops! Something is wrong. Please try later.')
    })
}
