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
     var c = document.getElementById('myCanvas');
     var ctx = c.getContext("2d");
     ctx.beginPath();
     ctx.arc(x, y, 5, 0, 2 * Math.PI);
     ctx.fillStyle = '#037adb';
     ctx.fill();
}

points.forEach(function (value) {
     drawCircle(value.x, value.y);
})