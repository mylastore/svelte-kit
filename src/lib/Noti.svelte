<script context='module'>
  import { writable } from 'svelte/store'

  export const notifications = (() => {
    const { update, subscribe } = writable([])
    const push = (message, messageType) => {
      messageType = messageType ? messageType : 'danger'
      update((arr) => [...arr, { message, messageType }])
    }
    const pop = () => update((arr) => (arr.shift(), arr))
    return {
      pop,
      push,
      subscribe
    }
  })()
</script>

<script>
  import { createEventDispatcher } from 'svelte'

  export let duration = 3000
  const dispatch = createEventDispatcher()
  let timeout
  notifications.subscribe(({ length }) => {
    if (timeout || !length) return
    dispatch('notify', $notifications[0])
    timeout = setTimeout(() => {
      timeout = false
      notifications.pop()
    }, duration)
  })
</script>

{#if $notifications[0]}
  <div class='notification'>
    <div class='alert alert-{$notifications[0].messageType}' role='alert'>
      <span>{$notifications[0].message}</span>
    </div>
  </div>
{/if}

<style>
  .notification {
    min-width: 400px;
    border-top-left-radius: .25rem;
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    z-index: 10;
  }

  @media only screen and (max-width: 600px) {
    .notification{
      right: 0;
      left: 0;
      margin: auto;
    }
  }
</style>