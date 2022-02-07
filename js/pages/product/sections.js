import createElement from "../../utils/createElement.js";
import QtySelector from "../../components/QtySelector/index.js";
import Picture from "../../components/Picture/index.js";

import { onSubmitAddToCart } from "../../events.js";

/* section.product-wrapper */
export function productSection(productInfo) {
  if (!productInfo) return;
  const productWrapper = createElement("section", {
    className: "product-wrapper",
  });

  const imageDiv = createElement("div", { className: "image" });
  const productImages = {
    mobile: productInfo.image.mobile,
    tablet: productInfo.image.tablet,
    desktop: productInfo.image.desktop,
    alt: `${productInfo.name} thumbnail`,
  };
  const image = Picture({ ...productImages, className: "product-image" });
  imageDiv.append(image);

  const descriptionDiv = createElement("div", { className: "description" });
  if (productInfo.new)
    descriptionDiv.append(
      createElement("p", {
        className: "overline new-product",
        textContent: "New Product",
      })
    );

  descriptionDiv.append(
    createElement("h1", { textContent: productInfo.name, className: "title" })
  );
  descriptionDiv.append(
    createElement("p", { textContent: productInfo.description })
  );
  descriptionDiv.append(
    createElement("h2", {
      textContent: `$ ${productInfo.price}`,
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

/* section.about */
export function aboutSection(productInfo) {
  if (!productInfo) return;

  const about = createElement("section", { className: "about" });
  const features = createElement("div", { className: "features" });
  features.append(createElement("h3", { textContent: "Features" }));
  const featuresTexts = productInfo.features.split("\n").filter(Boolean);
  featuresTexts.forEach((text) =>
    features.append(createElement("p", { textContent: text }))
  );
  const packageDiv = createElement("div", { className: "package" });
  const packageItems = createElement("ul", { className: "package-items" });
  productInfo.includes.forEach((included) => {
    const packageItem = createElement("li", { className: "package-item" });
    const qty = createElement("span", {
      textContent: `${included.quantity}x`,
      className: "qty",
    });
    const item = createElement("span", {
      textContent: included.item,
      className: "item",
    });
    packageItem.append(qty, item);
    packageItems.append(packageItem);
  });
  packageDiv.append(
    createElement("h3", { textContent: "In The Box" }),
    packageItems
  );

  about.append(features, packageDiv);
  return about;
}

/* section.image-gallery */
export function imageGallerySection(productInfo) {
  const { gallery, name } = productInfo;
  const imageGallery = createElement("section", { className: "image-gallery" });

  const image1 = Picture({
    ...gallery.first,
    className: "image-1",
    alt: `${name} image 1 `,
  });
  const image2 = Picture({
    ...gallery.second,
    className: "image-2",
    alt: `${name} image 2`,
  });
  const image3 = Picture({
    ...gallery.third,
    className: "image-3",
    alt: `${name} image 3`,
  });

  imageGallery.append(image1, image2, image3);

  return imageGallery;
}

/* section.related-products */
export function relatedProductsSection() {}
