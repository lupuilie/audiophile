import createElement from "../../utils/createElement.js";
import onClickOutside from "../../utils/onClickOutside.js";

class Modal {
  constructor() {
    this.active = false;
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
    this.modalContainer.remove();
    /* Modal closed, set active to false so I can open another Modal */
    this.active = false;
  }

  show(modalMarkup = null, { triggeredBy = null, onBlurClose = true }) {
    if (!modalMarkup || !triggeredBy) return;
    /* Check if modal is active so I will not show another */
    if (this.active) return;

    this.modalDiv.innerHTML = "";

    this.modalDiv.append(modalMarkup);
    this.modalContainer.append(this.modalDiv);

    document.body.append(this.modalContainer);
    this.active = true;

    const closeModal = this.close.bind(this);
    if (onBlurClose)
      onClickOutside(this.modalDiv, closeModal, { ignore: triggeredBy });
  }
}

export default Modal;
