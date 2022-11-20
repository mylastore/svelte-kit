
import dotenv from 'dotenv'
dotenv.config()
import https from "https"
import fs from "fs"
import Koa from 'koa'
import {handler} from './build/handlers.js'

const server = new Koa()
const options = {
  key: fs.readFileSync(process.env.CUSTOMP_LIVE_KEY),
  cert: fs.readFileSync(process.env.CUSTOMP_LIVE_CERT)
}

server.use(handler)

try{
  https.createServer(options, server.callback()).listen('3001')
}catch (err){
  console.error('Failed to start HTTPS server\n', err, (err && err.stack));
}