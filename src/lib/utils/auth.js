import {browser} from "$app/environment"

export const handleSession = async () => {
  return await logout()
}

export const logout = async () => {
  if (browser) {
    await localStorage.removeItem('username')
    return window.location.replace('/')
  }
}
