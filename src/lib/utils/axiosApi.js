import axios from 'axios'
import {notifications} from "$lib/Noti.svelte"
import {browser} from "$app/environment"
import {loaderStatus} from "$lib/loader/loaderStatus"
import {variables} from "$lib/utils/variables.js";

const apiPath = variables.env === 'development' ? variables.apiDevPath : variables.apiLivePath

const api = async (method, url, data) => {
  const noData = method === 'get' || method === 'delete'
  const config = {
    method,
    url: apiPath + url,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!noData ? {data} : null)
  }
  try {
    const res = await axios(config)
    if (res) {
      browser && loaderStatus.update(() => 200)
      if (res.data.status >= 400) {
        browser && notifications.push(res.message)
        return null
      }
      return res.data
    }

  } catch (err) {
    browser && loaderStatus.update(() => err.response.status)
    return browser && notifications.push(err.response.data.message)
  }


}

export default api
