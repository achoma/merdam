const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".left-arrow");
const nextButton = document.querySelector(".right-arrow");
const dotsNav = document.querySelector(".carousel-dots");

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dotsNav.appendChild(dot);
});

const dots = Array.from(dotsNav.children);

let currentIndex = 0;

function updateCarousel(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function moveToNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel(currentIndex);
}

let autoSlide = setInterval(moveToNextSlide, 3000);

nextButton.addEventListener("click", () => {
  clearInterval(autoSlide);
  moveToNextSlide();
  autoSlide = setInterval(moveToNextSlide, 3000);
});

prevButton.addEventListener("click", () => {
  clearInterval(autoSlide);
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel(currentIndex);
  autoSlide = setInterval(moveToNextSlide, 3000);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(autoSlide);
    currentIndex = index;
    updateCarousel(currentIndex);
    autoSlide = setInterval(moveToNextSlide, 3000);
  });
});

// Kod dla drugiej karuzeli
const trackM = document.querySelector(".carousel-track-m");
const slidesM = Array.from(trackM.children);
const prevButtonM = document.querySelector(".left-arrow-m");
const nextButtonM = document.querySelector(".right-arrow-m");
const dotsNavM = document.querySelector(".carousel-dots-m");

// Tworzenie kropek dla karuzeli M
slidesM.forEach((_, index) => {
  const dotM = document.createElement("div");
  dotM.classList.add("dot-m");
  if (index === 0) dotM.classList.add("active");
  dotsNavM.appendChild(dotM);
});

const dotsM = Array.from(dotsNavM.children);

let currentIndexM = 0;

function updateCarouselM(index) {
  trackM.style.transform = `translateX(-${index * 100}%)`;
  dotsM.forEach((dotM) => dotM.classList.remove("active"));
  dotsM[index].classList.add("active");
}

function moveToNextSlideM() {
  currentIndexM = (currentIndexM + 1) % slidesM.length;
  updateCarouselM(currentIndexM);
}

let autoSlideM = setInterval(moveToNextSlideM, 3000);

nextButtonM.addEventListener("click", () => {
  clearInterval(autoSlideM);
  moveToNextSlideM();
  autoSlideM = setInterval(moveToNextSlideM, 3000);
});

prevButtonM.addEventListener("click", () => {
  clearInterval(autoSlideM);
  currentIndexM = (currentIndexM - 1 + slidesM.length) % slidesM.length;
  updateCarouselM(currentIndexM);
  autoSlideM = setInterval(moveToNextSlideM, 3000);
});

dotsM.forEach((dotM, index) => {
  dotM.addEventListener("click", () => {
    clearInterval(autoSlideM);
    currentIndexM = index;
    updateCarouselM(currentIndexM);
    autoSlideM = setInterval(moveToNextSlideM, 3000);
  });
});
