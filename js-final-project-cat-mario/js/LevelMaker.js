function LevelMaker(container) {
  this.levelDataObj = {
    bgcolor: "#a0b4fa",
    bgm: 'puyo',
    blockSet: 1
  };
  this.levelMapObj = {};
  this.container = container;
  this.tileSize = gameUI.tileSize;
  this.mapScreen;
  this.row = 15;
  this.column = 136;
  this.elements;
  this.trollElements;
  this.setSettingBtn;
  this.allBlocks;
  var that = this;

  this.init = function () {
    this.setVariables();
    this.setLayout();

    that.setSettingBtn.addEventListener('click', function (e) {
      var bgcolor = document.getElementById('bg-color-select').value;
      var bgmusic = document.getElementById('bg-music-select').value;
      var blockset = document.getElementById('blockset-select').value;
      that.levelDataObj = {
        bgcolor: bgcolor,
        bgm: bgmusic,
        blockSet: blockset
      }
      that.setVariables();
      console.log(that.allBlocks);
      that.mapScreen.style.backgroundColor = that.levelDataObj.bgcolor;
    });
  }

  this.setVariables = function () {
    var allBlocks = [
      ['platform-box-' + that.levelDataObj.blockSet, 1],
      ['ground-box-' + that.levelDataObj.blockSet, 2],
      ['coin-box', 3],
      ['useless-box-' + that.levelDataObj.blockSet, 4],
      ['brick-box-' + that.levelDataObj.blockSet, 5],
      ['block-box-' + that.levelDataObj.blockSet, 6],
      ['pipe-left', 7],
      ['pipe-right', 8],
      ['pipe-top-left', 9],
      ['pipe-top-right', 10],
      ['invisible-box', 11],
      ['pole', 12],
      ['pole-top', 13],
      ['troll-enemy-box', 14],
      ['troll-star-box', 15],
      ['troll-powerup-box', 16],
      ['pawn', 21],
      ['flyerUp', 23],
      ['king-pawn', 24],
      ['flyerDown', 25],
      ['turtle', 26],
      ['troll-pawn', 40],
      ['irritating-box', 41],
      ['troll-brick-box', 42],
      ['troll-platform-box', 43],
      ['troll-ground-box', 44],
      ['troll-cloud', 45],
      ['yellow-rect', 46],
      ['troll-block-box', 47],
      ['finish-line', 100],
    ]
    that.allBlocks = allBlocks;
  }

  this.setLayout = function () {
    var mapScreen = document.createElement('div');
    mapScreen.style.position = 'absolute';
    mapScreen.style.overflow = 'auto';
    mapScreen.style.zIndex = 60;
    mapScreen.style.width = gameUI.viewPort + 'px';
    mapScreen.style.height = gameUI.viewHeight + 20 + 'px';
    mapScreen.style.left = 14 + 'px';
    mapScreen.style.top = 12 + 'px';
    mapScreen.style.border = '2px solid black';
    mapScreen.style.backgroundColor = that.levelDataObj.bgcolor;
    this.container.appendChild(mapScreen);
    this.mapScreen = mapScreen;

    var gridScreen = document.createElement('div');
    gridScreen.style.width = that.column * 40 + 'px';
    gridScreen.style.height = gameUI.viewHeight + 'px';
    this.mapScreen.appendChild(gridScreen);
    this.gridScreen = gridScreen;

    var table = document.createElement('table');
    table.style.boxSizing = 'border-box';
    table.style.borderCollapse = 'collapse';
    gridScreen.appendChild(table);
    for (var i = 0; i < that.row; i++) {
      var tr = document.createElement('tr');
      tr.style.boxSizing = 'border-box';
      tr.style.cellPadding = 0 + 'px';
      table.appendChild(tr);
      for (var j = 0; j < that.column; j++) {
        var td = document.createElement('td');
        td.style.boxSizing = 'border-box';
        if (i == 13) {
          td.setAttribute('class', 'block-box-1');
        }
        td.style.width = that.tileSize + 'px';
        td.style.height = that.tileSize + 'px';
        td.style.border = '1px solid blue';
        tr.appendChild(td);
      }
    }



    var selectionScreen = document.createElement('div');
    selectionScreen.style.position = 'absolute';
    selectionScreen.style.overflow = 'auto';
    selectionScreen.style.zIndex = 60;
    selectionScreen.style.width = 270 + 'px';
    selectionScreen.style.height = gameUI.viewHeight + 20 + 'px';
    selectionScreen.style.right = 14 + 'px';
    selectionScreen.style.top = 12 + 'px';
    selectionScreen.style.border = '2px solid black';
    this.container.appendChild(selectionScreen);

    var selectionScreenInner = document.createElement('div');
    selectionScreenInner.style.position = 'absolute';
    selectionScreenInner.style.zIndex = 70;
    selectionScreenInner.style.width = 250 + 'px';
    selectionScreenInner.style.height = gameUI.viewHeight * 2 + 'px';
    selectionScreenInner.style.right = 0 + 'px';
    selectionScreenInner.style.top = 0 + 'px';
    selectionScreenInner.style.backgroundColor = 'green';

    selectionScreen.appendChild(selectionScreenInner);

    var levelSetting = document.createElement('div');
    levelSetting.innerHTML = 'Level Setting';
    levelSetting.style.backgroundColor = 'red';
    levelSetting.style.padding = '10px';
    selectionScreenInner.appendChild(levelSetting);

    var bgcolorDiv = document.createElement('div');
    bgcolorDiv.innerHTML = "Select Backgound Color: <br>";
    levelSetting.appendChild(bgcolorDiv);
    var bgcolorSelect = document.createElement("select");
    bgcolorSelect.setAttribute("id", "bg-color-select");
    bgcolorDiv.appendChild(bgcolorSelect);
    var bgcolor = ['#a0b4fa|Blue', '#111111|Black'];
    for (var option in bgcolor) {
      var pair = bgcolor[option].split("|");
      var newOption = document.createElement("option");
      newOption.value = pair[0];
      newOption.innerHTML = pair[1];
      bgcolorSelect.options.add(newOption);
    }

    var bgmusicDiv = document.createElement('div');
    bgmusicDiv.innerHTML = "Select Backgound Music: <br>";
    levelSetting.appendChild(bgmusicDiv);
    var bgmusicSelect = document.createElement("select");
    bgmusicSelect.setAttribute("id", "bg-music-select");
    bgmusicDiv.appendChild(bgmusicSelect);
    var bgmusic = ['makaimura|Makaimura', 'puyo|Puyo', 'spelunk|Spelunk', 'star4|Star4', 'titerman|Titerman'];
    for (var option in bgmusic) {
      var pair = bgmusic[option].split("|");
      var newOption = document.createElement("option");
      newOption.value = pair[0];
      newOption.innerHTML = pair[1];
      bgmusicSelect.options.add(newOption);
    }

    var blocksetDiv = document.createElement('div');
    blocksetDiv.innerHTML = "Select BlockSet: <br>";
    levelSetting.appendChild(blocksetDiv);
    var blocksetSelect = document.createElement("select");
    blocksetSelect.setAttribute("id", "blockset-select");
    blocksetDiv.appendChild(blocksetSelect);
    var blockset = ['1|Set 1', '2|Set 2', '3|Set 3'];
    for (var option in blockset) {
      var pair = blockset[option].split("|");
      var newOption = document.createElement("option");
      newOption.value = pair[0];
      newOption.innerHTML = pair[1];
      blocksetSelect.options.add(newOption);
    }

    var setSettingBtn = document.createElement('button');
    setSettingBtn.innerHTML = 'Set Setting';
    setSettingBtn.style.display = 'block';
    setSettingBtn.style.fontFamily = 'catMarioFont';
    setSettingBtn.style.fontSize = '14px';
    setSettingBtn.style.color = 'white';
    setSettingBtn.style.margin = '0 auto';
    setSettingBtn.style.marginTop = '20px';
    setSettingBtn.style.padding = '14px';
    setSettingBtn.style.backgroundColor = '#000000';
    setSettingBtn.style.border = '0px';
    levelSetting.appendChild(setSettingBtn);
    this.setSettingBtn = setSettingBtn;

    var blocksSelection = document.createElement('div');
    blocksSelection.style.backgroundColor = 'blue';
    blocksSelection.style.padding = '10px';
    blocksSelection.innerHTML = 'Block Selection';
    selectionScreenInner.appendChild(blocksSelection);

  }

}