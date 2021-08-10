<script>
  import Input from '$lib/Input.svelte'
  import {isRequire, isEmail} from '$lib/utils/validation'
  import {api} from '$lib/utils/api'
  import {notifications} from '$lib/Noti.svelte'

  let name = ''
  let email = ''
  let phone = ''
  let message = ''

  $: nameValid = isRequire(name)
  $: messageValid = isRequire(message)
  $: emailValid = isEmail(email)
  $: formIsValid = nameValid && emailValid && messageValid

  async function submitForm() {
    try {
      const obj = {
        name: name,
        email: email,
        message: message,
        phone: phone
      }
      const res = await api('POST', 'support', obj)
      if (res.status >= 400) {
        throw new Error(res.message)
      }
      notifications.push('Form was sent!', 'success')
      return document.getElementById('my-form').reset()
    } catch (err) {
      notifications.push(err.message)
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      submitForm()
    }
  }

</script>

<svelte:window on:keydown={handleKeyDown}/>

<svelte:head>
  <title>Support Form</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

<div class='container'>
  <div class='d-flex mt-5 justify-content-center'>
    <div class='card support'>
      <div class='card-body'>
        <h1>How can we help?</h1>
        <form id='my-form'>
          <Input
              id='name'
              label='Name *'
              valid={nameValid}
              validityMessage='Please enter a valid name.'
              value={name}
              className='is-large'
              on:input={(e) => (name = e.target.value)}
          />
          <Input
              id='email'
              label='Email *'
              valid={emailValid}
              validityMessage='Please enter a valid email.'
              value={email}
              className='is-large'
              on:input={(e) => (email = e.target.value)}
          />
          <Input
              id='phone'
              label='Phone Number (optional)'
              type='text'
              className='is-large'
              value={phone}
              on:input={(e) => (phone = e.target.value)}
          />

          <Input
              id='content'
              label='Message *'
              help="Generally, we are able to respond to inquiries within same business day."
              controlType='textarea'
              valid={messageValid}
              rows=5
              validityMessage='Message is required'
              className='is-large'
              bind:value={message}
          />
          <div class="d-grid gap-2">
            <button
                class='btn btn-primary btn-lg'
                on:click|preventDefault={submitForm}
                disabled={!formIsValid}
            >
              Send Form
            </button>
          </div>
          <div class="text-dark">
            <small>Fields with *asterisk are required.</small>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .support {
    max-width: 25rem;
  }
</style>