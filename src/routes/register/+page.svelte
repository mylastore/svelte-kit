<script>
  import Input from '$lib/Input.svelte'
  import { api } from '$lib/utils/api'
  import { notifications } from '$lib/Noti.svelte'
  import {goto} from "$app/navigation";
  import { isRequire } from '$lib/utils/validation.js'

  let name = ''
  let email = ''
  let password = ''
  let passwordConfirmation = ''

  $: emailValid = isRequire(email)
  $: passwordValid = isRequire(password)
  $: nameValid = isRequire(name)
  $: passwordConfirmValid = password === passwordConfirmation
  //$: formIsValid = nameValid && emailValid && passwordValid && passwordConfirmValid
  $: formIsValid = true

  async function submitForm () {
    try {
      const res = await api('POST', 'user/account-activation', { name, email, password, passwordConfirmation })
      if(res){
        email = ''
        password = ''
        name = ''
        notifications.push(res.message, 'success')
        return goto('login')
      }
    } catch (err) {
      return notifications.push(err.message)
    }
  }

  function handleKeyDown (event) {
    if (formIsValid && event.keyCode === 13) {
      submitForm()
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Register Form</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

<div class="container">
  <div class="col">
    <div class="d-flex justify-content-center d-block">
      <div class="card mt-5 register">
        <div class="card-body">
          <div>
            <h4><strong>Sing Up</strong></h4>
            <p>We only offer our services in the <b>United States.</b></p>
          </div>
          <form>
            <Input
              id="name"
              label="Name"
              help="Please, enter your complete legal name if you will be performing transactions."
              valid={name}
              validityMessage="Name is required"
              value={name}
              className="is-large"
              on:input={(event) => (name = event.target.value)}
            />
            <Input
              id="email"
              label="Email"
              valid={emailValid}
              validityMessage="Email is required."
              value={email}
              className="is-large"
              on:input={(event) => (email = event.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              valid={passwordValid}
              validityMessage="Password is required."
              value={password}
              className="is-large"
              on:input={(event) => (password = event.target.value)}
            />
            <Input
              id="passwordConfirmation"
              label="Confirm Password"
              help="Password minimum length 8 and must have one capital letter."
              type="password"
              valid={passwordConfirmValid}
              validityMessage="Passwords did not match"
              value={passwordConfirmation}
              className="is-large"
              on:input={(event) => (passwordConfirmation = event.target.value)}
            />
            <div class="d-grid gap-2">
              <button
                class="btn btn-primary btn-lg mt-2"
                on:click|preventDefault={submitForm}
                class:disabled={!formIsValid}
                disabled={!formIsValid}
              >
                Sing Up
              </button>
              <small>By signing up you accept our Privacy Policy.</small>
            </div>
          </form>
        </div>
        <footer class="card-footer text-center pt-3 pb-3 bg-white">
          <a href="/login" class="text-black-50">Already have an account?</a>
        </footer>
      </div>
    </div>
  </div>
</div>

<style>
    .register {
        width: 25rem;
    }
    .disabled {
      pointer-events: none;
    }
</style>
