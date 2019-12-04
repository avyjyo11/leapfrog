var animation1 = new Animation(500, 500);
animation1.init();

function Animation(width, height) {
  this.width = width;
  this.height = height;
  this.canvas;
  this.context;
  this.speed = 0.024;
  this.totalRows = 11;
  this.totalCols = 15;
  this.phase = 0;
  this.ballSize = 12;
  this.colors = ["#ffae73", "#feaa77", "#fea57c", "#fea081", "#fe9b86", "#fa968b", "#f59190", "#f08c95", "#eb879a", "#e6829f", "#e17da4"];
  var that = this;

  this.init = function () {
    this.createContainer();
    //this.createBalls();
    window.requestAnimationFrame(that.animation);
  }

  this.createContainer = function () {
    var body = document.getElementsByTagName('body')[0];
    var container = document.createElement('div');
    container.style.width = this.width + 'px';
    container.style.height = this.height + 'px';
    container.style.margin = '20px';
    //container.style.background = 'url("./images/helix-animation.gif") center';
    //container.style.backgroundSize = 'contain';
    container.style.border = '3px solid black';
    container.style.cssFloat = 'left';
    container.classList.add('container');
    body.appendChild(container);

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    container.appendChild(canvas);
    this.canvas = canvas;
    that.context = that.canvas.getContext('2d');
    that.canvas.width = this.width;
    that.canvas.height = this.height;
  }

  this.animation = function () {
    that.context.fillStyle = "#043a4a";
    that.context.rect(0, 0, that.canvas.width, that.canvas.height);
    that.context.fill();
    that.phase = (window.requestAnimationFrame(that.animation)) * that.speed;
    for (var strand = 0; strand < 2; strand++) {
      var strandPhase = that.phase + that.wavelength(strand, 0, 2, 0, 2 * Math.PI);
      for (var col = 0; col < that.totalCols; col++) {
        var colOffset = that.wavelength(col, 0, that.totalCols, 0, (Math.PI) + (Math.PI / 4));
        var x = that.wavelength(col, 0, that.totalCols, 80, that.canvas.width - 60);
        for (var row = 0; row < that.totalRows; row++) {
          var y = (that.canvas.height / 3) + row * 0.032 * this.canvas.width + Math.sin(strandPhase + colOffset) * (that.canvas.width / 10);
          var sizeOffset = (Math.cos(strandPhase - (row / that.totalRows) + colOffset) + 1) * (this.canvas.width / 1000);
          var ballSizeNow = sizeOffset * that.ballSize;

          that.context.beginPath();
          that.context.clearRect(0, that.canvas.width, that.canvas.width, that.canvas.height);
          that.context.arc(x, y, ballSizeNow, 0, 2 * Math.PI);
          that.context.fillStyle = that.colors[row];
          that.context.fill();
          that.context.closePath();
        }
      }
    }

  }

  this.wavelength = function (value, low1, high1, low2, high2) {
    var length = low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
    return length;
  }

}