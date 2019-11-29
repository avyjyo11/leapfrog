//new BallCollision(700, 500, 11, 8, 4, 1, 30, 16).start();

/*width, height of container*/
/*maxSpeed, minSpeed, maxRadius, minRadius of balls*/
/*transitionTime of interval*/

function BallCollision(width, height, ballCount, transitionTime, maxSpeed, minSpeed, maxRadius, minRadius) {
  this.width = width || 400;
  this.height = height || 400;
  this.ballCount = ballCount || 11;
  this.balls = [];
  this.container;
  this.TRANSITION = transitionTime || 10;
  this.MAXSPEED = maxSpeed || 4;
  this.MINSPEED = minSpeed || 1;
  this.MAXRADIUS = maxRadius || 30;
  this.MINRADIUS = minRadius || 16;
  var that = this;

  this.start = function () {
    this.createContainer();
    this.createBalls();
    setInterval(moveBalls.bind(this), this.TRANSITION);
  }

  this.createContainer = function () {
    var main = document.getElementsByTagName('main')[0];
    var ballSection = document.createElement('div');
    ballSection.classList.add('ball-section', 'clearfix');
    ballSection.style.width = this.width + 'px';
    main.appendChild(ballSection);
    var ballContainer = document.createElement('div');
    ballContainer.classList.add('container');
    ballContainer.style.width = this.width + 'px';
    ballContainer.style.height = this.height + 'px';
    ballSection.appendChild(ballContainer);
    this.container = ballContainer;
  }

  this.createBalls = function () {
    for (var i = 0; i < this.ballCount; i++) {
      var ball = new Ball(this.container, this.width, this.height, this.balls, this.MAXSPEED, this.MINSPEED, this.MAXRADIUS, this.MINRADIUS);
      ball.init();
      this.balls.push(ball);
    }
  }

  function moveBalls() {
    for (var i = 0; i < this.ballCount; i++) {
      that.balls[i].wallCollisionCheck();
      that.balls[i].ballCollisionCheck(that.balls);
      that.balls[i].move();
    }
  }


}

function Ball(container, width, height, allBalls, maxSpeed, minSpeed, maxRadius, minRadius) {
  this.x;
  this.y;
  this.allBalls = allBalls;
  this.centerX;
  this.centerY;
  this.element;
  this.containerWidth = width;
  this.containerHeight = height;
  this.radius = getRandom(minRadius, maxRadius);
  this.speed = getRandom(minSpeed, maxSpeed);
  this.angle = getRandom(0, 360);
  this.container = container;
  var that = this;

  this.init = function () {
    this.setPos();
    this.setBallDiv();
    this.draw();
  }

  this.setBallDiv = function () {
    var ball = document.createElement('div');
    ball.style.height = (this.radius * 2) + 'px';
    ball.style.width = (this.radius * 2) + 'px';
    ball.style.borderRadius = this.radius + 'px';
    ball.style.backgroundColor = randomColor();
    ball.classList.add('ball');
    that.container.appendChild(ball);
    this.element = ball;
  }

  this.setPos = function () {
    this.x = getRandom(0, (width - this.radius * 2));
    this.y = getRandom(0, (height - this.radius * 2));
    this.calculateCenters();
    for (var i = 0; i < that.allBalls.length; i++) {
      var dx = this.centerX - that.allBalls[i].centerX;
      var dy = this.centerY - that.allBalls[i].centerY;
      var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));

      if (distance <= this.radius + that.allBalls[i].radius) {
        this.setPos();
      }
    }
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  this.move = function () {
    this.x += (this.speed * Math.cos(radianConvert(this.angle)));
    this.y += (this.speed * Math.sin(radianConvert(this.angle)));
    this.calculateCenters();
    this.draw();
  }

  this.wallCollisionCheck = function () {
    if (this.x <= 0 || this.x >= (this.containerWidth - this.radius * 2) || this.y <= 0 || this.y >= (this.containerHeight - this.radius * 2)) {
      this.angle = (this.angle + 90) % 360;
    }
  }

  this.calculateCenters = function () {
    this.centerX = this.x + this.radius;
    this.centerY = this.y + this.radius;
  }

  this.ballCollisionCheck = function (allBalls) {
    for (var i = 0; i < allBalls.length; i++) {
      if (this != allBalls[i]) {

        var ball2 = allBalls[i];
        /*circle collision-algorithm*/
        var dx = this.centerX - ball2.centerX;
        var dy = this.centerY - ball2.centerY;
        var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));

        if (distance - this.radius - ball2.radius <= 0.0000001) {
          this.angle = (this.angle + 90) % 360;
          ball2.angle = (ball2.angle + 90) % 360;
        }
        /* box-collision-algorithm
        if (this.x < ball2.x + (ball2.radius * 2) &&
          this.x + (this.radius * 2) > ball2.x &&
          this.y < ball2.y + (ball2.radius * 2) &&
          this.y + (this.radius * 2) > ball2.y) {
            this.angle = (this.angle + 90) % 360;
            all2.angle = (ball2.angle + 90) % 360;
        }*/
      }
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function radianConvert(angle) {
  return (angle * Math.PI) / 180;
}

function randomColor() {
  red = getRandom(0, 254);
  green = getRandom(0, 254);
  blue = getRandom(0, 254);
  rc = "rgb(" + red + ", " + green + ", " + blue + ")";
  return rc;
}

function reflectAngle(angle, axis) {

  if (angle % 90 === 0)
    return (angle + 180) % 360;

  let reflected;
  let segment = (angle % 90) * 2;

  if (axis === 'X')
    reflected = angle + (180 - segment);

  else if (axis === 'Y')
    reflected = angle - segment;

  if (angle < 90)
    reflected += 180;

  return reflected % 360;
}

function addBallContainer() {
  var ballCount = getRandom(10, 20);
  new BallCollision(700, 500, ballCount).start();
}