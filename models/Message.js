const mongoose = require('mongoose')

const model = new mongoose.Schema({
  author: String,
  text: String,
})

module.exports = mongoose.model('Message', model)