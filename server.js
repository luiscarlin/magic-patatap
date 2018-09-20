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

  socket.on('client-pressed-key', key => {
    socket.broadcast.emit('server-pressed-key', key)
  })
})

app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

http.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
