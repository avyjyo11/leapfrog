function Player(gameUI) {
  this.type = 'small';
  this.x;
  this.y;
  this.width = 32;
  this.height = 50;
  this.speed = 5;
  this.jumpSpeed = this.speed;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.sX = 5; // sprite x
  this.sY = 38; // sprite y
  this.sWidth = 20;
  this.sHeight = 34;
  this.enemies = [];
  this.powerUps = [];
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
      this.jumpSpeed = this.speed;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

}