import * as cookie from 'cookie'

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '')

	request.locals.user = cookies.user
	request.locals.token = cookies.token
	request.locals.authenticated = !!cookies.token

	const response = await resolve(request)

	return {
		...response,
		headers: {
			...response.headers,
			'x-custom-header': 'potato'
		}
	}

}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return {
		authenticated: request.locals.authenticated,
		token: request.locals.token,
		user: request.locals.user ? JSON.parse(request.locals.user) : null
	}
}
