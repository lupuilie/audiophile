import createElement from "../../utils/createElement.js";

class Modal {
  constructor() {
    this.modalContainer = createElement("div", {
      className: "modal-container",
    });

    this.modalDiv = createElement("div", {
      className: "modal",
    });
    this.modalDiv.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.modalContainer.addEventListener("click", () => {
      this.onClickOutside();
    });

    this.modalCloseBtn = createElement("button", { className: "modal-close" });
    this.modalCloseBtn.innerHTML = feather.icons.x.toSvg();
    this.modalCloseBtn.append(
      createElement("span", {
        className: "hidden",
        textContent: "Close the modal",
      })
    );
  }

  close() {
    this.modalContainer.innerHTML = "";
    this.modalContainer.remove();
    document.body.style.overflow = "auto";
  }

  onClickOutside() {
    this.close();
  }

  show(modalMarkup = null) {
    if (!modalMarkup) return;
    this.modalDiv.innerHTML = "";
    document.body.style.overflow = "hidden";

    this.modalDiv.append(modalMarkup);
    this.modalContainer.append(this.modalDiv);

    document.body.append(this.modalContainer);
  }
}

export default Modal;
