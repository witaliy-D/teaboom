let thumbsSlider = new Swiper(".product__slider-thumbs", {
  speed: 1000,
  freeMode: true,
  loop: false,
  allowTouchMove: true,
  grabCursor: true,
  spaceBetween: 10,
  slidesPerView: 3,
  breakpoints: {
    480: {
      slidesPerView: 4,
    },
    660: {
      slidesPerView: 5,
    },
    768: {
      slidesPerView: 4,
    },

    992: {
      slidesPerView: 5,
    },
  },
});


let mainSlider = new Swiper(".product__slider", {
  thumbs: {
    swiper: thumbsSlider
  },
  allowTouchMove: false,
  speed: 1000,
  loop: false,
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

Fancybox.bind("[data-fancybox]", {
  hideScrollbar: false,
  Carousel: {
    transition: "classic"
  },
  Thumbs: false
});


new SlimSelect({
  select: '#selectElement',
  settings: {
    showSearch: false,
    modal: 'off'
  }
});


const productData = {
  "100 г": {
    article: "01306",
    oldPrice: "349,20 ₽",
    price: "326,40 ₽"
  },
  "500 г": {
    article: "01307",
    oldPrice: "1 646 ₽",
    price: "1 432 ₽"
  },
  "1000 г": {
    article: "01308",
    oldPrice: "2 592 ₽",
    price: "2 064 ₽"
  },
  "5000 г": {
    article: "01309",
    oldPrice: "8 710 ₽",
    price: "6 320 ₽"
  }
};

document.querySelectorAll(".product__item select[name='weight']").forEach(select => {
  const form = select.closest("form");

  const article = form.querySelector(".product__article");
  const price = form.querySelector(".product__price");
  const oldPrice = form.querySelector(".product__old-price");

  function updateProduct() {
    const data = productData[select.value];

    if (!data) return;

    article.textContent = data.article;
    price.textContent = data.price;
    oldPrice.textContent = data.oldPrice;
  }

  select.addEventListener("change", updateProduct);

  // Устанавливаем данные для выбранного значения при загрузке
  updateProduct();
});

document.querySelectorAll(".product__accordion").forEach(accordion => {
  const header = accordion.querySelector(".product__accordion-header");
  const body = accordion.querySelector(".product__accordion-body");

  if (!header || !body) return;

  header.addEventListener("click", () => {
    const isActive = accordion.classList.contains("active");

    if (isActive) {
      // Закрытие
      body.style.maxHeight = body.scrollHeight + "px";

      // Фиксируем текущую высоту перед анимацией
      body.offsetHeight;

      body.style.maxHeight = "0";
      accordion.classList.remove("active");
    } else {
      // Открытие
      accordion.classList.add("active");
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });

  // Отслеживаем изменение размеров содержимого
  const observer = new ResizeObserver(() => {
    if (accordion.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });

  observer.observe(body);

  // Поддерживаем корректную высоту при изменении ширины окна
  window.addEventListener("resize", () => {
    if (accordion.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
});
