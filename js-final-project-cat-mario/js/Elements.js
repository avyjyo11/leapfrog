function Element(gameUI) {
  this.type;
  this.sX = 0;
  this.sY = 275;
  this.sWidth = 30;
  this.sHeight = 30;
  this.x;
  this.y;
  this.width = 40;
  this.height = 40;
  var that = this;

  this.platform = function () {
    that.type = 1;
    that.sX = 132;
  };

  this.ground = function () {
    that.type = 2;
    that.sX = 165;
  }

  this.questionBox = function () {
    that.type = 3;
    that.sX = 33;
  };

  this.uselessBox = function () {
    that.type = 4;
    that.sX = 66;
  };

  this.brick = function () {
    that.type = 5;
    that.sX = 0;
  };

  this.pipeLeft = function () {
    that.type = 7;
    that.sX = 6 * that.width;
  };

  this.pipeRight = function () {
    that.type = 8;
    that.sX = 7 * that.width;
  };

  this.pipeTopLeft = function () {
    that.type = 9;
    that.sX = 8 * that.width;
  };

  this.pipeTopRight = function () {
    that.type = 10;
    that.sX = 9 * that.width;
  };

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}