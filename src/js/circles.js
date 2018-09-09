import paper from 'paper'
import notes from './notes'

let circles = []

const initializePaper = () => {
  let canvas = window.document.getElementById('circleCanvas')
  paper.setup(canvas)
  paper.view.onFrame = onFrame
}

const onFrame = () => {
  circles.forEach((circle, index, object) => {
    circle.fillColor.hue += 1
    circle.scale(.9)

    if (circle.area < 1) {
      circle.remove()
      object.splice(index, 1)
    }
  })
}

const addKeyEvents = () => {
  window.addEventListener('keydown', event => {
    if (notes[event.key]) {
      const maxPoint = new paper.Point(paper.view.size.width, paper.view.size.height)
      const randomPoint = paper.Point.random()
      const point = maxPoint.multiply(randomPoint)

      const newCircle = new paper.Path.Circle(point, 500)
      newCircle.fillColor = notes[event.key].color
      notes[event.key].sound.play()

      circles.push(newCircle)
    }
  })
}

export default () => {
  initializePaper()
  addKeyEvents()
}
