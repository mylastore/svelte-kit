<script context="module">
	export async function load({ session }) {
		if (!session.user || session.user.role !== 'admin' || !session.authenticated) {
			return {
				status: 302,
				redirect: '/'
			}
		}
		return {
			props: {
				token: session.token
			}
		}
	}
</script>

<script>
	import { api } from '$lib/utils/api'
	import timeAgo from '$lib/utils/timeAgo'
	import { paginate, PaginationNav } from '$lib/paginate'
	import Tabs from '$lib/Tabs.svelte'
	import { onDestroy } from 'svelte'
	import LoadingSpinner from '$lib/LoadingSpinner.svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import {notifications} from '$lib/Noti.svelte'

	export let token

	let isLoading = true
	let pageSize
	let totalItems
	let items = []
	let users = []
	let currentPage
	let urlPage
	let unsubscribe
	let pageNumber = $page.params.p

	async function getAllUsers(pageNumber) {
		try {
			const res = await api('GET', `admin/users/${pageNumber}`, {}, token)
			if (res.status >= 400) {
				isLoading = false
				throw new Error(res.message)
			}
			isLoading = false
			pageSize = res.perPage
			items = res.users
			totalItems = res.totalItems
			return (users = res.users)
		} catch (err) {
			isLoading = false
			notifications.push(err.message)
		}
	}

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		unsubscribe = page.subscribe(async ({ path }) => {
			urlPage = path.split('/').pop()
			currentPage = parseInt(urlPage)
			await getAllUsers(urlPage)
		})
	}

	$: paginatedItem = paginate({ items, pageSize, currentPage })

	function handleSetPage(e) {
		currentPage = e.detail.page
		goto(`/admin/users/${e.detail.page}`)
	}

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe()
		}
	})
</script>

<svelte:head>
	<title>Admin Panel</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Tabs />

<div class="container">
	{#if isLoading}
		<LoadingSpinner />
	{/if}
	<div class="card">
		<div class="card-body">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">
								<abbr title="Role">Role</abbr>
							</th>
							<th scope="col">
								<abbr title="User profile image">Image</abbr>
							</th>
							<th scope="col">
								<abbr title="Email">Email</abbr>
							</th>
							<th scope="col">
								<abbr title="User Name">Name</abbr>
							</th>
							<th scope="col">
								<abbr title="Gender">Gender</abbr>
							</th>
							<th scope="col">
								<abbr title="Website">Website</abbr>
							</th>
							<th scope="col">
								<abbr title="Location">Location</abbr>
							</th>
							<th scope="col">
								<abbr title="Customer Since">Member Since</abbr>
							</th>
							<th scope="col">
								<abbr title="Action Button">Action</abbr>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, i}
							<tr>
								<td scope="row">{user.role}</td>
								<td>
									{#if user.avatar}
										<img class="default-img" src={user.avatar} alt="User Image" />
									{:else}
										<img class="default-img" src="img/default-image.jpg" alt="User Image" />
									{/if}
								</td>
								<td>
									<span data-id={user._id}>{user.email}</span>
								</td>
								<td>{user.name}</td>
								<td>{user.gender}</td>
								<td>{user.website}</td>
								<td>{user.location}</td>
								<td>{timeAgo(user.createdAt)}</td>
								<td>
									<a class="link" href="/admin/user/{user._id}">
										<i class="svg-icon">
											<svg
												class="svg-inline--fa fa-link fa-w-16"
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="link"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												data-fa-i2svg=""
											>
												<path
													fill="currentColor"
													d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
												/>
											</svg>
										</i>
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<PaginationNav
				{totalItems}
				{pageSize}
				{currentPage}
				limit={1}
				showStepOptions={true}
				on:setPage={(e) => handleSetPage(e)}
			/>
		</div>
	</div>
</div>

<style>
	.svg-icon svg {
		width: 20px;
		height: 20px;
	}

	li.active a {
		color: #00818b;
	}

	.default-img {
		display: inline-block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		vertical-align: middle;
	}

	.link {
		background: #fdac17;
		padding: 12px;
		float: right;
		color: white;
	}

	.link:hover {
		opacity: 0.9;
	}
</style>
