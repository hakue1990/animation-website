let controller;
let slideScene;
let pageScene;
const burger = document.querySelector('.burger');

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll('.slide');
  const nav = document.querySelector('.nav-header');
  //Loop over each sllide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector('.reveal-img');
    const img = slide.querySelector('img');
    const revealText = slide.querySelector('.reveal-text');
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power2.inOut' },
    });
    slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
    slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75');
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide"
      // })
      .addTo(controller);
    //New ANimation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: '30%' }, { y: '0%' }, '-=0.5');
    //Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "page",
      //   indent: 200
      // })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

animateSlides();

const cursor = document.querySelector('.cursor');
//funkcja kursora
function cursorMove(e) {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
}
function activeCursor(e) {
  const item = e.target;
  console.log(item);
  if (
    item.id === 'logo' ||
    item.classList == 'burger-inner' ||
    item.classList == 'burger-outer'
  ) {
    cursor.classList.add('nav-active');
  } else {
    cursor.classList.remove('nav-active');
  }
  if (item.classList.contains('explore')) {
    cursor.classList.add('explore-active');
  } else {
    cursor.classList.remove('explore-active');
  }
}

const navToggle = () => {
  document.querySelector('.burger-inner').classList.toggle('active');
  if (document.querySelector('.burger-inner').classList.contains('active')) {
    gsap.to('.nav-bar', 0.8, { clipPath: 'circle(3000px at 100% -10%)' });
    gsap.to('#logo', 0.3, { color: 'black' });
    document.body.classList.add('hide');
  } else {
    gsap.to('.nav-bar', 0.8, { clipPath: 'circle(50px at 100% -10%)' });
    gsap.to('#logo', 0.3, { color: 'white' });
    document.body.classList.remove('hide');
  }
};

//Event Listeneers
burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursorMove);
window.addEventListener('mouseover', activeCursor);
