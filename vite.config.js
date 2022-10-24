import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

// TODO isDev need to be change to false for production
const isDev = false
let options = {}

if(isDev){
	options = {
		key: fs.readFileSync('/Users/oscarquinteros/localhost-key.pem'),
		cert: fs.readFileSync('/Users/oscarquinteros/localhost.pem'),
	}
}

const config = {
	server: {
		...(isDev ? {https: { key: options.key, cert: options.cert}} : null)
	},
	plugins: [sveltekit()]
}

export default config;

