import Cookies from 'js-cookie'
import {browser} from "$app/environment"

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
  }
}

export const logout = async () => {
  if (typeof window != 'undefined') {
    Cookies.remove('user', { path: '/', expires: 30, domain: 'sveltekit.mylastore.com' }) // removed!
    browser && localStorage.removeItem('username')
    window.location.replace('/')
  }
}


export const setUser = async (data) => {
  if (browser) {
    await Cookies.set('user', data, { path: '/', expires: 30, domain: 'sveltekit.mylastore.com'})
  }
}