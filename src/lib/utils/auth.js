import {browser} from "$app/environment"

export const logout = async () => {
  if (browser) {
    await localStorage.removeItem('username')
    return window.location.replace('/')
  }
}
