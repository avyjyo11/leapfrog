function GameSound() {
  this.makaimura;
  this.puyo;
  this.spelunk;
  this.star4;
  this.titerman;
  this.clear;
  this.allclear;
  this.blockbreak;
  this.blocksummon;
  this.blockcoin;
  this.coin;
  this.death;
  this.jump;
  this.goal;
  this.dokan;
  this.gameover;
  this.gameover2;
  this.hintBlock;
  this.humi;
  this.jumpBlock;
  this.kirra;
  this.koura;
  this.powerup;
  this.pswitch;
  this.tekifire;
  var that = this;

  this.init = function () {
    this.makaimura = new Audio('./audio/bgm/makaimura.mp3');
    this.makaimura.loop = true;
    this.puyo = new Audio('./audio/bgm/puyo.mp3');
    this.puyo.loop = true;
    this.spelunk = new Audio('./audio/bgm/spelunk.mp3');
    this.spelunk.loop = true;
    this.star4 = new Audio('./audio/bgm/star4.mp3');
    this.star4.loop = true;
    this.titerman = new Audio('./audio/bgm/titerman.mp3');
    this.titerman.loop = true;
    this.clear = new Audio('./audio/4-clear.mp3');
    this.allclear = new Audio('./audio/allclear.mp3');
    this.blockbreak = new Audio('./audio/blockbreak.mp3');
    this.blocksummon = new Audio('./audio/blocksummon.mp3');
    this.blockcoin = new Audio('./audio/blockcoin.mp3');
    this.coin = new Audio('./audio/coin.mp3');
    this.death = new Audio('./audio/death.mp3');
    this.jump = new Audio('./audio/jump.mp3');
    this.goal = new Audio('./audio/goal.mp3');
    this.dokan = new Audio('./audio/dokan.mp3');
    this.gameover = new Audio('./audio/gameover.mp3');
    this.gameover2 = new Audio('./audio/gameover2.mp3');
    this.hintBlock = new Audio('./audio/hintBlock.mp3');
    this.humi = new Audio('./audio/humi.mp3');
    this.jumpBlock = new Audio('./audio/jumpBlock.mp3');
    this.kirra = new Audio('./audio/kirra.mp3');
    this.koura = new Audio('./audio/koura.mp3');
    this.powerup = new Audio('./audio/powerup.mp3');
    this.pswitch = new Audio('./audio/pswitch.mp3');
    this.tekifire = new Audio('./audio/tekifire.mp3');
  }

  this.play = function (element) {
    if (element == 'clear') {
      that.clear.pause();
      that.clear.currentTime = 0;
      that.clear.play();
    } else if (element == 'allclear') {
      that.allclear.pause();
      that.allclear.currentTime = 0;
      that.allclear.play();
    } else if (element == 'blockbreak') {
      that.blockbreak.pause();
      that.blockbreak.currentTime = 0;
      that.blockbreak.play();
    } else if (element == 'blocksummon') {
      that.blocksummon.pause();
      that.blocksummon.currentTime = 0;
      that.blocksummon.play();
    } else if (element == 'blockcoin') {
      that.blockcoin.pause();
      that.blockcoin.currentTime = 0;
      that.blockcoin.play();
    } else if (element == 'coin') {
      that.coin.pause();
      that.coin.currentTime = 0;
      that.coin.play();
    } else if (element == 'death') {
      that.death.pause();
      that.death.currentTime = 0;
      that.death.play();
    } else if (element == 'jump') {
      that.jump.pause();
      that.jump.currentTime = 0;
      that.jump.play();
    } else if (element == 'goal') {
      that.goal.pause();
      that.goal.currentTime = 0;
      that.goal.play();
    } else if (element == 'dokan') {
      that.dokan.pause();
      that.dokan.currentTime = 0;
      that.dokan.play();
    } else if (element == 'gameover') {
      that.gameover.pause();
      that.gameover.currentTime = 0;
      that.gameover.play();
    } else if (element == 'gameover2') {
      that.gameover2.pause();
      that.gameover2.currentTime = 0;
      that.gameover2.play();
    } else if (element == 'hintBlock') {
      that.hintBlock.pause();
      that.hintBlock.currentTime = 0;
      that.hintBlock.play();
    } else if (element == 'humi') {
      that.humi.pause();
      that.humi.currentTime = 0;
      that.humi.play();
    } else if (element == 'jumpBlock') {
      that.jumpBlock.pause();
      that.jumpBlock.currentTime = 0;
      that.jumpBlock.play();
    } else if (element == 'kirra') {
      that.kirra.pause();
      that.kirra.currentTime = 0;
      that.kirra.play();
    } else if (element == 'koura') {
      that.koura.pause();
      that.koura.currentTime = 0;
      that.koura.play();
    } else if (element == 'powerup') {
      that.powerup.pause();
      that.powerup.currentTime = 0;
      that.powerup.play();
    } else if (element == 'pswitch') {
      that.pswitch.pause();
      that.pswitch.currentTime = 0;
      that.pswitch.play();
    } else if (element == 'tekifire') {
      that.tekifire.pause();
      that.tekifire.currentTime = 0;
      that.tekifire.play();
    } else if (element == 'makaimura') {
      that.makaimura.pause();
      that.makaimura.currentTime = 0;
      that.makaimura.play();
    } else if (element == 'puyo') {
      that.puyo.pause();
      that.puyo.currentTime = 0;
      that.puyo.play();
    } else if (element == 'spelunk') {
      that.spelunk.pause();
      that.spelunk.currentTime = 0;
      that.spelunk.play();
    } else if (element == 'star4') {
      that.star4.pause();
      that.star4.currentTime = 0;
      that.star4.play();
    } else if (element == 'titerman') {
      that.titerman.pause();
      that.titerman.currentTime = 0;
      that.titerman.play();
    }
  }

  this.stop = function (element) {
    if (element == 'makaimura') {
      that.makaimura.pause();
    } else if (element == 'puyo') {
      that.puyo.pause();
    } else if (element == 'spelunk') {
      that.spelunk.pause();
    } else if (element == 'star4') {
      that.star4.pause();
    } else if (element == 'titerman') {
      that.titerman.pause();
    }
  }
}