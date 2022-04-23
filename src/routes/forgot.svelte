<script>
  import {isEmail} from '$lib/utils/validation'
  import Input from '$lib/Input.svelte'
  import {api} from '$lib/utils/api'
  import {notifications} from '$lib/Noti.svelte'

  let email = ''

  $: emailValid = isEmail(email)
  $: formIsValid = emailValid

  async function submitForm() {
    const forgotForm = document.getElementById('forgot-form')
    try {
      const res = await api('POST', 'user/forgot', {email})
      if (res && res.status >= 400) {
        throw new Error(res.message)
      }
      notifications.push(res.message, 'success')
      return forgotForm.reset()
    } catch (err) {
      notifications.push(err.message)
    }
  }

</script>

<svelte:head>
  <title>Forgot Password</title>
  <meta name="robots" content="noindex, nofollow"/>
</svelte:head>

<main class="container mt-5">
  <div class="d-flex justify-content-center">
    <form class="card forgot" id="forgot-form">
      <div class="card-body">
        <h2>Password Reset</h2>
        <Input
            id="email"
            label="Email"
            help="Enter your email address below and we'll send you password reset instructions."
            valid={emailValid}
            validityMessage="Please enter a valid email."
            value={email}
            className="is-large"
            on:input={(event) => (email = event.target.value)}
        />
        <div class="d-grid gap-2">
          <button
              class="btn btn-danger btn-lg"
              on:click|preventDefault={submitForm}
              disabled={!formIsValid}
          >
            Reset Password
          </button>
          <a class="btn btn-outline-secondary btn-lg" href="/login" role="button">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</main>

<style>
  .forgot {
    max-width: 25rem;
  }
</style>