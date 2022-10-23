import Cookies from 'js-cookie'
import {browser} from "$app/environment"

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
  }
}

export const logout = async () => {
  if (typeof window != 'undefined') {
    await removeCookie('user')
    browser && localStorage.removeItem('username')
    window.location.replace('/')
  }
}

export const setCookie = async (key, value) => {
  await Cookies.set(key, value)
}

export const removeCookie = async (key) => {
  if (browser) {
    await Cookies.remove(key)
  }
}


export const setUser = async (data) => {
  if(browser){
    await setCookie('user', data.user, {maxAge: 24 * 60 * 60 * 1000} )
  }
}