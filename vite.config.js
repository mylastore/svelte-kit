import { defineConfig } from "vite"
import {sveltekit} from '@sveltejs/kit/vite'
import fs from "fs"

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    const key = fs.readFileSync('secrets/certs/localhost.key')
    const pem = fs.readFileSync('secrets/certs/localhost.crt')

    return {
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
  } else {
    return {
      server: {
        host: 'localhost',
        port: '3007',
        strictPort: true
      },
      plugins: [sveltekit()]
    }
  }
})
