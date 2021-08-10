<script>
	import generateNavigationOptions from './generateNavigationOptions'
	import { createEventDispatcher } from 'svelte'
	import { PREVIOUS_PAGE, NEXT_PAGE, ELLIPSIS } from './symbolTypes'

	const dispatch = createEventDispatcher()

	export let totalItems = 0
	export let pageSize = 1
	export let currentPage = 1
	export let limit = null
	export let showStepOptions = false
	export const setPage = (page) => {
		currentPage = page
	}

	$: options = generateNavigationOptions({
		totalItems,
		pageSize,
		currentPage,
		limit,
		showStepOptions
	})

	$: totalPages = Math.ceil(totalItems / pageSize)

	function handleOptionClick(option) {
		dispatch('setPage', { page: option.value })
	}
</script>

<nav aria-label="pagination">
	<ul class="pagination">
		{#each options as option}
			{#if option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}
				<slot name="prev">
					<li
						class="page-item"
						class:pageNumber={option.type === 'number'}
						class:disabled={(option.type === 'symbol' &&
							option.symbol === NEXT_PAGE &&
							currentPage >= totalPages) ||
							(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
						class:prev={option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}
						on:click|preventDefault={() => handleOptionClick(option)}
						disabled={(option.type === 'symbol' &&
							option.symbol === NEXT_PAGE &&
							currentPage >= totalPages) ||
							(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
					>
						<span class="page-link">Previous</span>
					</li>
				</slot>
			{/if}
			<li class="page-item" class:active={option.type === 'number' && option.value === currentPage}>
				{#if option.type === 'number'}
					<slot name="number" value={option.value}>
						<a
							href="/{option.value}"
							id={option.value}
							data-id={option.value}
							class="page-link"
							on:click|preventDefault={() => handleOptionClick(option)}
						>
							{option.value}
						</a>
					</slot>
				{:else if option.type === 'symbol' && option.symbol === ELLIPSIS}
					<slot name="ellipsis">
						<span class="ellipsis page-link">&hellip;</span>
					</slot>
				{/if}
			</li>
			{#if option.type === 'symbol' && option.symbol === NEXT_PAGE}
				<slot name="next">
					<li
						class="page-item"
						class:pageNumber={option.type === 'number'}
						class:disabled={(option.type === 'symbol' &&
							option.symbol === NEXT_PAGE &&
							currentPage >= totalPages) ||
							(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
						class:next={option.type === 'symbol' && option.symbol === NEXT_PAGE}
						disabled={(option.type === 'symbol' &&
							option.symbol === NEXT_PAGE &&
							currentPage >= totalPages) ||
							(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
						on:click|preventDefault={() => handleOptionClick(option)}
					>
						<span class="page-link">Next</span>
					</li>
				</slot>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	.page-link:hover {
		cursor: pointer;
	}
	.ellipsis {
		cursor: not-allowed;
		pointer-events: none;
	}
	.disabled {
		cursor: not-allowed;
	}

	.pagination {
		padding: 40px 0;
		width: 100%;
	}
</style>
