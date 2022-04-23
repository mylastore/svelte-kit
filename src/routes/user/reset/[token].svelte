<script>
  import {api} from '$lib/utils/api'
  import Input from '$lib/Input.svelte'
  import {isPassword} from '$lib/utils/validation'
  import {page} from '$app/stores'
  import {goto} from '$app/navigation'
  import {notifications} from '$lib/Noti.svelte'

  let password = ''
  let passwordConfirmation = ''

  $: passwordValid = isPassword(password)
  $: passwordConfirmValid = password === passwordConfirmation
  $: passwordFormIsValid = passwordValid && passwordConfirmValid

  async function submitForm() {
    const resetForm = document.getElementById('password-reset-form')
    const userData = {
      password: password,
      passwordResetToken: $page.params.token
    }
    try {
      const res = await api('POST', 'user/reset-password', userData)
      if (res.status >= 400) {
        throw new Error(res.message)
      }
      notifications.push('Password updated successfully', 'success')
      resetForm.reset()
      return goto('/login')
    } catch (err) {
      notifications.push(err.message)
    }
  }
</script>

<svelte:head>
    <title>Password Reset</title>
    <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

<main class="container">
    <div class="d-flex justify-content-center mt-5">
        <div class="card" style="max-width: 50em;">
            <div class="card-body">
                <form id="password-reset-form">
                    <h3>NEW PASSWORD</h3>
                    <Input
                            id="password"
                            label="Password"
                            type="password"
                            valid={passwordValid}
                            validityMessage="Please enter a valid password."
                            value={password}
                            on:input={(event) => (password = event.target.value)}
                    />
                    <Input
                            id="passwordConfirmation"
                            label="Password Confirmation"
                            help="Password minimum length 8, must have one capital letter, 1 number, and one unique character."
                            type="password"
                            valid={passwordConfirmValid}
                            validityMessage="Passwords did not match"
                            value={passwordConfirmation}
                            on:input={(event) => (passwordConfirmation = event.target.value)}
                    />
                    <button
                            class="btn btn-primary float-end"
                            on:click|preventDefault={submitForm}
                            disabled={!passwordFormIsValid}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>
