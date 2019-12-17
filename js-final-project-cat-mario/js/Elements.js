function Element() {
  this.type;
  this.sX = 0;
  this.sY = 275;
  this.sWidth = 30;
  this.sHeight = 30;
  this.x;
  this.y;
  this.row;
  this.column;
  this.width = 40;
  this.height = 40;
  this.gravity = 0.2;
  var that = this;
  console.log(gameUI.blockSet);

  this.platform = function () {
    that.type = 1;
    that.sX = 132;
    this.sY = 275 + ((gameUI.blockSet - 1) * 33);
  }

  this.ground = function () {
    that.type = 2;
    that.sX = 165;
    this.sY = 275 + ((gameUI.blockSet - 1) * 33);
  }

  this.coinBox = function () {
    that.type = 3;
    that.sX = 33;
    this.sY = 275;
  }

  this.uselessBox = function () {
    that.type = 4;
    that.sX = 66;
    this.sY = 275 + ((gameUI.blockSet - 1) * 33);
  }

  this.brickBox = function () {
    that.type = 5;
    that.sX = 0;
    this.sY = 275 + ((gameUI.blockSet - 1) * 33);
  }

  this.blockBox = function () {
    that.type = 6;
    that.sX = 99;
    this.sY = 275 + ((gameUI.blockSet - 1) * 33);
  }

  this.pipeLeft = function () {
    that.type = 7;
    that.sX = 515;
    that.sY = 469;
  }

  this.pipeRight = function () {
    that.type = 8;
    that.sX = 545;
    that.sY = 469;
  }

  this.pipeTopLeft = function () {
    that.type = 9;
    that.sX = 515;
    that.sY = 439;
  }

  this.pipeTopRight = function () {
    that.type = 10;
    that.sX = 545;
    that.sY = 439;
  }

  this.invisibleBox = function () {
    that.type = 11;
    that.sX = 400;
    this.sY = 0;
  }

  this.pole = function () {
    that.type = 12;
    that.sX = 462;
    this.sY = 218;
  }

  this.poleTop = function () {
    that.type = 13;
    that.sX = 498;
    this.sY = 218;
  }

  this.enemyBox = function () {
    that.type = 14;
    that.sX = 33;
    this.sY = 275;
  }

  this.trollStarBox = function () {
    that.type = 15;
    that.sX = 33;
    this.sY = 275;
  }

  this.trollPowerBox = function () {
    that.type = 16;
    that.sX = 33;
    this.sY = 275;
  }

  this.finishLine = function () {
    that.type = 100;
    that.sX = 400;
    this.sY = 0;
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}