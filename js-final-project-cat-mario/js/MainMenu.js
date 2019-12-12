var mainMenu = new MainMenu();
mainMenu.startScreen();

function MainMenu() {
  this.level;
  var that = this;

  this.startScreen = function () {
    gameUI.setCanvas();
    this.level = 1;
    this.startLevel(this.level);
  }

  this.startLevel = function (level) {
    levelMaps.getJSONMap(level, afterGetMap);

    function afterGetMap(levelData) {
      var game1 = new Game(levelData);
      game1.init();
    }
  }

}