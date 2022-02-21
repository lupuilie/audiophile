import createElement from "../utils/createElement.js";
import { AppCart, sendOrder } from "./../events.js";
import { formatUsd } from "./../utils/string.js";

function checkoutModal() {
  let listExpanded = false;
  const modalContent = createElement("div", {
    className: "modal-checkout centered",
  });
  const checkIcon = createElement("span", { className: "check-icon" });
  checkIcon.innerHTML = feather.icons.check.toSvg({ class: "feather-35" });

  const heading = createElement("h5", { className: "heading" });
  heading.append(
    createElement("span", { textContent: "Thank you", className: "block" })
  );
  heading.append("for your order");
  const confirmation = createElement("p", {
    textContent: "You will receive an email confirmation shortly.",
    className: "confirmation",
  });

  const orderedProducts = createElement("div", {
    className: "ordered-products",
  });

  const productsList = createElement("div", { className: "products-list" });
  const viewMore = createElement("a", { href: "#", className: "view-more" });
  const cartItems = AppCart.getItems();
  const firstItem = cartItems[0];
  productsList.append(productMarkup(firstItem));
  if (cartItems.length > 1) {
    viewMore.textContent = `and ${AppCart.getCount() - 1} another item(s)`;
    productsList.append(viewMore);
  }

  const grandTotal = createElement("div", { className: "grand-total" });
  grandTotal.append(createElement("p", { textContent: "Grand Total" }));
  grandTotal.append(
    createElement("h6", { textContent: formatUsd(AppCart.getGrandTotal()) })
  );

  /* Event Listeners */
  viewMore.addEventListener("click", (e) => {
    e.preventDefault();

    if (!listExpanded) {
      cartItems.slice(1).forEach((item) => {
        productsList.insertBefore(productMarkup(item), viewMore);
      });
      listExpanded = true;
      viewMore.textContent = "view less";
      grandTotal.classList.add("flex-end");
      return;
    }
    if (listExpanded) {
      productsList
        .querySelectorAll(".product")
        .forEach((element) => element.remove());
      productsList.prepend(productMarkup(cartItems[0]));
      listExpanded = false;
      viewMore.textContent = `and ${AppCart.getCount() - 1} another item(s)`;
      grandTotal.classList.remove("flex-end");
    }
  });

  /* Functions */
  function productMarkup(cartItem) {
    const product = createElement("div", { className: "product" });
    product.append(
      createElement("img", {
        src: `./images/cart/image-${cartItem.slug}.jpg`,
        alt: `${cartItem.name} thumbnail`,
        className: "image",
      })
    );
    const info = createElement("div", { className: "info" });
    const name = createElement("span", {
      textContent: cartItem.name,
      className: "name",
    });
    const qty = createElement("span", {
      textContent: `x${cartItem.qty}`,
      className: "qty",
    });
    const value = createElement("p", {
      textContent: formatUsd(cartItem.value),
      className: "value",
    });
    const p = createElement("p");
    p.append(name, qty);
    info.append(p, value);

    product.append(info);
    return product;
  }
  orderedProducts.append(productsList, grandTotal);

  const goHomeBtn = createElement("a", {
    textContent: "Back to home",
    href: "./",
    className: "btn btn-primary",
  });
  modalContent.append(
    checkIcon,
    heading,
    confirmation,
    orderedProducts,
    goHomeBtn
  );

  /* Send order to 'backend' */
  sendOrder(AppCart.getItems());

  return modalContent;
}

export default checkoutModal;
