import createElement from "../utils/createElement.js";

async function cartModal(Cart) {
  const cartContainer = createElement("div", {
    className: "container modal-wrapper",
  });
  const modalCart = createElement("div", { className: "modal-cart" });
  const modalHeader = createElement("div", { className: "modal-header" });
  const h6 = createElement("h6", { textContent: `Cart (${1 + 2})` });
  const cartRemoveAll = createElement("a", {
    href: "#",
    className: "cart-remove-all",
    textContent: "Remove all",
  });
  const cartContent = createElement("ul", { className: "cart-content" });
  modalHeader.append(h6, cartRemoveAll);
  modalCart.append(modalHeader);
  cartContainer.append(modalCart);
  return cartContainer;
}

export default cartModal;
