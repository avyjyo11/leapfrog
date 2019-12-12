function Game(levelData) {
  this.translatePoint = 2;
  this.element;
  this.map;
  this.animation;
  this.pressCounter = 0;
  this.translatedDist = 0;
  this.centerPos = 0;
  this.keys = [];
  this.enemies = [];
  this.counter = 0;
  var that = this;

  this.init = function () {
    this.map = levelData.map;
    gameUI.row = that.map.length;
    gameUI.column = that.map[0].length;
    gameUI.maxWidth = gameUI.tileSize * gameUI.column;
    player.init();
    this.element = new Element();
    this.keyBinds();
    //setInterval(this.startGame, 1000 / 10);
    that.startGame();
  }

  this.startGame = function () {
    gameUI.clear();
    //that.gameUI.context.fillStyle = '#a0b4fa';
    //that.gameUI.context.fillRect(0, 0, that.gameUI.viewPort, that.gameUI.viewHeight);
    that.moveEnemies();
    that.movePlayer();
    that.drawLevels();
    player.setPosition();
    player.draw();
    that.wallCollision();
    //that.gameUI.translate(-1, 0);
    this.animation = window.requestAnimationFrame(that.startGame);
  }

  this.drawLevels = function () {
    var tileSize = 40;
    player.grounded = false;
    for (var i = 0; i < that.enemies.length; i++) {
      that.enemies[i].grounded = false;
    }
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
            that.checkEnemyElementCollision();
            break;
          case 2:
            that.element.ground();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 3:
            that.element.questionBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 4:
            that.element.uselessBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 5:
            that.element.brickBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 6:
            that.element.blockBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 7:
            that.element.pipeLeft();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 8:
            that.element.pipeRight();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 9:
            that.element.pipeTopLeft();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 10:
            that.element.pipeTopRight();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 11:
            var enemy = new Enemy();
            enemy.setAttribute(1);
            enemy.x = column * tileSize;
            enemy.y = row * tileSize;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 12:
            var enemy = new Enemy();
            enemy.setAttribute(2);
            enemy.x = (column * tileSize) + tileSize - enemy.width;
            enemy.y = (row * tileSize) + tileSize - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
        }
      }
    }
  }

  this.moveEnemies = function () {
    for (var i = 0; i < that.enemies.length; i++) {
      that.enemies[i].setPositionX();
      that.enemies[i].setPositionY();
      that.enemies[i].draw();
      that.checkPlayerEnemyCollision(that.enemies[i], i);
    }
  }

  this.keyBinds = function () {
    document.body.addEventListener('keydown', function (e) {
      that.keys[e.keyCode] = true;
    });

    document.body.addEventListener('keyup', function (e) {
      that.keys[e.keyCode] = false;
    });
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
    var collisionDirection = this.collisionCheck(player, that.element);

    if (collisionDirection == 'b') {
      player.y = that.element.y - player.height;
      player.grounded = true;
      player.jumping = false;
      this.pressCounter = 0;
    } else if (collisionDirection == 'l') {
      player.x = that.element.x + that.element.width;
    } else if (collisionDirection == 'r') {
      player.x = that.element.x - player.width;
    } else if (collisionDirection == 't') {
      player.grounded = false;
      player.jumping = false;
      player.jumpInertia = false;
      player.pressCounter = 30;
    }
  }

  this.checkPlayerEnemyCollision = function (enemy, index) {
    var collisionDirection = this.collisionCheck(player, enemy);

    if (collisionDirection == 'b') {
      player.grounded = false;
      player.jumping = true;
      player.jumpInertia = false;
      this.pressCounter = 0;
      that.enemies.splice(index, 1);
    } else if (collisionDirection == 'l') {
      player.x = enemy.x + enemy.width;
      that.gameOver();
    } else if (collisionDirection == 'r') {
      player.x = enemy.x - player.width;
      that.gameOver();
    } else if (collisionDirection == 't') {
      that.gameOver();
    }
  }

  this.checkEnemyElementCollision = function (enemy) {
    for (var i = 0; i < that.enemies.length; i++) {
      var enemy = that.enemies[i];
      var collisionDirection = this.collisionCheck(enemy, that.element);
      if (collisionDirection == 'b') {
        enemy.y = that.element.y - enemy.height;
        enemy.grounded = true;
        enemy.jumping = false;
        this.counter = 0;
      } else if (collisionDirection == 'l' || collisionDirection == 'r') {
        enemy.speed = -enemy.speed;
      } else if (collisionDirection == 't') {
        enemy.grounded = false;
        enemy.jumping = false;
        enemy.jumpInertia = false;
      }
    }
  }

  this.movePlayer = function () {
    if (that.keys[37] || that.keys[65]) {
      //left btn
      player.moveLeft();
    } else if (that.keys[39] || that.keys[68]) {
      //right btn
      this.checkPlayerPos();
      player.moveRight();
    }

    if ((player.grounded || that.pressCounter < 20) && (that.keys[38] || that.keys[87])) {
      //jump btn
      console.log('jumping');
      this.pressCounter++;
      player.jumping = true;
      player.grounded = false;
    }
  }

  this.checkPlayerPos = function () {
    this.centerPos = this.translatedDist + gameUI.viewPort / 2;
    //side scrolling as mario reaches center of screen
    if (player.x > that.centerPos && that.centerPos + gameUI.viewPort / 2 < gameUI.maxWidth) {
      gameUI.translate(-player.speed, 0);
      that.translatedDist += player.speed;
    }
  }

  this.wallCollision = function () {
    if (player.x >= gameUI.maxWidth - player.width) {
      player.x = gameUI.maxWidth - player.width;
    } else if (player.x <= that.translatedDist) {
      player.x = that.translatedDist + 1;
    }
  }

  that.gameOver = function () {
    console.log('game-over');
  }
}