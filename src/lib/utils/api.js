import fetchPonyfill from "fetch-ponyfill"
import {variables} from "$lib/utils/variables.js"
import {logout} from "$lib/utils/auth.js"
import {notifications} from "$lib/Noti.svelte"
import {browser} from "$lib/utils/browser.js"

const {fetch} = fetchPonyfill()
const apiPath = variables.env === 'development' ? variables.apiDevPath : variables.apiLivePath

export const api = async (method, path, data) => {
  const gotData =  typeof data === 'object' && !Array.isArray(data) && data !== null
  const formData = data instanceof FormData
  try{
    const response = (await fetch(`${apiPath}/${path}`, {
      method: method,
      'credentials': 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // if FormData we set body: data else JSON stringify(data) & we don't set body when no data
      ...(gotData ? { body: !formData ? JSON.stringify(data) : data } : null)
    }))
    const res = await response.json()
    // logout user when no token is found on the BE
    if (res.status === 440) return await logout()
    // display all error messages
    if (res.status >= 400) {
      return browser && notifications.push(res.message)
    } else {
      return res
    }

  }catch (err){
    if (err && err instanceof Error) {
      // server error
      return browser && notifications.push('Something went wrong. Please try later.')
    } else {
      throw err
    }
  }

}
