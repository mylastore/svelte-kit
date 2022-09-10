import Cookies from 'js-cookie'

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
  }
}

export const logout = async () => {
  await removeCookie('token')
  await removeCookie('user')
  if (typeof window != 'undefined') {
    window.location.replace('/')
  }
}

export const setCookie = async (key, value) => {
  await Cookies.set(key, value, {expires: 7})
}

export const removeCookie = async (key) => {
  if (typeof window != 'undefined') {
    await Cookies.remove(key)
  }
}

export const authenticate = async (data) => {
  if (typeof window !== 'undefined') {
    await setCookie('token', data.token, {expires: 7, httpOnly: true, sameSite: 'lax'})
    await setCookie('user', data.user, {expires: 7, httpOnly: true, sameSite: 'lax'})
    return true
  }

}
