<script>
  import {api} from '$lib/utils/api'
  import {onMount} from 'svelte'
  import timeAgo from '$lib/utils/timeAgo'
  import {page} from '$app/stores'
  import Tabs from '$lib/Tabs.svelte'
  import {notifications} from '$lib/Noti.svelte'

  let userAbout = ''
  let userAvatar = ''
  let name = ''
  let userRole = ''
  let userWebsite = ''
  let userLocation = ''
  let userGender = ''
  let memberSince

  async function getUser() {
    try {
      const res = await api('GET', `admin/user/${$page.params.id}`)
      if (res) {
        userAvatar = res.avatar
        userRole = res.role
        name = res.name
        userWebsite = res.website
        userLocation = res.location
        userAbout = res.about
        userGender = res.gender
        memberSince = timeAgo(res.createdAt)
      }
    } catch (err) {
      notifications.push(err.message)
    }
  }

  onMount(() => {
    getUser()
  })

</script>

<svelte:head>
  <title>Admin User Profile</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>


<Tabs/>
<div class="container">
  <div class="mt-5 d-flex justify-content-center">
    <div class="card text-center" style="max-width: 30em; width: 30em;">
      <div class="card-header">
        <h1 class="card-header-title">User Profile</h1>
      </div>
      <div class="card-body">
        <img class="center avatar" src={userAvatar} width='100' height='100' alt="username image"/>
        <br/>
        <div class="profile mt-3">
          {#if name}<p><b>Name: </b> <span>{name}</span></p>{/if}
          {#if userGender}<p><b>Gender: </b> <span>{userGender}</span></p>{/if}
          {#if userLocation}<p><b>Location: </b> <span>{userLocation}</span></p>{/if}
          {#if userWebsite}<p><b>Website: </b> <span>{userWebsite}</span></p>{/if}
          {#if userAbout}<p><b>About: </b> <span>{userAbout}</span></p>{/if}
          <p><b>Role: </b> <span class="capitalize">{userRole}</span></p>
          <p><b>Member Since:</b> {memberSince}</p>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
  .avatar {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }

  .profile p {
    margin-bottom: 5px;
  }
</style>
