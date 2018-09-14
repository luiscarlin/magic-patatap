const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const DIST_DIR = path.join(__dirname, 'dist')

const users = { total: 0 }

io.on('connection', socket => {
  users.total += 1

  socket.on('disconnect', () => {
    users.total--
    io.emit('users', users.total)
  })

  io.emit('users', users.total)

//   socket.on('played a key', key => {
//     socket.broadcast.emit('played', key)
//   })

//   // User wants to change rooms
//   socket.on('room', room => {
//     if (socket.room) {
//       socket.leave(socket.room)
//       if (!users[socket.room]) {
//         users[socket.room] = 0
//       }
//       users[socket.room]--
//       io.to(socket.room).emit('roomusers', users[socket.room])
//     }
//     socket.room = room
//     socket.join(room)

//     if (!users[socket.room]) {
//       users[socket.room] = 0
//     }
//     if (users[socket.room] < users.total) {
//       users[socket.room]++
//     }
//     io.to(socket.room).emit('roomusers', users[socket.room])
//   })
})

app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

http.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
