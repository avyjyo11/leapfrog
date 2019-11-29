new AntSmasher(700, 456, 11, 10, 3, 1, 30, 10).start();

/*width, height of container*/
/*maxSpeed, minSpeed, maxSize, minSize of ants*/
/*transitionTime of interval*/

function AntSmasher(width, height, antCount, transitionTime, maxSpeed, minSpeed, maxSize, minSize) {
  this.width = width || 400;
  this.height = height || 400;
  this.antCount = antCount || 11;
  this.TRANSITION = transitionTime || 10;
  this.timer = 0;
  this.scoreCount = 0;
  this.ants = [];
  this.game;
  this.antContainer;
  this.scoreBoard;
  this.MAXSPEED = maxSpeed || 3;
  this.MINSPEED = minSpeed || 1;
  this.MAXSIZE = maxSize || 30;
  this.MINSIZE = minSize || 10;
  var that = this;

  this.start = function () {
    this.createAntContainer();
    this.createAnts();
    this.antContainer.addEventListener('click', antSmashed.bind(this), false);
    this.game = setInterval(moveAnts.bind(this), this.TRANSITION);
  }

  this.createAntContainer = function () {
    var main = document.getElementsByTagName('main')[0];
    var antSection = document.createElement('div');
    antSection.classList.add('ant-section', 'clearfix');
    antSection.style.width = this.width + 'px';
    main.appendChild(antSection);
    var antContainer = document.createElement('div');
    antContainer.classList.add('container');
    antContainer.style.width = this.width + 'px';
    antContainer.style.height = this.height + 'px';
    antContainer.style.fontSize = 70 + 'px';
    antContainer.style.textAlign = 'center';
    antContainer.style.lineHeight = this.height + 'px';
    antSection.appendChild(antContainer);
    this.antContainer = antContainer;
    var scoreboard = document.createElement('div');
    scoreboard.classList.add('scoreboard');
    scoreboard.style.width = this.width + 'px';
    scoreboard.innerHTML = 'Smashed: ' + this.scoreCount;
    antSection.appendChild(scoreboard);
    this.scoreBoard = scoreboard;
  }

  this.createAnts = function () {
    for (var i = 0; i < this.antCount; i++) {
      var ant = new Ant(this.antContainer, this.width, this.height, this.ants, this.MAXSPEED, this.MINSPEED, this.MAXSIZE, this.MINSIZE);
      ant.init();
      this.ants.push(ant);
    }
  }

  function moveAnts() {
    that.timer += that.TRANSITION;
    for (var i = 0; i < this.ants.length; i++) {
      that.ants[i].wallCollisionCheck();
      that.ants[i].antCollisionCheck(that.ants);
      that.ants[i].move();
      if (that.ants[i].dead == true) {
        (that.ants[i].goneDelay) ++;
        if (that.ants[i].goneDelay == 20) {
          that.antContainer.removeChild(that.ants[i].element);
          that.ants.splice(i, 1);
          this.scoreCount++;
          this.scoreBoard.innerHTML = 'Smashed: ' + this.scoreCount;
          if (this.scoreCount == this.antCount) {
            clearInterval(this.game);
            this.scoreBoard.innerHTML = 'Total Smashed: ' + this.scoreCount + ', Your Time Taken is ' + (that.timer) / 1000 + ' sec.';
            this.antContainer.innerHTML = 'THE END!';
          }
        }
      }
    }
  }

  function antSmashed(e) {
    for (var i = 0; i < this.ants.length; i++) {
      if (this.ants[i].element == e.target) {
        this.ants[i].speed = 0;
        this.ants[i].element.style.background = "url('./images/blood.png') center";
        this.ants[i].element.style.backgroundSize = 'contain';
        this.ants[i].dead = true;
      }
    }
  }

}

function Ant(container, width, height, allAnts, maxSpeed, minSpeed, maxSize, minSize) {
  this.x;
  this.y;
  this.allAnts = allAnts;
  this.centerX;
  this.centerY;
  this.element;

  this.goneDelay = 0;
  this.dead = false;
  this.containerWidth = width;
  this.containerHeight = height;
  this.radius = getRandom(minSize, maxSize);
  this.speed = getRandom(minSpeed, maxSpeed);
  this.angle = getRandom(0, 360);
  this.container = container;
  var that = this;

  this.init = function () {
    this.setPos();
    this.setAntDiv();
    this.draw();
  }

  this.setAntDiv = function () {
    var ant = document.createElement('div');
    ant.style.height = (this.radius * 2) + 'px';
    ant.style.width = (this.radius * 2) + 'px';
    ant.style.borderRadius = this.radius + 'px';
    ant.style.background = "url('./images/ant.gif') center";
    ant.style.backgroundSize = 'contain';
    ant.classList.add('ant');
    that.container.appendChild(ant);
    this.element = ant;
  }

  this.setPos = function () {
    this.x = getRandom(0, (width - this.radius * 2));
    this.y = getRandom(0, (height - this.radius * 2));
    this.calculateCenters();
    for (var i = 0; i < that.allAnts.length; i++) {
      var dx = this.centerX - that.allAnts[i].centerX;
      var dy = this.centerY - that.allAnts[i].centerY;
      var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));

      if (distance <= this.radius + that.allAnts[i].radius) {
        this.setPos();
      }
    }
  }

  this.draw = function () {
    var bgRotation = this.angle + 90;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = 'rotate(' + bgRotation + 'deg)';
  }

  this.move = function () {

    this.x += (this.speed * Math.cos(radianConvert(this.angle)));
    this.y += (this.speed * Math.sin(radianConvert(this.angle)));
    this.calculateCenters();
    this.draw();
  }

  this.wallCollisionCheck = function () {
    if (this.x <= 0 || this.x >= (this.containerWidth - this.radius * 2) || this.y <= 0 || this.y >= (this.containerHeight - this.radius * 2)) {
      this.angle = (this.angle + 90) % 360;
    }
  }

  this.calculateCenters = function () {
    this.centerX = this.x + this.radius;
    this.centerY = this.y + this.radius;
  }

  this.antCollisionCheck = function (allAnts) {
    for (var i = 0; i < allAnts.length; i++) {
      if (this != allAnts[i]) {
        var ant2 = allAnts[i];
        var dx = this.centerX - ant2.centerX;
        var dy = this.centerY - ant2.centerY;
        var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));

        if (distance <= this.radius + ant2.radius) {
          this.angle = (this.angle + 90) % 360;
          ant2.angle = (ant2.angle + 90) % 360;
        }
      }
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function radianConvert(angle) {
  return (angle * Math.PI) / 180;
}

function angleConvert(rad) {
  return (rad * 180) / Math.PI;
}

function addAntContainer() {
  new AntSmasher(700, 456, 15).start();
}