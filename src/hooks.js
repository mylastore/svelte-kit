import * as cookie from 'cookie'

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  event.locals.user = cookies.user
  event.locals.token = cookies.token
  return await resolve(event)
}
