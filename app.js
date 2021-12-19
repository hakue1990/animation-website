const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-bar');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

function animateSlides() {
  controller = new ScrollMagic.Controller();

  //select items

  const sliders = document.querySelectorAll('.slide');
  const nav = document.querySelector('.nav-header');
}
