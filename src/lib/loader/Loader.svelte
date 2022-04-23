<script>
	import Message from '$lib/Message.svelte'
	import Loading from '$lib/loader/LoadingPulse.svelte'

	export let loaderStatus

	let networkError = false
	if (loaderStatus >= 500) {
		networkError = true
	}

</script>

<div class='top'>
	{#if !loaderStatus}
		<Loading />
	{:else }
		{#if networkError}
			<div class='center'>
				<Message />
			</div>
		{:else}
			<slot />
		{/if}
	{/if}
</div>

<style>
  .center {
    max-width: 500px;
    margin: 0 auto;
  }

</style>