import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'
import {variables} from "$lib/utils/variables"

const isDev = variables.env === 'development'
let options = {}
let config

if(isDev){
	options = {
		key: fs.readFileSync('/Users/oscarquinteros/localhost-key.pem'),
		cert: fs.readFileSync('/Users/oscarquinteros/localhost.pem'),
	}
	config = {
		server: {
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
		plugins: [sveltekit()]
	}
}

export default config
