var carouselContainer = (document.getElementsByClassName('carousel-container'))[0];
var carouselImageWrapper = (document.getElementsByClassName('carousel-image-wrapper'))[0];
var imgList = carouselImageWrapper.children;
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var indicatorsDiv = document.getElementById('indicators');

var containerWidth = carouselContainer.offsetWidth;
console.log(containerWidth);
var containerHeight = carouselContainer.offsetHeight;
var numberOfImages = imgList.length;
var transitionTime = 10;
var holdTime = 2;
var counter = 0;
var LAST_POS = containerWidth * numberOfImages;
console.log(LAST_POS);
var FIRST_POS = 0;
var leftPos = 0;
var rightPos = containerWidth;
var autoSlide;

carouselImageWrapper.style.width = (containerWidth * imgList.length) + 'px';
carouselImageWrapper.style.height = containerHeight + 'px';
carouselImageWrapper.style.left = 0 + 'px';
carouselImageWrapper.style.top = 0 + 'px';

for (var i = 0; i < numberOfImages; i++) {
  imgList[i].style.width = containerWidth + 'px';
  imgList[i].style.height = containerHeight + 'px';
}

for (var i = 0; i < numberOfImages; i++) {
  indicatorsDiv.appendChild(createIndicators());
}

function createIndicators() {
  var indicator = document.createElement('button');
  indicator.style.width = '16px';
  indicator.style.height = '16px';
  indicator.style.borderRadius = '50%';
  indicator.style.backgroundColor = 'rgba(255,255,255,0.5)';
  indicator.style.border = 'none';
  indicator.style.marginRight = '10px';
  return indicator;
}

var indicators = indicatorsDiv.children;
indicators[0].style.backgroundColor = 'rgba(255,255,255,1)';
indicators[0].style.width = '18px';
indicators[0].style.height = '18px';

nextBtn.addEventListener('click', rightSlide);
prevBtn.addEventListener('click', leftSlide);
indicatorsDiv.addEventListener('click', moveToIndicated);

autoSlide = setInterval(rightSlide, (holdTime * 1000 + transitionTime));

function rightSlide() {
  var pos = 0;
  clearInterval(autoSlide);
  var int1 = setInterval(rightFrame, transitionTime);
  autoSlide = setInterval(rightSlide, (transitionTime + holdTime * 1000));

  function rightFrame() {
    if (counter == (numberOfImages - 1)) {
      if (pos >= (LAST_POS - containerWidth)) {
        rightPos = containerWidth;
        leftPos = 0;
        counter = 0;
        carouselImageWrapper.style.left = 0 + 'px';
        clearInterval(int1);
        setters();
      } else {
        pos = pos + (LAST_POS - containerWidth) * 0.025;
        carouselImageWrapper.style.left = (-(leftPos) + pos) + 'px';
      }
    } else {
      if (leftPos >= rightPos) {
        rightPos = rightPos + containerWidth;
        leftPos = rightPos - containerWidth;
        (counter) ++;
        carouselImageWrapper.style.left = -(leftPos) + 'px';
        clearInterval(int1);
        setters();
      } else {
        leftPos = leftPos + containerWidth * 0.025;
        carouselImageWrapper.style.left = -(leftPos) + 'px'
      }
    }
  }

} //rightSlide

function leftSlide() {
  var pos = 0;
  clearInterval(autoSlide);
  var int2 = setInterval(leftFrame, transitionTime);
  autoSlide = setInterval(rightSlide, (transitionTime + holdTime * 1000));

  function leftFrame() {
    if (counter == 0) {
      if (pos >= (LAST_POS - containerWidth)) {
        rightPos = LAST_POS;
        leftPos = LAST_POS - containerWidth;
        counter = (numberOfImages - 1);
        carouselImageWrapper.style.left = leftPos + 'px';
        clearInterval(int2);
        setters();
      } else {
        pos = pos + (LAST_POS - containerWidth) * 0.025;
        carouselImageWrapper.style.left = (-(leftPos) - pos) + 'px';
      }
    } else {
      if (rightPos <= leftPos) {
        leftPos = leftPos - containerWidth;
        rightPos = leftPos + containerWidth;
        counter--;
        carouselImageWrapper.style.left = -(rightPos - containerWidth) + 'px';
        clearInterval(int2);
        setters();
      } else {
        rightPos = rightPos - containerWidth * 0.025;
        carouselImageWrapper.style.left = -(rightPos - containerWidth) + 'px';
      }
    }
  }

} //leftSlide

function setters() {
  for (i = 0; i < numberOfImages; i++) {
    if (i == counter) {
      indicators[i].style.backgroundColor = 'rgba(255,255,255,1)';
      indicators[i].style.width = '18px';
      indicators[i].style.height = '18px';
    } else {
      indicators[i].style.backgroundColor = 'rgba(255,255,255,0.5)';
      indicators[i].style.width = '16px';
      indicators[i].style.height = '16px';
    }
  }
}

function moveToIndicated(e) {
  clearInterval(autoSlide);
  for (var i = 0; i < indicators.length; i++) {
    if (indicators[i] == e.target) {
      counter = i;
      leftPos = counter * containerWidth;
      rightPos = leftPos + containerWidth;
      carouselImageWrapper.style.left = (-leftPos) + 'px';
      setters();
    }
  }
  autoSlide = setInterval(rightSlide, (transitionTime + holdTime * 1000));
}