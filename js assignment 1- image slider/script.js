var carouselContainer = (document.getElementsByClassName('carousel-container'))[0];
var carouselImageWrapper = (document.getElementsByClassName('carousel-image-wrapper'))[0];
var imgList = document.getElementsByTagName('img');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var indicatorsDiv = document.getElementById('indicators');

var containerWidth = carouselContainer.offsetWidth;
var containerHeight = carouselContainer.offsetHeight;
var numberOfImages = imgList.length;
var holdTime = 1;
var transitionTime = 2;
var counter = 0;
var currentPos = counter * containerWidth;
var nextPos = currentPos + containerWidth;
var LAST_POS = (containerWidth * (imgList.length - 2));
var INITIAL_POS = 0;
var transitionInterval = (transitionTime * 1000) / containerWidth;

carouselImageWrapper.style.width = (containerWidth * imgList.length) + 'px';
carouselImageWrapper.style.height = containerHeight + 'px';
carouselImageWrapper.style.left = 0 + 'px';
carouselImageWrapper.style.top = 0 + 'px';

for (var i = 0; i < numberOfImages; i++) {
  imgList[i].style.width = containerWidth + 'px';
  imgList[i].style.height = containerHeight + 'px';
  imgList[i].style.top = 0 + 'px';
  imgList[i].style.left = (containerWidth * i) + 'px';
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
prevBtn.style.display = 'none';

var autoSlideRight = setInterval(autoSlidingRight, (holdTime * 1000 + transitionTime * 1000));

function autoSlidingRight() {

  if (currentPos >= LAST_POS) {
    //console.log('cleared: ', carouselImageWrapper.style.left, currentPos);
    var posL = -(currentPos + containerWidth);
    var autoSlideLeft = setInterval(slidingLeft, transitionTime);

    function slidingLeft() {
      if (posL >= INITIAL_POS) {
        clearInterval(autoSlideLeft);
        //console.log(posL);
        counter = 0;
        currentPos = 0;
        nextPos = containerWidth;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        //console.log(counter);
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

      } else {
        posL = posL + (transitionInterval * 5);
        carouselImageWrapper.style.left = posL + 'px';
      }
    }
  } else {
    var pos = 0;
    var slideRight = setInterval(slidingRight, transitionTime);
    //console.log(counter);

    function slidingRight() {
      if (pos >= containerWidth) {
        clearInterval(slideRight);
        counter++;
        setter();

      } else {
        pos = pos + transitionInterval;
        carouselImageWrapper.style.left = (-currentPos - pos) + 'px';

      }
    }

    currentPos = (containerWidth * counter);
    nextPos = currentPos + containerWidth;
    //console.log(carouselImageWrapper.style.left);
  }
}



prevBtn.addEventListener('click', function (e) {
  var pos = 0;
  var prevBtnSlide = setInterval(frameLeft, transitionTime);

  function frameLeft() {
    if (pos >= containerWidth) {
      counter--;
      currentPos = (containerWidth * counter);
      nextPos = currentPos + containerWidth;
      clearInterval(prevBtnSlide);
      setter();
    } else {
      pos = pos + transitionInterval * 3;
      carouselImageWrapper.style.left = (-nextPos + pos) + 'px';
    }
  }
});

nextBtn.addEventListener('click', function (e) {
  var pos = 0;
  var nextBtnSlide = setInterval(frameRight, transitionTime);

  function frameRight() {
    if (pos >= containerWidth) {
      counter++;
      currentPos = (containerWidth * counter);
      nextPos = currentPos + containerWidth;
      clearInterval(nextBtnSlide);
      setter();

    } else {
      pos = pos + transitionInterval * 3;
      carouselImageWrapper.style.left = (-nextPos - pos) + 'px';
    }
  }
});

function setter() {
  if (counter == numberOfImages - 1) {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'block';
  } else if (counter == 0) {
    nextBtn.style.display = 'block';
    prevBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
    prevBtn.style.display = 'block';
  }

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

for (var i = 0; i < numberOfImages; i++) {
  indicators[i].addEventListener('click', function (e) {
    console.log(e.target);
    if (counter > i) {
      var pos = -(currentPos + containerWidth);
      posCondition = containerWidth * i;
      var prevBtnSlide = setInterval(frameLeft, transitionTime);

      function frameLeft() {
        if (pos >= posCondition) {
          counter = i;
          currentPos = (containerWidth * counter);
          nextPos = currentPos + containerWidth;
          clearInterval(prevBtnSlide);
          setter();
        } else {
          pos = pos + transitionInterval * 10;
          carouselImageWrapper.style.left = pos + 'px';
        }
      }
    } else {

    }

  })
}