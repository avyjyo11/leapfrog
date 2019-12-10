var game1 = new Game();
game1.init();

function Game() {
  this.translatePoint = 2;
  this.player;
  this.element;
  this.gameUI;
  this.map;
  this.animation;
  this.keys = [];
  var that = this;

  this.init = function () {
    this.gameUI = new GameUI();
    this.gameUI.setCanvas();
    this.element = new Element(that.gameUI);
    this.getPlayer();
    this.map = levelMaps.getMap(1);
    this.keyBinds();
    this.startGame();
  }

  this.getPlayer = function () {
    var player = new Player(that.gameUI);
    player.init();
    this.player = player;
  }

  this.drawLevels = function () {
    var tileSize = 40;
    //console.log(map);
    for (var row = 0; row < that.map.length; row++) {
      for (var column = 0; column < that.map[row].length; column++) {
        that.element.x = column * tileSize;
        that.element.y = row * tileSize;
        switch (that.map[row][column]) {
          case 1:
            that.element.platform();
            that.element.draw();
            that.checkPlayerElementCollision();
            break;
          case 2:
            that.element.ground();
            that.element.draw();
            break;
          case 3:
            that.element.questionBox();
            that.element.draw();
            break;
          case 4:
            that.element.uselessBox();
            that.element.draw();
            break;
          case 5:
            that.element.brick();
            that.element.draw();
            break;
        }
      }
    }
  }

  this.keyBinds = function () {
    document.body.addEventListener('keydown', function (e) {
      that.keys[e.keyCode] = true;
      console.log(e.keyCode);
    });

    document.body.addEventListener('keyup', function (e) {
      that.keys[e.keyCode] = false;
    });
  }

  this.startGame = function () {
    that.gameUI.clear();
    //that.gameUI.context.fillStyle = '#a0b4fa';
    //that.gameUI.context.fillRect(0, 0, that.gameUI.viewPort, that.gameUI.viewHeight);
    that.drawLevels();
    that.movePlayer();
    that.player.setPosition();
    that.player.draw();
    //that.gameUI.translate(-1, 0);
    this.animation = window.requestAnimationFrame(that.startGame);
  }

  this.collisionCheck = function (objA, objB) {
    // get the vectors to check against
    var vX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    var vY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    // add the half widths and half heights of the objects
    var hWidths = objA.width / 2 + objB.width / 2;
    var hHeights = objA.height / 2 + objB.height / 2;
    var collisionDirection = null;

    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      var offsetX = hWidths - Math.abs(vX);
      var offsetY = hHeights - Math.abs(vY);

      if (offsetX >= offsetY) {
        if (vY > 0) {
          collisionDirection = 't';
        } else if (vY < 0) {
          collisionDirection = 'b';
        }
      } else {
        if (vX > 0) {
          collisionDirection = 'l';
        } else {
          collisionDirection = 'r';
        }
      }
    }
    return collisionDirection;
  }

  this.checkPlayerElementCollision = function () {
    var collisionDirection = this.collisionCheck(that.player, that.element);

    if (collisionDirection == 'b') {
      that.player.y = that.element.y - that.player.height;
      that.player.grounded = true;
    }
  }

  this.movePlayer = function () {
    if (that.keys[37] || that.keys[65]) {
      that.player.x -= that.player.speed;
    } else if (that.keys[39] || that.keys[68]) {
      that.player.x += that.player.speed;
    }

    if (that.keys[38] || that.keys[87]) {
      that.player.jumping = true;
      that.player.grounded = false;
    } else {
      that.player.jumping = false;
    }
  }


}