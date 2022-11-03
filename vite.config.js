import { sveltekit } from '@sveltejs/kit/vite'

import { defineConfig } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
	// omit
	server: {
		host: 'localhost',
		port: '3001',
		strictPort: true,
		origin: 'http://localhost:3001'
	},
	plugins: [sveltekit()]
})

//export default config;

