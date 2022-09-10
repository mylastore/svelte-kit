<script>
	import Loading from '$lib/loader/LoadingPulse.svelte'
	import NetworkError from "$lib/NetworkError.svelte"
	import {loaderStatus} from "$lib/loader/loaderStatus"

</script>

<div class='top'>
	{#if !$loaderStatus}
		<Loading />
	{:else }
		{#if $loaderStatus >= 500}
			<div class='center'>
				<NetworkError />
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
