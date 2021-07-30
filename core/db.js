const mongoose = require('mongoose')

async function connectMongoose(uri) {
  const connect = mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
  return connect
}

module.exports = { connectMongoose }