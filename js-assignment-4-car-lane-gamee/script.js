if (window.localStorage.getItem('carHigh') == '') {
  window.localStorage.setItem('carHigh', '0');
}

var game1 = new CarLaneGame(412, 650, 65, 68, 87);
game1.init();
var game2 = new CarLaneGame(412, 650, 37, 39, 38);
game2.init();

function CarLaneGame(width, height, leftKey, rightKey, upKey) {
  this.width = width;
  this.height = height;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.upKey = upKey;
  this.transition = 10;
  this.gameCounter = 0;
  this.level = 1;
  this.gamePause = true;
  this.scoreCount = 0;
  this.scoreInterval = 40;
  this.spawnTime = getRandom(300, 400);
  this.bgIncrease = 0;
  this.increaseBy = 1;
  this.highScore = parseInt(window.localStorage.getItem('carHigh')) || 0;
  this.backGround;
  this.myCar = [];
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
  this.ammoDiv;
  this.ammoBarDiv;
  this.booms = [];
  this.endBoom = {};
  this.saveAmmo;
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
      this.container.removeChild(this.endBoom.element);
      this.endBoom = {};
      this.levelDiv.innerHTML = 'Level: ' + this.level;
      that.scoreDiv.innerHTML = 'Score: ' + this.scoreCount;
      this.ammoDiv.innerHTML = 'Ammo: <h1>' + this.myCar[0].bulletCounter + '</h1>';
      this.tryAgainBtn.style.display = 'none';
      this.pauseBtn.style.display = 'block';
      this.removeAllCarDivs();
      that.otherVehicles.splice(0, that.otherVehicles.length);
      that.myCar[0].bullets.splice(0, that.myCar[0].bullets.length);
      this.myCarIndex = 1;
      this.myCar[0].lane = this.lanes[this.myCarIndex];
      this.myCar[0].setPosition();
      this.myCar[0].draw();
    }.bind(this));
    document.addEventListener("keydown", this.moveMyCar.bind(this));
    this.start = setInterval(this.gaming.bind(this), this.transition);
  }

  this.gaming = function () {
    if (this.gamePause == false) {
      this.moveBackground();
      this.gameCounter += this.increaseBy;
      this.randomVehicles();
      this.fillBullets();
      this.fireBullets();
      this.checkCollision();
      this.removeCars();
      this.removeBullets();
      this.moveRandomCars();
      this.boomEffect();
    }
  }

  this.createContainer = function () {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('clearfix');
    var bodyContainer = document.createElement('div');
    bodyContainer.style.width = this.width + 350 + 'px';
    bodyContainer.style.height = this.height + 'px';
    bodyContainer.style.cssFloat = 'left';
    bodyContainer.style.margin = 20 + 'px';
    bodyContainer.classList.add('body-container', 'clearfix');
    body.appendChild(bodyContainer);

    var logoBgDiv = document.createElement('div');
    logoBgDiv.style.width = this.width + 350 + 'px';
    logoBgDiv.style.height = this.height + 'px';
    logoBgDiv.classList.add('logo-bg', 'clearfix');
    bodyContainer.appendChild(logoBgDiv);
    this.logoBgDiv = logoBgDiv;

    var logoDiv = document.createElement('div');
    logoDiv.style.width = this.width + 'px';
    logoDiv.style.height = this.height + 'px';
    logoDiv.style.cssFloat = 'left';
    logoBgDiv.appendChild(logoDiv);

    var readDiv = document.createElement('div');
    readDiv.style.width = 310 + 'px';
    readDiv.style.padding = '20px';
    readDiv.style.height = this.height - 40 + 'px';
    readDiv.style.cssFloat = 'right';
    readDiv.style.color = 'white';
    logoBgDiv.appendChild(readDiv);

    var instructionDiv = document.createElement('div');
    instructionDiv.style.width = 228 + 'px';
    instructionDiv.style.border = '1px solid white';
    instructionDiv.style.padding = '20px';
    instructionDiv.style.textAlign = 'left';
    instructionDiv.style.fontSize = '12px';
    instructionDiv.style.marginTop = '30px';
    instructionDiv.innerHTML = '<h3>INSTRUCTIONS:</h3><p>Pass by other cars to Score Points.</p><p>Level(Speed) increases as the Score points rises.</p><p>Shoot Bullets to destroy Other cars on the lane.</p><p>Ammo is equal to current level you are in.</p><p>Bullets are limited and regenerates slowly. So use it wisely.</p>';
    readDiv.appendChild(instructionDiv);

    var controlsDiv = document.createElement('div');
    controlsDiv.style.width = 228 + 'px';
    controlsDiv.style.border = '1px solid white';
    controlsDiv.style.padding = '20px';
    controlsDiv.style.textAlign = 'left';
    controlsDiv.style.fontSize = '12px';
    controlsDiv.style.marginTop = '30px';
    controlsDiv.innerHTML = '<h3>CONTROLS:</h3><p>A or Left arrow to move left lane.</p><p>D or Right arrow to move right lane.</p><p>W or Up arrow to shoot bullet.</p>';
    readDiv.appendChild(controlsDiv);

    var logo = document.createElement('div')
    logo.style.background = "url('./images/logo1.gif') no-repeat center";
    logo.style.backgroundSize = 'contain';
    logo.style.width = 300 + 'px';
    logo.style.height = 400 + 'px';
    logo.style.display = 'block';
    logo.style.margin = '30px auto';
    logoDiv.appendChild(logo);

    var startBtn = document.createElement('button');
    startBtn.innerHTML = 'START GAME';
    startBtn.style.border = '2px solid white';
    startBtn.style.padding = '16px';
    startBtn.style.color = 'white';
    logoDiv.appendChild(startBtn);
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
    scoreDiv.setAttribute('class', 'score-div');
    scoreBoard.appendChild(scoreDiv);
    this.scoreDiv = scoreDiv;

    var levelDiv = document.createElement('div');
    levelDiv.style.width = 248 + 'px';
    levelDiv.style.border = '1px solid';
    levelDiv.style.textAlign = 'center';
    levelDiv.style.lineHeight = 60 + 'px';
    levelDiv.innerHTML = 'Level: ' + this.level;
    levelDiv.setAttribute('class', 'level-div');
    scoreBoard.appendChild(levelDiv);
    this.levelDiv = levelDiv;

    var highScoreDiv = document.createElement('div');
    highScoreDiv.style.width = 248 + 'px';
    highScoreDiv.style.border = '1px solid';
    highScoreDiv.style.textAlign = 'center';
    highScoreDiv.style.lineHeight = 60 + 'px';
    highScoreDiv.style.marginBottom = '30px';
    highScoreDiv.innerHTML = 'HighScore: ' + that.highScore;
    highScoreDiv.setAttribute('class', 'highscore-div');
    scoreBoard.appendChild(highScoreDiv);
    this.highScoreDiv = highScoreDiv;

    var ammoDiv = document.createElement('div');
    ammoDiv.style.width = 248 + 'px';
    ammoDiv.style.border = '1px solid';
    ammoDiv.style.textAlign = 'center';
    ammoDiv.style.paddingTop = '20px';
    ammoDiv.style.marginTop = '40px';
    ammoDiv.style.marginBottom = '40px';
    ammoDiv.style.position = 'relative';
    ammoDiv.classList.add('clearfix');
    ammoDiv.innerHTML = 'Ammo: <h1>' + 1 + '</h1>';
    scoreBoard.appendChild(ammoDiv);
    this.ammoDiv = ammoDiv;

    var ammoBarDiv = document.createElement('div');
    ammoBarDiv.style.position = 'absolute';
    ammoBarDiv.style.width = 0 + 'px';
    ammoBarDiv.style.height = 10 + 'px';
    ammoBarDiv.style.top = 70 + 'px';
    ammoBarDiv.style.left = 24 + 'px';
    ammoBarDiv.style.zIndex = '90';
    ammoBarDiv.style.backgroundColor = 'lightblue';
    ammoDiv.appendChild(ammoBarDiv);
    this.ammoBarDiv = ammoBarDiv;

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
  }

  this.moveBackground = function () {
    if (this.bgIncrease >= 50) {
      this.bgIncrease = 0;
    }
    this.bgIncrease += (this.increaseBy + 1);
    this.backGround.style.top = (-50 + this.bgIncrease) + 'px';
  }

  this.fillBullets = function () {
    if (this.myCar[0].bulletCounter < this.level) {
      this.myCar[0].bulletSpawnTime++;
      //console.log(Math.floor(this.bulletSpawnTime / 3));
      if (this.myCar[0].bulletSpawnTime >= 500) {
        this.myCar[0].bulletCounter++;
        this.myCar[0].bulletSpawnTime = 0;
        this.ammoDiv.innerHTML = 'Ammo: <h1>' + this.myCar[0].bulletCounter + '</h1>';
      }
      //this.ammoBarDiv.style.width = Math.floor(this.myCar[0].bulletSpawnTime / 3) + 'px';
    }
    this.saveAmmo = (this.myCar[0].bulletSpawnTime / 3);
  }

  this.fireBullets = function () {
    for (var i = 0; i < that.myCar[0].bullets.length; i++) {
      that.myCar[0].bullets[i].y -= that.increaseBy;
      that.myCar[0].bullets[i].drawBullet();
    }
  }

  this.createBullets = function () {
    var bullet = new Bullet(this.container, this.myCar[0]);
    bullet.init();
    that.myCar[0].bullets.push(bullet);
  }

  this.generateMyCar = function () {
    var myCar = new Car(this.container, this.lanes[this.myCarIndex], this.width, this.height, true, 'F1');
    myCar.bulletCounter = 1;
    myCar.bulletSpawnTime = 0;
    myCar.bullets = [];
    myCar.init();
    this.myCar.push(myCar);
    console.log(this.myCar);
  }

  this.moveMyCar = function (e) {
    var keyCode = e.keyCode;
    if ((keyCode === this.leftKey) && this.gamePause == false) {
      if (this.myCarIndex != 0) {
        var push1 = {};
        push1.prevPos = this.myCar[0].x;
        push1.prevIndex = this.myCarIndex;
        this.myCarIndex--;
        if (this.myCarIndex == -1) {
          this.myCarIndex = 2;
        }
        this.myCar[0].lane = this.lanes[this.myCarIndex];
        this.myCar[0].setPosition();
        push1.nextIndex = this.myCarIndex;
        push1.nextPos = this.myCar[0].x;
        //this.myCar[0].draw();
        this.moveLeft(push1);
      }
    } else if ((keyCode === this.rightKey) && this.gamePause == false) {
      if (this.myCarIndex != 2) {
        var push1 = {};
        push1.prevPos = this.myCar[0].x;
        push1.prevIndex = this.myCarIndex;
        this.myCarIndex++;
        if (this.myCarIndex == 3) {
          this.myCarIndex = 0;
        }
        this.myCar[0].lane = this.lanes[this.myCarIndex];
        this.myCar[0].setPosition();
        push1.nextIndex = this.myCarIndex;
        push1.nextPos = this.myCar[0].x;
        //this.myCar[0].draw();
        this.moveRight(push1);

      }
    } else if ((keyCode === this.upKey) && this.gamePause == false) {
      if (that.myCar[0].bulletCounter > 0) {
        that.createBullets();
        that.myCar[0].bulletCounter--;
        that.ammoDiv.innerHTML = 'Ammo: <h1>' + that.myCar[0].bulletCounter + '</h1>';
      }
    }
  }

  this.moveRight = function (push1) {
    clearInterval(this.start);
    var int1 = setInterval(rightFrame.bind(this), (this.transition + (this.transition / 2)));
    this.start = setInterval(this.gaming.bind(this), this.transition);

    function rightFrame() {
      if (push1.prevIndex > push1.nextIndex) {
        if (push1.prevPos <= push1.nextPos) {
          clearInterval(int1);
        } else {
          push1.prevPos = push1.prevPos - 20;
          this.myCar[0].element.style.left = push1.prevPos + 'px';
        }
      } else {
        if (push1.prevPos >= push1.nextPos) {
          clearInterval(int1);
        } else {
          push1.prevPos = push1.prevPos + 10;
          this.myCar[0].element.style.left = push1.prevPos + 'px';
          if (push1.prevPos < (push1.nextPos - 20)) {
            this.myCar[0].element.style.transform = 'rotate(' + 45 + 'deg)';
          } else {
            this.myCar[0].element.style.transform = 'rotate(' + 0 + 'deg)';
          }
        }
      }
    }
  }

  this.moveLeft = function (push1) {
    clearInterval(this.start);
    var int2 = setInterval(leftFrame.bind(this), (this.transition + (this.transition / 2)));
    this.start = setInterval(this.gaming.bind(this), this.transition);

    function leftFrame() {
      if (push1.prevIndex < push1.nextIndex) {
        if (push1.prevPos >= push1.nextPos) {
          clearInterval(int2);
        } else {
          push1.prevPos = push1.prevPos + 20;
          this.myCar[0].element.style.left = push1.prevPos + 'px';
        }
      } else {
        if (push1.prevPos <= push1.nextPos) {
          clearInterval(int2);
        } else {
          push1.prevPos = push1.prevPos - 10;
          this.myCar[0].element.style.left = push1.prevPos + 'px';
          if (push1.prevPos > (push1.nextPos + 20)) {
            this.myCar[0].element.style.transform = 'rotate(' + -45 + 'deg)';
          } else {
            this.myCar[0].element.style.transform = 'rotate(' + 0 + 'deg)';
          }
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
      that.checkCollisionWithBullets(that.otherVehicles[i], i);
    }
  }

  this.checkCollisionWithBullets = function (car, carIndex) {
    for (var i = 0; i < that.myCar[0].bullets.length; i++) {
      var bullet = that.myCar[0].bullets[i];
      if (car.x < bullet.x + bullet.width &&
        car.x + car.carModel.carWidth > bullet.x &&
        car.y < bullet.y + bullet.height &&
        car.y + car.carModel.carHeight > bullet.y) {
        // collision detected!
        var boom = new Boom(car.x, car.y, this.container);
        that.container.removeChild(car.element);
        that.otherVehicles.splice(carIndex, 1);
        that.container.removeChild(bullet.element);
        that.myCar[0].bullets.splice(i, 1);
        boom.init();
        this.booms.push(boom);
      }
    }
  }

  this.checkCollision = function () {
    var mycar = that.myCar[0];
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

  this.removeBullets = function () {
    for (var i = 0; i < that.myCar[0].bullets.length; i++) {
      if (that.myCar[0].bullets[i].y <= (-that.myCar[0].bullets[i].height)) {
        that.container.removeChild(that.myCar[0].bullets[i].element);
        that.myCar[0].bullets.splice(i, 1);
      }
    }
  }

  this.levelCheck = function () {
    if ((this.scoreCount % this.scoreInterval) == 0 && this.scoreCount != 0) {
      this.level++;
      this.myCar[0].bulletCounter = this.level;
      this.ammoDiv.innerHTML = 'Ammo: <h1>' + this.myCar[0].bulletCounter + '</h1>';
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
    this.endBoom = new Boom(this.myCar[0].x, this.myCar[0].y, this.container);
    this.endBoom.init();
    this.gamePause = true;
    if (this.highScore < this.scoreCount) {
      this.highScore = this.scoreCount;
      (window.localStorage.setItem('carHigh', (that.highScore).toString()));
      this.highScoreDiv.innerHTML = 'HighScore: ' + this.highScore;
    }
    that.highScore = parseInt(window.localStorage.getItem('carHigh'));
    this.scoreCount = 0;
    this.transition = 10;
    this.increaseBy = 1;
    this.gameCounter = 0;
    this.level = 1;
    this.scoreInterval = 40;
    this.spawnTime = getRandom(300, 400);
    this.bgIncrease = 0;
    this.myCar[0].bulletCounter = 1;
    this.myCar[0].bulletSpawnTime = 0;
    this.start = setInterval(this.gaming.bind(this), this.transition);
    this.tryAgainBtn.style.display = 'block';
    this.pauseBtn.style.display = 'none';
  }

  this.removeAllCarDivs = function () {
    for (var i = 0; i < this.otherVehicles.length; i++) {
      that.otherVehicles[i].element.parentElement.removeChild(that.otherVehicles[i].element);
    }
    for (var j = 0; j < this.myCar[0].bullets.length; j++) {
      that.myCar[0].bullets[j].element.parentElement.removeChild(that.myCar[0].bullets[j].element);
    }
  }

  this.boomEffect = function () {
    for (var i = 0; i < this.booms.length; i++) {
      if (this.booms[i].displayRate < 60) {
        this.booms[i].y += this.increaseBy;
        this.booms[i].displayRate++;
        this.booms[i].drawBoom();
      } else {
        that.container.removeChild(that.booms[i].element);
        that.booms.splice(i, 1);
      }
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

function Bullet(parentDiv, myCar) {
  this.height = 12;
  this.width = 12;
  this.x;
  this.y;
  this.element;
  var that = this;

  this.init = function () {
    this.createBullet();
    this.setBullet();
    this.drawBullet();
  }

  this.createBullet = function () {
    var bulletDiv = document.createElement('div');
    bulletDiv.classList.add('bullet');
    bulletDiv.style.width = that.width + 'px';
    bulletDiv.style.height = that.height + 'px';
    bulletDiv.style.backgroundColor = 'yellow';
    bulletDiv.style.borderRadius = '50%';
    bulletDiv.style.border = '2px solid white';
    parentDiv.appendChild(bulletDiv);
    this.element = bulletDiv;
  }

  this.setBullet = function () {
    this.x = myCar.x + (myCar.carModel.carWidth / 2) - (that.width / 2);
    this.y = myCar.y - (that.height / 2);
  }

  this.drawBullet = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
}

function Boom(x, y, parentDiv) {
  this.x = x - 20;
  this.y = y + 20;
  this.displayRate = 0;
  this.width = 100;
  this.height = 60;
  this.url = "url('./images/bomb-explosion.png')";
  this.element;
  var that = this;

  this.init = function () {
    this.createBoom();
    this.drawBoom();
  }

  this.createBoom = function () {
    var boomDiv = document.createElement('div');
    boomDiv.style.position = 'absolute';
    boomDiv.style.zIndex = '100';
    boomDiv.style.width = this.width + 'px';
    boomDiv.style.height = this.height + 'px';
    boomDiv.style.background = this.url + " no-repeat center";
    boomDiv.style.backgroundSize = 'contain';
    parentDiv.appendChild(boomDiv);
    this.element = boomDiv;
  }

  this.drawBoom = function () {
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