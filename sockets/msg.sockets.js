const Message = require('../models/Message')

module.exports = function setup(socket, io) {
  socket.on('new-msg', async (msg) => {
    try {
      if (!msg || !msg.author || !msg.text) return
      if (msg.author.length > 20) return
      if (msg.text.length > 500) return

      const message = await Message.create({
        author: msg.author,
        text: msg.text,
      })

      msg.id = message._id.toString()
      io.sockets.emit('new-msg', msg)
    } catch {}
  })
}