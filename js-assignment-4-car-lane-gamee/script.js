var game1 = new CarLaneGame(412, 650);
game1.init();

function CarLaneGame(width, height) {
  this.width = width;
  this.height = height;
  this.start;
  this.transition = 10;
  this.gameCounter = 0;
  this.level = 1;
  this.gamePause = true;
  this.scoreCount = 0;
  this.scoreInterval = 40;
  this.spawnTime = getRandom(300, 400);
  this.bgIncrease = 0;
  this.increaseBy = 1;
  this.highScore = 0;
  this.backGround;
  this.myCar;
  this.myCarIndex = 1;
  this.lanes = [0, 126, 252];
  this.otherVehicles = [];
  this.noOfLanes = this.lanes.length;
  this.container;
  this.levelDiv;
  this.scoreDiv;
  this.playBtn;
  this.pauseBtn;
  this.logoBgDiv;
  this.tryAgainBtn;
  this.startBtn;
  this.highScoreDiv;
  var that = this;

  this.init = function () {
    this.createContainer();
    this.generateMyCar();
    this.startBtn.addEventListener('click', function () {
      this.logoBgDiv.style.display = 'none';
    }.bind(this));
    this.playBtn.addEventListener('click', function () {
      this.gamePause = false;
      this.pauseBtn.style.display = 'block';
      this.playBtn.style.display = 'none';
    }.bind(this));
    this.pauseBtn.addEventListener('click', function () {
      this.gamePause = true;
      this.pauseBtn.style.display = 'none';
      this.playBtn.style.display = 'block';
    }.bind(this));
    this.tryAgainBtn.addEventListener('click', function () {
      this.gamePause = false;
      this.levelDiv.innerHTML = 'Level: ' + this.level;
      that.scoreDiv.innerHTML = 'Score: ' + this.scoreCount;
      this.tryAgainBtn.style.display = 'none';
      this.pauseBtn.style.display = 'block';
      this.removeAllCarDivs();
      that.otherVehicles.splice(0, that.otherVehicles.length);
      this.myCarIndex = 1;
      this.myCar.lane = this.lanes[this.myCarIndex];
      this.myCar.setPosition();
      this.myCar.draw();
    }.bind(this));
    document.addEventListener("keydown", this.moveMyCar.bind(this));
    this.start = setInterval(this.gaming.bind(this), this.transition);
  }

  this.gaming = function () {
    if (this.gamePause == false) {
      this.moveBackground();
      this.gameCounter += this.increaseBy;
      this.randomVehicles();
      this.checkCollision();
      this.removeCars();
      this.moveRandomCars();
    }
  }

  this.createContainer = function () {
    var body = document.getElementsByTagName('body')[0];
    var bodyContainer = document.createElement('div');
    bodyContainer.style.width = this.width + 350 + 'px';
    bodyContainer.style.height = this.height + 'px';
    bodyContainer.style.margin = '20px auto';
    bodyContainer.classList.add('body-container', 'clearfix');
    body.appendChild(bodyContainer);

    var logoBgDiv = document.createElement('div');
    logoBgDiv.style.width = this.width + 350 + 'px';
    logoBgDiv.style.height = this.height + 'px';
    logoBgDiv.classList.add('logo-bg');
    bodyContainer.appendChild(logoBgDiv);
    this.logoBgDiv = logoBgDiv;

    var logo = document.createElement('img')
    logo.src = './images/logo.gif';
    logo.alt = 'logo';
    logo.style.width = 300 + 'px';
    logo.style.height = 400 + 'px';
    logo.style.display = 'block';
    logo.style.margin = '30px auto';
    logoBgDiv.appendChild(logo);

    var startBtn = document.createElement('button');
    startBtn.innerHTML = 'START GAME';
    startBtn.style.border = '2px solid white';
    startBtn.style.padding = '16px';
    startBtn.style.color = 'white';
    logoBgDiv.appendChild(startBtn);
    this.startBtn = startBtn;

    var mainContainer = document.createElement('div');
    mainContainer.style.width = this.width + 'px';
    mainContainer.style.height = this.height + 'px';
    mainContainer.style.cssFloat = 'left';
    mainContainer.classList.add('main-container');
    bodyContainer.appendChild(mainContainer);

    var carContainer = document.createElement('div');
    carContainer.style.height = this.height + 'px';
    carContainer.style.width = '372px'; /*90.291262%*/
    carContainer.classList.add('car-container');
    carContainer.style.top = 0 + 'px';
    carContainer.style.left = '50%';
    carContainer.style.transform = 'translate(-50%)';
    mainContainer.appendChild(carContainer);
    this.container = carContainer;

    var backGround = document.createElement('div');
    backGround.classList.add('backGround');
    backGround.style.width = this.width + 'px';
    backGround.style.height = this.height + 50 + 'px';
    backGround.style.background = 'url("./images/carLane-400.png") top left';
    backGround.style.backgroundRepeat = 'repeat-y';
    backGround.style.backgroundSize = 'contain';
    backGround.style.left = 0 + 'px';
    backGround.style.top = -50 + 'px';
    mainContainer.appendChild(backGround);
    this.backGround = backGround;

    var scoreBoard = document.createElement('div');
    scoreBoard.style.padding = 50 + 'px';
    scoreBoard.style.width = 250 + 'px';
    scoreBoard.style.height = this.height - 100 + 'px';
    scoreBoard.style.cssFloat = 'right';
    scoreBoard.style.textAlign = 'center';
    scoreBoard.classList.add('score-board');
    bodyContainer.appendChild(scoreBoard);

    var scoreDiv = document.createElement('div');
    scoreDiv.style.width = 248 + 'px';
    scoreDiv.style.border = '1px solid';
    scoreDiv.style.textAlign = 'center';
    scoreDiv.style.lineHeight = 60 + 'px';
    scoreDiv.innerHTML = 'Score: ' + this.scoreCount;
    scoreDiv.setAttribute('id', 'score-div');
    scoreBoard.appendChild(scoreDiv);
    this.scoreDiv = scoreDiv;

    var levelDiv = document.createElement('div');
    levelDiv.style.width = 248 + 'px';
    levelDiv.style.border = '1px solid';
    levelDiv.style.textAlign = 'center';
    levelDiv.style.lineHeight = 60 + 'px';
    levelDiv.innerHTML = 'Level: ' + this.level;
    levelDiv.setAttribute('id', 'level-div');
    scoreBoard.appendChild(levelDiv);
    this.levelDiv = levelDiv;

    var highScoreDiv = document.createElement('div');
    highScoreDiv.style.width = 248 + 'px';
    highScoreDiv.style.border = '1px solid';
    highScoreDiv.style.textAlign = 'center';
    highScoreDiv.style.lineHeight = 60 + 'px';
    highScoreDiv.style.marginBottom = '30px';
    highScoreDiv.innerHTML = 'HighScore: ' + this.highScore;
    highScoreDiv.setAttribute('id', 'highscore-div');
    scoreBoard.appendChild(highScoreDiv);
    this.highScoreDiv = highScoreDiv;

    var playBtn = document.createElement('button');
    playBtn.style.border = 'none';
    playBtn.style.backgroundColor = 'blue';
    playBtn.innerHTML = 'PLAY';
    playBtn.style.padding = '14px';
    playBtn.style.fontSize = '20px';
    playBtn.style.color = 'white';
    playBtn.style.margin = '0 auto';
    scoreBoard.appendChild(playBtn);
    this.playBtn = playBtn;

    var pauseBtn = document.createElement('button');
    pauseBtn.style.border = 'none';
    pauseBtn.style.backgroundColor = 'blue';
    pauseBtn.innerHTML = 'PAUSE';
    pauseBtn.style.padding = '14px';
    pauseBtn.style.display = 'none';
    pauseBtn.style.fontSize = '20px';
    pauseBtn.style.color = 'white';
    pauseBtn.style.margin = '0 auto';
    scoreBoard.appendChild(pauseBtn);
    this.pauseBtn = pauseBtn;

    var tryAgainBtn = document.createElement('button');
    tryAgainBtn.style.border = 'none';
    tryAgainBtn.style.backgroundColor = 'rgb(199, 0, 0)';
    tryAgainBtn.innerHTML = 'TRY AGAIN';
    tryAgainBtn.style.padding = '14px';
    tryAgainBtn.style.display = 'none';
    tryAgainBtn.style.fontSize = '20px';
    tryAgainBtn.style.color = 'white';
    tryAgainBtn.style.margin = '0 auto';
    scoreBoard.appendChild(tryAgainBtn);
    this.tryAgainBtn = tryAgainBtn;

    var instructionDiv = document.createElement('div');
    instructionDiv.style.width = 228 + 'px';
    instructionDiv.style.border = '1px solid white';
    instructionDiv.style.padding = '10px';
    instructionDiv.style.textAlign = 'left';
    instructionDiv.style.fontSize = '10px';
    instructionDiv.style.marginTop = '140px';
    instructionDiv.innerHTML = '<h3>Instructions:</h3><p>A or Left arrow to move left lane.</p><p>D or Right arrow to move right lane.</p>';
    scoreBoard.appendChild(instructionDiv);
  }

  this.moveBackground = function () {
    if (this.bgIncrease >= 50) {
      this.bgIncrease = 0;
    }
    this.bgIncrease += (this.increaseBy + 1);
    this.backGround.style.top = (-50 + this.bgIncrease) + 'px';
  }

  this.generateMyCar = function () {
    this.myCar = new Car(this.container, this.lanes[this.myCarIndex], this.width, this.height, true, 'F1');
    this.myCar.init();
  }

  this.moveMyCar = function (e) {
    var keyCode = e.keyCode;
    if ((keyCode === 65 || keyCode === 37) && this.gamePause == false) {
      if (this.myCarIndex != 0) {
        var push1 = {};
        push1.prevPos = this.myCar.x;
        push1.prevIndex = this.myCarIndex;
        this.myCarIndex--;
        if (this.myCarIndex == -1) {
          this.myCarIndex = 2;
        }
        this.myCar.lane = this.lanes[this.myCarIndex];
        this.myCar.setPosition();
        push1.nextIndex = this.myCarIndex;
        push1.nextPos = this.myCar.x;
        //this.myCar.draw();
        this.moveLeft(push1);
      }
    } else if ((keyCode === 68 || keyCode === 39) && this.gamePause == false) {
      if (this.myCarIndex != 2) {
        var push1 = {};
        push1.prevPos = this.myCar.x;
        push1.prevIndex = this.myCarIndex;
        this.myCarIndex++;
        if (this.myCarIndex == 3) {
          this.myCarIndex = 0;
        }
        this.myCar.lane = this.lanes[this.myCarIndex];
        this.myCar.setPosition();
        push1.nextIndex = this.myCarIndex;
        push1.nextPos = this.myCar.x;
        //this.myCar.draw();
        this.moveRight(push1);
      }
    }
  }

  this.moveRight = function (push1) {
    clearInterval(this.start);
    var int1 = setInterval(rightFrame.bind(this), (this.transition / 2));
    this.start = setInterval(this.gaming.bind(this), this.transition);

    function rightFrame() {
      if (push1.prevIndex > push1.nextIndex) {
        if (push1.prevPos <= push1.nextPos) {
          clearInterval(int1);
        } else {
          push1.prevPos = push1.prevPos - 20;
          this.myCar.element.style.left = push1.prevPos + 'px';
        }
      } else {
        if (push1.prevPos >= push1.nextPos) {
          clearInterval(int1);
        } else {
          push1.prevPos = push1.prevPos + 10;
          this.myCar.element.style.left = push1.prevPos + 'px';
        }
      }
    }
  }

  this.moveLeft = function (push1) {
    clearInterval(this.start);
    var int2 = setInterval(leftFrame.bind(this), (this.transition / 2));
    this.start = setInterval(this.gaming.bind(this), this.transition);

    function leftFrame() {
      if (push1.prevIndex < push1.nextIndex) {
        if (push1.prevPos >= push1.nextPos) {
          clearInterval(int2);
        } else {
          push1.prevPos = push1.prevPos + 20;
          this.myCar.element.style.left = push1.prevPos + 'px';
        }
      } else {
        if (push1.prevPos <= push1.nextPos) {
          clearInterval(int2);
        } else {
          push1.prevPos = push1.prevPos - 10;
          this.myCar.element.style.left = push1.prevPos + 'px';
        }
      }
    }
  }

  this.randomVehicles = function () {
    if (this.gameCounter >= this.spawnTime) {
      var random1 = getRandom(0, this.noOfLanes);
      var randomCar = new Car(this.container, this.lanes[random1], this.width, this.height, false, getRandom(1, 8));
      randomCar.init();
      that.otherVehicles.push(randomCar);
      if (this.level >= 4) {
        var decideSpwn = getRandom(0, 2);
        if (decideSpwn == 1) {
          var random2 = get2ndRandom(0, this.noOfLanes, random1);
          var randomCar2 = new Car(this.container, this.lanes[random2], this.width, this.height, false, getRandom(1, 8));
          randomCar2.init();
          that.otherVehicles.push(randomCar2);
        }
      }
      this.spawnTime = getRandom(300, 400);
      this.gameCounter = 0;
    }

  }

  this.moveRandomCars = function () {
    for (var i = 0; i < this.otherVehicles.length; i++) {
      that.otherVehicles[i].y = this.otherVehicles[i].y + this.increaseBy;
      that.otherVehicles[i].draw();
    }
  }

  this.checkCollision = function () {
    var mycar = that.myCar;
    for (var i = 0; i < that.otherVehicles.length; i++) {
      var car2 = that.otherVehicles[i];
      if (mycar.x < car2.x + car2.carModel.carWidth &&
        mycar.x + mycar.carModel.carWidth > car2.x &&
        mycar.y < car2.y + car2.carModel.carHeight &&
        mycar.y + mycar.carModel.carHeight > car2.y) {
        // collision detected!
        console.log('game-over');
        this.gameOver();
      }
    }
  }

  this.removeCars = function () {
    for (var i = 0; i < that.otherVehicles.length; i++) {
      if (that.otherVehicles[i].y >= this.height) {
        that.container.removeChild(that.otherVehicles[i].element);
        that.otherVehicles.splice(i, 1);
        that.scoreCount += 10;
        that.scoreDiv.innerHTML = 'Score: ' + this.scoreCount;
        this.levelCheck();
      }
    }
  }

  this.levelCheck = function () {
    if ((this.scoreCount % this.scoreInterval) == 0 && this.scoreCount != 0) {
      this.level++;
      this.levelDiv.innerHTML = 'Level: ' + this.level;
      clearInterval(this.start);
      this.increaseBy += 1;
      this.start = setInterval(this.gaming.bind(this), this.transition);
      // if (this.spawnTime >= 260) {
      //   this.spawnTime -= 20;
      // }
      this.scoreInterval = this.scoreCount;
    }
  }

  this.gameOver = function () {
    clearInterval(this.start);
    this.gamePause = true;
    this.level = 1;
    if (this.highScore < this.scoreCount) {
      this.highScore = this.scoreCount;
      this.highScoreDiv.innerHTML = 'HighScore: ' + this.highScore;
    }
    this.scoreCount = 0;
    this.transition = 10;
    this.increaseBy = 1;
    this.gameCounter = 0;
    this.spawnTime = 360;
    this.bgIncrease = 0;
    this.scoreInterval = 40;
    this.start = setInterval(this.gaming.bind(this), this.transition);
    this.tryAgainBtn.style.display = 'block';
    this.pauseBtn.style.display = 'none';
  }

  this.removeAllCarDivs = function () {
    for (var i = 0; i < this.otherVehicles.length; i++) {
      that.otherVehicles[i].element.parentElement.removeChild(that.otherVehicles[i].element);
    }
  }
}

function Car(parentDiv, lane, containerWidth, containerHeight, myCar, carNo) {
  this.carModel = {};
  this.myCar = myCar || false;
  this.carNo = carNo;
  this.x;
  this.y;
  this.containerWidth = containerWidth;
  this.containerHeight = containerHeight;
  this.lane = lane;
  this.element;
  var that = this;

  this.init = function () {
    this.setPosition();
    this.createCar();
    this.draw();
  }

  this.createCar = function () {
    var carDiv = document.createElement('div');
    carDiv.classList.add('cars');
    carDiv.style.width = that.carModel.carWidth + 'px';
    carDiv.style.height = that.carModel.carHeight + 'px';
    carDiv.style.background = that.carModel.carUrl + " center";
    carDiv.style.backgroundSize = 'contain';
    parentDiv.appendChild(carDiv);
    this.element = carDiv;
  }

  this.getCarModel = function (carNo) {
    return {
      carWidth: 60,
      carHeight: 100,
      carUrl: "url('./images/car" + carNo + ".png')"
    }
  }

  this.setPosition = function () {
    this.carModel = that.getCarModel(this.carNo);
    this.x = this.lane + 30;
    if (this.myCar == true) {
      that.y = this.containerHeight - this.carModel.carHeight - 30;
    } else {
      that.y = -(that.carModel.carHeight);
    }
  }

  this.draw = function () {
    that.element.style.left = that.x + 'px';
    that.element.style.top = that.y + 'px';
  }

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function get2ndRandom(min, max, x) {
  var y = getRandom(min, max);
  if (y == x) {
    y = get2ndRandom(min, max, x);
  }
  return y;
}