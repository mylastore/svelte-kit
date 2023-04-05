<script>
  import Input from '$lib/Input.svelte'
  import {api} from '$lib/utils/api.js'
  import {notifications} from '$lib/Noti.svelte'
  import {username} from '$lib/utils/username.js'
  import { isRequire } from '$lib/utils/validation.js'

  let email = ''
  let password = ''

  $: emailValid = isRequire(email)
  $: passwordValid = isRequire(password)
  $: formValid = emailValid && passwordValid

  async function submitForm(e) {
    e.preventDefault()
    const data = {
      email,
      password
    }
    try {
      const res = await api('POST', 'user/login', data)
      if (res) {
        $username = res.user.name
        email = ''
        password = ''
        return location.href = "/user/profile"
      }
    } catch (err) {
      return notifications.push(err.message)
    }
  }

  function handleKeyDown(e) {
    if (formValid && e.keyCode === 13) {
      submitForm(e)
    }
  }

</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Login Form</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

<div class='container'>

  <div class='d-flex justify-content-center mt-5'>
    <div class='card login'>
      <div class='card-body'>
        <h4><strong>Sing In</strong></h4>
        <p>We are glad you are here.</p>
        <div>
          <Input
              id='email'
              label='Email'
              valid={emailValid}
              validityMessage='Email is required.'
              value={email}
              className='is-large'
              on:input={(event) => (email = event.target.value)}
          />
          <Input
              id='password'
              label='Password'
              valid={passwordValid}
              validityMessage='Password is required.'
              type='password'
              value={password}
              className='is-large'
              on:input={(event) => (password = event.target.value)}
          />
        </div>
        <div>
          <a href='/forgot' class="text-black-50">Forgot Password?</a>
          <br/>
          <br/>
        </div>
        <div class="d-grid gap-2">
          <button
              class='btn btn-primary btn-lg'
              on:click={submitForm}
              class:disabled={!formValid}
              disabled={!formValid}>
            Sing In
          </button>
        </div>
      </div>
      <div class='card-footer text-center bg-white'>
        <a href='register' class='text-black-50'> Don't have an account? </a>
      </div>
    </div>
  </div>

  <div class='d-flex justify-content-center'>
    <div class='card mt-5 login'>
      <div class='card-header bg-light'>
        <span>Test Users</span>
      </div>
      <div class='card-body'>
        <p>Admin: me1@me.com password1</p>
        <p>User: me2@me.com password1</p>
      </div>
    </div>
  </div>
</div>


<style>
  .login {
    width: 25rem;
  }

  .disabled {
    pointer-events: none;
  }

</style>
