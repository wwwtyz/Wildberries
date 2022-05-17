let indicators = document.querySelector(".carousel-indicators");
indicators.addEventListener("click", ({ target }) => {
  console.log(target.classList);
  for (let i = 0; i < indicator.length + 1; i++) {
    if (
      target.classList.contains("carusel-btn") &&
      target == indicator[i - 1]
    ) {
      currentSlide(i);
    }
  }
});
let indicator = document.getElementsByClassName("carusel-btn");
let backBtn = document.querySelector(".carousel-control-prev");
let nextBtn = document.querySelector(".carousel-control-next");
nextBtn.addEventListener("click", () => {
  nextSlide(1);
});
backBtn.addEventListener("click", () => {
  nextSlide(-1);
});
let carusel = document.querySelector(".carousel-inner");
let slides = document.getElementsByClassName("carousel-item");
let slideID = 1;

showSlide(slideID);
function showSlide(n) {
  if (n < 1) {
    slideID = slides.length;
  } else if (n > slides.length) {
    slideID = 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    indicator[i].classList.remove("active");
  }

  console.log(slideID - 1);
  console.log(n);
  slides[slideID - 1].classList.add("active");
  indicator[slideID - 1].classList.add("active");
}

function nextSlide(n) {
  showSlide((slideID += n));
}

function currentSlide(n) {
  showSlide((slideID = n));
}
