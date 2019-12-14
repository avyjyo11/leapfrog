function Enemy() {
  this.type;
  this.x;
  this.y;
  this.width;
  this.height;
  this.sX;
  this.sY;
  this.sWidth = 30;
  this.sHeight = 30;
  this.speed = 0.5;
  this.jumpSpeed = this.speed + 4.5;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  var that = this;

  this.pawn = function () {
    this.type = 1;
    this.sX = 0;
    this.sY = 76;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 40;
    this.height = 40;
  }

  this.flyer = function () {
    this.type = 3;
    this.sX = 0;
    this.sY = 76;
    this.sWidth = 29;
    this.sHeight = 42;
    this.width = 40;
    this.height = 54;
  }

  this.movePawn = function () {
    if (this.jumping) {
      this.jumpSpeed -= this.gravity;
      if (this.jumpSpeed > 0) {
        this.y = this.y - this.jumpSpeed;
      } else {
        this.jumpSpeed = Math.abs(this.speed) + 4.5;
        this.jumping = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = Math.abs(this.speed) + 4.5;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }

    this.x = this.x - this.speed;
  }

  this.moveFlyer = function () {
    this.y -= this.jumpSpeed;
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.movement = function () {
    if (this.type == 1) {
      that.movePawn();
    } else if (type == 3) {
      that.moveFlyer();
    }
  }

}