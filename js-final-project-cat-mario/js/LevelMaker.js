function LevelMaker(container) {
  this.container = container;
  this.tileSize = gameUI.tileSize;
  this.mapScreen;
  this.row;
  this.column;
  this.elements;
  this.trollElements;
  var that = this;

  this.init = function () {
    this.setLayout();
  }

  this.setLayout = function () {
    var mapScreen = document.createElement('div');
    mapScreen.style.position = 'absolute';
    mapScreen.style.zIndex = 60;
    mapScreen.style.width = gameUI.viewPort + 'px';
    mapScreen.style.height = gameUI.viewHeight + 'px';
    mapScreen.style.left = 20 + 'px';
    mapScreen.style.top = 20 + 'px';
    mapScreen.style.backgroundColor = 'blue';
    this.container.appendChild(mapScreen);
    this.mapScreen = mapScreen;

    var choosingScreen
  }

}