function imageCarousel(width, height, transitionTime, holdTime, index) {
  this.height = height;
  this.index = index;
  this.width = width;
  var that = this;
  this.carouselContainer;
  this.carouselImageWrapper;
  this.imgList = [];
  this.imgCount;
  this.leftBtn;
  this.rightBtn;
  this.indicatorsDiv;
  this.indicatorDots = [];
  this.transitionTime = transitionTime;
  this.holdTime = holdTime;
  this.counter = 0;
  this.LAST_POS;
  this.FIRST_POS = 0;
  this.leftPos = 0;
  this.rightPos = width;

  this.init = function () {
    this.createContainer();
    this.createImageWrapper();
    this.createImages();
    this.createButtons();
    this.createIndicators();

    this.rightBtn.addEventListener('click', rightSlide.bind(this));
    this.leftBtn.addEventListener('click', leftSlide.bind(this));
    this.indicatorsDiv.addEventListener('click', moveToIndicated.bind(this));
  }

  this.createContainer = function () {
    this.carouselContainer = document.getElementsByClassName('carousel-container')[this.index];
    this.carouselContainer.style.width = this.width + 'px';
    this.carouselContainer.style.height = this.height + 'px';
  }

  this.createImages = function () {
    for (var i = 0; i < this.imgCount; i++) {
      this.imgList[i].style.width = this.width + 'px';
      this.imgList[i].style.height = this.height + 'px';
      //console.log(this.imgList[i]);
    }
  }

  this.createImageWrapper = function () {
    this.carouselImageWrapper = document.getElementsByClassName('carousel-image-wrapper')[this.index];
    this.imgList = this.carouselImageWrapper.children;
    this.imgCount = this.imgList.length;
    this.carouselImageWrapper.style.width = (this.width * this.imgCount) + 'px';
    this.carouselImageWrapper.style.height = this.height + 'px';
    this.carouselImageWrapper.style.top = 0 + 'px';
    this.carouselImageWrapper.style.left = 0 + 'px';
  }

  this.createButtons = function () {
    this.leftBtn = document.createElement('button');
    this.leftBtn.classList.add('carousel-container-button');
    this.leftBtn.setAttribute('style', 'left: 0px; width: 40px; height: 60px; margin-top: -30px; line-height: 0px;');
    this.leftBtn.innerHTML = '&#8249;';
    this.carouselContainer.appendChild(this.leftBtn);
    this.rightBtn = document.createElement('button');
    this.rightBtn.classList.add('carousel-container-button');
    this.rightBtn.setAttribute('style', 'right: 0px; width: 40px; height: 60px; margin-top: -30px; line-height: 0px;');
    this.rightBtn.innerHTML = '&#8250;';
    this.carouselContainer.appendChild(this.rightBtn);
  }

  this.createIndicators = function () {
    this.indicatorsDiv = document.createElement('div');
    this.indicatorsDiv.classList.add('indicator-div');
    this.indicatorsDiv.style.height = (this.height * 0.05) + 'px';
    this.carouselContainer.appendChild(this.indicatorsDiv);

    for (var i = 0; i < this.imgCount; i++) {
      this.indicatorsDiv.appendChild(createIndicatorDots());
    }

    function createIndicatorDots() {
      var indicator = document.createElement('button');
      indicator.style.width = '16px';
      indicator.style.height = '16px';
      indicator.style.borderRadius = '50%';
      indicator.style.backgroundColor = 'rgba(255,255,255,0.7)';
      indicator.style.border = 'none';
      indicator.style.marginRight = '10px';
      return indicator;
    }

    this.indicatorDots = this.indicatorsDiv.children;
    this.indicatorDots[0].style.backgroundColor = 'rgba(255,255,255,1)';
    this.indicatorDots[0].style.width = '18px';
    this.indicatorDots[0].style.height = '18px';
    this.LAST_POS = this.width * this.imgCount;
    //console.log('indicators', this.indicatorDots);
  }

  function rightSlide() {
    var pos = 0;
    var int1 = setInterval(rightFrame.bind(this), this.transitionTime);

    function rightFrame() {
      if (this.counter == (this.imgCount - 1)) {
        if (pos >= (that.LAST_POS - that.width)) {
          this.rightPos = this.width;
          this.leftPos = 0;
          this.counter = 0;
          clearInterval(int1);
          this.settingIndicators();
        } else {
          pos = pos + (that.LAST_POS - that.width) * 0.025;
          that.carouselImageWrapper.style.left = (-(that.leftPos) + pos) + 'px';
        }
      } else {
        if (this.leftPos >= this.rightPos) {
          this.rightPos = this.rightPos + this.width;
          this.leftPos = this.rightPos - this.width;
          (this.counter) ++;
          that.carouselImageWrapper.style.left = -(that.leftPos) + 'px';
          clearInterval(int1);
          this.settingIndicators();
        } else {
          this.leftPos = this.leftPos + this.width * 0.025;
          that.carouselImageWrapper.style.left = -(that.leftPos) + 'px'
        }
      }
    }

  } //rightSlide

  function leftSlide() {
    var pos = 0;
    var int2 = setInterval(leftFrame.bind(this), this.transitionTime);

    function leftFrame() {
      if (this.counter == 0) {
        if (pos >= (that.LAST_POS - that.width)) {
          this.rightPos = this.LAST_POS;
          this.leftPos = this.LAST_POS - this.width;
          this.counter = (this.imgCount - 1);
          clearInterval(int2);
          this.settingIndicators();
        } else {
          pos = pos + (that.LAST_POS - that.width) * 0.025;
          that.carouselImageWrapper.style.left = (-(that.leftPos) - pos) + 'px';
        }
      } else {
        if (this.rightPos <= this.leftPos) {
          this.leftPos = this.leftPos - this.width;
          this.rightPos = this.leftPos + this.width;
          (this.counter) --;
          that.carouselImageWrapper.style.left = -(that.rightPos - this.width) + 'px';
          clearInterval(int2);
          this.settingIndicators();
        } else {
          this.rightPos = this.rightPos - this.width * 0.025;
          that.carouselImageWrapper.style.left = -(that.rightPos - this.width) + 'px';
        }
      }
    }

  } //leftSlide

  this.settingIndicators = function () {
    for (var i = 0; i < this.imgCount; i++) {
      if (i == this.counter) {
        this.indicatorDots[i].style.backgroundColor = 'rgba(255,255,255,1)';
        this.indicatorDots[i].style.width = '18px';
        this.indicatorDots[i].style.height = '18px';
      } else {
        this.indicatorDots[i].style.backgroundColor = 'rgba(255,255,255,0.5)';
        this.indicatorDots[i].style.width = '16px';
        this.indicatorDots[i].style.height = '16px';
      }
    }
  }

  function moveToIndicated(e) {
    for (var i = 0; i < this.indicatorDots.length; i++) {
      if (this.indicatorDots[i] == e.target) {
        this.counter = i;
        this.leftPos = this.counter * this.width;
        this.rightPos = this.leftPos + this.width;
        this.carouselImageWrapper.style.left = (-this.leftPos) + 'px';
        this.settingIndicators();
      }
    }
  }

}

/*width, height in px, transition time in msec, holdtime in sec, index from 0*/
var carousel1 = new imageCarousel(700, 500, 10, 2, 0);
carousel1.init();