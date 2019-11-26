var ball = document.getElementById('ball');
var canvas = document.getElementById('canvas');

var ballHeight;
var canvasHeight = canvas.offsetHeight - 2;
var limit;

var ballRadius = 30;
var speed = 2;

ball.style.borderRadius = ballRadius + "px";
ball.style.width = ballRadius * 2 + "px";
ball.style.height = ballRadius * 2 + "px";
ball.style.backgroundColor = "#0167bb";
ball.style.position = "absolute";
ball.style.top = 0 + "px";
ball.style.left = "50%";
ball.style.marginLeft = -ballRadius + "px";

ballHeight = ball.offsetHeight;
limit = canvasHeight - ballHeight;

function animation() {
  var pos = 0;
  var dy = speed;
  setInterval(function () {
    pos = pos + dy;
    ball.style.top = pos + 'px';
    if (pos == limit) {
      dy = -speed;
    } else if (pos == 0) {
      dy = speed;
    }
  }, 5);
}

animation();