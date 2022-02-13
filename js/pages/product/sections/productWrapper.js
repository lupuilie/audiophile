import createElement from "./../../../utils/createElement.js";
import Picture from "./../../../components/Picture/index.js";
import QtySelector from "./../../../components/QtySelector/index.js";
import { onSubmitAddToCart } from "./../../../events.js";

function productWrapper(productInfo) {
  if (!productInfo) return;

  const { image: productImages, name, description, price } = productInfo;
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
  descriptionDiv.append(createElement("p", { textContent: description }));
  descriptionDiv.append(
    createElement("h2", {
      textContent: `$ ${price}`,
      className: "price",
    })
  );

  const cartAddForm = createElement("form", { className: "cart-add" });
  const qty = QtySelector();
  const toCartBtn = createElement("button", {
    textContent: "Add to Cart",
    className: "btn btn-primary",
  });
  cartAddForm.append(qty.node, toCartBtn);
  descriptionDiv.append(cartAddForm);

  cartAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmitAddToCart(productInfo.id, qty.getValue());
  });

  productWrapper.append(imageDiv, descriptionDiv);
  return productWrapper;
}

export default productWrapper;
