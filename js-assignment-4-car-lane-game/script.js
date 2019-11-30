var game1 = new CarLaneGame(400, 640);
game1.init();

function CarLaneGame(width, height) {
  this.width = width;
  this.height = height;
  this.start;
  this.increase = 0;
  this.backGround;
  var that = this;

  this.init = function () {
    this.createContainer();
    this.start = setInterval(gaming.bind(this), 10);

  }

  function gaming() {
    this.moveBackground();
  }

  this.createContainer = function () {
    var body = document.getElementsByTagName('body')[0];
    var bodyContainer = document.createElement('div');
    bodyContainer.style.width = this.width + 400 + 'px';
    bodyContainer.style.height = this.height + 'px';
    bodyContainer.style.margin = '20px auto';
    bodyContainer.classList.add('body-container', 'clearfix');
    body.appendChild(bodyContainer);

    var mainContainer = document.createElement('div');
    mainContainer.style.width = this.width + 'px';
    mainContainer.style.height = this.height + 'px';
    mainContainer.style.cssFloat = 'left';
    mainContainer.classList.add('main-container');

    bodyContainer.appendChild(mainContainer);

    var backGround = document.createElement('div');
    backGround.classList.add('backGround');
    backGround.style.width = this.width + 'px';
    backGround.style.height = this.height + 51 + 'px';
    backGround.style.background = 'url("./images/carLane.png") top left';
    backGround.style.backgroundRepeat = 'repeat-y';
    backGround.style.backgroundSize = 'contain';
    backGround.style.left = 0 + 'px';
    backGround.style.top = -51 + 'px';
    mainContainer.appendChild(backGround);
    this.backGround = backGround;

    var scoreBoard = document.createElement('div');
    scoreBoard.style.width = 400 + 'px';
    scoreBoard.style.height = this.height + 'px';
    scoreBoard.style.cssFloat = 'right';
    scoreBoard.classList.add('score-board');
    bodyContainer.appendChild(mainContainer);
  }

  this.moveBackground = function () {
    if (this.increase >= 51) {
      this.increase = 0;
    }
    this.increase++;
    console.log(this.increase);
    this.backGround.style.top = (-51 + this.increase) + 'px';
  }
}

function Car(){

}