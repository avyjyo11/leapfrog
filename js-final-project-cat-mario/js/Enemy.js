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
  this.JUMPSPEED = 7;
  this.jumpSpeed = this.JUMPSPEED;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.move = false;
  this.boxTopY;
  this.dead = false;
  var that = this;

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

  //attribute functions

  this.pawn = function () {
    this.type = 1;
    this.sX = 0;
    this.sY = 76;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 40;
    this.height = 40;
    this.move = true;
  }

  this.pawnFromBox = function (elementY) {
    this.type = 2;
    this.sX = 0;
    this.sY = 76;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.boxTopY = elementY;
  }

  this.flyer = function () {
    this.type = 3;
    this.sX = 100;
    this.sY = 76;
    this.sWidth = 29;
    this.sHeight = 42;
    this.width = 40;
    this.height = 54;
  }

  this.kingPawn = function () {
    this.type = 4;
    this.sX = 132;
    this.sY = 74;
    this.sWidth = 32;
    this.sHeight = 33;
    this.width = 44;
    this.height = 44;
    this.JUMPSPEED = 8;
  }

  this.flyerDown = function () {
    this.type = 5;
    this.sX = 100;
    this.sY = 120;
    this.sWidth = 29;
    this.sHeight = 42;
    this.width = 40;
    this.height = 54;
    this.jumpSpeed = 8;
  }

  this.turtle = function () {
    this.type = 6;
    this.sX = 33;
    this.sY = 76;
    this.sWidth = 30;
    this.sHeight = 38;
    this.width = 42;
    this.height = 50;
    this.move = true;
  }

  this.turtleStop = function () {
    this.type = 7;
    this.sX = 66;
    this.sY = 77;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 42;
    this.height = 40;
    this.move = true;
  }

  this.turtleGo = function () {
    this.type = 8;
    this.sX = 66;
    this.sY = 77;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 42;
    this.height = 40;
    this.move = true;
    this.speed = 6;
  }

  this.trollStar = function () {
    this.type = 9;
    this.sX = 99;
    this.sY = 199;
    this.sWidth = 28;
    this.sHeight = 31;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.speed = 2;
    this.speed = -this.speed;
  }

  this.trollStarFromBox = function (elementY) {
    this.type = 10;
    this.sX = 97;
    this.sY = 239;
    this.sWidth = 28;
    this.sHeight = 31;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.boxTopY = elementY;
  }

  this.trollPowerUp = function () {
    this.type = 11;
    this.sX = 33;
    this.sY = 199;
    this.sWidth = 29;
    this.sHeight = 30;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.speed = -this.speed;
  }

  this.trollPowerUpFromBox = function (elementY) {
    this.type = 12;
    this.sX = 33;
    this.sY = 199;
    this.sWidth = 30;
    this.sHeight = 30;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.boxTopY = elementY;
  }

  this.bigPawn = function () {
    this.type = 13;
    this.sX = 34;
    this.sY = 128;
    this.sWidth = 63;
    this.sHeight = 53;
    this.width = 85;
    this.height = 75;
    this.move = true;
  }

  this.orangeBall = function () {
    this.type = 14;
    this.sX = 166;
    this.sY = 74;
    this.sWidth = 29;
    this.sHeight = 29;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.jumpSpeed = getRandom(5, 11);
    this.speed = getRandom(1, 3);
    this.jumping = true;
  }

  this.chickenMan = function () {
    this.type = 15;
    this.sX = 622;
    this.sY = 76;
    this.sWidth = 36;
    this.sHeight = 77;
    this.width = 60;
    this.height = 120;
    this.move = true;
    this.jumpSpeed = 8;
    this.speed = 1;
    this.jumping = true;
  }

  this.fireBall = function () {
    this.type = 16;
    this.sX = 232;
    this.sY = 74;
    this.sWidth = 26;
    this.sHeight = 29;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.jumpSpeed = 10;
    this.speed = 0;
    this.jumping = true;
  }
  //move functions

  this.movePawn = function () {
    if (this.jumping) {
      this.jumpSpeed -= this.gravity;
      if (this.jumpSpeed > 0) {
        this.y = this.y - this.jumpSpeed;
      } else {
        this.jumpSpeed = this.JUMPSPEED;
        this.jumping = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = this.JUMPSPEED;
      this.fallSpeed = 0;
      if (that.type == 9)
        that.jumping = true;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }

    if (this.type != 13)
      this.x -= this.speed;
  }

  this.moveFlyer = function () {
    this.y -= this.jumpSpeed;
  }

  this.moveFlyerDown = function () {
    this.y += this.jumpSpeed;
  }

  this.movePawnFromBox = function () {
    this.y -= (this.speed + 0.5);
    if (this.y + this.height < this.boxTopY) {
      if (that.type == 2)
        that.pawn();
      else if (that.type == 10)
        that.trollStar();
      else if (that.type == 12)
        that.trollPowerUp();
    }
  }

  this.moveTurtleStop = function () {
    if (this.jumping) {
      this.jumpSpeed -= this.gravity;
      if (this.jumpSpeed > 0) {
        this.y = this.y - this.jumpSpeed;
      } else {
        this.jumpSpeed = this.JUMPSPEED;
        this.jumping = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = this.JUMPSPEED;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }
  }

  this.moveTurtleGo = function () {
    if (this.jumping) {
      this.jumpSpeed -= this.gravity;
      if (this.jumpSpeed > 0) {
        this.y = this.y - this.jumpSpeed;
      } else {
        this.jumpSpeed = this.JUMPSPEED;
        this.jumping = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = this.JUMPSPEED;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }

    this.x -= this.speed;
  }

  this.moveKingPawn = function () {
    if (this.jumping) {
      this.jumpSpeed -= this.gravity;
      if (this.jumpSpeed > 0) {
        this.y = this.y - this.jumpSpeed;
      } else {
        this.jumpSpeed = this.JUMPSPEED;
        this.jumping = false;
      }
    } else if (this.grounded) {
      this.jumpSpeed = this.JUMPSPEED;
      this.fallSpeed = 0;
    } else {
      this.y += this.fallSpeed;
      this.fallSpeed += this.gravity;
    }

    if (player.jumping) {
      that.jumping = true;
    }

    this.x = this.x - this.speed;
  }

  //checking and movements

  this.checkPlayerPos = function () {
    if (this.type == 3 || this.type == 5) {
      if (player.x + player.width > that.x - 20) {
        that.move = true;
      }
    } else if (this.type == 4) {
      if (player.x + player.width > that.x - 70) {
        that.move = true;
      }
    }
  }

  this.movement = function () {
    that.checkPlayerPos();
    if (this.move) {
      if (this.type == 1 || this.type == 6 || this.type == 9 || this.type == 11 || this.type == 13 || this.type == 14 || this.type == 15) {
        that.movePawn();
      } else if (this.type == 2 || this.type == 10 || this.type == 12) {
        that.movePawnFromBox();
      } else if (this.type == 3 || this.type == 16) {
        that.moveFlyer();
      } else if (this.type == 4) {
        that.moveKingPawn();
      } else if (this.type == 5) {
        that.moveFlyerDown();
      } else if (this.type == 7) {
        that.moveTurtleStop();
      } else if (this.type == 8) {
        that.moveTurtleGo();
      }
    }
  }

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}