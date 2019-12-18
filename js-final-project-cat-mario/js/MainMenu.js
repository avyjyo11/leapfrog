levelMaps.getJSONMap(afterGetMap);

function afterGetMap(levelMaps, levelData) {
  var mainMenu = new MainMenu(levelMaps, levelData);
  mainMenu.startFxn();
  //console.log(Object.keys(levelMaps));
}

function MainMenu(levelMaps, levelData) {
  this.levelMaps = levelMaps;
  this.levelData = levelData;
  this.width = 1000;
  this.height = 650;
  this.gameClear = false;
  this.mainContainer;
  this.startBtn;
  this.editorBtn;
  this.savedlvlBtn;
  this.startScreen;
  this.selectLevelScreen;
  this.editorScreen;
  this.levelsBtn = [];
  var that = this;

  this.startFxn = function () {
    this.mainMenu();
    gameUI.setCanvas();
    that.startBtn.addEventListener('click', function () {
      that.mainContainer.removeChild(that.startScreen);
      that.startLevel(Object.keys(that.levelMaps)[0]);
    });
    that.savedlvlBtn.addEventListener('click', function () {
      that.mainContainer.removeChild(that.startScreen);
      that.mainContainer.appendChild(that.selectLevelScreen);
      for (var i = 0; i < that.levelsBtn.length; i++) {
        that.levelsBtn[i].addEventListener('click', function (e) {
          var st = (e.target.innerHTML).replace('LEVEL-', '');
          that.startLevel(st);
          that.mainContainer.removeChild(that.selectLevelScreen);
        });
      }
    });
    that.editorBtn.addEventListener('click', function (e) {
      that.mainContainer.removeChild(that.startScreen);
      that.mainContainer.appendChild(that.editorScreen);
      var levelMaker = new LevelMaker(that.editorScreen);
      levelMaker.init();
    });
  }

  this.mainMenu = function () {
    var mainContainer = document.getElementsByClassName('main-container')[0];
    mainContainer.style.width = this.width + 'px';
    mainContainer.style.height = this.height + 'px';
    this.mainContainer = mainContainer;

    var startScreen = document.createElement('div');
    startScreen.style.position = 'absolute';
    startScreen.style.zIndex = 100;
    startScreen.style.width = this.width + 'px';
    startScreen.style.height = this.height + 'px';
    startScreen.style.left = 0 + 'px';
    startScreen.style.top = 0 + 'px';
    startScreen.style.textAlign = 'center';
    startScreen.style.background = "url('./images/startBG.png') no-repeat center";
    startScreen.style.backgroundSize = 'cover';
    mainContainer.appendChild(startScreen);
    this.startScreen = startScreen;

    var startBtn = document.createElement('button');
    startBtn.style.display = 'block';
    startBtn.innerHTML = 'START GAME';
    startBtn.style.fontFamily = 'catMarioFont';
    startBtn.style.fontSize = '22px';
    startBtn.style.color = 'white';
    startBtn.style.margin = '0 auto';
    startBtn.style.marginTop = '240px';
    startBtn.style.padding = '14px';
    startBtn.style.backgroundColor = '#000000';
    startBtn.style.border = '0px';
    startScreen.appendChild(startBtn);
    this.startBtn = startBtn;

    var editorBtn = document.createElement('button');
    editorBtn.innerHTML = 'LEVEL MAKER';
    editorBtn.style.display = 'block';
    editorBtn.style.fontFamily = 'catMarioFont';
    editorBtn.style.fontSize = '22px';
    editorBtn.style.color = 'white';
    editorBtn.style.margin = '0 auto';
    editorBtn.style.marginTop = '20px';
    editorBtn.style.padding = '14px';
    editorBtn.style.backgroundColor = '#000000';
    editorBtn.style.border = '0px';
    startScreen.appendChild(editorBtn);
    this.editorBtn = editorBtn;

    var savedlvlBtn = document.createElement('button');
    savedlvlBtn.innerHTML = 'SELECT LEVEL';
    savedlvlBtn.style.display = 'block';
    savedlvlBtn.style.fontFamily = 'catMarioFont';
    savedlvlBtn.style.fontSize = '22px';
    savedlvlBtn.style.color = 'white';
    savedlvlBtn.style.margin = '0 auto';
    savedlvlBtn.style.marginTop = '20px';
    savedlvlBtn.style.padding = '14px';
    savedlvlBtn.style.backgroundColor = '#000000';
    savedlvlBtn.style.border = '0px';
    startScreen.appendChild(savedlvlBtn);
    this.savedlvlBtn = savedlvlBtn;

    var selectLevelScreen = document.createElement('div');
    selectLevelScreen.style.position = 'absolute';
    selectLevelScreen.style.zIndex = 50;
    selectLevelScreen.style.width = this.width + 'px';
    selectLevelScreen.style.height = this.height + 'px';
    selectLevelScreen.style.left = 0 + 'px';
    selectLevelScreen.style.top = 0 + 'px';
    selectLevelScreen.style.background = "url('./images/startBG.png') no-repeat center";
    selectLevelScreen.style.backgroundSize = 'cover';

    var levelsContainer = document.createElement('div');
    levelsContainer.style.position = 'absolute';
    levelsContainer.style.zIndex = 60;
    levelsContainer.style.width = (this.width - 280) + 'px';
    levelsContainer.style.height = (this.height - 400) + 'px';
    levelsContainer.style.left = 150 + 'px';
    levelsContainer.style.top = 230 + 'px';
    selectLevelScreen.appendChild(levelsContainer);

    for (var i = 0; i < Object.keys(that.levelMaps).length; i++) {
      var levels = document.createElement('button');
      levels.innerHTML = 'LEVEL-' + Object.keys(that.levelMaps)[i];
      levels.style.fontFamily = 'catMarioFont';
      levels.style.fontSize = '22px';
      levels.style.color = 'white';
      levels.style.marginTop = '20px';
      levels.style.marginRight = '20px';
      levels.style.padding = '14px';
      levels.style.backgroundColor = '#000000';
      levels.style.border = '0px';
      levelsContainer.appendChild(levels);
      that.levelsBtn.push(levels);
    }

    this.selectLevelScreen = selectLevelScreen;

    var editorScreen = document.createElement('div');
    editorScreen.style.position = 'absolute';
    editorScreen.style.zIndex = 40;
    editorScreen.style.width = this.width + 'px';
    editorScreen.style.height = this.height + 'px';
    editorScreen.style.left = 0 + 'px';
    editorScreen.style.top = 0 + 'px';
    editorScreen.style.backgroundColor = '#ffdcb9';
    //editorScreen.style.background = "url('./images/startBG.png') no-repeat center";
    //editorScreen.style.backgroundSize = 'contain';

    this.editorScreen = editorScreen;
  }

  this.startLevel = function (level) {
    var game = new Game(that.levelMaps, that.levelData, level);
    game.begin();
  }

}