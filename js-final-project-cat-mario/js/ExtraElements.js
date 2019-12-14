function ExtraElements() {
  this.type;
  this.x;
  this.y;
  this.width;
  this.height;
  this.sX;
  this.sY;
  this.sWidth;
  this.sHeight;
  this.speed;
  this.jumpSpeed;
  this.fallSpeed;
  this.gravity = 0.24;
  this.jumping = false;
  this.coinCounter = 0;
  var that = this;

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.coin = function () {
    this.type = 1;
    this.sX = 5;
    this.sY = 200;
    this.sWidth = 20;
    this.sHeight = 28;
    this.width = 40;
    this.height = 56;
    this.jumpSpeed = 7;
  }

  this.destroyedBrick = function (index) {
    this.type = 2;
    this.sX = 464;
    this.sY = 271;
    this.sWidth = 15;
    this.sHeight = 17;
    this.width = 15;
    this.height = 15;
    this.jumping = true;
    that.fallSpeed = 0;
    if (index == 1 || index == 2) {
      this.jumpSpeed = 7;
    } else {
      this.jumpSpeed = 5;
    }
    if (index == 1 || index == 3) {
      this.speed = 1;
    } else {
      this.speed = -1;
    }
  }

  this.setPos = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.moveCoin = function () {
    this.coinCounter++;
    this.y -= this.jumpSpeed;
  }

  this.moveDestroyedBrick = function () {
    if (that.jumping) {
      if (that.jumpSpeed > 0) {
        that.jumpSpeed -= that.gravity;
        that.y -= that.jumpSpeed;
      } else {
        that.jumping = false;
      }
    } else {
      that.fallSpeed += that.gravity;
      that.y += that.fallSpeed;
    }

    that.x -= that.speed;
  }

}