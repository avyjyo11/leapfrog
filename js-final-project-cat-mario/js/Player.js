var player = new Player();
player.init();

function Player() {
  this.x;
  this.y;
  this.width = 32;
  this.height = 50;
  this.SPEED = 3;
  this.JUMPSPEED = this.SPEED + 4;
  this.FALLSPEED = 0;
  this.jumpSpeedVar = this.JUMPSPEED;
  this.fallSpeedVar = this.FALLSPEED;
  this.gravity = 0.24;
  this.jumpInertia = false;
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
    this.x -= this.SPEED;
    this.sX = 320;
    this.sY = 38;
  }

  this.moveRight = function () {
    this.x += this.SPEED;
    this.sX = 5;
    this.sY = 38;
  }

  this.moveY = function () {
    if (this.jumping) {
      this.y -= this.jumpSpeedVar;
      this.jumping = false;
      this.jumpInertia = true;
    } else if (this.jumpInertia) {
      this.jumpSpeedVar -= this.gravity;
      if (this.jumpSpeedVar > 0) {
        this.y = this.y - this.jumpSpeedVar;
      } else {
        this.jumpSpeedVar = this.JUMPSPEED;
        this.jumpInertia = false;
      }
    } else if (this.grounded) {
      this.jumpSpeedVar = this.JUMPSPEED;
      this.fallSpeedVar = this.FALLSPEED;
    } else {
      this.y += this.fallSpeedVar;
      this.fallSpeedVar += this.gravity;
    }
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.resetAll = function () {
    this.jumpSpeedVar = this.JUMPSPEED;
    this.fallSpeedVar = this.FALLSPEED;
    this.gravity = 0.2;
    this.jumpInertia = false;
    this.jumping = false;
    this.grounded = false;
  }

}