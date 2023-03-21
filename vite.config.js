import {sveltekit} from '@sveltejs/kit/vite'
import fs from "fs"

let key
let pem

const isDev = true

key = isDev && fs.readFileSync('/Users/oscarquinteros/.localhost-ssl/localhost.key')
pem = isDev && fs.readFileSync('/Users/oscarquinteros/.localhost-ssl/localhost.crt')

const conf = isDev ?
  {
    server: {
      https: {
        key: key,
        cert: pem,
      },
      host: 'localhost',
      port: '3007',
      strictPort: true
    },
    plugins: [sveltekit()]
  }
  :
  {
    server: {
      host: 'localhost',
      port: '3007',
      strictPort: true
    },
    plugins: [sveltekit()]
  }

export default conf
