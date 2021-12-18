const hike = document.querySelector('.hike');

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-bar');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

// let = options = {
//   threshold: 0.9,
// };
// const slideAnim = (entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       hike.style.background = 'pink';
//     }
//   });
// };

// let observer = new IntersectionObserver(slideAnim, options);
// observer.observe(hike);


