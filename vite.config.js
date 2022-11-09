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
	/** @type {import('vite').UserConfig} */
	config = {
		server: {
			host: 'localhost',
			port: '3001'
		},
		plugins: [sveltekit()]
	}
}

export default config;
