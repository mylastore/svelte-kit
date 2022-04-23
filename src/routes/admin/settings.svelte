<script context="module">
  export async function load({session}) {
    if (!session.user || session.user.role !== 'admin') {
      return {
        status: 302,
        redirect: '/'
      }
    }
    return {
      props: {
        token: session.token,
        user: session.user
      }
    }
  }
</script>

<script>
  import {api} from '$lib/utils/api'
  import Tabs from '$lib/Tabs.svelte'
  import {notifications} from '$lib/Noti.svelte'
  import Loader from "$lib/loader/Loader.svelte"
  import {theme} from "$lib/themes/themeStore.js"

  export let token
  export let user

  let loaderStatus
  let newUser
  let userId

  (async () => {
    const res = await api('POST', `user/settings/${user.username}`, {}, token)
    loaderStatus = res.status ? res.status : 200
    if (res.status >= 400) {
      throw new Error(res.message)
    }
    userId = res._id
    return (newUser = res.settings.newUser)
  })().catch(err => {
    notifications.push(err.message)
  })

  async function updateSettings(e) {
    if (e.target.value === 'user') {
      newUser = !newUser
    }
    const userObject = {
      newUser: newUser,
      userId: userId
    }

    try {
      const res = await api('PATCH', 'admin/update-settings', userObject, token)
      if (res.status >= 400) {
        throw new Error(res.message)
      }
    } catch (err) {
      notifications.push(err.message)
    }
  }

</script>

<svelte:head>
  <title>Admin Settings</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

{#if !loaderStatus}
  <Loader/>
{:else }
  <Loader {loaderStatus}>
    <Tabs/>
    <div class="container">
      <div class="columns is-centered">
        <div class="card is-6">
          <header class="card-header">
            <h3>Email Notifications</h3>
            <small>Select notification settings below, all optional</small>
          </header>
          <div class="card-body">
            <form class="form">
              <div class="input-group {$theme === 'dark' ? 'input-group-dark' : ''}">
                <input
                    id="option1"
                    type="checkbox"
                    value={'user'}
                    on:change={updateSettings}
                    checked={newUser}
                />
                <label for="option1">New User</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Loader>
{/if}

<style>
  .input-group-dark {
    background-color: #2c2c2c !important;
    color: white !important;
  }

  .input-group.input-group-dark label {
    color: #999;
  }

  .no-margin label {
    margin-bottom: 0;
    line-height: 1;
  }
  .input-group {
    background-color: #fff;
    display: block;
    margin: 10px 0;
    position: relative;
  }
  .input-group label {
    padding: 12px 30px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3c454c;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;
  }

  .input-group label:before {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    content: '';
    background-color: #5562eb;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    z-index: -1;
  }

  .input-group label:after {
    width: 32px;
    height: 32px;
    content: '';
    border: 2px solid #d1d7dc;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
    background-repeat: no-repeat;
    background-position: 2px 3px;
    border-radius: 50%;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 200ms ease-in;
  }

  .input-group input:checked ~ label:before {
    background: #F7F7F7;
    transform: translate(-50%, -50%) scale3d(56, 56, 1);
    opacity: 1;
  }

  .input-group input:checked ~ label:after {
    background-color: #0f8892;
    border-color: #0f8892;
  }

  .input-group input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }

  .form {
    padding: 0 16px;
    max-width: 550px;
    margin: 50px auto;
    font-size: 18px;
    font-weight: 600;
    line-height: 36px;
  }

</style>
