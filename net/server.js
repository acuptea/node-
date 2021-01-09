const net = require('net')

const server = net.createServer(socket=> {
  socket.on('data',function(buffer) {
    // const lessonId = buffer.
  })
})

server.listen(4000)