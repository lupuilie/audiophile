import createElement from "./../../../utils/createElement.js";
import Picture from "./../../../components/Picture/index.js";
import QtySelector from "./../../../components/QtySelector/index.js";
import { onSubmitAddToCart } from "./../../../events.js";
import { capitalize, formatUsd } from "./../../../utils/string.js";

function productWrapper(productInfo) {
  if (!productInfo) return;

  const {
    id,
    image: productImages,
    slug,
    name,
    description,
    brand,
    price,
  } = productInfo;
  const productWrapper = createElement("section", {
    className: "product-wrapper",
  });

  const imageDiv = createElement("div", { className: "image" });
  const pictureEl = Picture({
    ...productImages,
    alt: `${name} thumbnail`,
    className: "product-image",
  });
  imageDiv.append(pictureEl);

  const descriptionDiv = createElement("div", { className: "description" });
  if (productInfo.new)
    descriptionDiv.append(
      createElement("p", {
        className: "overline new-product",
        textContent: "New Product",
      })
    );

  descriptionDiv.append(
    createElement("h1", { textContent: name, className: "title" })
  );

  if (brand !== "audiophile") {
    descriptionDiv.append(
      createElement("p", { textContent: `Brand: ${capitalize(brand)}` })
    );
  }

  descriptionDiv.append(createElement("p", { textContent: description }));
  descriptionDiv.append(
    createElement("h2", {
      textContent: formatUsd(price),
      className: "price",
    })
  );

  const cartAddForm = createElement("form", { className: "cart-add" });
  const qty = new QtySelector();
  const toCartBtn = createElement("button", {
    textContent: "Add to Cart",
    className: "btn btn-primary",
  });
  cartAddForm.append(qty.element, toCartBtn);
  descriptionDiv.append(cartAddForm);

  cartAddForm.addEventListener("submit", (e) => e.preventDefault());

  toCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onSubmitAddToCart({ id, slug, name, price, qty: qty.value });
  });

  productWrapper.append(imageDiv, descriptionDiv);
  return productWrapper;
}

export default productWrapper;
