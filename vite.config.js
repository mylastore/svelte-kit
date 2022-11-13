import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

const isDev = false
let config = {}

if(isDev){
	const options = {
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
	const options = {
		key: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.key'),
		cert: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.pem'),
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
}

export default config;
