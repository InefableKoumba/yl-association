new Swiper(".swiper-images", {
  direction: "horizontal",
  loop: true,
  effect: "cards",
  slidesPerView: 1.2,
  spaceBetween: 4,
});

swiper = new Swiper(".swiper-services", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1.2,
  spaceBetween: 8,
  breakpoints: {
    // when window width is >= 640px
    480: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 2.4,
  spaceBetween: 2,
  breakpoints: {
    // when window width is >= 640px
    480: {
      slidesPerView: 3.8,
      spaceBetween: 4,
    },
    600: {
      slidesPerView: 4.2,
      spaceBetween: 4,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 4,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 4,
    },
  },
});
