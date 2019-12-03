function Bird(spaceWidth, spaceHeight, parent) {
  this.width = 60;
  this.height = 42;
  this.element;
  this.x = spaceWidth / 4;
  this.speed = 0;
  this.jump = 7;
  this.gravity = 0.25;
  this.rotation = 0;
  this.frame = 0;
  this.y = (spaceHeight / 2);
  this.images = ['url("./images/bird-flapDown.png")', 'url("./images/bird.png")', 'url("./images/bird-flapUp.png")', 'url("./images/bird.png")']
  var that = this;

  this.init = function () {
    this.createElement();
    this.draw();
  }

  this.startMotion = function () {
    this.y = (spaceHeight / 2); // RESET POSITIO
    this.rotation = 0;
  }

  this.createElement = function () {
    var element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.width = this.width + 'px';
    element.style.height = this.height + 'px';
    element.style.zIndex = '300';
    element.style.background = 'url("./images/bird.png") center';
    element.style.backgroundSize = 'contain';
    parent.appendChild(element);
    this.element = element;
  }

  this.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = 'rotate(' + this.rotation + 'deg)';
    this.element.style.backgroundImage = this.images[this.frame]
  }

  this.gravityMotion = function () {
    if (this.y < -100) {
      this.y = -100;
    }
    this.speed += this.gravity;
    this.y = this.y + this.speed;
    if (this.speed >= this.jump) {
      this.rotation = 90;
    } else if (this.speed >= (this.jump / 3)) {
      this.rotation += 2;
    } else {
      this.rotation = -25;
      this.element.style.backgroundImage = 'url("./images/bird-flapDown.png")';
    }
    this.draw();
  }

  this.flap = function (e) {
    if (e.keyCode === 32) {
      that.speed = -that.jump;
    }
  }

  this.dieMotion = function () {
    if (this.y <= (spaceHeight + 1)) {
      this.gravityMotion();
    }
  }

}