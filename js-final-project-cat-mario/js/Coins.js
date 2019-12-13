function Coin() {
  this.sX = 5;
  this.sY = 200;
  this.sWidth = 20;
  this.sHeight = 28;
  this.x;
  this.y;
  this.width = 40;
  this.height = 56;
  this.speed = 7;
  this.counter = 0;
  var that = this;

  this.setPos = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.move = function () {
    this.counter++;
    this.y -= this.speed;
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}