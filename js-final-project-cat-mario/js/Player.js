var player = new Player();
player.init();

function Player() {
  this.type = 'small';
  this.x;
  this.y;
  this.width = 32;
  this.height = 50;
  this.SPEED = 3;
  this.speedVar = this.SPEED;
  this.JUMPSPEED = this.SPEED + 4;
  this.FALLSPEED = 0;
  this.jumpSpeedVar = this.JUMPSPEED;
  this.fallSpeedVar = this.FALLSPEED;
  this.gravity = 0.24;
  this.jumpInertia = false;
  this.jumping = false;
  this.grounded = false;
  this.move = false;
  this.moveInertia = false;
  this.sX; // sprite x
  this.sY; // sprite y
  this.sWidth = 20;
  this.sHeight = 34;
  this.direction = 'right';
  this.dead = false;
  var that = this;

  this.init = function (x, y) {
    this.type = 'small';
    this.x = x;
    this.y = y;
    this.sX = 5;
    this.sY = 38;
    this.sWidth = 20;
    this.sHeight = 34;
    this.width = 32;
    this.height = 50;
  }

  this.trollPowerUp = function (x, y) {
    this.y = this.y - 52;
    this.sX = 179;
    this.sY = 1;
    this.sWidth = 41;
    this.sHeight = 70;
    this.width = 64;
    this.height = 100;
    this.type = 'big';
  }

  this.playerHappy = function () {
    this.type = 'small';
    this.sX = 693;
    this.sY = 76;
    this.sWidth = 24;
    this.sHeight = 34;
    this.width = 32;
    this.height = 50;
  }

  this.moveLeft = function () {
    this.x -= this.SPEED;
    this.direction = 'left';
    if (this.type == 'big') {

    } else {
      if (!this.jumpInertia && !this.jumping) {
        this.sX = 320;
        this.sY = 38;
        this.sWidth = 20;
        this.sHeight = 34;
        this.width = 32;
        this.height = 50;
      }
    }
  }

  this.moveRight = function () {
    this.x += this.SPEED;
    this.direction = 'right';
    if (this.type == 'big') {

    } else {
      if (!this.jumpInertia && !this.jumping) {
        this.sX = 5;
        this.sY = 38;
        this.sWidth = 20;
        this.sHeight = 34;
        this.width = 32;
        this.height = 50;
      }
    }
  }

  this.jumpingFrame = function () {
    if (!this.dead) {
      if (this.direction == 'right') {
        this.sX = 65;
        this.sY = 38;
        this.sWidth = 24;
        this.sHeight = 34;
        this.width = 38;
        this.height = 50;
      } else {
        this.sX = 256;
        this.sY = 38;
        this.sWidth = 24;
        this.sHeight = 34;
        this.width = 38;
        this.height = 50;
      }
    }
  }

  this.groundedFrame = function () {
    if (!this.dead) {
      if (this.direction == 'right') {
        this.sX = 5;
        this.sY = 38;
        this.sWidth = 20;
        this.sHeight = 34;
        this.width = 32;
        this.height = 50;
      } else {
        this.sX = 320;
        this.sY = 38;
        this.sWidth = 20;
        this.sHeight = 34;
        this.width = 32;
        this.height = 50;
      }
    }
  }

  this.moveY = function () {
    if (this.jumping) {
      this.jumpingFrame();
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
      this.groundedFrame();
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
    this.dead = false;
    this.direction = 'right';
  }

}