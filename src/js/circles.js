import paper from 'paper'
import notes from './notes'

var circles = [];

const addKeyEvents = (notes) => {
  window.addEventListener('keydown', event => {
    console.log("pressed key", event.key)
    // console.log(paper.view.size.width)
    if (notes[event.key]) {
      // var maxPoint = new paper.Point(10, 10);
      // var randomPoint = paper.Point.random();
      // var point = maxPoint * randomPoint;
      // var newCircle = new paper.Path.Circle(point, 500);
      // newCircle.fillColor = notes[event.key].color;
      notes[event.key].sound.play();
      // circles.push(newCircle);
    }
  })
}

// const onFrame = (event) => {
//   for (var i = 0; i < circles.length; i++) {
//     circles[i].fillColor.hue += 1;
//     circles[i].scale(.9);
//     if (circles[i].area < 1) {
//       circles[i].remove();
//       circles.splice(i, 1);
//       console.log(circles);
//     }
//   }
// }

export default () => {
  addKeyEvents(notes)
}
