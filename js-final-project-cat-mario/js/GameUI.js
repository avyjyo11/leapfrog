function GameUI() {
  this.canvas;
  this.context;
  this.tileSize = 40;
  this.viewPort; //17 columns
  this.viewHeight; //15 rows
  this.maxWidth;
  this.image;
  var that = this;

  this.setCanvas = function () {
    this.viewPort = that.tileSize * 17;
    this.viewHeight = that.tileSize * 15;
    this.maxWidth = that.tileSize * 34;
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

}