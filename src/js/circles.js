import paper from 'paper'
import notes from './notes'
import io from 'socket.io-client'

const socket = io()
let circles = []

const initializeSocketio = () => {
  socket.on('users', count => {
    window.document.getElementById('users-count').innerText = count
    window.document.getElementById('users-message').innerText =
      count === 1 ? 'player' : 'players'
  })

  socket.on('server-pressed-key', key => play(key))
}

const play = key => {
  const maxPoint = new paper.Point(
    paper.view.size.width,
    paper.view.size.height
  )
  const randomPoint = paper.Point.random()
  const point = maxPoint.multiply(randomPoint)

  const newCircle = new paper.Path.Circle(point, 500)
  newCircle.fillColor = notes[key].color
  notes[key].sound.play()

  circles.push(newCircle)
}

const initializePaper = () => {
  let canvas = window.document.getElementById('circle-canvas')
  paper.setup(canvas)
  paper.view.onFrame = () => {
    circles.forEach((circle, index, object) => {
      circle.fillColor.hue += 1
      circle.scale(0.9)

      if (circle.area < 1) {
        circle.remove()
        object.splice(index, 1)
      }
    })
  }
}

const removeWelcomeHandler = event => {
  let welcome = window.document.getElementById('welcome')

  if (notes[event.key]) {
    welcome.classList.add('hide')
    window.removeEventListener('keydown', removeWelcomeHandler)
  }
}

const attemptPlayNoteHandler = event => {
  if (notes[event.key]) {
    socket.emit('client-pressed-key', event.key)
    play(event.key)
  }
}

const addKeyEvents = () => {
  window.addEventListener('keydown', removeWelcomeHandler)
  window.addEventListener('keydown', attemptPlayNoteHandler)
}

export default () => {
  initializeSocketio()
  initializePaper()
  addKeyEvents()
}
