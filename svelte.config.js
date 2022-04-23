/** @type {import('@sveltejs/kit').Config} */
import node from '@sveltejs/adapter-node'

export default {
	// options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
	compilerOptions: null,

	// an array of file extensions that should be treated as Svelte components
	extensions: ['.svelte'],
	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: null,
	kit: {
		adapter: node(),
		amp: false,
		appDir: '_app',
		files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		floc: false,
		browser: {
			router: true,
			hydrate: true
		},
		paths: {
			assets: '',
			base: ''
		},
		prerender: {
			crawl: true,
			enabled: true,
			onError: 'fail',
			entries: ['*']
		},
		trailingSlash: 'never',
		vite: () => ({})
	}
}
