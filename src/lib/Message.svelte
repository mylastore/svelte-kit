<script>
	import { createEventDispatcher } from 'svelte'

	export let message = 'We are having issues with the network!'
	export let messageType = 'warning'
	export let closeMessage = false
	const dispatch = createEventDispatcher()
</script>

<div class='alert mt-5 alert-{messageType} alert-dismissible'>
	{message}
	{#if closeMessage}
		<button type='button' class='close-button' on:click={() => dispatch('closeMessageEvent')}>
			<span aria-hidden='true'>&times;</span>
		</button>
	{/if}
</div>

<style>
  .notification {
    position: relative;
    padding: 15px 40px 15px 15px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
    height: 100%;
    border: none;
    background: orange;
    width: 30px;
  }

  .close-button:hover {
    cursor: pointer;
  }

  .close-button span {
    font-size: 20px;
  }
</style>
