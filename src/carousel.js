/***** Empty global *****/
const domElements = {};

class Carousel {
  constructor(
    {
      elementId = 'carousel',
      elementClass = 'my-carousel',
      autoPlay = true,
      rotateTime = 5000,
      nav = true,
      arrows = true,
      activeClass = 'active'
    } = {}
  ) {
    this.elementId = elementId;
    this.elementClass = elementClass;
    this.autoPlay = autoPlay;
    this.rotateTime = rotateTime;
    this.nav = nav;
    this.arrows = arrows;
    this.activeClass = activeClass;
  }

  init() {
    if (!document.getElementById(this.elementId)) {
      console.error('Element not found in DOM');
    } else {
      /***** Setup DOM elements/classes we will need to access *****/
      domElements.wrapper = document.getElementById(this.elementId);
      domElements.items = Array.prototype.slice.call(
        document.getElementById(this.elementId).firstElementChild.children
      );
      domElements.activeClass = this.activeClass;

      domElements.wrapper.className = `${this.elementClass} ${this.activeClass}`;
      domElements.items[0].className = this.activeClass;

      /***** Add items/features based on our options *****/
      if (this.autoPlay) {
        timer = setInterval(autoPlay, this.rotateTime);
      }

      if (this.arrows) {
        Arrows.addArrows(this.elementClass);
      }

      if (this.nav) {
        Nav.addNav(this.elementClass, this.activeClass);
      }

      /***** Event Listeners *****/
      domElements.wrapper.addEventListener('click', evt => {
        if (evt.target.classList.contains('carousel-nav-btn')) {
          Nav.changeSlide(evt.target, this.rotateTime, this.autoPlay);
        }

        if (evt.target.classList.contains('arrow-left')) {
          Arrows.previousSlide(this.rotateTime, this.autoPlay, this.nav);
        }

        if (evt.target.classList.contains('arrow-right')) {
          Arrows.nextSlide(this.rotateTime, this.autoPlay, this.nav);
        }
      });
    }
  }
}

let timer;
function autoPlay() {
  let hasNav;

  if (domElements.navWrapper) {
    hasNav = true;
  }

  for (let i = 0; i < domElements.items.length; i++) {
    if (domElements.items[i].classList.contains(domElements.activeClass)) {
      domElements.items[i].classList.remove(domElements.activeClass);
      if (hasNav) {
        domElements.navWrapper.children[i].classList.remove(
          domElements.activeClass
        );
      }

      // If it's the last item, add a class to the first... otherwise add a class to the next one
      if (domElements.items[i].nextElementSibling === null) {
        domElements.items[0].classList.add(domElements.activeClass);
        if (hasNav) {
          domElements.navWrapper.firstChild.classList.add(
            domElements.activeClass
          );
        }
      } else {
        domElements.items[i].nextElementSibling.classList.add(
          domElements.activeClass
        );
        if (hasNav) {
          domElements.navWrapper.children[i].nextElementSibling.classList.add(
            domElements.activeClass
          );
        }
      }
      break;
    }
  }
}

class Arrows extends Carousel {
  static addArrows(elemClass) {
    const arrowLeft = document.createElement('button');
    arrowLeft.className = `${elemClass}-arrow carousel-arrow arrow-left`;
    arrowLeft.textContent = 'View Previous';

    const arrowRight = document.createElement('button');
    arrowRight.className = `${elemClass}-arrow carousel-arrow arrow-right`;
    arrowRight.textContent = 'View Next';

    domElements.wrapper.appendChild(arrowLeft);
    domElements.wrapper.appendChild(arrowRight);
  }

  static nextSlide(rotateTime, autoPl, hasNav) {
    // Restart timer if there is autoplay
    if (autoPl) {
      clearInterval(timer);
      timer = setInterval(autoPlay, rotateTime);
    }

    // Get an array of nav buttons
    let btnsArray;
    if (hasNav) {
      btnsArray = Array.prototype.slice.call(domElements.navWrapper.children);
    }

    // Get the index of the current active slide
    const currentIndex = domElements.items.findIndex(
      elem => elem.classList.contains(domElements.activeClass)
    );

    // Logic
    domElements.items[currentIndex].classList.remove(domElements.activeClass);
    if (hasNav) {
      btnsArray[currentIndex].classList.remove(domElements.activeClass);
    }

    if (domElements.items[currentIndex].nextElementSibling === null) {
      domElements.items[0].classList.add(domElements.activeClass);
      if (hasNav) {
        btnsArray[0].classList.add(domElements.activeClass);
      }
    } else {
      domElements.items[currentIndex +
        1].classList.add(domElements.activeClass);
      if (hasNav) {
        btnsArray[currentIndex + 1].classList.add(domElements.activeClass);
      }
    }
  }

  static previousSlide(rotateTime, autoPl, hasNav) {
    // Restart timer if there is autoplay
    if (autoPl) {
      clearInterval(timer);
      timer = setInterval(autoPlay, rotateTime);
    }

    // Get an array of nav buttons
    let btnsArray;
    if (hasNav) {
      btnsArray = Array.prototype.slice.call(domElements.navWrapper.children);
    }

    // Get the index of the current active slide
    const currentIndex = domElements.items.findIndex(
      elem => elem.classList.contains(domElements.activeClass)
    );

    // Logic
    domElements.items[currentIndex].classList.remove(domElements.activeClass);
    if (hasNav) {
      btnsArray[currentIndex].classList.remove(domElements.activeClass);
    }

    if (domElements.items[currentIndex].previousElementSibling === null) {
      domElements.items[domElements.items.length -
        1].classList.add(domElements.activeClass);
      if (hasNav) {
        btnsArray[domElements.items.length -
          1].classList.add(domElements.activeClass);
      }
    } else {
      domElements.items[currentIndex -
        1].classList.add(domElements.activeClass);
      if (hasNav) {
        btnsArray[currentIndex - 1].classList.add(domElements.activeClass);
      }
    }
  }
}

class Nav extends Carousel {
  // Create/add navigation
  static addNav(elemClass, activeClass) {
    domElements.navWrapper = document.createElement('div');
    domElements.navWrapper.className = `${elemClass}-nav-wrapper carousel-nav-wrapper`;

    for (let i = 0; i < domElements.items.length; i++) {
      const navBtn = document.createElement('button');
      navBtn.textContent = `View slide ${i + 1}`;
      navBtn.className = `${elemClass}-nav-btn carousel-nav-btn`;
      if (i == 0) {
        navBtn.classList.add(activeClass);
      }
      domElements.navWrapper.appendChild(navBtn);
    }
    domElements.wrapper.appendChild(domElements.navWrapper);
  }

  static changeSlide(item, rotateTime, autoPl) {
    if (autoPl) {
      clearInterval(timer);
      timer = setInterval(autoPlay, rotateTime);
    }

    // Get an array of all of the nav btns
    const btnsArray = Array.prototype.slice.call(item.parentElement.children);

    // Map over the array and remove the active class for each
    btnsArray.map((elem, index) => {
      elem.classList.remove(domElements.activeClass);
      // If the item in the current iteration is the element that was clicked, then add an active class and add and active class to our global items at that index
      if (item == elem) {
        item.classList.add(domElements.activeClass);
        domElements.items.forEach((elem, itemIndex) => {
          index == itemIndex
            ? elem.classList.add(domElements.activeClass)
            : elem.classList.remove(domElements.activeClass);
        });
      }
    });
  }
}
