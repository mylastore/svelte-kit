import fetchPonyfill from "fetch-ponyfill"
import {variables} from "$lib/utils/variables.js"
import {logout} from "$lib/utils/auth.js"
import {notifications} from "$lib/Noti.svelte"
import {browser} from "$lib/utils/browser.js"

const {fetch} = fetchPonyfill()
const apiPath = variables.env === 'development' ? variables.apiDevPath : variables.apiLivePath

export const api = async (method, path, data) => {
  const noData = method === 'GET' || method === 'DELETE'

  try{
    const response = (await fetch(`${apiPath}/${path}`, {
      method: method,
      'credentials': 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...(!noData ? { body: JSON.stringify(data) } : null)
    }))
    const res = await response.json()
    if (res.status === 440) return await logout()
    if (res.status >= 400) {
      return browser && notifications.push(res.message)
    } else {
      return res
    }

  }catch (err){
    if (err && err instanceof Error) {
      return browser && notifications.push('Something went wrong. Please try later.')
    } else {
      throw err
    }
  }

}
