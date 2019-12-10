function Player(gameUI) {
  this.type = 'small';
  this.x;
  this.y;
  this.width = 40;
  this.height = 60;
  this.speed = 2;
  this.gravity = 0.1;
  this.jumping = false;
  this.grounded = false;
  this.invulnerable = false;
  this.sX = 5; // sprite x
  this.sY = 38; // sprite y
  this.sWidth = 20;
  this.sHeight = 34;
  var that = this;

  this.init = function () {
    this.x = 100;
    this.y = gameUI.viewHeight / 2;
    this.draw();
  }

  this.setPosition = function () {
    if (this.jumping) {
      this.y = this.y - this.speed;
    } else if (this.grounded) {
      this.y = this.y;
    } else {
      this.y = this.y + this.speed;
    }
  }

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.resetPos = function () {}

}