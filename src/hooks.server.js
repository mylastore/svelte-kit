import * as cookie from 'cookie'

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  event.locals.token = cookies.token ? cookies.token : ''
  event.locals.user = cookies.user ? JSON.parse(cookies.user) : null
  return await resolve(event)
}
