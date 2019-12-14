function Background() {
  this.type;
  this.sX;
  this.sY;
  this.sWidth;
  this.sHeight;
  this.x;
  this.y;
  this.width;
  this.height;
  var that = this;

  this.hill = function () {
    that.type = 1;
    that.sX = 5;
    this.sY = 407;
    this.sWidth = 146;
    this.sHeight = 64;
    this.width = 200;
    this.height = 80;
  }

  this.grass = function () {
    that.type = 2;
    that.sX = 146;
    this.sY = 64;
  }

  this.cloud = function () {
    that.type = 3;
    that.sX = 352;
    this.sY = 403;
    that.sWidth = 70;
    this.sHeight = 44;
    this.width = 110;
    this.height = 60;
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}