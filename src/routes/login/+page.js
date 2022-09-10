import { redirect } from '@sveltejs/kit';

export async function load({parent}) {
  const session = await parent()
  if (session.user) {
    throw redirect(302, '/');
  }
}
