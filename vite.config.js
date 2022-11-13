import { sveltekit } from '@sveltejs/kit/vite'

import { defineConfig } from 'vite'
import dns from 'dns'
import fs from "fs";

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
	server: {
		https: {
			key: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.key'),
			cert: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.pem')
		},
		host: 'localhost',
		port: '3001',
		strictPort: true
	},
	plugins: [sveltekit()]
})
