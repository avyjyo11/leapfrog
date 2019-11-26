var points = [{
    x: 10,
    y: 20
  },
  {
    x: 40,
    y: 40
  },
  {
    x: 60,
    y: 20
  },
  {
    x: 80,
    y: 30
  },
  {
    x: 100,
    y: 50
  },
  {
    x: 120,
    y: 40
  },
];

function drawCircle(x, y) {
  var canvas = document.getElementById('myCanvas');
  var circle = document.createElement('div');

  circle.style.left = x + "px";
  circle.style.top = y + "px";
  circle.style.borderRadius = "50%";
  circle.style.width = "10px";
  circle.style.height = "10px";
  circle.style.backgroundColor = "#0167bb";
  circle.style.position = "absolute";
  canvas.appendChild(circle);

}

points.forEach(function (value) {
  drawCircle(value.x, value.y);
})