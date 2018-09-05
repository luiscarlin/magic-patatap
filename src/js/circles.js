var circles = [];

function onKeyDown(event) {
    if(keyData[event.key]){

    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    var newCircle = new Path.Circle(point, 500);
    newCircle.fillColor = keyData[event.key].color;
    keyData[event.key].sound.play();
    circles.push(newCircle);
    }
}

function onFrame(event){
    for(var i = 0; i < circles.length; i++){
        circles[i].fillColor.hue += 1;
        circles[i].scale(.9);
        if(circles[i].area < 1){
        circles[i].remove();
        circles.splice(i, 1);
        console.log(circles);
        }
    }
}


