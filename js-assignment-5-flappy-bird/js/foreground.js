function ForeGround(width, height, parent) {
  this.repeatInt = 35;
  this.width = width + this.repeatInt;
  this.height = 168;
  this.element;
  this.x = 0;
  this.y = height - 118;

  this.init = function () {
    this.createElement();
    this.draw();
  }

  this.createElement = function () {
    var element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.width = this.width + 'px';
    element.style.height = this.height + 'px';
    element.style.zIndex = '20';
    element.style.background = 'url("./images/foreground.png") center';
    element.style.backgroundRepeat = 'repeat-x';
    element.style.backgroundSize = 'contain';
    parent.appendChild(element);
    this.element = element;
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  this.collisionDetect = function (bird) {
    if (this.x < bird.x + bird.width &&
      this.x + this.width > bird.x &&
      this.y < bird.y + bird.height &&
      this.y + this.height > bird.y) {
      console.log('collision detected with ground!');
      return 2;
    } else {
      return 1;
    }
  }

}