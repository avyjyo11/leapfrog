function Pipes(centerX, centerY, gap, parent) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.gap = gap;
  this.width = 90;
  this.height = 700;
  this.element;
  this.topX;
  this.topY;
  this.bottomX;
  this.bottomY;
  this.topElement;
  this.bottomElement;
  var that = this;

  this.init = function () {
    this.setPosition();
    this.createElement();
    this.draw();
  }

  this.createElement = function () {
    var topElement = document.createElement('div');
    topElement.style.position = 'absolute';
    topElement.style.width = this.width + 'px';
    topElement.style.height = this.height + 'px';
    topElement.style.zIndex = '50';
    topElement.style.background = 'url("./images/pipeUp.png") center';
    topElement.style.backgroundSize = 'contain';
    parent.appendChild(topElement);
    this.topElement = topElement;

    var bottomElement = document.createElement('div');
    bottomElement.style.position = 'absolute';
    bottomElement.style.width = this.width + 'px';
    bottomElement.style.height = this.height + 'px';
    bottomElement.style.zIndex = '10';
    bottomElement.style.background = 'url("./images/pipeDown.png") center';
    bottomElement.style.backgroundSize = 'contain';
    parent.appendChild(bottomElement);
    this.bottomElement = bottomElement;
  }

  this.draw = function () {
    this.topElement.style.left = this.topX + 'px';
    this.topElement.style.top = this.topY + 'px';
    this.bottomElement.style.left = this.bottomX + 'px';
    this.bottomElement.style.top = this.bottomY + 'px';
  }

  this.setPosition = function () {
    this.topX = this.centerX;
    this.topY = this.centerY - (this.gap / 2) - this.height;
    this.bottomX = this.centerX;
    this.bottomY = this.centerY + (this.gap / 2);
  }

  this.collisionDetect = function (bird) {
    if (this.topX < bird.x + bird.width &&
      this.topX + this.width > bird.x &&
      this.topY < bird.y + bird.height &&
      this.topY + this.height > bird.y) {
      //console.log('collision detected to top pipe!');
      return 2;
    } else if (this.bottomX < bird.x + bird.width &&
      this.bottomX + this.width > bird.x &&
      this.bottomY < bird.y + bird.height &&
      this.bottomY + this.height > bird.y) {
      //console.log('collision detected to bottom pipe!');
      return 2;
    } else {
      //no collision
      return 1;
    }
  }
}