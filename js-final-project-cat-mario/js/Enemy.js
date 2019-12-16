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
  this.jumpSpeed = 7;
  this.fallSpeed = 0;
  this.gravity = 0.2;
  this.jumping = false;
  this.grounded = false;
  this.move = false;
  this.pawnFromBoxTopY;
  this.dead = false;
  var that = this;

  this.draw = function () {
    gameUI.draw(this.sX, this.sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
  }

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
    this.pawnFromBoxTopY = elementY;
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
    this.move = true;
  }

  this.flyerDown = function () {
    this.type = 5;
    this.sX = 100;
    this.sY = 120;
    this.sWidth = 29;
    this.sHeight = 42;
    this.width = 40;
    this.height = 54;
  }

  this.turtle = function () {
    this.type = 6;
    this.sX = 33;
    this.sY = 76;
    this.sWidth = 30;
    this.sHeight = 38;
    this.width = 40;
    this.height = 50;
    this.move = true;
  }

  this.turtleStop = function () {
    this.type = 7;
    this.sX = 66;
    this.sY = 77;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 40;
    this.height = 40;
    this.move = true;
  }

  this.turtleGo = function () {
    this.type = 8;
    this.sX = 66;
    this.sY = 77;
    this.sWidth = 30;
    this.sHeight = 27;
    this.width = 40;
    this.height = 40;
    this.move = true;
    this.speed = 6;
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
    if (this.y + this.height < this.pawnFromBoxTopY) {
      that.type = 1;
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

  this.checkPlayerPos = function () {
    if (this.type == 3 || this.type == 5) {
      if (player.x + player.width > that.x - 20) {
        that.move = true;
      }
    }
  }

  this.movement = function () {
    that.checkPlayerPos();
    if (this.move) {
      if (this.type == 1 || this.type == 6) {
        that.movePawn();
      } else if (this.type == 2) {
        that.movePawnFromBox();
      } else if (this.type == 3) {
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