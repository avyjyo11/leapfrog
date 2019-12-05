function HelixBall(parent) {
  this.x;
  this.y;
  this.radius;
  this.width;
  this.height;
  this.parent = parent;
  this.element;
  var that = this;

  this.create = function () {
    var ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.borderRadius = '50%';
    this.parent.appendChild(ball);
    that.element = ball;
  }

  this.setValues = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.width = (this.radius * 2) + 'px';
    this.element.style.height = (this.radius * 2) + 'px';
  }
}