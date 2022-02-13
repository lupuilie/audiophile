import createElement from "../../utils/createElement.js";
import onClickOutside from "../../utils/onClickOutside.js";

class Modal {
  constructor() {
    this.modalContainer = createElement("div", {
      className: "modal-container",
    });

    this.modalDiv = createElement("div", {
      className: "modal",
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
  }

  show(modalMarkup = null, { triggeredBy = null }) {
    if (!modalMarkup || !triggeredBy) return;
    /* Check if modal is active so I will not show another */
    if (this.active) return;

    this.modalDiv.innerHTML = "";

    this.modalDiv.append(modalMarkup);
    this.modalContainer.append(this.modalDiv);

    document.body.append(this.modalContainer);

    const closeModal = this.close.bind(this);
    onClickOutside(this.modalDiv, closeModal, { ignore: triggeredBy });
  }
}

export default Modal;
