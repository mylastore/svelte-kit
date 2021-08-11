<script context='module'>
  export async function load({session}) {
    if (session.authenticated) {
      return {
        status: 302,
        redirect: '/'
      }
    }
    return {}
  }
</script>

<script>
  import Input from '$lib/Input.svelte'
  import {isEmail, isPassword} from '$lib/utils/validation'
  import {api} from '$lib/utils/api'
  import {authenticate} from '$lib/utils/auth'
  import {notifications} from '$lib/Noti.svelte'


  let email = ''
  let password = ''

  $: emailValid = isEmail(email)
  $: passwordValid = isPassword(password)
  $: formIsValid = emailValid && passwordValid

  async function submitForm(e) {
    e.preventDefault()
    const data = {
      email,
      password
    }
    try {
      const res = await api('POST', 'user/login', data)
      if (res.status >= 400) {
        throw Error(res.message)
      }
      await authenticate(res)
      email = ''
      password = ''
      return location.href = `/user/profile/${res.user.username}`
    } catch (err) {
      notifications.push(err.message)
    }
  }

  function handleKeyDown(e) {
    if (formIsValid) {
      if (e.keyCode === 13) {
        submitForm(e)
      }
    }
    return null
  }
</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Login Form</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

<main>
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
                validityMessage='Please enter a valid email.'
                value={email}
                className='is-large'
                on:input={(event) => (email = event.target.value)}
            />
            <Input
                id='password'
                label='Password'
                help="Password minimum length 8, must have one capital letter, 1 number, and one unique character."
                type='password'
                valid={passwordValid}
                validityMessage='Please enter a valid password.'
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
                aria-disabled={!formIsValid ? 'true' : 'false'}
                class='btn btn-primary btn-lg'
                on:click={submitForm}
                class:disabled={!formIsValid}
                disabled={!formIsValid}>
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
          <span>Test users</span>
        </div>
        <div class='card-body text-primary'>
          <p>Admin: me@me.com Password#1</p>
          <p>User: me2@me.com Password#1</p>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .login {
    width: 25rem;
  }

  .disabled {
    pointer-events: none;
  }

</style>
