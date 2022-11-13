import { sveltekit } from '@sveltejs/kit/vite';
import fs from "fs";

const options = {
	key: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.key'),
	cert: fs.readFileSync('/home/admin/conf/web/ssl.sveltekit.mylastore.com.pem')
}

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		https: {
			key: options.key,
			cert: options.cert
		}
	},
	plugins: [sveltekit()]
}

export default config;