var game1 = new CarLaneGame(412, 650);
game1.init();

function CarLaneGame(width, height) {
  this.width = width;
  this.height = height;
  this.start;
  this.gameCounter = 0;
  this.spawnTime = 300;
  this.increase = 0;
  this.backGround;
  this.myCar;
  this.myCarIndex = 1;
  this.lanes = [0, 126, 252];
  this.otherVehicles = [];
  this.container;
  var that = this;

  this.init = function () {
    this.createContainer();
    this.generateMyCar();

    document.addEventListener("keydown", this.moveMyCar.bind(this));
    this.start = setInterval(gaming.bind(this), 12);
  }

  function gaming() {
    this.moveBackground();
    this.gameCounter += 1;
    if (this.gameCounter == this.spawnTime) {
      this.randomVehicles();
      this.gameCounter = 0;
    }
    this.checkCollision();
    this.removeCars();
    this.moveRandomCars();
  }

  this.createContainer = function () {
    var body = document.getElementsByTagName('body')[0];
    var bodyContainer = document.createElement('div');
    bodyContainer.style.width = this.width + 300 + 'px';
    bodyContainer.style.height = this.height + 'px';
    bodyContainer.style.margin = '20px auto';
    bodyContainer.classList.add('body-container', 'clearfix');
    body.appendChild(bodyContainer);

    var mainContainer = document.createElement('div');
    mainContainer.style.width = this.width + 'px';
    mainContainer.style.height = this.height + 'px';
    mainContainer.style.cssFloat = 'left';
    mainContainer.classList.add('main-container');

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
    scoreBoard.style.width = 300 + 'px';
    scoreBoard.style.height = this.height + 'px';
    scoreBoard.style.cssFloat = 'right';
    scoreBoard.classList.add('score-board');
    bodyContainer.appendChild(mainContainer);
  }

  this.moveBackground = function () {
    if (this.increase >= 50) {
      this.increase = 0;
    }
    this.increase += 2;
    this.backGround.style.top = (-50 + this.increase) + 'px';
  }

  this.generateMyCar = function () {
    this.myCar = new Car(this.container, this.lanes[this.myCarIndex], this.width, this.height, true, 'F1');
    this.myCar.init();
  }

  this.moveMyCar = function (e) {
    var keyCode = e.keyCode;
    if (keyCode === 65) {
      if (this.myCarIndex != 0) {
        this.myCarIndex--;
        this.myCar.lane = this.lanes[this.myCarIndex];
        this.myCar.setPosition();
        this.myCar.draw();
      }
    } else if (keyCode === 68) {
      if (this.myCarIndex != 2) {
        this.myCarIndex++;
        this.myCar.lane = this.lanes[this.myCarIndex];
        this.myCar.setPosition();
        this.myCar.draw();
      }
    }
  }

  this.randomVehicles = function () {
    var randomCar = new Car(this.container, this.lanes[getRandom(0, 3)], this.width, this.height, false, getRandom(1, 8));
    randomCar.init();
    that.otherVehicles.push(randomCar);
  }

  this.moveRandomCars = function () {
    for (var i = 0; i < this.otherVehicles.length; i++) {
      that.otherVehicles[i].y = this.otherVehicles[i].y + 1;
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
        clearInterval(this.start);
        console.log('game-over');
      }
    }
  }

  this.removeCars = function () {
    for (var i = 0; i < that.otherVehicles.length; i++) {
      if (that.otherVehicles[i].y == this.height) {
        that.container.removeChild(that.otherVehicles[i].element);
        that.otherVehicles.splice(i, 1);
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

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}