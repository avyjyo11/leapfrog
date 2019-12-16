var mainMenu = new MainMenu();
mainMenu.startScreen();

function MainMenu() {
  this.level = 1;
  this.gameState;
  var that = this;

  this.startScreen = function () {
    gameUI.setCanvas();
    this.startLevel();
    //console.log('game-over');
  }

  this.startLevel = function () {
    levelMaps.getJSONMap(afterGetMap);

    function afterGetMap(levelData) {
      var game = new Game(levelData, that.level);
      game.begin();
    }
  }

}