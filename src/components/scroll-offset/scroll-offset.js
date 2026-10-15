import { isHTMLElement } from "../../js/utility/util";

const SOList = []

//*
function scrollOffsetEscape(e) {
  if (e.key === 'Escape') {
    const $root = SOList[SOList.length - 1]
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
