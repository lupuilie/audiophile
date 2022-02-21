import createElement from "../../utils/createElement.js";

class Modal {
  constructor() {
    this.disableOutsideClick = false;
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
    this.modalCloseBtn.addEventListener("click", () => this.closeModal());

    this.modalContainer.addEventListener("click", () => this.close());
  }

  close() {
    if (this.outsideClickDisabled === true) return;
    this.modalContainer.innerHTML = "";
    this.modalDiv.innerHTML = "";
    this.modalDiv.classList.remove("centered");
    this.modalDiv.classList.remove("container");
    this.modalContainer.remove();
    document.body.style.overflow = "auto";
    if (this.onClose) this.onClose();
  }

  onClickOutside() {
    this.close();
  }
  closeModal() {
    this.outsideClickDisabled = false;
    this.close();
  }

  show(
    modalMarkup = null,
    {
      disableOutsideClick = false,
      onClose = null,
      centered = false,
      useMarginBottom = true,
      useCloseBtn = false,
      useContainer = true,
      useDarkerBg = false,
    } = {}
  ) {
    if (!modalMarkup) return;

    this.modalDiv.innerHTML = "";
    document.body.style.overflow = "hidden";
    if (disableOutsideClick === true) this.outsideClickDisabled = true;
    if (onClose) this.onClose = onClose;
    if (centered === true) this.modalDiv.classList.add("centered");
    if (useMarginBottom) this.modalDiv.style.marginBottom = "100px";
    if (useCloseBtn) this.modalDiv.append(this.modalCloseBtn);
    if (useContainer) this.modalDiv.classList.add("container");
    if (useDarkerBg) this.modalContainer.style.background = "rgba(0,0,0,0.8)";
    this.modalDiv.append(modalMarkup);

    modalMarkup.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    this.modalContainer.append(this.modalDiv);

    document.body.append(this.modalContainer);
  }
}

export default Modal;
