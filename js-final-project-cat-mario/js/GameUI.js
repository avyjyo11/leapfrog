var gameUI = new GameUI();

function GameUI() {
  this.canvas;
  this.context;
  this.tileSize = 40;
  this.viewPort; //17 columns
  this.viewHeight; //15 rows
  this.maxWidth;
  this.image;
  this.row;
  this.column;
  var that = this;

  this.setCanvas = function () {
    this.viewPort = that.tileSize * 17;
    this.viewHeight = that.tileSize * 15;
    this.image = new Image();
    that.image.src = 'images/all-sprites.png';
    this.canvas = document.getElementById('mainCanvas');
    that.context = that.canvas.getContext('2d');
    that.canvas.width = that.viewPort;
    that.canvas.height = that.viewHeight;
  }

  this.draw = function (sX, sY, sWidth, sHeight, x, y, width, height) {
    that.context.drawImage(that.image, sX, sY, sWidth, sHeight, x, y, width, height);
  }

  this.translate = function (x, y) {
    that.context.translate(x, y);
  }

  this.clear = function () {
    that.context.clearRect(0, 0, that.maxWidth, that.viewHeight);
  }

  this.makeBox = function (x, y, width, height) {
    that.context.rect(x, y, width, height);
    that.context.fillStyle = 'black';
    that.context.fill();
  }

  this.writeText = function (text, x, y, color) {
    that.context.font = '20px supermario256';
    that.context.fillStyle = 'white' || color;
    that.context.fillText(text, x, y);
  }

}