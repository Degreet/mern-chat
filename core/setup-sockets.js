module.exports = function setupSockets(io) {
  io.sockets.on('connection', async (socket) => {
    require('../sockets/msg.sockets')(socket, io)
  })
}