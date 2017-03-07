import http from 'http'
import { env, mongo, port, ip } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(api)
const server = http.createServer(app)

var db = mongoose.connection
db.on('connecting', function () {
  console.log('connecting')
})

db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error)
  mongoose.disconnect()
})
db.on('connected', function () {
  console.log('connected!')
})
db.once('open', function () {
  console.log('connection open')
})
db.on('reconnected', function () {
  console.log('reconnected')
})
db.on('disconnected', function () {
  console.log('disconnected')
  console.log('dbURI is: ' + mongo.uri)
  mongoose.connect(mongo.uri, { server: { auto_reconnect: true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } })
})
console.log('dbURI is: ' + mongo.uri)
mongoose.connect(mongo.uri, { server: { auto_reconnect: true } })

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
