'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling

// btnScrollTo.addEventListener('click', function (e) {
//   e.preventDefault();
//   const slcoords = section1.getBoundingClientRect();
//   console.log(slcoords);
//   /*DOMRect {x: 0, y: 834.6000366210938,
//      width: 933.6000366210938, height: 1595.5,
//      top: 834.6000366210938, …}
// */
//   // e.target === btnScrollTo
//   // console.log(e.target.getBoundingClientRect());
//   // console.log(window.pageXOffset, window.pageYOffset);

//   // //size of the window view
//   // console.log(
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );

//   // scrolling
//   // window.scrollTo(
//   //   slcoords.left + window.pageXOffset,
//   //   slcoords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: slcoords.left + window.pageXOffset,
//   //   top: slcoords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//page navagaiton
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

////page navagaiton
//1. add event listener to common parent eleemnt
//2. determin what element originated the event
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // Matching stragety
//   if (e.target.classList.contains('nav__link')) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// buldding tabbed componnents

tabsContainer.addEventListener('click', function (e) {
  //const clicked = e.target;
  // wont work as we have span elemnt inside it inside it
  // when we press on 1 will get the span
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(v => v.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  //e.preventDefault;
  //e.target.classList.contains('ta');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//

const initialCoords = section1.getBoundingClientRect();
// to get top bottom left right ...

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// going downward child
h1.querySelectorAll('.highlight');

// stickey navigation using intersectionObserver

//1. call back function
const obscallback = function (entries) {
  entries.forEach(function (entry) {
    console.log(entry);
  });
};

//2. object
const obsOptions = {
  root: null,

  //will call the callback function when the view is 10%
  threshold: 0.1,
};
//3. intersectionObserver

const navHeight = nav.getBoundingClientRect().height;
const observer = new IntersectionObserver(obscallback, obsOptions);

observer.observe(section1);

//
const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.intersectionObserver) nav.classList.add('sticky');
};
const headerObsarver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObsarver.observe(header);

// reveal sections
//const allSections = document.querySelectorAll('.section');
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES

const imgTarget = document.querySelectorAll('img[data-src]');
console.log(imgTarget);

const loading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //replace src with datasrc

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

// slider
const slides = document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) ranslateX(-800px)';
// slider.style.overflow = 'visible';

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length;
const createDotes = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot data-slides"${i}"></button>`
    );
  });
};

createDotes();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};
const preveSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', preveSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') preveSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    //const {slide}= e.target.dataset;
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
// h1.children;
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild;

// //goging upwords
// h1.parentNode;
// h1.parentElement;

// // find parents
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //sideway finding sibling
// h1.previousElementSibling;
// h1.nextElementSibling;
// h1.parentElement.children;

// //Select Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
//const allSections = document.querySelectorAll('.section');
//Element.querySelector('header');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
document.getElementsByClassName('btn');

// create elementing and inserting elemnts
// insertAdjancentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'we use cookies for improved functionality and analytics.';
message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it!</button>';

// insert in header

// add elements as a first child
//header.prepend(message);
//last elements
//header.append(message);

/* if we have prepend and append in the same time we can consider it as as 
 real person that can not live in two diffrent places in the same time 
 so we need to clone it first*/

// header.prepend(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

//

// styles the elements
// message.style.backgroundColor = '#37383d';

// message.style.width = '110%';
// // we can get the style here but hight not beacuse  this is in css style
// console.log(message.style.backgroundColor);

// // we can get any style from css
// console.log(getComputedStyle(message).backgroundColor);
// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message));

// if we need to change the height
// message.style.height =
//   Number.parseInt(getComputedStyle(message).height, 10) + 40 + 'px';

// // from css
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes

const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Such a good logo';

//non-standered
// console.log(logo.designer); //undifined
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('companey', 'bankist');

// //clasess
// logo.classList.add('s');
// logo.classList.remove('m');
// logo.classList.toggle('v');
// logo.classList.contains('m');

// smooth scrolling

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   e.preventDefault();
//   const slcoords = section1.getBoundingClientRect();
//   console.log(slcoords);
//   /*DOMRect {x: 0, y: 834.6000366210938,
//      width: 933.6000366210938, height: 1595.5,
//      top: 834.6000366210938, …}
// */
//   // e.target === btnScrollTo
//   // console.log(e.target.getBoundingClientRect());
//   // console.log(window.pageXOffset, window.pageYOffset);

//   // //size of the window view
//   // console.log(
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );

//   // scrolling
//   // window.scrollTo(
//   //   slcoords.left + window.pageXOffset,
//   //   slcoords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: slcoords.left + window.pageXOffset,
//   //   top: slcoords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// when you want to leasson to the event just once

// const alerth1 = function (e) {
//   alert('addeventListener: you are reading the heading');
// };

// h1.addEventListener('mouseenter', alerth1);

// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);

// // random number rgb(,,) from 0 to 255
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // WOULD  CHNAGE THE FEATURES WORD ELEMENTS AND PARENTS AS WELLL

//   console.log(e.target, e.currentTarget);
//   // nav__link  , nav__link
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // WOULD CHANGE
//   console.log(e.target, e.currentTarget);
//   //nav__link ,nav__links
//   console.log(e.currentTarget === this);
//   e.stopPropagation(); // to stop changging background color
// });

// // capturing we use 3 parameters
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     /// JUST THE PARENTS COLOR
//     console.log(e.target, e.currentTarget);
//     //nav__link ,nav
//   },
//   true
// ); // will listen to nav before nav__link}
