import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

const isDev = false
let options = {}
let config = {}

if(isDev){
	options = {
		key: fs.readFileSync('/Users/oscarquinteros/localhost-key.pem'),
		cert: fs.readFileSync('/Users/oscarquinteros/localhost.pem'),
	}
	config = {
		server: {
			host: 'localhost',
			port: '3001',
			https: {
				key: options.key,
				cert: options.cert
			}
		},
		plugins: [sveltekit()]
	}
} else {
	options = {
		key: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.key'),
		cert: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.pem'),
	}
	/** @type {import('vite').UserConfig} */
	config = {
		server: {
			host: 'localhost',
			port: '3001',
			https: {
				key: options.key,
				cert: options.cert
			},
		},
		plugins: [sveltekit()]
	}
}

export default config;
