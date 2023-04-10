import {sveltekit} from '@sveltejs/kit/vite'
import fs from 'fs'

const isDev = true

let key = isDev && fs.readFileSync('certs/localhost.key')
let cert = isDev && fs.readFileSync('certs/localhost.crt')

const conf = isDev ?
  {
    server: {
      https: {
        key,
        cert,
      },
      host: 'localhost',
      port: '3001',
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