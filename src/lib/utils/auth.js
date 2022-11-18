import Cookies from 'js-cookie'
import {browser} from "$app/environment"

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
  }
}

export const logout = async () => {
  if (typeof window != 'undefined') {
    await Cookies.remove('user', { path: '', expires: 30, secure: false, httpOnly: true }) // removed!
    browser && localStorage.removeItem('username')
    return window.location.replace('')
  }
}


export const setUser = async (data) => {
  if (browser) {
    return await Cookies.set('user', data, { path: '', expires: 30, secure: false, httpOnly: true})
  }
}