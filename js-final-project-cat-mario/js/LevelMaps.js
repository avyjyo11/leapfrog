var levelMaps = new LevelMaps();

function LevelMaps() {
  this.levelObj;
  var that = this;

  this.getJSONMap = function (level, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', './js/levels/level' + level + '.json', true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        callback(data);
        console.log('JSONdata', data);
      } else {
        // We reached our target server, but it returned an
      }
    }
    request.send();
  }

}