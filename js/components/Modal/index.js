import createElement from "../../utils/createElement.js";

class Modal {
  constructor() {
    this.modalContainer = createElement("div", {
      className: "modal-container",
    });

    this.modalDiv = createElement("div", {
      className: "modal container",
    });

    this.modalCloseBtn = createElement("button", { className: "modal-close" });
    this.modalCloseBtn.innerHTML = feather.icons.x.toSvg();
    this.modalCloseBtn.append(
      createElement("span", {
        className: "hidden",
        textContent: "Close the modal",
      })
    );
    this.modalContainer.addEventListener("click", () => this.close());
  }

  close() {
    this.modalContainer.innerHTML = "";
    this.modalContainer.remove();
    document.body.style.overflow = "auto";
    if (this.onClose) this.onClose();
  }

  onClickOutside() {
    this.close();
  }

  show(modalMarkup = null, { onClose = null, centered = false } = {}) {
    if (!modalMarkup) return;
    if (onClose) this.onClose = onClose;
    this.modalDiv.innerHTML = "";
    document.body.style.overflow = "hidden";

    if (centered === true) this.modalDiv.classList.add("centered");

    this.modalDiv.append(modalMarkup);

    modalMarkup.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    this.modalContainer.append(this.modalDiv);

    document.body.append(this.modalContainer);
  }
}

export default Modal;
