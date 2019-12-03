var game1 = new Game();
game1.init();

function Game() {
  this.width = 600;
  this.height = 700;
  this.container;
  this.scoreDiv;
  this.foreGround;
  this.pipes = [];
  this.gap;
  this.bird;
  this.frameRate = 10;
  this.gameLoop;
  this.flapFrames = 0;
  this.flapPeriod = 14;
  this.spawnTime = 360;
  this.gameCounter = 0;
  this.gameState = 0;
  this.scoreCount = 0;
  this.highScore = 0;
  var that = this;

  this.init = function () {
    this.createContainer();
    document.addEventListener('keydown', that.spaceBar);
    that.gameLoop = setInterval(that.gaming, this.frameRate);
  }

  this.createContainer = function () {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('clearfix');
    var container = document.createElement('div');
    container.style.width = this.width + 'px';
    container.style.height = this.height + 'px';
    container.style.border = '1px solid black';
    container.style.overflow = 'hidden';
    container.style.margin = '30px';
    container.style.cssFloat = 'left';
    container.style.position = 'relative';
    container.style.background = 'url("./images/bg.png") top left';
    container.style.backgroundSize = 'contain';
    container.classList.add('container-div');
    body.appendChild(container);
    this.container = container;

    var scoreDiv = document.createElement('div');
    scoreDiv.innerHTML = this.scoreCount;
    scoreDiv.style.position = 'absolute';
    scoreDiv.style.top = '10%';
    scoreDiv.style.left = '44%';
    scoreDiv.style.textAlign = 'center';
    scoreDiv.style.width = '100px';
    scoreDiv.style.height = '62px';
    scoreDiv.style.fontSize = '60px';
    scoreDiv.style.color = 'white';
    scoreDiv.style.zIndex = '200';
    that.container.appendChild(scoreDiv);
    that.scoreDiv = scoreDiv;

    var foreGround = new ForeGround(this.width, this.height, this.container);
    foreGround.init();
    this.foreGround = foreGround;

    var bird = new Bird(this.width, this.height - that.foreGround.height, this.container);
    bird.init();
    this.bird = bird;
  }

  this.gaming = function () {
    switch (that.gameState) {
      case 0:
        //GAME START STATE
        that.bird.startMotion();
        that.updateWings();
        that.bird.draw();
        that.getReady();
        that.flapFrames++;
        //document.addEventListener('keydown', that.gameStart);
        break;
      case 1:
        // GAME STATE
        that.scoreDiv.style.display = 'block';
        that.bird.gravityMotion();
        that.updateWings();
        that.generatePipes();
        that.movePipes();
        that.removePipes();
        if (that.gameState == 1) {
          that.moveForeGround();
        }
        that.flapFrames++;
        break;
      case 2:
        //GAME OVER STATE
        //that.gameOver();
        if (this.scoreCount > this.highScore) {
          this.highScore = this.scoreCount;
        }
        console.log('game-over');
        that.gameOver();
        that.bird.dieMotion();
        break;
    }
  }

  this.spaceBar = function (e) {
    if (e.keyCode === 32) {
      if (that.gameState != 2) {
        that.bird.flap(e);
        that.flapFrames = 0;
        that.gameState = 1;
      }
    }
  }

  this.getReady = function () {
    that.scoreDiv.style.display = 'none';
  }

  this.gameOver = function () {
    that.scoreDiv.style.display = 'none';
  }

  this.moveForeGround = function () {
    that.foreGround.x = (that.foreGround.x - 2) % this.foreGround.repeatInt;
    that.foreGround.draw();
    that.gameState = that.foreGround.collisionDetect(that.bird);
  }

  this.generatePipes = function () {
    that.gameCounter += 2;
    if (that.gameCounter >= that.spawnTime) {
      var centery = getRandom(140, that.height - that.foreGround.height - 100);
      var pipe = new Pipes(that.width, centery, 180, that.container);
      pipe.init();
      that.pipes.push(pipe);
      that.gameCounter = 0;
    }
  }

  this.movePipes = function () {
    for (var i = 0; i < that.pipes.length; i++) {
      (that.pipes[i].centerX) -= 2;
      that.pipes[i].setPosition();
      that.pipes[i].draw();
      that.gameState = that.pipes[i].collisionDetect(that.bird);
      if (that.gameState == 2) {
        break;
      }
      if ((that.pipes[i].centerX + that.pipes[i].width) == that.bird.x) {
        that.scoreCount++;
        that.scoreDiv.innerHTML = that.scoreCount;
      }
    }
  }

  this.removePipes = function () {
    for (var i = 0; i < that.pipes.length; i++) {
      if ((that.pipes[i].centerX + that.pipes[i].width) < 0) {
        that.container.removeChild(that.pipes[i].topElement);
        that.container.removeChild(that.pipes[i].bottomElement);
        that.pipes.splice(i, 1);
      }
    }
  }

  this.removeAllPipes = function () {
    for (var i = 0; i < that.pipes.length; i++) {
      that.container.removeChild(that.pipes[i].topElement);
      that.container.removeChild(that.pipes[i].bottomElement);
    }
    this.pipes.splice(0, that.pipes.length);
  }

  this.updateWings = function () {
    that.bird.frame += (that.flapFrames % that.flapPeriod == 0 ? 1 : 0);
    that.bird.frame = that.bird.frame % that.bird.images.length;
  }

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}