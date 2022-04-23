<script context='module'>
  export async function load({session}) {
    if (!session.user || session.user.role !== 'admin') {
      return {
        status: 302,
        redirect: '/'
      }
    }
    return {
      props: {
        token: session.token
      }
    }
  }
</script>

<script>
  import Tabs from '$lib/Tabs.svelte'
  import {api} from '$lib/utils/api'
  import {notifications} from '$lib/Noti.svelte'
  import Loader from "$lib/loader/Loader.svelte"

  export let token
  let loaderStatus
  let userCount

  (async () => {
    try {
      const res = await api('GET', 'admin/stats', {}, token)
      loaderStatus = res.status ? res.status : 200
      if (res.status >= 400) {
        throw new Error(res.message)
      }
      return (userCount = Number(res))
    } catch (err) {
      notifications.push(err.message)
    }
  })()
</script>

<svelte:head>
  <title>Admin Panel</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

{#if !loaderStatus}
  <Loader/>
{:else }
  <Loader {loaderStatus}>
    <Tabs/>
    <div class='container'>
      <div class='container'>
        <div class='row'>
          <div class='col-sm'>
            <div class='card'>
              <div class='card-body'>
                <div class='text-center'>
                  <h3>{userCount}</h3>
                  <label>Users</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Loader>
{/if}