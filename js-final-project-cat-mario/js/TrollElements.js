function TrollElements() {
  this.type;
  this.x;
  this.y;
  this.width;
  this.height;
  this.speed = 1;
  this.JUMPSPEED = 7;
  this.jumpSpeed = this.JUMPSPEED;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.sX; // sprite x
  this.sY; // sprite y
  this.sWidth;
  this.sHeight;
  this.saveX1;
  this.saveX2;
  this.move;
  var that = this;

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  this.setPos = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.irritatingBox = function () {
    that.type = 1;
    that.sX = 33;
    this.sY = 275;
    this.sWidth = 30;
    this.sHeight = 30;
    this.width = 40;
    this.height = 40;
    this.move = true;
  }

  this.fallingBox = function (saveX1, saveX2, type) {
    that.type = type;
    if (type == 2) {
      that.sX = 0;
      this.sY = 275;
    } else if (type == 3) {
      that.sX = 132;
      this.sY = 275;
    } else if (type == 4) {
      that.sX = 165;
      this.sY = 275;
    }
    this.sWidth = 30;
    this.sHeight = 30;
    this.width = 40;
    this.height = 40;
    this.saveX1 = saveX1;
    this.saveX2 = saveX2;
  }

  this.trollCloud = function () {
    that.type = 5;
    that.sX = 352;
    this.sY = 403;
    that.sWidth = 70;
    this.sHeight = 44;
    this.width = 110;
    this.height = 60;
  }

  this.yellowRect = function () {
    that.type = 6;
    that.sX = 253;
    this.sY = 233;
    that.sWidth = 96;
    this.sHeight = 10;
    this.width = 154;
    this.height = 14;
    this.move = true;
  }

  this.moveIrritatingBox = function () {
    that.y = player.y - 16 - that.width;
  }

  this.moveFallingBox = function () {
    that.fallSpeed += that.gravity;
    if (that.fallSpeed > that.JUMPSPEED) {
      that.fallSpeed = that.JUMPSPEED;
    }
    that.y += that.fallSpeed;
  }

  this.moveYellowRect = function () {
    this.x -= this.JUMPSPEED;
  }

  this.movement = function () {
    this.moveChecker();
    if (this.move) {
      if (this.type == 1) {
        that.moveIrritatingBox();
      } else if (this.type == 2 || this.type == 3 || this.type == 4) {
        that.moveFallingBox();
      } else if (this.type == 6) {
        that.moveYellowRect();
      }
    }
  }

  this.moveChecker = function () {
    if (that.type == 1) {
      if ((player.x + player.width >= that.x && player.x <= that.x + that.width) && player.y <= (that.y + that.width + 16) && player.y >= (that.y + that.width - 5)) {
        that.move = true;
      } else {
        that.move = false;
      }
    } else if (that.type == 2) {
      if (player.x + player.width > that.saveX1 && player.x < that.saveX2 && player.y > that.y + that.width) {
        that.move = true;
      }
    } else if (that.type == 3) {
      if (player.x + player.width > that.saveX1 && player.x < that.saveX2 && player.y + player.height == that.y) {
        that.move = true;
      }
    } else if (that.type == 4) {
      if (player.x + player.width > that.saveX1 && player.x < that.saveX2 && player.y + player.height == that.y - that.height) {
        that.move = true;
      }
    }
  }

}