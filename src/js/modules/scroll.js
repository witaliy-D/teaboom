document.querySelectorAll(".scroll").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // предотвращаем стандартный переход по ссылке

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const paddingTop = parseInt(getComputedStyle(targetElement).paddingTop) || 0;
      const offsetTop = targetElement.offsetTop + paddingTop - 40;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth" // плавный скролл
      });
    }
  });
});
