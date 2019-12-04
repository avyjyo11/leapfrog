var game1 = new Game();
game1.init();
var game2 = new Game(600, 700, 38, 'Up Arrow');
game2.init();

function Game(width, height, keycode, keychar) {
  this.width = width || 600;
  this.height = height || 700;
  this.container;
  this.scoreDiv;
  this.getReadyDiv;
  this.startScreenDiv;
  this.keychar = keychar || 'Space';
  this.playBtn;
  this.keycode = keycode || 32;
  this.foreGround;
  this.pipes = [];
  this.gap = 160;
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
  this.overDiv;
  this.scorepointDiv;
  this.highscoreDiv;
  this.reStartBtn;
  var that = this;

  this.init = function () {
    that.createContainer();
    that.creataStartScreen();
    that.createOverScreen();
    that.playBtn.addEventListener('click', that.playBtnEvent);
    that.reStartBtn.addEventListener('click', that.reStartBtnEvent);
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

    var getReadyDiv = document.createElement('div');
    getReadyDiv.style.position = 'absolute';
    getReadyDiv.style.top = 100 + 'px';
    getReadyDiv.style.left = 160 + 'px';
    getReadyDiv.style.width = 350 + 'px';
    getReadyDiv.style.height = 360 + 'px';
    getReadyDiv.style.zIndex = '290';
    getReadyDiv.style.textAlign = 'center';
    getReadyDiv.style.fontSize = '30px';
    getReadyDiv.classList.add('get-ready');
    getReadyDiv.innerHTML = 'Press ' + that.keychar;
    that.container.appendChild(getReadyDiv);
    that.getReadyDiv = getReadyDiv;

    var getReadyPic = document.createElement('img');
    getReadyPic.src = './images/get-ready.png';
    getReadyPic.alt = 'getready';
    getReadyPic.style.width = 350 + 'px';
    getReadyPic.style.height = 260 + 'px';
    that.getReadyDiv.appendChild(getReadyPic);

    //that.getReadyDiv.innerHTML = 'Press Space';

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
    scoreDiv.classList.add('score-div');
    that.container.appendChild(scoreDiv);
    that.scoreDiv = scoreDiv;

    var foreGround = new ForeGround(this.width, this.height, this.container);
    foreGround.init();
    this.foreGround = foreGround;

    var bird = new Bird(this.width, this.height - that.foreGround.height, this.container);
    bird.init();
    this.bird = bird;
  }

  this.creataStartScreen = function () {
    var startScreenDiv = document.createElement('div');
    startScreenDiv.style.position = 'absolute';
    startScreenDiv.style.top = 0 + 'px';
    startScreenDiv.style.left = 0 + 'px';
    startScreenDiv.style.textAlign = 'center';
    startScreenDiv.style.width = this.width + 'px';
    startScreenDiv.style.height = this.height + 'px';
    startScreenDiv.style.fontSize = '60px';
    startScreenDiv.style.color = 'white';
    startScreenDiv.style.zIndex = '500';
    startScreenDiv.style.background = 'url("./images/bg.png") top left';
    startScreenDiv.style.backgroundSize = 'contain';
    startScreenDiv.classList.add('start-screen');
    that.container.appendChild(startScreenDiv);
    that.startScreenDiv = startScreenDiv;

    var logo = document.createElement('div');
    logo.style.margin = '60px auto';
    logo.style.background = 'url("./images/logoTitle.png") center';
    logo.style.backgroundSize = 'contain';
    logo.style.width = '440px';
    logo.style.height = '140px';
    logo.classList.add('logo');
    that.startScreenDiv.appendChild(logo);

    var playBtn = document.createElement('button');
    playBtn.style.margin = '100px auto';
    playBtn.style.display = 'block';
    playBtn.style.background = 'url("./images/play-button.png") center';
    playBtn.style.backgroundSize = 'cover';
    playBtn.style.width = '200px';
    playBtn.style.height = '120px';
    playBtn.style.border = 'none';
    playBtn.classList.add('playBtn');
    that.startScreenDiv.appendChild(playBtn);
    that.playBtn = playBtn;
  }

  this.createOverScreen = function () {
    var over = document.createElement('div');
    over.style.position = 'absolute';
    over.style.background = 'url(images/game-over.png)';
    over.style.backgroundSize = 'cover';
    over.style.width = '480px';
    over.style.height = '370px';
    over.style.zIndex = '100';
    over.style.left = '60px';
    over.style.top = '60px';
    that.container.appendChild(over);
    that.overDiv = over;

    var score = document.createElement('div');
    score.innerHTML = this.scoreCount;
    score.style.position = 'absolute';
    score.style.top = '240px';
    score.style.left = '420px';
    score.style.fontSize = '40px';
    score.style.zIndex = '100';
    score.style.color = 'white';
    that.container.appendChild(score);
    that.scorepointDiv = score;

    var high = document.createElement('div');
    high.innerHTML = this.highScore;
    high.style.position = 'absolute';
    high.style.top = '340px';
    high.style.left = '420px';
    high.style.fontSize = '40px';
    high.style.zIndex = '100';
    high.style.color = 'white';
    that.container.appendChild(high);
    that.highscoreDiv = high;

    var reStartBtn = document.createElement('div');
    reStartBtn.style.background = 'url(images/startBtn.png)';
    reStartBtn.style.position = 'absolute';
    reStartBtn.style.top = '450px';
    reStartBtn.style.left = '220px';
    reStartBtn.style.zIndex = '100';
    reStartBtn.style.width = '180px';
    reStartBtn.style.height = '70px';
    reStartBtn.style.backgroundSize = 'cover';
    that.container.appendChild(reStartBtn);
    that.reStartBtn = reStartBtn;
  }

  this.playBtnEvent = function () {
    that.container.removeChild(that.startScreenDiv);
  }

  this.reStartBtnEvent = function () {
    that.removeAllPipes();
    that.scoreCount = 0;
    that.gameState = 0;
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
        if (that.scoreCount > that.highScore) {
          that.highScore = that.scoreCount;
          that.highscoreDiv.innerHTML = that.highScore;
        }
        console.log('game-over');
        that.gameOver();
        that.bird.dieMotion();
        break;
    }
  }

  this.spaceBar = function (e) {
    //console.log(String.fromCharCode(38));
    if (e.keyCode === that.keycode) {
      if (that.gameState != 2) {
        if (that.gameState == 0) {
          that.getReadyDiv.style.display = 'none';
        }
        that.bird.flap();
        that.flapFrames = 0;
        that.gameState = 1;
      }
    }
  }

  this.getReady = function () {
    that.scoreDiv.innerHTML = that.scoreCount;
    that.scorepointDiv.innerHTML = that.scoreCount;
    that.scoreDiv.style.display = 'none';
    that.getReadyDiv.style.display = 'block';
    that.overDiv.style.display = 'none';
    that.scorepointDiv.style.display = 'none';
    that.highscoreDiv.style.display = 'none';
    that.reStartBtn.style.display = 'none';
  }

  this.gameOver = function () {
    that.scoreDiv.style.display = 'none';
    that.overDiv.style.display = 'block';
    that.scorepointDiv.style.display = 'block';
    that.highscoreDiv.style.display = 'block';
    that.reStartBtn.style.display = 'block';
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
      var pipe = new Pipes(that.width, centery, that.gap, that.container);
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
        that.scorepointDiv.innerHTML = that.scoreCount;
        that.highscoreDiv.innerHTML = that.highScore;
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