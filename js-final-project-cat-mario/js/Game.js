function Game(levelData) {
  this.translatePoint = 2;
  this.element;
  this.background;
  this.level = 1;
  this.map = [];
  this.spawnMap = [];
  this.animation;
  this.frameRate = 60;
  this.pressCounter = 0;
  this.gameOverCounter = 0;
  this.translatedDist = 0;
  this.centerPos = 0;
  this.keys = [];
  this.extras = [];
  this.trollElements = [];
  this.enemies = [];
  this.gameState = 0;
  this.life = 3;
  var that = this;

  this.begin = function () {
    this.startScreen();
    this.keyBinds();
    document.body.addEventListener('keydown', function (e) {
      if (e.keyCode == 13) {
        console.log('enter pressed');
        window.cancelAnimationFrame(that.animation);
        that.animation = window.requestAnimationFrame(that.startGame);
      }
    })
  }

  this.startScreen = function () {
    gameUI.maxWidth = gameUI.viewPort;
    gameUI.clear();
    gameUI.canvas.style.backgroundColor = '#a0b4fa';
    that.gameInit();
    that.drawEnvironments();
    that.drawLevels();
    player.init();
    player.draw();
    gameUI.makeBox((gameUI.viewPort / 3) - 20, player.y, 310, 50);
    gameUI.writeText('Press Enter To Start', gameUI.viewPort / 3, player.y + 30);
  }

  this.startGame = function () {
    switch (that.gameState) {
      case 0:
        that.gameInit();
        that.gameState = 1;
        //console.log('game-init');
        break;
      case 1:
        that.gameRunning();
        break;
      case 2:
        that.gameOver();
        break;
    }
    that.animation = window.requestAnimationFrame(that.startGame);
  }

  this.gameInit = function () {
    for (var i = 0; i < levelData[this.level].length; i++) {
      this.map[i] = levelData[this.level][i].slice();
    }
    for (var i = 0; i < levelData[this.level].length; i++) {
      this.spawnMap[i] = levelData[this.level + '-troll'][i].slice();
    }
    gameUI.row = that.map.length;
    gameUI.column = that.map[0].length;
    gameUI.maxWidth = gameUI.tileSize * gameUI.column;
    gameUI.canvas.style.backgroundColor = '#a0b4fa';
    player.init();
    if (this.element == null)
      this.element = new Element();
    if (this.background == null)
      this.background = new Background();
  }

  this.gameRunning = function () {
    gameUI.clear();
    that.drawEnvironments();
    that.movePlayer();
    that.moveEnemies();
    that.moveExtras();
    that.drawLevels();
    player.moveY();
    player.draw();
    that.wallCollision();
    that.checkPlayerFall();
  }

  that.drawEnvironments = function () {
    var tileSize = gameUI.tileSize;
    for (var row = 0; row < that.map.length; row++) {
      for (var column = 0; column < that.map[row].length; column++) {
        switch (that.map[row][column]) {
          case 50:
            that.background.x = column * tileSize;
            that.background.y = row * tileSize;
            that.background.hill();
            that.background.draw();
            break;
          case 51:
            that.background.x = column * tileSize;
            that.background.y = row * tileSize;
            that.background.cloud();
            that.background.draw();
            break;
        }
      }
    }
  }

  this.drawLevels = function () {
    var tileSize = gameUI.tileSize;
    player.grounded = false;
    for (var i = 0; i < that.enemies.length; i++) {
      that.enemies[i].grounded = false;
    }
    //console.log(map);
    for (var row = 0; row < that.map.length; row++) {
      for (var column = 0; column < that.map[row].length; column++) {
        that.element.row = row;
        that.element.column = column;
        that.element.x = column * tileSize;
        that.element.y = row * tileSize;
        if (that.spawnMap[row][column] != 0) {
          if (player.x > column * tileSize) {
            that.map[row][column] = 0;
            //that.checkBoundary();
          }
        }
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
            enemy.pawn();
            enemy.x = column * tileSize;
            enemy.y = row * tileSize;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 12:
            var enemy = new Enemy();
            enemy.pawn();
            enemy.x = (column * tileSize) + tileSize - enemy.width;
            enemy.y = (row * tileSize) + tileSize - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 21:
            that.element.invisibleBox();
            that.element.draw();
            if (player.y >= (that.element.y + that.element.width / 2)) {
              if (that.gameState == 1)
                that.checkPlayerElementCollision();
            }
            break;
        }
      }
    }
  }

  this.moveEnemies = function () {
    for (var i = 0; i < that.enemies.length; i++) {
      var enemy = that.enemies[i];
      if (player.x > (enemy.x - gameUI.viewPort) && player.x < (enemy.x + gameUI.viewPort)) {
        enemy.movement();
        enemy.draw();
        if (that.gameState == 1) {
          that.checkPlayerEnemyCollision(that.enemies[i], i);
        }
      }
    }
  }

  this.moveExtras = function () {
    for (var i = 0; i < that.extras.length; i++) {
      if (that.extras[i].type == 1) {
        var coin = that.extras[i];
        if (coin.coinCounter < 16) {
          coin.moveCoin();
          coin.draw();
        } else {
          that.extras.splice(i, 1);
        }
      } else if (that.extras[i].type == 2) {
        var brickBall = that.extras[i];
        brickBall.moveDestroyedBrick();
        brickBall.draw();
        if (brickBall.y > (gameUI.viewHeight + gameUI.viewHeight / 2)) {
          that.extras.splice(i, 1);
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
        if (vY > 0 && vY < 45) {
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
    if (that.gameState == 1) {
      var collisionDirection = this.collisionCheck(player, that.element);
      if (collisionDirection == 'b') {
        player.y = that.element.y - player.height;
        player.grounded = true;
        player.jumping = false;
        that.pressCounter = 0;
      } else if (collisionDirection == 'l') {
        player.x = that.element.x + that.element.width;
      } else if (collisionDirection == 'r') {
        player.x = that.element.x - player.width;
        that.afterCollisionLeft(that.element);
      } else if (collisionDirection == 't' && (player.jumpInertia || player.jumping)) {
        player.grounded = false;
        player.jumping = false;
        player.jumpInertia = false;
        player.pressCounter = 30;
        that.afterCollisionBottom(that.element);
      }
    }
  }

  this.afterCollisionBottom = function (element) {
    if (element.type == 5) {
      that.map[element.row][element.column] = 0;
      for (var index = 1; index <= 4; index++) {
        var brickBall = new ExtraElements();
        brickBall.destroyedBrick(index);
        brickBall.setPos(element.x + 13, element.y + 13);
        that.extras.push(brickBall);
      }
    } else if (element.type == 3) {
      var no = Math.floor(Math.random() * 2);
      that.map[element.row][element.column] = 4;
      if (no == 0) {
        var coin = new ExtraElements();
        coin.coin();
        coin.setPos(element.x, element.y - 16);
        that.extras.push(coin);
      } else {
        var enemy = new Enemy();
        enemy.pawn();
        enemy.x = element.x;
        enemy.y = element.y - 16;
        that.enemies.push(enemy);
      }
    } else if (element.type == 21) {
      //console.log('its working');
      that.map[element.row][element.column] = 4;
    }
  }

  this.afterCollisionLeft = function (element) {
    if (element.type == 9) {
      console.log(that.spawnMap[element.column]);
    }
  }

  this.checkPlayerEnemyCollision = function (enemy, index) {
    var collisionDirection = this.collisionCheck(player, enemy);

    if (collisionDirection == 'b') {
      player.grounded = false;
      player.jumping = true;
      player.jumpInertia = false;
      that.pressCounter = 30;
      player.fallSpeedVar = 0;
      that.enemies.splice(index, 1);
    } else if (collisionDirection == 'l') {
      player.x = enemy.x + enemy.width;
      that.playerDie();
    } else if (collisionDirection == 'r') {
      player.x = enemy.x - player.width;
      that.playerDie();
    } else if (collisionDirection == 't') {
      that.playerDie();
    }
  }

  this.checkEnemyElementCollision = function () {
    for (var i = 0; i < that.enemies.length; i++) {
      var enemy = that.enemies[i];
      var collisionDirection = this.collisionCheck(enemy, that.element);
      if (collisionDirection == 'b') {
        enemy.y = that.element.y - enemy.height;
        enemy.grounded = true;
        enemy.jumping = false;
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
    if (that.gameState == 1) {
      if (that.keys[37] || that.keys[65]) {
        //left btn
        player.moveLeft();
      } else if (that.keys[39] || that.keys[68]) {
        //right btn
        this.checkPlayerPos();
        player.moveRight();
      }

      if ((player.grounded || (player.jumpInertia && that.pressCounter < 10)) && (that.keys[38] || that.keys[87])) {
        //jump btn
        that.pressCounter++;
        player.jumping = true;
        player.grounded = false;
      }
    }
  }

  this.checkPlayerFall = function () {
    if (player.y > (gameUI.viewHeight + gameUI.viewHeight / 2)) {
      that.playerDie();
    }
  }

  this.checkPlayerPos = function () {
    this.centerPos = this.translatedDist + gameUI.viewPort / 2;
    //side scrolling as mario reaches center of screen
    if (player.x > that.centerPos && that.centerPos + gameUI.viewPort / 2 < gameUI.maxWidth) {
      gameUI.translate(-player.SPEED, 0);
      that.translatedDist += player.SPEED;
    }
  }

  this.wallCollision = function () {
    if (player.x >= gameUI.maxWidth - player.width) {
      player.x = gameUI.maxWidth - player.width;
    } else if (player.x <= that.translatedDist) {
      player.x = that.translatedDist + 1;
    }
  }

  this.playerDie = function () {
    that.gameState = 2;
    player.jumpSpeedVar = player.JUMPSPEED;
    player.fallSpeedVar = player.FALLSPEED;
    player.jumpInertia = false;
    player.grounded = false;
    player.jumping = true;
    player.sX = 97;
    player.sY = 38;
  }

  this.gameOver = function () {
    that.gameOverCounter++;
    if (that.gameOverCounter < 150) {
      gameUI.clear();
      that.drawEnvironments();
      that.moveEnemies();
      that.drawLevels();
      player.moveY();
      player.draw();
    } else if (that.gameOverCounter == 151) {
      gameUI.translate(that.translatedDist, 0);
    } else if (that.gameOverCounter < 400) {
      gameUI.clear();
      gameUI.canvas.style.backgroundColor = 'black';
      player.x = gameUI.viewPort / 2 - 50;
      player.y = gameUI.viewHeight / 2 - 50;
      player.draw();
      gameUI.writeText('x ' + that.life, player.x + 50, player.y + 30);
    } else if (that.gameOverCounter == 401) {
      that.life--;
      that.resetAll();
      player.resetAll();
      that.gameOverCounter = 0;
      that.gameState = 0;
    }
  }

  this.resetAll = function () {
    this.element = null;
    this.background = null;
    this.level = 1;
    this.map = [];
    this.pressCounter = 0;
    this.translatedDist = 0;
    this.centerPos = 0;
    this.keys = [];
    this.coins = [];
    this.trollElements = [];
    this.enemies = [];
    this.extras = [];
  }


}