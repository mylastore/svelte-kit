<script>
  import jwt_decode from 'jwt-decode'
  import {api} from '$lib/utils/api'
  import {page} from '$app/stores'
  import {goto} from '$app/navigation'
  import {notifications} from '$lib/Noti.svelte'

  let {token} = $page.params
  let email = ''

  if (token) {
    const decoded = jwt_decode(token)
    email = decoded.email
  }

  const activateAccount = async () => {
    try {
      const res = await api('POST', 'user/register', {token})
      if (res) {
        notifications.push(res.message, 'success')
        await goto('/login')
      }
    } catch (err) {
      notifications.push(err.message)
    }
  }
</script>

<svelte:head>
  <title>Account Activation</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

<div class="container">
  <div class="d-flex mt-5 justify-content-center d-block">
    <div class="card" style="width: 50em; max-width: 50em">
      <div class="card-body text-center">
        <h5>Activate account for {email}</h5>
        <hr/>
        <button class="btn btn-primary btn-lg" on:click={activateAccount}>Activate Account
        </button
        >
      </div>
    </div>
  </div>
</div>
