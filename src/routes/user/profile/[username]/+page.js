import {redirect} from '@sveltejs/kit'

export async function load({parent}) {
  const session = await parent()
  if (!session.token) {
    throw redirect(302, '/')
  }
}
