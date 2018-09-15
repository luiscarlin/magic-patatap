import paper from 'paper'
import notes from './notes'
import io from 'socket.io-client'

const socket = io()
let circles = []

const initializeSocketio = () => {
  socket.on('users', count => {
    console.log('number of users ', count)
  })
}

const initializePaper = () => {
  let canvas = window.document.getElementById('circleCanvas')
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

const removeWelcomeHandler = () => {
  console.log('hello')
  let welcome = window.document.getElementById('welcome')
  welcome.classList.add('hide')
  window.removeEventListener('keydown', removeWelcomeHandler)
}

const attemptPlayNoteHandler = (event) => {
  if (notes[event.key]) {
    const maxPoint = new paper.Point(
      paper.view.size.width,
      paper.view.size.height
    )
    const randomPoint = paper.Point.random()
    const point = maxPoint.multiply(randomPoint)

    const newCircle = new paper.Path.Circle(point, 500)
    newCircle.fillColor = notes[event.key].color
    notes[event.key].sound.play()

    circles.push(newCircle)
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
