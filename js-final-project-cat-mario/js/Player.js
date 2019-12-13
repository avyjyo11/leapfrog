var player = new Player();
player.init();

function Player() {
  this.x;
  this.y;
  this.width = 32;
  this.height = 50;
  this.speed = 3;
  this.jumpSpeed = (this.speed) + 5;
  this.jumpInertia = false;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.sX; // sprite x
  this.sY; // sprite y
  this.sWidth = 20;
  this.sHeight = 34;
  var that = this;

  this.init = function () {
    this.x = 100;
    this.y = gameUI.viewHeight / 2;
    this.sX = 5;
    this.sY = 38;
  }

  this.moveLeft = function () {
    this.x -= this.speed;
    if (this.grounded) {
      this.sX = 320;
      this.sY = 38;
    } else {
      this.sX = 256;
      this.sY = 38;
    }
  }

  this.moveRight = function () {
    this.x += this.speed;
    if (this.grounded || !this.grounded) {
      this.sX = 5;
      this.sY = 38;
    } else {
      this.sX = 65;
      this.sY = 38;
    }
  }

  this.moveY = function () {
    if (this.jumping) {
      this.y -= this.jumpSpeed;
      this.jumping = false;
      this.jumpInertia = true;
    } else if (this.jumpInertia) {
      this.jumpSpeed -= this.gravity;
      if (this.jumpSpeed > 0) {
        this.y = this.y - this.jumpSpeed;
      } else {
        this.jumpSpeed = (this.speed) + 5;
        this.jumpInertia = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = (this.speed) + 5;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.resetAll = function () {
    this.speed = 3;
    this.jumpSpeed = (this.speed) + 5;
    this.jumpInertia = false;
    this.fallSpeed = 0;
    this.gravity = 0.2;
    this.jumping = false;
    this.grounded = false;
  }

}