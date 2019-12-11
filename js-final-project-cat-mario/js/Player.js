function Player(gameUI) {
  this.type = 'small';
  this.x;
  this.y;
  this.width = 40;
  this.height = 60;
  this.speed = 3;
  this.jumpSpeed = 3;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.sX = 5; // sprite x
  this.sY = 38; // sprite y
  this.sWidth = 20;
  this.sHeight = 34;
  var that = this;

  this.init = function () {
    this.x = 100;
    this.y = gameUI.viewHeight / 2;
  }

  this.setPosition = function () {
    if (this.jumping) {
      if (this.jumpSpeed > 0) {
        //this.jumpSpeed -= this.gravity;
        this.y -= this.jumpSpeed;
      } else {
        this.jumping = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = 3;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.resetPos = function () {}

}