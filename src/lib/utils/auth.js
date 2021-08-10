import Cookies from 'js-cookie'
import { browser } from '$app/env'

export const handleSession = async (res) => {
	if (res.status === 440) {
		await logout()
		if (browser) {
			setTimeout(() => {
				window.location.replace('/')
			}, 200)
		}
	}
}

export const logout = async () => {
	await removeCookie('token')
	await removeCookie('user')
	if (browser) {
		window.location.replace('/')
	}
}

export const setCookie = async (key, value) => {
	await Cookies.set(key, value, { expires: 7 })
}

export const removeCookie = async (key) => {
	if (browser) {
		await Cookies.remove(key)
	}
}

export const authenticate = async (data) => {
	if (browser) {
		await setCookie('token', data.token, { expires: 7, httpOnly: true, sameSite: 'lax' })
		await setCookie('user', data.user, {
			expires: 7,
			sameSite: 'lax',
			httpOnly: true
		})
	}
}
