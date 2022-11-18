import { sveltekit } from '@sveltejs/kit/vite'

import { defineConfig } from 'vite'
import dns from 'dns'
import fs from "fs";

dns.setDefaultResultOrder('verbatim')
const isDev = true

const key = isDev ? fs.readFileSync('/Users/oscarquinteros/localhost-key.pem') : fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.key')
const pem = isDev ? fs.readFileSync('/Users/oscarquinteros/localhost.pem') : fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.pem')

export default defineConfig({
	server: {
		https: {
			key: key,
			cert: pem,
		},
		host: 'localhost',
		port: '3001',
		strictPort: true
	},
	plugins: [sveltekit()]
})
