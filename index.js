const express = require('express')
const setupSockets = require('./core/setup-sockets')
const { connectMongoose } = require('./core/db')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cors())
app.use(express.json())
app.use('/', require('./routes/main.routes'))

void (async () => {
  const uri = process.env.MONGO_URI
  await connectMongoose(uri)

  await setupSockets(io)

  server.listen(port, () => {
    console.log('Started...')
  })
})()
