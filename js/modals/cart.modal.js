import createElement from "../utils/createElement.js";
import { AppCart } from "./../events.js";
import QtySelector from "./../components/QtySelector/index.js";
import { formatUsd } from "./../utils/string.js";

function cartModal() {
  const modalContent = createElement("div", { className: "modal-cart" });
  const modalHeader = createElement("div", { className: "modal-header" });
  modalHeader.append(
    createElement("h6", { textContent: `Cart (${AppCart.getCount()})` })
  );
  const cartRemoveAll = createElement("a", {
    textContent: "Remove all",
    href: "#",
    className: "cart-remove-all",
  });
  modalHeader.append(cartRemoveAll);
  const total = createElement("div", { className: "total" });
  const totalValue = createElement("h6", {
    textContent: formatUsd(AppCart.getTotalValue()),
  });
  total.append(createElement("p", { textContent: "TOTAL" }));
  total.append(totalValue);
  const checkoutBtn = createElement("a", {
    href: "./checkout.html",
    textContent: "Checkout",
    className: "btn btn-primary checkout-btn",
  });

  /* Functions */
  function emptyCartMessage() {
    const cartEmpty = createElement("div", { className: "cart-empty" });
    cartEmpty.append(
      createElement("h6", { textContent: "Your cart is empty" })
    );
    const cartEmptyIcon = createElement("i");
    cartEmptyIcon.innerHTML = feather.icons["shopping-cart"].toSvg({
      class: "feather-100 cart-icon",
    });
    cartEmpty.append(cartEmptyIcon);
    modalContent.innerHTML = "";
    modalContent.append(cartEmpty);
  }

  function createItemsList(items) {
    const cartContent = createElement("ul", { className: "cart-content" });
    items.forEach((item) => {
      const cartItem = createElement("li", { className: "cart-item" });
      const product = createElement("div", { className: "product" });
      const img = createElement("img", {
        src: `./images/cart/image-${item.slug}.jpg`,
        alt: `${item.name} thumbnail`,
      });
      const productInfo = createElement("div", { className: "product-info" });
      const productName = createElement("p", {
        textContent: item.name,
        className: "name",
      });
      const productPrice = createElement("p", {
        textContent: formatUsd(item.value),
        className: "price",
      });

      productInfo.append(productName, productPrice);

      const qty = new QtySelector({
        allowZero: true,
        startValue: item.qty,
        onChange: qtyChanged,
      });

      function qtyChanged() {
        AppCart.setItemCount(item.id, qty.value);
        productPrice.textContent = formatUsd(item.value);
        totalValue.textContent = formatUsd(AppCart.getTotalValue());
        if (qty.value === 0) cartItem.remove();
        if (AppCart.getItemsCount() === 0) emptyCartMessage();
      }

      product.append(img, productInfo);
      cartItem.append(product, qty.element);
      cartContent.append(cartItem);
    });
    return cartContent;
  }

  if (AppCart.getCount() === 0) emptyCartMessage();
  if (AppCart.getCount() > 0) {
    modalContent.append(modalHeader);
    modalContent.append(createItemsList(AppCart.getItems()));
    modalContent.append(total);
    modalContent.append(checkoutBtn);
  }

  /* Event Listeners */
  cartRemoveAll.addEventListener("click", () => {
    AppCart.clearContent();
    emptyCartMessage();
  });

  return modalContent;
}

export default cartModal;
