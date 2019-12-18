if (window.localStorage.getItem('savedLevel') == null) {
  window.localStorage.setItem('savedLevel', '0');
}

if (window.localStorage.getItem('savedMapString') == null) {
  window.localStorage.setItem('savedMapString', '');
}

if (window.localStorage.getItem('savedDataString') == null) {
  window.localStorage.setItem('savedDataString', '');
}

function LevelMaker(container) {
  this.savedLevel = 0;
  this.levelDataObj = {
    bgcolor: "#a0b4fa",
    bgm: 'puyo',
    blockSet: 1
  };
  this.levelMapString;
  this.levelDataString;
  this.container = container;
  this.tileSize = gameUI.tileSize;
  this.mapScreen;
  this.row = 15;
  this.column = 137;
  this.elements;
  this.trollElements;
  this.setSettingBtn;
  this.allBlocks;
  this.selectedBlock;
  this.selectedBlockIndex;
  this.saveMapBtn;
  this.saveMap = [];
  this.prevSelectBlock;
  var that = this;

  this.init = function () {
    this.savedLevel = parseInt(window.localStorage.getItem('savedLevel'));
    this.levelMapString = window.localStorage.getItem('savedMapString');
    this.levelDataString = window.localStorage.getItem('savedDataString');
    // console.log('that.savedlevel ', that.savedLevel);
    // console.log('that.levelMapString ', that.levelMapString);
    // console.log('that.levelDataString ', that.levelDataString);
    this.setVariables();
    this.setLayout();
    this.setSaveMap();

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
      var list = document.getElementsByClassName('block-list-ul')[0].childNodes;
      for (var i = 0; i < list.length; i++) {
        list[i].innerHTML = that.allBlocks[i][0];
      }
      that.mapScreen.style.backgroundColor = that.levelDataObj.bgcolor;
    });

    that.saveMapBtn.addEventListener('click', function () {
      const saveMap = [];
      let newArray = [];
      var table = document.getElementsByTagName('table')[0];
      var trList = table.childNodes;
      for (var i = 0; i < that.row; i++) {
        var tdList = trList[i].childNodes;
        for (var j = 0; j < that.column; j++) {
          if (tdList[j].className != "") {
            //console.log(i, j);
            let value;
            for (var m = 0; m < that.allBlocks.length - 1; m++) {
              if (tdList[j].className == that.allBlocks[m][0]) {
                value = that.allBlocks[m][1];
              }
            }
            newArray.push(value);
          } else {
            newArray.push(0);
          }
        }
        saveMap.push(newArray);
        newArray = [];
      }
      that.saveMap = saveMap;
      that.saveLevelStorage();
      that.saveLevelDataStorage();
    });
  }

  this.saveLevelStorage = function () {
    that.savedLevel++;
    let saveMapString = '';
    //window.localStorage.setItem('savedLevel', (that.savedLevel).toString());
    for (var i = 0; i < that.saveMap.length; i++) {
      let eachRow = [];
      eachRow = that.saveMap[i];
      if (i != that.saveMap.length - 1)
        saveMapString = saveMapString + '[' + eachRow.toString() + '],';
      else
        saveMapString = saveMapString + '[' + eachRow.toString() + ']';
    }
    saveMapString = '[' + saveMapString + ']';
    saveMapString = ', "Save-' + that.savedLevel + '" : ' + saveMapString;
    that.levelMapString = that.levelMapString + saveMapString;
    //window.localStorage.setItem('savedMapString', that.levelMapString);
    console.log('that.savedlevel ', that.savedLevel);
    console.log('that.levelMapString ', that.levelMapString);
  }

  this.saveLevelDataStorage = function () {
    var saveDataString = ', "Save-' + that.savedLevel + '-bgcolor" : "' + that.levelDataObj.bgcolor + '", "Save-' + that.savedLevel + '-blockSet": ' + that.levelDataObj.blockSet + ', "Save-' + that.savedLevel + '-bgm": "' + that.levelDataObj.bgm + '"';
    that.levelDataString = that.levelDataString + saveDataString;
    //window.localStorage.setItem('savedDataString', that.levelDataString);
    console.log('that.levelDataString ', that.levelDataString);
  }

  this.setSaveMap = function () {
    var saveMap = [];
    var newArray = [];
    for (var i = 0; i < that.row; i++) {
      for (var j = 0; j < that.column; j++) {
        newArray[j] = 0;
      }
      saveMap.push(newArray);
      newArray = [];
    }
    that.saveMap = saveMap;
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
      ['troll-invisible-cloud', 48],
      ['hill', 81],
      ['grass', 82],
      ['cloud', 83],
      ['castle', 84],
      ['tree-1', 85],
      ['tree-2', 86],
      ['checkpoint', 80],
      ['finish-line', 100],
      ['none', 0]
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
        td.style.width = that.tileSize + 'px';
        td.style.height = that.tileSize + 'px';
        td.style.border = '1px solid blue';
        tr.appendChild(td);

        td.addEventListener('mousedown', function (e) {
          e.preventDefault();
          that.mouseDown = true;
          var tile = e.target;
          if (tile.className != "") {
            var clas = tile.className;
            tile.classList.remove(clas);
          }
          if (that.selectedBlock != null && that.selectedBlock != 'none')
            tile.classList.add(that.selectedBlock);
          //console.log(tile.className);
        });

        td.addEventListener('mouseover', function (e) {
          if (that.mouseDown) {
            var tile = e.target;
            if (tile.className != "") {
              var clas = tile.className;
              tile.classList.remove(clas);
            }
            if (that.selectedBlock != null && that.selectedBlock != 'none')
              tile.classList.add(that.selectedBlock);
            //console.log(tile.className);
          }
        });

        td.addEventListener('mouseup', function (e) {
          that.mouseDown = false;
        });
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
    blocksSelection.style.paddingLeft = '0px';
    blocksSelection.innerHTML = 'Block Selection';
    selectionScreenInner.appendChild(blocksSelection);

    var ul = document.createElement('ul');
    ul.style.textDecoration = 'none';
    ul.style.listStyle = 'none';
    ul.style.border = '1px solid black';
    ul.classList.add('block-list-ul');
    blocksSelection.appendChild(ul);
    for (var i = 0; i < that.allBlocks.length; i++) {
      var li = document.createElement('li');
      li.innerHTML = that.allBlocks[i][0];
      li.style.lineHeight = '30px';
      //li.style.fontFamily = 'Arial';
      li.style.fontSize = '18px';
      li.style.cursor = 'grab';

      ul.appendChild(li);

      li.onclick = (function (index) {
        return function () {
          console.log(this);
          if (that.prevSelectBlock != null) {
            var itsClassname = that.prevSelectBlock.className;
            that.prevSelectBlock.classList.remove(itsClassname);
          }
          this.classList.add('active');
          that.prevSelectBlock = this;
          that.selectedBlock = that.allBlocks[index][0];
        }
      })(i);

      // li.addEventListener('click', function (e) {
      //   var list = document.getElementsByTagName('li');
      //   for (var i = 0; i < list.length; i++) {
      //     if (e.target == list[i]) {
      //       that.selectedBlock = that.allBlocks[i][0];
      //     }
      //   }
      // });
    }

    var saveMapBtn = document.createElement('button');
    saveMapBtn.innerHTML = 'Save Map';
    saveMapBtn.style.display = 'block';
    saveMapBtn.style.fontFamily = 'catMarioFont';
    saveMapBtn.style.fontSize = '14px';
    saveMapBtn.style.color = 'white';
    saveMapBtn.style.margin = '0 auto';
    saveMapBtn.style.marginTop = '20px';
    saveMapBtn.style.padding = '14px';
    saveMapBtn.style.backgroundColor = '#000000';
    saveMapBtn.style.border = '0px';
    selectionScreenInner.appendChild(saveMapBtn);
    this.saveMapBtn = saveMapBtn;
  }
}