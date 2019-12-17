var levelMaps = new LevelMaps();

function LevelMaps() {
  var that = this;

  this.getJSONMap = function (callback) {
    var request1 = new XMLHttpRequest();
    request1.open('GET', './js/levels/levelMaps.json', true);
    request1.onload = function () {
      if (request1.status >= 200 && request1.status < 400) {
        // Success!
        var levelMaps = JSON.parse(request1.responseText);
        var request2 = new XMLHttpRequest();
        request2.open('GET', './js/levels/levelData.json', true);
        request2.onload = function () {
          if (request2.status >= 200 && request2.status < 400) {
            var levelData = JSON.parse(request2.responseText);
            callback(levelMaps, levelData);
            /// console.log(levelMaps, levelData);
          }
        }
        request2.send();
      } else {
        // We reached our target server, but it returned an
      }
    }
    request1.send();
  }

}