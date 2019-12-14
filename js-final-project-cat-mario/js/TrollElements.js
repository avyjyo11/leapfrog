function TrollElements() {
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

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}