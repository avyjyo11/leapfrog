var levelMaps = new LevelMaps();


function LevelMaps() {
  this.levelMaps;
  this.levelData;
  var that = this;

  this.getJSONMap = function (callback) {
    var request1 = new XMLHttpRequest();
    request1.open('GET', './js/levels/levelMaps.json', true);
    request1.onload = function () {
      if (request1.status >= 200 && request1.status < 400) {
        // Success!
        var levelMaps = that.addSavedMap(request1.responseText);
        //that.addSavedMap(request1.responseText);
        var request2 = new XMLHttpRequest();
        request2.open('GET', './js/levels/levelData.json', true);
        request2.onload = function () {
          if (request2.status >= 200 && request2.status < 400) {
            var levelData = that.addSavedData(request2.responseText);
            that.levelMaps = levelMaps;
            that.levelData = levelData;
            callback(levelMaps, levelData);
          }
        }
        request2.send();
      } else {
        // We reached our target server, but it returned an
      }
    }
    request1.send();
  }

  this.addSavedMap = function (levelMapString) {
    var Map = levelMapString;
    var levelMapString2 = (Map.split('}'))[0];
    var savedMapString = window.localStorage.getItem('savedMapString');
    var returnString = levelMapString2 + savedMapString + ' }';
    return JSON.parse(returnString);
  }

  this.addSavedData = function (levelDataString) {
    var Data1 = levelDataString;
    var levelDataString2 = (Data1.split('}'))[0];
    var savedDataString = window.localStorage.getItem('savedDataString');
    var returnString = levelDataString2 + savedDataString + ' }';
    return JSON.parse(returnString);
  }

  this.sendJSONMap = function (levelMapString) {
    var Map = JSON.stringify(that.levelMaps);
    var arr = Map.split('}');
    console.log(arr[0]);
  }

  this.testing = function () {

  }
}