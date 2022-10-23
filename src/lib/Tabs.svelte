<script>
	import { page } from '$app/stores'
</script>

<nav class="nav justify-content-center mt-3 mb-3">
	<a class="nav-link" class:active={$page.url.pathname === '/admin'} aria-current="page" href="/admin"
		>Panel</a
	>
	<a
		class="nav-link"
		class:active={$page.url.pathname === `/admin/users/${$page.params.p !== undefined ? $page.params.p.toString() : ''}`}
		href="/admin/users/1">Users</a
	>
</nav>

<style>
	a.active {
		color: gray;
		text-decoration: underline;
	}
</style>
