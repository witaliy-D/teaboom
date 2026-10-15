import { isFunction, isHTMLElement, isObject } from "../../js/utility/util";

export class Modal {
  constructor(config) {

    this.config = isObject(config) ? config : {}

    if (isHTMLElement(config.root)) {
      this.init(config.root)
    }
    else if (config.name) {
      config.name = config.name.trim()
      if (modalList[config.name]) {
        modalList[config.name].forEach($modal => {
          this.init($modal)
        });
      }
    }
    else {
      console.log('Error: {name: "modal" || root: HTMLElement}');
    }
  }

  init($root) {

    const config = this.config

    $root.addEventListener("modalOpen", (e) => {
      this.open($root, e.detail.data, e.detail.$trigger);
      return false
    });

    $root.addEventListener("scrollOffsetClose", (e) => {
      this.close($root, e.detail.data);
      return false
    });

    $root.addEventListener("modalClose", (e) => {
      this.close($root, e.detail.data, e.detail.$trigger);
      return false
    });

    window.addEventListener("modalCloseAll", (e) => {
      this.close($root, e.detail.data, e.detail.$trigger);
    });

    $root.querySelectorAll("[data-modal-close]").forEach(($closeButton) => {
      $closeButton.addEventListener("click", () => {
        this.close($root, config)
      })
    })
    if (config.setup && isFunction(config.setup)) config.setup($root)
  }

  open($root, data, $trigger) {

    const config = this.config

    if (config.onOpen && isFunction(config.onOpen)) config.onOpen($root, data, $trigger)
    if (config.onOpenReplace && isFunction(config.onOpenReplace)) config.onOpenReplace($root, data, $trigger)

    else {
      $root.classList.add('open');
    }

    const event = new CustomEvent("scrollOffsetOpen", { detail: { target: $root } });
    window.dispatchEvent(event);

    if (config.onOpenAfter && isFunction(config.onOpenAfter)) config.onOpenAfter($root, data, $trigger)
  }

  close($root, data, $trigger) {

    const config = this.config

    if (config.onClose && isFunction(config.onClose)) config.onClose($root, data, $trigger)
    if (config.onCloseReplace && isFunction(config.onCloseReplace)) config.onCloseReplace($root, data, $trigger)

    else {
      $root.classList.remove('open');
    }

    const event = new CustomEvent("scrollOffsetClose", { detail: { target: $root } });
    window.dispatchEvent(event);

    if (config.onCloseAfter && isFunction(config.onCloseAfter)) config.onCloseAfter($root, data, $trigger)
  }
}

const modalList = {}

document.querySelectorAll("[data-modal]").forEach(($modal) => {
  const modalName = $modal.dataset.modal.trim();
  if (modalName) {
    if (!modalList[modalName]) modalList[modalName] = [];
    modalList[modalName].push($modal);
  } else {
    new Modal({
      root: $modal
    });
  }
});


