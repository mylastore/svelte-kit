<script>
  import Tabs from '$lib/Tabs.svelte'
  import {api} from '$lib/utils/api'
  import {notifications} from '$lib/Noti.svelte'
  import Loader from "$lib/loader/Loader.svelte"

  let userCount

  (async () => {
    try {
      const res = await api('GET', 'admin/stats', {})
      if (res) {
        return (userCount = Number(res))
      }
    } catch (err) {
      notifications.push(err.message)
    }
  })()
</script>

<svelte:head>
  <title>Admin Panel</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

<Loader>
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

