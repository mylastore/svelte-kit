import fetch from 'isomorphic-fetch'
import {handleSession, logout} from './auth'
import {variables} from '$lib/utils/variables'

const apiPath = variables.env === 'development' ? variables.apiDevPath : variables.apiLivePath

export const api = (method, path, data, token) => {
  const noBodyData = method === 'GET' || method === 'DELETE'
  return fetch(`${apiPath}/${path}`, {
    method: `${method}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {})
    },
    ...(!noBodyData ? {body: JSON.stringify(data)} : null)
  })
    .then(async res => {
      await handleSession(res)
      return await res.json()
    })
    .catch(() => {
      setTimeout(async ()=>{
        await logout()
      },4000)
      return {
        status: 502,
        message: 'Oops! Something is wrong. Please try later.'
      }
    })

}

// formData body type
export const apiForm = (method, path, data, token) => {
  return fetch(`${apiPath}/${path}`, {
    method: `${method}`,
    headers: {
      Accept: 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {})
    },
    body: data
  })
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return {
        status: 502,
        message: 'Oops! Something is wrong. Please try later.'
      }
    })
}