// let menuToggle = false;

// let toggles = document.querySelectorAll(".nav-menu__toggle");
// Object.keys(toggles).forEach((index) => {

//   let $menuToggle = toggles[index];

//   $menuToggle.addEventListener("click", function () {
//     document.querySelector(".nav-menu").classList.toggle("nav-menu--open");
//     //$menuToggle.classList.toggle("burger--close");
//     if (!menuToggle) {
//       menuToggle = true;
//       const event = new CustomEvent("scrollOffsetOpen", { detail: { target: $menuToggle } });
//       window.dispatchEvent(event);
//     } else {
//       menuToggle = false;
//       const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
//       window.dispatchEvent(event);
//     }
//   });

//   function menuClose() {
//     document.querySelector(".nav-menu").classList.remove("nav-menu--open");
//     $menuToggle.classList.remove("burger--close");
//     const event = new CustomEvent("scrollOffsetClose", { detail: { target: $menuToggle } });
//     window.dispatchEvent(event);
//     menuToggle = false;
//     return false;
//   }

//   $menuToggle.addEventListener("scrollOffsetClose", menuClose);

//   document.querySelector(".nav-menu__toggle--close").addEventListener("click", menuClose);

//   window.addEventListener("resize", function () {
//     if (window.innerWidth > 1100) {
//       menuClose();
//     }
//   });

//   document.querySelector(".nav-menu").addEventListener("click", function (e) {
//     if (this.classList.contains("nav-menu--open") && e.currentTarget === e.target) {
//       menuClose();
//     }
//   });
// });

// $(".search__btn").on('click', function() {
//   $(".search").addClass("active");
// });

// $(document).on('click', function (e) {
//   if (!$(e.target).closest('.search').length) {
//     $('.search').removeClass('active');
//   }
// });

// function fixHeader() {
//   if (window.scrollY > 170) {

//     document.querySelector(".header").classList.add("header--fixed");
//   }
//   else {
//     document.querySelector(".header").classList.remove("header--fixed");
//   }
// }

// window.addEventListener("scroll", fixHeader);

// document.addEventListener("DOMContentLoaded", fixHeader);

// window.addEventListener("scroll", function () {
//   if (window.scrollY > 171) {
//     document.querySelector(".header").classList.add("active");
//   }
//   else {
//     document.querySelector(".header").classList.remove("active");
//   }
// });
