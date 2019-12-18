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
    that.sX = 159;
    this.sY = 409;
    this.sWidth = 64;
    this.sHeight = 30;
    this.width = 88;
    this.height = 40;
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

  this.castle = function () {
    that.type = 4;
    that.sX = 255;
    this.sY = 413;
    that.sWidth = 96;
    this.sHeight = 90;
    this.width = 120;
    this.height = 120;
  }

  this.tree1 = function () {
    that.type = 5;
    that.sX = 162;
    this.sY = 463;
    that.sWidth = 26;
    this.sHeight = 39;
    this.width = 40;
    this.height = 60;
  }

  this.tree2 = function () {
    that.type = 6;
    that.sX = 194;
    this.sY = 450;
    that.sWidth = 26;
    this.sHeight = 52;
    this.width = 40;
    this.height = 80;
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}