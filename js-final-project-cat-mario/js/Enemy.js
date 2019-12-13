function Enemy() {
  this.type;
  this.x;
  this.y;
  this.width;
  this.height;
  this.speed = 1;
  this.jumpSpeed = this.speed;
  this.jumpInertia = false;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.sX; // sprite x
  this.sY; // sprite y
  this.sWidth = 30;
  this.sHeight = 30;
  var that = this;

  this.setAttribute = function (type) {
    if (type == 1) {
      this.type = 1;
      this.sX = 0;
      this.sY = 76;
      this.sWidth = 30;
      this.sHeight = 27;
      this.width = 40;
      this.height = 40;
    } else if (type == 2) {
      this.type = 2;
      this.sX = 33;
      this.sY = 76;
      this.sWidth = 30;
      this.sHeight = 38;
      this.width = 40;
      this.height = 50;
    } else if (type == 3) {
      this.type = 3;
      this.sX = 66;
      this.sY = 77;
      this.sWidth = 30;
      this.sHeight = 28;
      this.width = 40;
      this.height = 40;
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
        this.jumpSpeed = Math.abs(this.speed);
        this.jumpInertia = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = Math.abs(this.speed);
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }
  }

  this.moveX = function () {
    this.x = this.x - this.speed;
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}