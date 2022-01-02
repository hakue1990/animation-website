let controller;
let slideScene;
let pageScene;
const burger = document.querySelector(".burger");

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    // gsap.to(revealImg, 1, { x: '100%' });
    // gsap.to(revealText, 0.5, { x: '100%' });
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=.75");
    // Tworzenie sceny
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: 'white',
      //   colorTrigger: 'white',
      //   name: 'slide',
      // })
      .addTo(controller);
    //Nowa animacja
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" });

    //Nowa scena
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: 'white',
      //   colorTrigger: 'white',
      //   name: 'page',
      //   indent: 200,
      // })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

animateSlides();

const cursor = document.querySelector(".cursor");
//funkcja kursora
function cursorMove(e) {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    cursor.classList.add("nav-active");
  } else {
    cursor.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    cursor.classList.add("explore-active");
  } else {
    cursor.classList.remove("explore-active");
  }
}

const navToggle = () => {
  document.querySelector(".burger-inner").classList.toggle("active");
  gsap.to(".nav-bar", 1, { clipPath: "circle(3000px at 100% -10%)" });
};

//Event Listeneers
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursorMove);
window.addEventListener("mouseover", activeCursor);
