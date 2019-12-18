function Game(levelMaps, levelData, level) {
  this.gamesound;
  this.bgm;
  this.translatePoint = 2;
  this.blockSet;
  this.element;
  this.background;
  this.level = level;
  this.levelBlockSet;
  this.map = [];
  this.animation;
  this.frameRate = 60;
  this.pressCounter = 0;
  this.gameOverCounter = 0;
  this.stageClearCounter = 0;
  this.translatedDist = 0;
  this.centerPos = 0;
  this.keys = [];
  this.extras = [];
  this.trollElements = [];
  this.enemies = [];
  this.gameState = 0;
  this.life = 3;
  this.start = false;
  this.saveCheckpointPos = 0;
  this.initialPlayerX = 84;
  this.savePlayerX = this.initialPlayerX;
  this.savePlayerY = gameUI.viewHeight / 2;
  var that = this;

  this.begin = function () {
    this.resetAll();
    this.gamesound = new GameSound();
    that.gamesound.init();
    gameUI.blockSet = levelData[this.level + '-blockSet'];
    this.startScreen();
    this.keyBinds();
    document.body.addEventListener('keydown', function (e) {
      if (e.keyCode == 13) {
        console.log('enter pressed');
        if (!(that.start)) {
          that.resetAll();
          that.start = true;
        }
        window.cancelAnimationFrame(that.animation);
        that.animation = window.requestAnimationFrame(that.startGame);
      } else if (e.keyCode == 80) {
        window.cancelAnimationFrame(that.animation);
        gameUI.makeBox(0, gameUI.viewHeight / 2, gameUI.viewPort, 50);
        gameUI.writeText('Press Enter To Resume', that.translatedDist + gameUI.viewPort / 4, gameUI.viewHeight / 2 + 30);
      }
    });

  }

  this.startScreen = function () {
    gameUI.maxWidth = gameUI.viewPort;
    gameUI.clear();
    gameUI.canvas.style.backgroundColor = levelData[this.level + '-bgcolor'];
    that.gameInit();
    that.drawEnvironments();
    that.drawLevels();
    player.draw();
    gameUI.makeBox(0, gameUI.viewHeight / 2, gameUI.viewPort, 50);
    gameUI.writeText('Press Enter To Start', gameUI.viewPort / 4, gameUI.viewHeight / 2 + 30);
    gameUI.writeText('Arrow Keys or WASD For Movements', 40, 30, 'black');
    gameUI.writeText('Press P To Pause the Game', 40, 60, 'black');
  }

  this.startGame = function () {
    switch (that.gameState) {
      case 0:
        that.gameInit();
        that.gamesound.play(that.bgm);
        that.gameState = 1;
        //console.log('game-init');
        break;
      case 1:
        that.gameRunning();
        if (player.x < gameUI.viewPort * 2) {
          gameUI.writeText('Arrow Keys or WASD For Movements', 40, 30, 'black');
          gameUI.writeText('Press P To Pause the Game', 40, 60, 'black');
        }
        break;
      case 2:
        that.gameOver();
        break;
      case 3:
        that.stageCleared();
        break;
    }
    that.animation = window.requestAnimationFrame(that.startGame);
  }

  this.gameInit = function () {
    this.bgm = levelData[this.level + '-bgm'];
    for (var i = 0; i < levelMaps[this.level].length; i++) {
      this.map[i] = levelMaps[this.level][i].slice();
    }
    gameUI.row = that.map.length;
    gameUI.column = that.map[0].length;
    gameUI.maxWidth = gameUI.tileSize * gameUI.column;
    gameUI.canvas.style.backgroundColor = levelData[this.level + '-bgcolor']; //'#a0b4fa';
    gameUI.blockSet = levelData[this.level + '-blockSet'];
    player.init(that.savePlayerX, that.savePlayerY);
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
    that.moveTrollElements();
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
          //81 to 99 for backgrounds
          case 81:
            that.background.x = column * tileSize;
            that.background.y = row * tileSize;
            that.background.hill();
            that.background.draw();
            break;
          case 82:
            that.background.x = column * tileSize;
            that.background.y = row * tileSize;
            that.background.grass();
            that.background.draw();
            break;
          case 83:
            that.background.x = column * tileSize;
            that.background.y = row * tileSize;
            that.background.cloud();
            that.background.draw();
            break;
          case 84:
            that.background.x = column * tileSize;
            that.background.y = row * tileSize;
            that.background.castle();
            that.background.draw();
            break;
          case 85:
            that.background.x = column * tileSize;
            that.background.y = (row * tileSize) - tileSize / 2;
            that.background.tree1();
            that.background.draw();
            break;
          case 86:
            that.background.x = column * tileSize;
            that.background.y = (row * tileSize) - tileSize;
            that.background.tree2();
            that.background.draw();
            break;
          case 80:
            var checkpoint = new ExtraElements();
            checkpoint.x = column * tileSize;
            checkpoint.y = row * tileSize - tileSize;
            checkpoint.checkpointBox();
            checkpoint.draw();
            that.extras.push(checkpoint);
            that.map[row][column] = 0;
        }
      }
    }
  }

  this.drawLevels = function () {
    var tileSize = gameUI.tileSize;
    var saveX1, saveX2;
    var trollCount = 0;
    player.grounded = false;
    for (var i = 0; i < that.enemies.length; i++) {
      that.enemies[i].grounded = false;
    }
    //console.log(map);
    for (var row = 0; row < that.map.length; row++) {
      for (var column = 0; column < that.map[row].length; column++) {
        if (that.map[row][column] == 42 || that.map[row][column] == 43 || that.map[row][column] == 44) {
          trollCount++;
        } else {
          trollCount = 0;
        }
        if (trollCount == 1) {
          saveX1 = column * tileSize;
          var c = column;
          while (that.map[row][c] == 42 || that.map[row][c] == 43 || that.map[row][c] == 44) {
            saveX2 = (c * tileSize) + tileSize;
            c++;
          }
        }
        that.element.row = row;
        that.element.column = column;
        that.element.x = column * tileSize;
        that.element.y = row * tileSize;
        switch (that.map[row][column]) {
          //1 to 20 for elements
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
            that.element.coinBox();
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
            that.element.invisibleBox();
            that.element.draw();
            if (player.y >= (that.element.y + that.element.width / 2) && (player.jumping || player.jumpInertia)) {
              if (that.gameState == 1)
                that.checkPlayerElementCollision();
            }
            that.checkEnemyElementCollision();
            break;
          case 12:
            that.element.pole();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 13:
            that.element.poleTop();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 14:
            that.element.enemyBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 15:
            that.element.trollStarBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
          case 16:
            that.element.trollPowerBox();
            that.element.draw();
            that.checkPlayerElementCollision();
            that.checkEnemyElementCollision();
            break;
            //21 to 40 for enemies
          case 21:
            var enemy = new Enemy();
            enemy.pawn();
            enemy.x = (column * tileSize) + tileSize - enemy.width;
            enemy.y = (row * tileSize) + tileSize - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 23:
            var enemy = new Enemy();
            enemy.flyer();
            enemy.x = (column * tileSize) + tileSize - enemy.width + tileSize / 2;
            enemy.y = (row * tileSize) + tileSize - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            //because this type enemy only spawns from pipes
            that.map[row][column] = 7;
            break;
          case 24:
            var enemy = new Enemy();
            enemy.kingPawn();
            enemy.x = (column * tileSize) + tileSize - enemy.width;
            enemy.y = (row * tileSize) + tileSize - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 25:
            var enemy = new Enemy();
            enemy.flyerDown();
            enemy.x = (column * tileSize) + tileSize - enemy.width + tileSize / 2;
            enemy.y = (row * tileSize) - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 26:
            var enemy = new Enemy();
            enemy.turtle();
            enemy.x = (column * tileSize) + tileSize - enemy.width;
            enemy.y = (row * tileSize) + tileSize - enemy.height;
            enemy.draw();
            that.enemies.push(enemy);
            that.map[row][column] = 0;
            break;
          case 40:
            if (player.x > column * tileSize) {
              var j = 0;
              while (that.map[row][column + j] == 40) {
                that.map[row][column + j] = 0;
                j++;
              }
              for (var i = 0; i < j; i++) {
                var enemy = new Enemy();
                enemy.pawn();
                enemy.x = ((column + i) * tileSize) + tileSize - enemy.width;
                enemy.y = (row * tileSize) - enemy.height;
                enemy.draw();
                that.enemies.push(enemy);
              }
            }
            break;
            //41 to 60 for troll elements
          case 41:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.irritatingBox();
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
          case 42:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.fallingBox(saveX1, saveX2, 2);
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
          case 43:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.fallingBox(saveX1, saveX2, 3);
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
          case 44:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.fallingBox(saveX1, saveX2, 4);
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
          case 45:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.trollCloud();
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
          case 46:
            if (player.x + player.width > column * tileSize && player.jumping) {
              var troll = new TrollElements();
              troll.x = (column + 4) * tileSize;
              troll.y = (row - 2) * tileSize;
              troll.yellowRect();
              that.trollElements.push(troll);
              that.map[row][column] = 0;
            }
            break;
          case 47:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.trollBlockBox();
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
          case 48:
            var troll = new TrollElements();
            troll.setPos(that.element.x, that.element.y);
            troll.trollInvisibleCloud();
            troll.draw();
            that.trollElements.push(troll);
            that.map[row][column] = 0;
            break;
            //finish Line
          case 100:
            that.element.finishLine();
            that.element.draw();
            that.checkPlayerElementCollision();
            break;
        }
      }
    }
  }

  this.moveEnemies = function () {
    for (var i = 0; i < that.enemies.length; i++) {
      var enemy = that.enemies[i];
      if (player.x + player.width > (enemy.x - gameUI.viewPort) && player.x < (enemy.x + enemy.width + gameUI.viewPort) && enemy.y > -(gameUI.viewHeight) && enemy.y < gameUI.viewHeight + gameUI.viewHeight) {
        enemy.movement();
        enemy.draw();
        if (that.gameState == 1 && !enemy.dead) {
          that.checkPlayerEnemyCollision(that.enemies[i], i);
          if (enemy.type == 8 || enemy.type == 11) {
            that.checkEnemyEnemyCollision(enemy, i);
          }
        }
      } else if (enemy.x + enemy.width + gameUI.viewPort < player.x) {
        that.enemies.splice(i, 1);
      }
    }
  }

  that.moveTrollElements = function () {
    for (var i = 0; i < that.trollElements.length; i++) {
      var troll = that.trollElements[i];
      if (player.x + player.width > (troll.x - gameUI.viewPort) && player.x < (troll.x + gameUI.viewPort)) {
        troll.movement();
        troll.draw();
        if (that.gameState == 1) {
          that.checkPlayerTrollCollision(that.trollElements[i]);
          that.checkEnemyTrollCollision(that.trollElements[i]);
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
      } else if (that.extras[i].type == 3) {
        var checkpoint = that.extras[i];
        checkpoint.draw();
        if (player.x > checkpoint.x && player.x < checkpoint.x + checkpoint.width && player.y > checkpoint.y && player.y < checkpoint.y + checkpoint.height) {
          that.saveCheckpointPos = that.translatedDist;
          that.savePlayerX = checkpoint.x;
          that.savePlayerY = checkpoint.y;
          that.extras.splice(i, 1);
        }
      }
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
    var element = that.element;
    if (that.gameState == 1) {
      var collisionDirection = this.collisionCheck(player, that.element);
      if (that.element.type == 100) {
        if (collisionDirection == 'l' || collisionDirection == 'r' || collisionDirection == 't' || collisionDirection == 'b') {
          that.gameState = 3;
        }
      } else if (player.type == 'big') {
        if (collisionDirection == 't' || collisionDirection == 'b' || collisionDirection == 'l' || collisionDirection == 'r') {
          that.map[element.row][element.column] = 0;
          that.gamesound.play('blockbreak');
          for (var index = 1; index <= 4; index++) {
            var brickBall = new ExtraElements();
            brickBall.destroyedBrick(index);
            brickBall.setPos(element.x + 13, element.y + 13);
            that.extras.push(brickBall);
          }
        }
      } else {
        if (collisionDirection == 'b') {
          player.y = that.element.y - player.height;
          player.grounded = true;
          player.jumping = false;
          that.pressCounter = 0;
        } else if (collisionDirection == 'l') {
          player.x = that.element.x + that.element.width;
        } else if (collisionDirection == 'r') {
          player.x = that.element.x - player.width;
        } else if (collisionDirection == 't' && (player.jumpInertia || player.jumping)) {
          player.grounded = false;
          player.jumping = false;
          player.jumpInertia = false;
          player.pressCounter = 30;
          that.afterCollisionBottom(that.element);
        }
      }
    }
  }

  this.afterCollisionBottom = function (element) {
    if (element.type == 5) {
      that.map[element.row][element.column] = 0;
      that.gamesound.play('blockbreak');
      for (var index = 1; index <= 4; index++) {
        var brickBall = new ExtraElements();
        brickBall.destroyedBrick(index);
        brickBall.setPos(element.x + 13, element.y + 13);
        that.extras.push(brickBall);
      }
    } else if (element.type == 3) {
      var coin = new ExtraElements();
      coin.coin();
      coin.setPos(element.x, element.y - 16);
      that.extras.push(coin);
      that.gamesound.play('coin');
      that.map[element.row][element.column] = 4;
    } else if (element.type == 14 || element.type == 15 || element.type == 16) {
      var enemy = new Enemy();
      if (element.type == 14)
        enemy.pawnFromBox(element.y);
      else if (element.type == 15)
        enemy.trollStarFromBox(element.y);
      else if (element.type == 16)
        enemy.trollPowerUpFromBox(element.y);
      enemy.x = element.x;
      enemy.y = element.y - 10;
      that.enemies.push(enemy);
      that.gamesound.play('dokan');
      that.map[element.row][element.column] = 4;
    } else if (element.type == 11) {
      that.map[element.row][element.column] = 4;
      that.gamesound.play('jumpBlock');
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
      that.gamesound.play('humi');
      if (enemy.type == 1) {
        that.enemies.splice(index, 1);
      } else if (enemy.type == 3 || enemy.type == 4 || enemy.type == 5) {
        that.playerDie();
      } else if (enemy.type == 6) {
        enemy.turtleStop();
      } else if (enemy.type == 7) {
        enemy.turtleGo();
        if (player.x + (player.width / 2) < enemy.x + (enemy.width / 2)) {
          enemy.speed = -enemy.speed;
        }
      } else if (enemy.type == 8) {
        enemy.turtleStop();
      } else if (enemy.type == 11 || enemy.type == 12) {
        player.trollPowerUp();
        that.enemies.splice(index, 1);
      }
    } else if (collisionDirection == 'l') {
      player.x = enemy.x + enemy.width;
      if (enemy.type == 7) {
        enemy.turtleGo();
      } else if (enemy.type == 11 || enemy.type == 12) {
        player.trollPowerUp();
        that.enemies.splice(index, 1);
      } else {
        that.playerDie();
      }
    } else if (collisionDirection == 'r') {
      player.x = enemy.x - player.width;
      if (enemy.type == 7) {
        enemy.turtleGo();
        enemy.speed = -enemy.speed;
      } else if (enemy.type == 11 || enemy.type == 12) {
        player.trollPowerUp();
        that.enemies.splice(index, 1);
      } else {
        that.playerDie();
      }
    } else if (collisionDirection == 't') {
      if (enemy.type == 11 || enemy.type == 12) {
        player.trollPowerUp();
        that.enemies.splice(index, 1);
      } else {
        that.playerDie();
      }
    }
  }

  this.checkPlayerTrollCollision = function (troll, index) {
    var collisionDirection = this.collisionCheck(player, troll);
    if (collisionDirection == 'b') {
      player.y = troll.y - player.height;
      player.grounded = true;
      player.jumping = false;
      that.pressCounter = 0;
      if (troll.type == 5 || troll.type == 7 || troll.type == 8) {
        if (troll.type == 5) {
          troll.sX = 477;
          troll.sY = 134;
        } else if (troll.type == 7) {
          troll.trollBlockBoxHit = true;
        } else if (troll.type == 8) {
          troll.sX = 548;
          troll.sY = 135;
        }
        that.playerDie();
      }
    } else if (collisionDirection == 'l') {
      if (troll.type == 5 || troll.type == 7 || troll.type == 6 || troll.type == 8) {
        if (troll.type == 5) {
          troll.sX = 477;
          troll.sY = 134;
        } else if (troll.type == 7) {
          troll.trollBlockBoxHit = true;
        } else if (troll.type == 8) {
          troll.sX = 548;
          troll.sY = 135;
        }
        that.playerDie();
      } else {
        player.x = troll.x + troll.width;
      }
    } else if (collisionDirection == 'r') {
      if (troll.type == 5 || troll.type == 7 || troll.type == 6 || troll.type == 8) {
        if (troll.type == 5) {
          troll.sX = 477;
          troll.sY = 134;
        } else if (troll.type == 7) {
          troll.trollBlockBoxHit = true;
        } else if (troll.type == 8) {
          troll.sX = 548;
          troll.sY = 135;
        }
        that.playerDie();
      } else {
        player.x = troll.x - player.width;
      }
    } else if (collisionDirection == 't') {
      if (troll.type == 5) {
        troll.sX = 477;
        troll.sY = 134;
      } else if (troll.type == 8) {
        troll.sX = 548;
        troll.sY = 135;
      }
      that.playerDie();
    }
  }

  this.checkEnemyElementCollision = function () {
    for (var i = 0; i < that.enemies.length; i++) {
      var enemy = that.enemies[i];
      if (enemy.type == 13) {
        var collisionDirection = this.collisionCheck(enemy, that.element);
        if (collisionDirection == 'b') {
          that.map[that.element.row][that.element.column] = 0;
          that.gamesound.play('blockbreak');
          for (var index = 1; index <= 4; index++) {
            var brickBall = new ExtraElements();
            brickBall.destroyedBrick(index);
            brickBall.setPos(that.element.x + 13, that.element.y + 13);
            that.extras.push(brickBall);
          }
        }
      } else if (enemy.type != 2 && enemy.type != 3 && enemy.type != 5 && enemy.type != 12 && enemy.type != 10 && !enemy.dead) {
        var collisionDirection = this.collisionCheck(enemy, that.element);
        if (collisionDirection == 'b') {
          enemy.y = that.element.y - enemy.height;
          enemy.grounded = true;
          enemy.jumping = false;
        } else if (collisionDirection == 'l' || collisionDirection == 'r') {
          enemy.speed = -enemy.speed;
          if (that.element.type == 11) {
            that.map[that.element.row][that.element.column] = 4;
            that.gamesound.play('jumpBlock');
          }
        } else if (collisionDirection == 't') {
          enemy.grounded = false;
          enemy.jumping = false;
          enemy.jumpInertia = false;
        }
      }
    }
  }

  this.checkEnemyTrollCollision = function (troll) {
    for (var i = 0; i < that.enemies.length; i++) {
      var enemy = that.enemies[i];
      if (enemy.type != 2 && enemy.type != 10 && enemy.type != 12 && enemy.type != 3 && enemy.type != 5 && !enemy.dead) {
        var collisionDirection = this.collisionCheck(enemy, troll);
        if (collisionDirection == 'b') {
          enemy.y = troll.y - enemy.height;
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
  }

  this.checkEnemyEnemyCollision = function (enemy, enemyI) {
    for (var j = 0; j < that.enemies.length; j++) {
      var enemy2 = that.enemies[j];
      if (enemy != enemy2 && !enemy2.dead) {
        var collisionDirection = this.collisionCheck(enemy, enemy2);
        if (collisionDirection == 'b' || collisionDirection == 'l' || collisionDirection == 'r') {
          if (enemy.type == 8) {
            enemy2.jumping = true;
            enemy2.dead = true;
            that.gamesound.play('humi');
            if (enemy2.type == 1)
              enemy2.sY = 121;
          } else if (enemy.type == 11) {
            enemy2.bigPawn();
            enemy2.x = enemy2.x - 20;
            enemy2.y = enemy2.y - 35;
            that.enemies.splice(enemyI, 1);
          }
        }
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
        if (this.pressCounter == 1)
          this.gamesound.play('jump');
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
    player.sWidth = 20;
    player.sHeight = 34;
    player.width = 32;
    player.height = 50;
    that.gamesound.stop(that.bgm);
    that.gamesound.play('death');
  }

  this.gameOver = function () {
    that.gameOverCounter++;
    if (that.gameOverCounter == 1) {
      that.life--;
    } else if (that.gameOverCounter < 150) {
      gameUI.clear();
      that.drawEnvironments();
      that.moveEnemies();
      that.drawLevels();
      that.moveTrollElements();
      player.moveY();
      player.draw();
    } else if (that.gameOverCounter == 151) {
      gameUI.translate(that.translatedDist, 0);
    } else if (that.gameOverCounter < 400) {
      gameUI.clear();
      gameUI.canvas.style.backgroundColor = 'black';
      player.x = gameUI.viewPort / 2 - 50;
      player.y = gameUI.viewHeight / 2 - 50;
      player.sWidth = 20;
      player.sHeight = 34;
      player.width = 32;
      player.height = 50;
      player.draw();
      gameUI.writeText('x ' + that.life, player.x + 50, player.y + 30);
    } else if (that.gameOverCounter == 401) {
      gameUI.translate(-that.saveCheckpointPos, 0);
      that.resetAll();
      player.resetAll();
      that.gameOverCounter = 0;
      that.gameState = 0;
    }
  }

  this.resetAll = function () {
    gameUI.clear();
    this.element = null;
    this.background = null;
    this.map = [];
    this.pressCounter = 0;
    this.translatedDist = that.saveCheckpointPos;
    this.centerPos = this.translatedDist + gameUI.viewPort / 2;
    this.keys = [];
    this.coins = [];
    this.trollElements = [];
    this.enemies = [];
    this.extras = [];
  }

  this.stageCleared = function () {
    that.stageClearCounter++;
    if (that.stageClearCounter == 1) {
      that.gamesound.stop(levelData[that.level + '-bgm']);
      that.gamesound.play('clear');
    } else if (that.stageClearCounter < 150) {
      gameUI.clear();
      that.drawEnvironments();
      that.drawLevels();
      player.playerHappy();
      player.draw();
    } else if (that.stageClearCounter < 300) {
      gameUI.clear();
      that.drawEnvironments();
      that.drawLevels();
    } else if (that.stageClearCounter == 301) {
      gameUI.translate(that.translatedDist, 0);
    } else if (that.stageClearCounter < 500) {
      gameUI.clear();
      gameUI.canvas.style.backgroundColor = 'black';
      gameUI.writeText('LEVEL ' + that.level + ' CLEARED', gameUI.viewPort / 4, gameUI.viewHeight / 2);
    } else if (that.stageClearCounter == 501) {
      var nextLevel;
      for (var i = 0; i < Object.keys(levelMaps).length; i++) {
        if (that.level == Object.keys(levelMaps)[i]) {
          nextLevel = Object.keys(levelMaps)[i + 1];
          if (nextLevel == null) {
            nextLevel = Object.keys(levelMaps)[i];
          }
        }
      }
      that.saveCheckpointPos = 0;
      that.savePlayerX = that.initialPlayerX;
      that.savePlayerY = gameUI.viewHeight / 2;
      player.resetAll();
      that.resetAll();
      that.life = 3;
      that.level = nextLevel;
      that.stageClearCounter = 0;
      that.gameState = 0;
    }
  }

}