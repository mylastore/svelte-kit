import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

const options = {
	key: fs.readFileSync('/Users/oscarquinteros/localhost-key.pem'),
	cert: fs.readFileSync('/Users/oscarquinteros/localhost.pem'),
};

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		https: {
			key: options.key,
			cert: options.cert
		}
	},
	plugins: [sveltekit()]
};

export default config;
