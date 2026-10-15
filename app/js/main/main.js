(() => {
  // src/js/utility/util.js
  var isString = (val) => typeof val === "string";
  var isHTMLElement = (val) => val instanceof HTMLElement;
  var isNumber = (val) => !!Number(val);

  // src/components/scroll-offset/scroll-offset.js
  var SOList = [];
  function scrollOffsetEscape(e) {
    if (e.key === "Escape") {
      const $root = SOList[SOList.length - 1];
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $root } });
      $root.dispatchEvent(event);
    }
  }
  window.addEventListener("scrollOffsetOpen", (e) => {
    const data = e.detail;
    if (data && data.target && isHTMLElement(data.target)) {
      SOList.push(data.target);
      if (SOList.length === 1) {
        document.body.classList.add("scroll-offset");
        window.addEventListener("keyup", scrollOffsetEscape);
      }
    }
  });
  window.addEventListener("scrollOffsetClose", (e) => {
    const data = e.detail;
    if (data && data.target && isHTMLElement(data.target)) {
      const index = SOList.indexOf(data.target);
      if (index > -1) SOList.splice(index, 1);
      if (SOList.length === 0) {
        document.body.classList.remove("scroll-offset");
        window.removeEventListener("keyup", scrollOffsetEscape);
      }
    }
  });
  window.addEventListener("scrollOffsetAllClose", () => {
    while (SOList.length > 0) {
      const $item = SOList.pop();
      const event = new CustomEvent("scrollOffsetClose", { detail: { target: $item } });
      $item.dispatchEvent(event);
    }
  });
  var addStyleOffset = document.createElement("style");
  var bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
  window.addEventListener("scrollOffsetOpen", () => {
    addStyleOffset.innerHTML = ":root { --scroll-offset-init: " + bodyWidth + "px; }";
    document.head.appendChild(addStyleOffset);
  }, { once: true });
  window.addEventListener("resize", () => {
    if (!document.body.classList.contains("scroll-offset")) {
      bodyWidth = window.innerWidth - document.documentElement.getBoundingClientRect().width;
      addStyleOffset.innerHTML = ":root { --scroll-offset-init: " + bodyWidth + "px; }";
    }
  });

  // src/js/utility/parseDataList.js
  function parseDataList(data) {
    if (isString(data)) {
      data = data.trim();
      const dataList = {};
      if (data.includes(";")) {
        data.split(";").forEach((dataItem, index) => {
          dataList[index] = dataItem.trim().split(",").filter((item) => item.trim()).map((item) => item.trim());
        });
      } else {
        dataList[0] = data.split(",").filter((item) => item.trim()).map((item) => item.trim());
      }
      return dataList;
    }
    return {};
  }

  // src/js/modules/trigger.js
  document.querySelectorAll("[data-trigger]").forEach(($trigger, index) => {
    trigger($trigger, $trigger.dataset.trigger, "trigger", "click");
  });
  function trigger($root, config, configName, eventName) {
    if ($root.__trigger) return;
    $root.__trigger = true;
    config = parseDataList(config);
    Object.keys(config).forEach((index) => {
      const data = config[index];
      let triggerElement = data[0] || false;
      const triggerEvent = data[1] || false;
      const triggerDelay = data[2];
      if (triggerElement === "window") triggerElement = window;
      if (triggerElement === "document") triggerElement = document;
      if (triggerElement && triggerEvent) {
        if (triggerDelay) {
          if (!isNumber(triggerDelay)) {
            console.error("trigger delay error: ", triggerDelay, " only Number");
            return;
          }
          $root.addEventListener(eventName, () => {
            setTimeout(
              () => {
                const event = new CustomEvent(triggerEvent, { detail: { data: parceDataset(), trigger: $root } });
                document.querySelector(triggerElement).dispatchEvent(event);
              },
              triggerDelay
            );
          });
        } else {
          $root.addEventListener(eventName, () => {
            const event = new CustomEvent(triggerEvent, { detail: { data: parceDataset(), trigger: $root } });
            document.querySelector(triggerElement).dispatchEvent(event);
          });
        }
      }
    });
    function parceDataset() {
      let triggerData = {};
      Object.keys($root.dataset).forEach((data) => {
        if (data != configName) {
          const dataValue = $root.dataset[data].trim();
          triggerData[data] = Number(dataValue) ? Number(dataValue) : dataValue === "true" ? true : dataValue === "false" ? false : dataValue;
        }
      });
      return triggerData;
    }
  }

  // src/js/plugins/wow.js
  new WOW().init();

  // src/pages/main/product/product.js
  var thumbsSlider = new Swiper(".product__slider-thumbs", {
    speed: 1e3,
    freeMode: true,
    loop: false,
    allowTouchMove: true,
    grabCursor: true,
    spaceBetween: 10,
    slidesPerView: 3,
    breakpoints: {
      480: {
        slidesPerView: 4
      },
      660: {
        slidesPerView: 5
      },
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      }
    }
  });
  var mainSlider = new Swiper(".product__slider", {
    thumbs: {
      swiper: thumbsSlider
    },
    allowTouchMove: false,
    speed: 1e3,
    loop: false,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    }
  });
  Fancybox.bind("[data-fancybox]", {
    hideScrollbar: false,
    Carousel: {
      transition: "classic"
    },
    Thumbs: false
  });
  new SlimSelect({
    select: "#selectElement",
    settings: {
      showSearch: false,
      modal: "off"
    }
  });
  var productData = {
    "100 \u0433": {
      article: "01306",
      oldPrice: "349,20 \u20BD",
      price: "326,40 \u20BD"
    },
    "500 \u0433": {
      article: "01307",
      oldPrice: "1 646 \u20BD",
      price: "1 432 \u20BD"
    },
    "1000 \u0433": {
      article: "01308",
      oldPrice: "2 592 \u20BD",
      price: "2 064 \u20BD"
    },
    "5000 \u0433": {
      article: "01309",
      oldPrice: "8 710 \u20BD",
      price: "6 320 \u20BD"
    }
  };
  document.querySelectorAll(".product__item select[name='weight']").forEach((select) => {
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
    updateProduct();
  });
  document.querySelectorAll(".product__accordion").forEach((accordion) => {
    const header = accordion.querySelector(".product__accordion-header");
    const body = accordion.querySelector(".product__accordion-body");
    if (!header || !body) return;
    header.addEventListener("click", () => {
      const isActive = accordion.classList.contains("active");
      if (isActive) {
        body.style.maxHeight = body.scrollHeight + "px";
        body.offsetHeight;
        body.style.maxHeight = "0";
        accordion.classList.remove("active");
      } else {
        accordion.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
    const observer = new ResizeObserver(() => {
      if (accordion.classList.contains("active")) {
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
    observer.observe(body);
    window.addEventListener("resize", () => {
      if (accordion.classList.contains("active")) {
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
})();
