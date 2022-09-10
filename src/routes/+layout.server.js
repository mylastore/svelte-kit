export const load = ({locals}) => {
  return {
    token: locals.token,
    user: locals.user ? JSON.parse(locals.user) : null,
  }
}
