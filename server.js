require('dotenv').config()
const https = require('https')
const fs = require('fs')
const Koa = require('koa')
const build = require('./build/handler.js')

const server = new Koa()
const options = {
  key: fs.readFileSync(process.env.CUSTOMP_LIVE_KEY),
  cert: fs.readFileSync(process.env.CUSTOMP_LIVE_CERT)
}

server.use(build.handler)

try{
  https.createServer(options, server.callback()).listen('3001')
}catch (err){
  console.error('Failed to start HTTPS server\n', err, (err && err.stack));
}